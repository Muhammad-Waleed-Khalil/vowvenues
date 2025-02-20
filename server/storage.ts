import { users, venues, type User, type InsertUser, type Venue, type InsertVenue } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { pool } from "./db";

const PostgresSessionStore = connectPg(session);

export interface IStorage {
  getVenues(): Promise<Venue[]>;
  getVenueById(id: number): Promise<Venue | undefined>;
  getVenuesByOwnerId(ownerId: number): Promise<Venue[]>;
  createVenue(insertVenue: InsertVenue & { ownerId: number }): Promise<Venue>;
  updateVenue(id: number, venue: Partial<InsertVenue>): Promise<Venue>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(insertUser: InsertUser): Promise<User>;
  getUser(id: number): Promise<User | undefined>;
  sessionStore: session.Store;
}

export class DatabaseStorage implements IStorage {
  sessionStore: session.Store;

  constructor() {
    this.sessionStore = new PostgresSessionStore({
      pool,
      createTableIfMissing: true,
    });
  }

  async getVenues(): Promise<Venue[]> {
    return await db.select().from(venues);
  }

  async getVenueById(id: number): Promise<Venue | undefined> {
    const [venue] = await db.select().from(venues).where(eq(venues.id, id));
    return venue;
  }

  async getVenuesByOwnerId(ownerId: number): Promise<Venue[]> {
    return await db.select().from(venues).where(eq(venues.ownerId, ownerId));
  }

  async createVenue(insertVenue: InsertVenue & { ownerId: number }): Promise<Venue> {
    const [venue] = await db.insert(venues).values(insertVenue).returning();
    return venue;
  }

  async updateVenue(id: number, venue: Partial<InsertVenue>): Promise<Venue> {
    const [updatedVenue] = await db
      .update(venues)
      .set(venue)
      .where(eq(venues.id, id))
      .returning();
    return updatedVenue;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }
}

export const storage = new DatabaseStorage();