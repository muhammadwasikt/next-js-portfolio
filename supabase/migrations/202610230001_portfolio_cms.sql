-- Portfolio CMS foundation
-- Apply this migration to the Supabase project before enabling the admin UI.
create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.site_content (
  id uuid primary key default gen_random_uuid(),
  content_key text not null unique,
  value jsonb not null default '{}'::jsonb,
  updated_by uuid references auth.users(id) on delete set null,
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  storage_path text not null unique,
  public_url text,
  alt_text text not null default '',
  caption text not null default '',
  mime_type text,
  file_size bigint,
  width integer,
  height integer,
  tags text[] not null default '{}',
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  summary text not null default '',
  description text not null default '',
  category text not null default '',
  tech_stack text[] not null default '{}',
  cover_media_id uuid references public.media_assets(id) on delete set null,
  live_url text,
  source_url text,
  featured boolean not null default false,
  sort_order integer not null default 0,
  status text not null default 'draft' check (status in ('draft', 'published')),
  seo_title text not null default '',
  seo_description text not null default '',
  published_at timestamptz,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.project_media (
  project_id uuid not null references public.projects(id) on delete cascade,
  media_id uuid not null references public.media_assets(id) on delete cascade,
  sort_order integer not null default 0,
  primary key (project_id, media_id)
);

create table if not exists public.case_studies (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.projects(id) on delete set null,
  title text not null,
  slug text not null unique,
  excerpt text not null default '',
  content jsonb not null default '[]'::jsonb,
  problem text not null default '',
  goals text[] not null default '{}',
  approach text not null default '',
  solution text not null default '',
  outcomes jsonb not null default '[]'::jsonb,
  cover_media_id uuid references public.media_assets(id) on delete set null,
  featured boolean not null default false,
  sort_order integer not null default 0,
  status text not null default 'draft' check (status in ('draft', 'published')),
  seo_title text not null default '',
  seo_description text not null default '',
  published_at timestamptz,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.skills (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null default '',
  icon text not null default '',
  media_id uuid references public.media_assets(id) on delete set null,
  level_label text not null default '',
  featured boolean not null default false,
  sort_order integer not null default 0,
  status text not null default 'published' check (status in ('draft', 'published')),
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.experiences (
  id uuid primary key default gen_random_uuid(),
  company text not null,
  role text not null,
  employment_type text not null default '',
  location text not null default '',
  start_date date,
  end_date date,
  is_current boolean not null default false,
  summary text not null default '',
  achievements jsonb not null default '[]'::jsonb,
  logo_media_id uuid references public.media_assets(id) on delete set null,
  sort_order integer not null default 0,
  status text not null default 'published' check (status in ('draft', 'published')),
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint experiences_date_order check (end_date is null or start_date is null or end_date >= start_date)
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  person_name text not null,
  role text not null default '',
  company text not null default '',
  quote text not null,
  avatar_media_id uuid references public.media_assets(id) on delete set null,
  rating smallint check (rating between 1 and 5),
  approved boolean not null default false,
  featured boolean not null default false,
  sort_order integer not null default 0,
  status text not null default 'draft' check (status in ('draft', 'published')),
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists projects_public_order_idx on public.projects(status, sort_order, published_at desc);
create index if not exists case_studies_public_order_idx on public.case_studies(status, sort_order, published_at desc);
create index if not exists skills_public_order_idx on public.skills(status, sort_order);
create index if not exists experiences_public_order_idx on public.experiences(status, sort_order);
create index if not exists testimonials_public_order_idx on public.testimonials(status, approved, sort_order);
create index if not exists media_assets_tags_idx on public.media_assets using gin(tags);

create or replace function public.is_portfolio_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.admin_users
    where user_id = (select auth.uid())
  );
$$;

revoke all on function public.is_portfolio_admin() from public;
grant execute on function public.is_portfolio_admin() to authenticated;

alter table public.admin_users enable row level security;
alter table public.site_content enable row level security;
alter table public.media_assets enable row level security;
alter table public.projects enable row level security;
alter table public.project_media enable row level security;
alter table public.case_studies enable row level security;
alter table public.skills enable row level security;
alter table public.experiences enable row level security;
alter table public.testimonials enable row level security;

create policy "Admins can read admin list" on public.admin_users
  for select to authenticated using (public.is_portfolio_admin());

create policy "Public can read site content" on public.site_content
  for select to anon, authenticated using (true);
create policy "Admins can manage site content" on public.site_content
  for all to authenticated using (public.is_portfolio_admin()) with check (public.is_portfolio_admin());

create policy "Public can read media metadata" on public.media_assets
  for select to anon, authenticated using (true);
create policy "Admins can manage media metadata" on public.media_assets
  for all to authenticated using (public.is_portfolio_admin()) with check (public.is_portfolio_admin());

create policy "Public can read published projects" on public.projects
  for select to anon, authenticated using (status = 'published');
create policy "Admins can manage projects" on public.projects
  for all to authenticated using (public.is_portfolio_admin()) with check (public.is_portfolio_admin());

create policy "Public can read project media for published projects" on public.project_media
  for select to anon, authenticated using (
    exists (select 1 from public.projects p where p.id = project_id and p.status = 'published')
  );
create policy "Admins can manage project media" on public.project_media
  for all to authenticated using (public.is_portfolio_admin()) with check (public.is_portfolio_admin());

create policy "Public can read published case studies" on public.case_studies
  for select to anon, authenticated using (status = 'published');
create policy "Admins can manage case studies" on public.case_studies
  for all to authenticated using (public.is_portfolio_admin()) with check (public.is_portfolio_admin());

create policy "Public can read published skills" on public.skills
  for select to anon, authenticated using (status = 'published');
create policy "Admins can manage skills" on public.skills
  for all to authenticated using (public.is_portfolio_admin()) with check (public.is_portfolio_admin());

create policy "Public can read published experiences" on public.experiences
  for select to anon, authenticated using (status = 'published');
create policy "Admins can manage experiences" on public.experiences
  for all to authenticated using (public.is_portfolio_admin()) with check (public.is_portfolio_admin());

create policy "Public can read approved published testimonials" on public.testimonials
  for select to anon, authenticated using (status = 'published' and approved = true);
create policy "Admins can manage testimonials" on public.testimonials
  for all to authenticated using (public.is_portfolio_admin()) with check (public.is_portfolio_admin());

create trigger site_content_updated_at before update on public.site_content
  for each row execute function public.set_updated_at();
create trigger media_assets_updated_at before update on public.media_assets
  for each row execute function public.set_updated_at();
create trigger projects_updated_at before update on public.projects
  for each row execute function public.set_updated_at();
create trigger case_studies_updated_at before update on public.case_studies
  for each row execute function public.set_updated_at();
create trigger skills_updated_at before update on public.skills
  for each row execute function public.set_updated_at();
create trigger experiences_updated_at before update on public.experiences
  for each row execute function public.set_updated_at();
create trigger testimonials_updated_at before update on public.testimonials
  for each row execute function public.set_updated_at();

-- Create the private portfolio-media bucket in Supabase Storage.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('portfolio-media', 'portfolio-media', true, 10485760, array['image/jpeg','image/png','image/webp','image/avif','image/gif'])
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy "Public can view portfolio media" on storage.objects
  for select to anon, authenticated using (bucket_id = 'portfolio-media');
create policy "Admins can upload portfolio media" on storage.objects
  for insert to authenticated with check (bucket_id = 'portfolio-media' and public.is_portfolio_admin());
create policy "Admins can update portfolio media" on storage.objects
  for update to authenticated using (bucket_id = 'portfolio-media' and public.is_portfolio_admin())
  with check (bucket_id = 'portfolio-media' and public.is_portfolio_admin());
create policy "Admins can delete portfolio media" on storage.objects
  for delete to authenticated using (bucket_id = 'portfolio-media' and public.is_portfolio_admin());
