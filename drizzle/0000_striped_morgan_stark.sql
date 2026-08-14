CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pg-drizzle_payment" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"teamId" varchar(128) NOT NULL,
	"amount" integer NOT NULL,
	"proofUrl" varchar(512) NOT NULL,
	"status" varchar(32) DEFAULT 'pending' NOT NULL,
	"verified_by" text,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "pg-drizzle_team" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"teamCode" varchar(16) NOT NULL,
	"category" varchar(64) NOT NULL,
	"leader_id" text NOT NULL,
	"institution" varchar(256) NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone,
	CONSTRAINT "pg-drizzle_team_teamCode_unique" UNIQUE("teamCode")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean NOT NULL,
	"image" text,
	"role" text DEFAULT 'participant' NOT NULL,
	"is_workshop_participant" boolean DEFAULT false NOT NULL,
	"team_id" text,
	"ktm_url" text,
	"twibbon_url" text,
	"ig_url" text,
	"requirements_status" text DEFAULT 'pending' NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "payment_team_idx" ON "pg-drizzle_payment" USING btree ("teamId");--> statement-breakpoint
CREATE INDEX "team_leader_idx" ON "pg-drizzle_team" USING btree ("leader_id");--> statement-breakpoint
CREATE INDEX "team_code_idx" ON "pg-drizzle_team" USING btree ("teamCode");