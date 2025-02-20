import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/venues", async (_req, res) => {
    const venues = await storage.getVenues();
    res.json(venues);
  });

  app.get("/api/venues/:id", async (req, res) => {
    const venue = await storage.getVenueById(parseInt(req.params.id, 10));
    if (!venue) {
      return res.status(404).json({ message: "Venue not found" });
    }
    res.json(venue);
  });

  const httpServer = createServer(app);
  return httpServer;
}
