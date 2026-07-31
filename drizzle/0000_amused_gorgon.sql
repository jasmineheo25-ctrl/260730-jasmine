CREATE TABLE "senior_applications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"name" text NOT NULL,
	"phone" text NOT NULL,
	"email" text NOT NULL,
	"address_dong" text NOT NULL,
	"age_group" text NOT NULL,
	"career_length" text NOT NULL,
	"job_type" text NOT NULL,
	"preferred_services" text[] DEFAULT '{}'::text[] NOT NULL
);
--> statement-breakpoint
CREATE TABLE "working_mom_requests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"name" text NOT NULL,
	"phone" text NOT NULL,
	"email" text NOT NULL,
	"child_age" text NOT NULL,
	"service_type" text NOT NULL,
	"date" date NOT NULL,
	"duration" text,
	"time_range" text NOT NULL,
	"care_scope" text[] DEFAULT '{}'::text[] NOT NULL,
	"special_requests" text,
	"inquiry" text
);
