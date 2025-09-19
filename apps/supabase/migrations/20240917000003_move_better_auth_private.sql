-- Move Better Auth tables to a private schema and lock them down

-- 1) Create private schema
create schema if not exists better_auth;

-- 2) Move tables from public to better_auth (idempotent where possible)
do $$
begin
  if to_regclass('public.user') is not null then
    execute 'alter table public."user" set schema better_auth';
  end if;
  if to_regclass('public.account') is not null then
    execute 'alter table public.account set schema better_auth';
  end if;
  if to_regclass('public.session') is not null then
    execute 'alter table public.session set schema better_auth';
  end if;
  if to_regclass('public.verification') is not null then
    execute 'alter table public.verification set schema better_auth';
  end if;
exception when others then
  raise notice 'Skipping move if already moved: %', sqlerrm;
end$$;

-- 3) Enable RLS on Better Auth tables
do $$
begin
  if to_regclass('better_auth.user') is not null then
    execute 'alter table better_auth."user" enable row level security';
  end if;
  if to_regclass('better_auth.account') is not null then
    execute 'alter table better_auth.account enable row level security';
  end if;
  if to_regclass('better_auth.session') is not null then
    execute 'alter table better_auth.session enable row level security';
  end if;
  if to_regclass('better_auth.verification') is not null then
    execute 'alter table better_auth.verification enable row level security';
  end if;
end$$;

-- 4) Revoke client access (anon/authenticated) to schema and tables
revoke usage on schema better_auth from public, anon, authenticated;
revoke all on all tables in schema better_auth from anon, authenticated;
revoke all on all sequences in schema better_auth from anon, authenticated;

-- 5) Create dedicated DB role for Better Auth (no password set here)
--    Set a password separately with: alter role better_auth_user password 'STRONG_PASSWORD';
do $$
begin
  if not exists (
    select 1 from pg_roles where rolname = 'better_auth_user'
  ) then
    create role better_auth_user nologin;
    -- We deliberately create without login; enable with password later:
    -- alter role better_auth_user login password 'STRONG_PASSWORD';
  end if;
end$$;

-- 6) Grant Better Auth role access to private schema and tables
grant usage on schema better_auth to better_auth_user;
grant select, insert, update, delete on all tables in schema better_auth to better_auth_user;
grant usage, select, update on all sequences in schema better_auth to better_auth_user;

-- Ensure future tables in this schema inherit the grants
alter default privileges in schema better_auth
  grant select, insert, update, delete on tables to better_auth_user;
alter default privileges in schema better_auth
  grant usage, select, update on sequences to better_auth_user;

-- 7) Optional: RLS policies to allow the dedicated role
-- Note: RLS policies are evaluated for all roles. These blanket policies
--       allow the dedicated server role to operate without exposing to clients.
do $$
begin
  if to_regclass('better_auth.user') is not null then
    execute 'create policy if not exists "ba role access" on better_auth."user" to better_auth_user using (true) with check (true)';
  end if;
  if to_regclass('better_auth.account') is not null then
    execute 'create policy if not exists "ba role access" on better_auth.account to better_auth_user using (true) with check (true)';
  end if;
  if to_regclass('better_auth.session') is not null then
    execute 'create policy if not exists "ba role access" on better_auth.session to better_auth_user using (true) with check (true)';
  end if;
  if to_regclass('better_auth.verification') is not null then
    execute 'create policy if not exists "ba role access" on better_auth.verification to better_auth_user using (true) with check (true)';
  end if;
end$$;


