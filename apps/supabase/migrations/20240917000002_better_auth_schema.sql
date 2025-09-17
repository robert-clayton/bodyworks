-- Better Auth tables
-- These tables are required by Better Auth for authentication

-- User table (Better Auth format)
create table if not exists "user" (
  id text primary key,
  email text unique not null,
  "name" text not null,
  image text,
  email_verified boolean not null default false,
  created_at timestamp not null default now(),
  updated_at timestamp not null default now()
);

-- Account table (for OAuth providers and credentials)
create table if not exists account (
  id text primary key default gen_random_uuid(),
  user_id text not null references "user"(id) on delete cascade,
  account_id text not null,
  provider_id text not null,
  access_token text,
  refresh_token text,
  id_token text,
  access_token_expires_at timestamp,
  refresh_token_expires_at timestamp,
  scope text,
  password text,
  created_at timestamp not null default now(),
  updated_at timestamp not null default now(),
  unique(provider_id, account_id)
);

-- Session table
create table if not exists session (
  id text primary key,
  expires_at timestamp not null,
  token text unique not null,
  created_at timestamp not null default now(),
  updated_at timestamp not null default now(),
  ip_address text,
  user_agent text,
  user_id text not null references "user"(id) on delete cascade
);

-- Verification table (for email verification, password reset, etc.)
create table if not exists verification (
  id text primary key default gen_random_uuid(),
  identifier text not null,
  value text not null,
  expires_at timestamp not null,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

-- Create indexes for better performance
create index if not exists idx_user_email on "user"(email);
create index if not exists idx_account_user_id on account(user_id);
create index if not exists idx_account_provider on account(provider_id, account_id);
create index if not exists idx_session_token on session(token);
create index if not exists idx_session_user_id on session(user_id);
create index if not exists idx_verification_identifier on verification(identifier);

-- Update triggers for updated_at
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_user_updated_at before update on "user"
  for each row execute function update_updated_at_column();

create trigger update_account_updated_at before update on account
  for each row execute function update_updated_at_column();

create trigger update_session_updated_at before update on session
  for each row execute function update_updated_at_column();

create trigger update_verification_updated_at before update on verification
  for each row execute function update_updated_at_column();
