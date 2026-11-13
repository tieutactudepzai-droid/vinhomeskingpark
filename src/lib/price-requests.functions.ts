import { createServerFn } from "@tanstack/react-start";

import { leadSchema } from "./lead-schema";

// Public endpoint: validates input, then stores one row per request.
// Visitors can never read submissions back (no RLS policies for anon/authenticated).
export const submitPriceRequest = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => leadSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("price_requests").insert({
      full_name: data.fullName,
      phone: data.phone,
      product_type: data.productType,
      note: data.note ? data.note : null,
      source: data.source ?? null,
    });
    if (error) {
      console.error("price_requests insert failed", error.message);
      return { ok: false as const };
    }
    return { ok: true as const };
  });
