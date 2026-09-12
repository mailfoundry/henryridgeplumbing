import Stripe from "stripe";

// Lazy init — same pattern as Resend — prevents build-time failure when
// STRIPE_SECRET_KEY is not set in the build environment.
function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
  return new Stripe(key, { apiVersion: "2024-12-18.acacia" });
}

export { getStripe };
