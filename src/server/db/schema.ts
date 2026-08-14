import { relations } from "drizzle-orm";
import {
  boolean,
  index,
  pgTable,
  pgTableCreator,
  text,
  timestamp,
  varchar,
  integer
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `pg-drizzle_${name}`);

// ---------------------------------------------------------
// FOSTIFEST CUSTOM TABLES
// ---------------------------------------------------------

export const teams = createTable(
  "team",
  (d) => ({
    id: d.varchar({ length: 128 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
    name: d.varchar({ length: 256 }).notNull(),
    teamCode: d.varchar({ length: 16 }).notNull().unique(), // Untuk join team
    category: d.varchar({ length: 64 }).notNull(), // 'software_dev' atau 'ui_ux'
    leaderId: d.text("leader_id").notNull(), // References user.id
    institution: d.varchar({ length: 256 }).notNull(),
    createdAt: d
      .timestamp({ withTimezone: true })
      .$defaultFn(() => new Date())
      .notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
  }),
  (t) => [
    index("team_leader_idx").on(t.leaderId),
    index("team_code_idx").on(t.teamCode),
  ],
);

export const payments = createTable(
  "payment",
  (d) => ({
    id: d.varchar({ length: 128 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
    teamId: d.varchar({ length: 128 }).notNull(), // References teams.id
    amount: d.integer().notNull(),
    proofUrl: d.varchar({ length: 512 }).notNull(),
    status: d.varchar({ length: 32 }).default("pending").notNull(), // pending, verified, rejected
    verifiedBy: d.text("verified_by"), // References user.id (admin)
    createdAt: d
      .timestamp({ withTimezone: true })
      .$defaultFn(() => new Date())
      .notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
  }),
  (t) => [
    index("payment_team_idx").on(t.teamId),
  ],
);

// ---------------------------------------------------------
// BETTER AUTH TABLES (WITH CUSTOM FIELDS)
// ---------------------------------------------------------

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified")
    .$defaultFn(() => false)
    .notNull(),
  image: text("image"),
  role: text("role").default("participant").notNull(), // 'admin' atau 'participant'
  
  // Custom Fields: Workshop
  isWorkshopParticipant: boolean("is_workshop_participant").default(false).notNull(),
  
  // Custom Fields: Lomba
  teamId: text("team_id"), // Menandakan dia anggota tim mana (null jika belum join)
  
  // Custom Fields: Syarat Kelengkapan
  ktmUrl: text("ktm_url"),
  twibbonUrl: text("twibbon_url"),
  igUrl: text("ig_url"),
  requirementsStatus: text("requirements_status").default("pending").notNull(), // pending, verified, rejected
  
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => new Date())
    .notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").$defaultFn(() => new Date()),
  updatedAt: timestamp("updated_at").$defaultFn(() => new Date()),
});

// ---------------------------------------------------------
// RELATIONS
// ---------------------------------------------------------

export const userRelations = relations(user, ({ many, one }) => ({
  account: many(account),
  session: many(session),
  team: one(teams, { fields: [user.teamId], references: [teams.id] }), // Tim yang dia ikuti
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, { fields: [account.userId], references: [user.id] }),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, { fields: [session.userId], references: [user.id] }),
}));

export const teamsRelations = relations(teams, ({ one, many }) => ({
  leader: one(user, { fields: [teams.leaderId], references: [user.id] }),
  members: many(user), // Relasi balik dari user.teamId
  payments: many(payments),
}));

export const paymentsRelations = relations(payments, ({ one }) => ({
  team: one(teams, { fields: [payments.teamId], references: [teams.id] }),
  verifier: one(user, { fields: [payments.verifiedBy], references: [user.id] }),
}));
