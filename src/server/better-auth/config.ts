import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { env } from "~/env";
import { db } from "~/server/db";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // or "pg" or "mysql"
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: env.BETTER_AUTH_GITHUB_CLIENT_ID,
      clientSecret: env.BETTER_AUTH_GITHUB_CLIENT_SECRET,
      redirectURI: "http://localhost:3000/api/auth/callback/github",
    },
  },
  user: {
    additionalFields: {
      role: { type: "string" },
      isWorkshopParticipant: { type: "boolean" },
      teamId: { type: "string", required: false },
      ktmUrl: { type: "string", required: false },
      twibbonUrl: { type: "string", required: false },
      igUrl: { type: "string", required: false },
      requirementsStatus: { type: "string" },
    },
  },
});

export type Session = typeof auth.$Infer.Session;
