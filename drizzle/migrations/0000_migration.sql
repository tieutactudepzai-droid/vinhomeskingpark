CREATE TABLE public.price_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  phone text NOT NULL,
  product_type text NOT NULL,
  note text,
  source text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT ALL ON public.price_requests TO service_role;

ALTER TABLE public.price_requests ENABLE ROW LEVEL SECURITY;
-- No policies for anon/authenticated: visitors cannot read, update or delete submissions.
-- Inserts happen only from server code with server-side credentials.