-- Create bucket for shop images
insert into storage.buckets (id, name, public)
values ('shop-images', 'shop-images', true)
on conflict (id) do nothing;

-- Set up access policies for storage
drop policy if exists "Public Access" on storage.objects;
create policy "Public Access"
on storage.objects for select
using ( bucket_id = 'shop-images' );

drop policy if exists "Authenticated upload access" on storage.objects;
create policy "Authenticated upload access"
on storage.objects for insert
to authenticated
with check ( bucket_id = 'shop-images' );

drop policy if exists "Authenticated update access" on storage.objects;
create policy "Authenticated update access"
on storage.objects for update
to authenticated
using ( bucket_id = 'shop-images' );

drop policy if exists "Authenticated delete access" on storage.objects;
create policy "Authenticated delete access"
on storage.objects for delete
to authenticated
using ( bucket_id = 'shop-images' );
