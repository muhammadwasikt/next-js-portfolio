# Portfolio CMS setup (initial foundation)

## Architecture
The CMS uses Supabase Postgres, Supabase Auth and Supabase Storage. Content tables are designed for projects, case studies, skills, experiences, testimonials, media assets and editable site content. Published records are public-read; draft records are not public-readable. Admin writes are guarded by the `admin_users` allow-list and RLS.

## Apply the schema
1. Create/open the Supabase project.
2. Open SQL Editor.
3. Run `supabase/migrations/202610230001_portfolio_cms.sql`.
4. In Supabase Authentication, create the admin user using an email you control.
5. Copy that user's UUID from Authentication > Users.
6. Run the following SQL with your real UUID:

```sql
insert into public.admin_users (user_id)
values ('YOUR_AUTH_USER_UUID')
on conflict (user_id) do nothing;
```

Do not add an unauthenticated public sign-up route to the portfolio admin.

## Environment variables
Copy `.env.example` to `.env.local` for local development and enter the project URL and anon/publishable key. Keep the service-role key server-only; it bypasses RLS and must never be shipped to the browser or committed.

## Current milestone
This commit establishes the database schema and access policies only. It does not yet connect the existing UI to the database or create the admin screens. Those will be implemented in follow-up commits on the feature branch and verified before merge.
