import { sql } from "drizzle-orm";
import { date, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const workingMomRequests = pgTable("working_mom_requests", {
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  childAge: text("child_age").notNull(),
  serviceType: text("service_type").notNull(),
  date: date("date").notNull(),
  duration: text("duration"),
  timeRange: text("time_range").notNull(),
  careScope: text("care_scope")
    .array()
    .notNull()
    .default(sql`'{}'::text[]`),
  specialRequests: text("special_requests"),
  inquiry: text("inquiry"),
}).enableRLS();

export const seniorApplications = pgTable("senior_applications", {
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  addressDong: text("address_dong").notNull(),
  ageGroup: text("age_group").notNull(),
  careerLength: text("career_length").notNull(),
  jobType: text("job_type").notNull(),
  preferredServices: text("preferred_services")
    .array()
    .notNull()
    .default(sql`'{}'::text[]`),
}).enableRLS();
