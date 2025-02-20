import { pgTable, text, serial, integer, decimal, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const venues = pgTable("venues", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  capacity: integer("capacity").notNull(),
  additionalMetric: integer("additional_metric"),
  phone: text("phone").notNull(),
  address: text("address").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  email: text("email"),
  ownerId: integer("owner_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// User schemas
export const insertUserSchema = createInsertSchema(users)
  .omit({ id: true, createdAt: true });

export const loginUserSchema = insertUserSchema.pick({
  username: true,
  password: true,
});

// Venue schemas
export const insertVenueSchema = createInsertSchema(venues)
  .omit({ id: true, createdAt: true, ownerId: true });

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type LoginUser = z.infer<typeof loginUserSchema>;
export type InsertVenue = z.infer<typeof insertVenueSchema>;
export type User = typeof users.$inferSelect;
export type Venue = typeof venues.$inferSelect;