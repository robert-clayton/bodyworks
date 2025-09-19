-- Better Auth tables
-- These tables are required by Better Auth for authentication

-- User table (Better Auth format)
create table if not exists "user" (
  id text primary key,
  email text unique not null,
  "name" text not null,
  image text,
  "emailVerified" boolean not null default false,
  "createdAt" timestamp not null default now(),
  "updatedAt" timestamp not null default now()
);

-- Account table (for OAuth providers and credentials)
create table if not exists account (
  id text primary key default gen_random_uuid(),
  "userId" text not null references "user"(id) on delete cascade,
  "accountId" text not null,
  "providerId" text not null,
  "accessToken" text,
  "refreshToken" text,
  "idToken" text,
  "accessTokenExpiresAt" timestamp,
  "refreshTokenExpiresAt" timestamp,
  scope text,
  password text,
  "createdAt" timestamp not null default now(),
  "updatedAt" timestamp not null default now(),
  unique("providerId", "accountId")
);

-- Session table
create table if not exists session (
  id text primary key,
  "expiresAt" timestamp not null,
  token text unique not null,
  "createdAt" timestamp not null default now(),
  "updatedAt" timestamp not null default now(),
  "ipAddress" text,
  "userAgent" text,
  "userId" text not null references "user"(id) on delete cascade
);

-- Verification table (for email verification, password reset, etc.)
create table if not exists verification (
  id text primary key default gen_random_uuid(),
  identifier text not null,
  value text not null,
  "expiresAt" timestamp not null,
  "createdAt" timestamp default now(),
  "updatedAt" timestamp default now()
);

-- Create indexes for better performance
create index if not exists idx_user_email on "user"(email);
create index if not exists idx_account_user_id on account("userId");
create index if not exists idx_account_provider on account("providerId", "accountId");
create index if not exists idx_session_token on session(token);
create index if not exists idx_session_user_id on session("userId");
create index if not exists idx_verification_identifier on verification(identifier);

-- Update triggers for updatedAt
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new."updatedAt" = now();
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
