import { pgTable, text, serial, integer, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const venues = pgTable("venues", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  capacity: integer("capacity").notNull(),
  additionalMetric: integer("additional_metric"),
  phone: text("phone").notNull(),
  address: text("address").notNull(),
  price: decimal("price").notNull(),
  email: text("email"),
});

export const insertVenueSchema = createInsertSchema(venues).pick({
  name: true,
  capacity: true,
  additionalMetric: true,
  phone: true,
  address: true,
  price: true,
  email: true,
});

export type InsertVenue = z.infer<typeof insertVenueSchema>;
export type Venue = typeof venues.$inferSelect;
