ALTER TABLE public.shops ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS shops_user_id_idx ON public.shops(user_id);