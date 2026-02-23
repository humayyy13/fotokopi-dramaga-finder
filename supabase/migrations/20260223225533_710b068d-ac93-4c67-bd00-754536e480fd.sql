
CREATE TABLE public.shops (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  lat DOUBLE PRECISION NOT NULL DEFAULT -6.5518,
  lng DOUBLE PRECISION NOT NULL DEFAULT 106.722,
  rating DOUBLE PRECISION NOT NULL DEFAULT 4.0,
  hours TEXT NOT NULL DEFAULT '',
  open_time TEXT NOT NULL DEFAULT '08:00',
  close_time TEXT NOT NULL DEFAULT '21:00',
  print_warna BOOLEAN NOT NULL DEFAULT false,
  jilid BOOLEAN NOT NULL DEFAULT false,
  laminating BOOLEAN NOT NULL DEFAULT false,
  fotokopi BOOLEAN NOT NULL DEFAULT true,
  image TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Public read access for everyone
ALTER TABLE public.shops ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read shops" ON public.shops FOR SELECT USING (true);
CREATE POLICY "Anyone can insert shops" ON public.shops FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update shops" ON public.shops FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete shops" ON public.shops FOR DELETE USING (true);
