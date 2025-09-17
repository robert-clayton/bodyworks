-- Enable UUID extension (gen_random_uuid is built-in in modern PostgreSQL)
-- create extension if not exists "uuid-ossp";

-- Create profiles table
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create workout_programs table
create table public.workout_programs (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  days text[] not null default '{}',
  created_by uuid references public.profiles(id) on delete cascade not null,
  is_public boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create exercises table
create table public.exercises (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  muscle_groups text[] not null default '{}',
  equipment text,
  instructions text,
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create workouts table
create table public.workouts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  program_id uuid references public.workout_programs(id) on delete set null,
  day_name text,
  started_at timestamp with time zone default timezone('utc'::text, now()) not null,
  completed_at timestamp with time zone,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create workout_exercises table
create table public.workout_exercises (
  id uuid default gen_random_uuid() primary key,
  workout_id uuid references public.workouts(id) on delete cascade not null,
  exercise_id uuid references public.exercises(id) on delete cascade not null,
  order_index integer not null default 0,
  sets jsonb default '[]'::jsonb,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create media table
create table public.media (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  workout_exercise_id uuid references public.workout_exercises(id) on delete cascade,
  type text not null check (type in ('image', 'video')),
  url text not null,
  thumbnail_url text,
  file_size bigint,
  duration integer, -- duration in seconds for videos
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create updated_at trigger function
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Create triggers for updated_at
create trigger handle_updated_at before update on public.profiles
  for each row execute function public.handle_updated_at();

create trigger handle_updated_at before update on public.workout_programs
  for each row execute function public.handle_updated_at();

create trigger handle_updated_at before update on public.exercises
  for each row execute function public.handle_updated_at();

create trigger handle_updated_at before update on public.workouts
  for each row execute function public.handle_updated_at();

create trigger handle_updated_at before update on public.workout_exercises
  for each row execute function public.handle_updated_at();

-- Create profile automatically when user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.workout_programs enable row level security;
alter table public.exercises enable row level security;
alter table public.workouts enable row level security;
alter table public.workout_exercises enable row level security;
alter table public.media enable row level security;

-- RLS Policies for profiles
create policy "Users can view their own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Users can update their own profile" on public.profiles
  for update using (auth.uid() = id);

-- RLS Policies for workout_programs
create policy "Users can view public programs and their own programs" on public.workout_programs
  for select using (is_public = true or created_by = auth.uid());

create policy "Users can create their own programs" on public.workout_programs
  for insert with check (created_by = auth.uid());

create policy "Users can update their own programs" on public.workout_programs
  for update using (created_by = auth.uid());

create policy "Users can delete their own programs" on public.workout_programs
  for delete using (created_by = auth.uid());

-- RLS Policies for exercises (public read, admin write for now)
create policy "Anyone can view exercises" on public.exercises
  for select to authenticated using (true);

-- RLS Policies for workouts
create policy "Users can view their own workouts" on public.workouts
  for select using (user_id = auth.uid());

create policy "Users can create their own workouts" on public.workouts
  for insert with check (user_id = auth.uid());

create policy "Users can update their own workouts" on public.workouts
  for update using (user_id = auth.uid());

create policy "Users can delete their own workouts" on public.workouts
  for delete using (user_id = auth.uid());

-- RLS Policies for workout_exercises
create policy "Users can view workout exercises for their workouts" on public.workout_exercises
  for select using (
    exists (
      select 1 from public.workouts
      where workouts.id = workout_exercises.workout_id
      and workouts.user_id = auth.uid()
    )
  );

create policy "Users can create workout exercises for their workouts" on public.workout_exercises
  for insert with check (
    exists (
      select 1 from public.workouts
      where workouts.id = workout_exercises.workout_id
      and workouts.user_id = auth.uid()
    )
  );

create policy "Users can update workout exercises for their workouts" on public.workout_exercises
  for update using (
    exists (
      select 1 from public.workouts
      where workouts.id = workout_exercises.workout_id
      and workouts.user_id = auth.uid()
    )
  );

create policy "Users can delete workout exercises for their workouts" on public.workout_exercises
  for delete using (
    exists (
      select 1 from public.workouts
      where workouts.id = workout_exercises.workout_id
      and workouts.user_id = auth.uid()
    )
  );

-- RLS Policies for media
create policy "Users can view their own media" on public.media
  for select using (user_id = auth.uid());

create policy "Users can create their own media" on public.media
  for insert with check (user_id = auth.uid());

create policy "Users can update their own media" on public.media
  for update using (user_id = auth.uid());

create policy "Users can delete their own media" on public.media
  for delete using (user_id = auth.uid());

-- Insert some default exercises
insert into public.exercises (name, description, muscle_groups, equipment, instructions) values
  ('Push-up', 'Classic bodyweight chest exercise', array['chest', 'triceps', 'shoulders'], 'bodyweight', 'Start in plank position, lower chest to ground, push back up'),
  ('Pull-up', 'Upper body pulling exercise', array['back', 'biceps'], 'pull-up bar', 'Hang from bar, pull body up until chin clears bar'),
  ('Squat', 'Fundamental lower body exercise', array['quadriceps', 'glutes', 'hamstrings'], 'bodyweight', 'Stand with feet shoulder-width apart, lower hips back and down'),
  ('Deadlift', 'Full body compound movement', array['hamstrings', 'glutes', 'back', 'traps'], 'barbell', 'Lift barbell from ground to hip level with straight back'),
  ('Bench Press', 'Upper body pushing exercise', array['chest', 'triceps', 'shoulders'], 'barbell', 'Lie on bench, lower bar to chest, press back up'),
  ('Overhead Press', 'Shoulder strengthening exercise', array['shoulders', 'triceps', 'core'], 'barbell', 'Press weight overhead from shoulder level'),
  ('Row', 'Upper body pulling exercise', array['back', 'biceps'], 'barbell', 'Pull weight to torso while bent over'),
  ('Dips', 'Tricep and chest exercise', array['triceps', 'chest'], 'dip bars', 'Lower body between bars, push back up');

-- Insert sample workout programs
insert into public.workout_programs (name, description, days, created_by, is_public) 
select 
  'Push/Pull/Legs',
  '6-day split focusing on movement patterns',
  array['Push', 'Pull', 'Legs', 'Push', 'Pull', 'Legs'],
  id,
  true
from public.profiles 
limit 1;

insert into public.workout_programs (name, description, days, created_by, is_public) 
select 
  'Upper/Lower',
  '4-day split alternating upper and lower body',
  array['Upper', 'Lower', 'Upper', 'Lower'],
  id,
  true
from public.profiles 
limit 1;
