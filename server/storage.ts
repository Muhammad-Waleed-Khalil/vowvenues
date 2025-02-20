import { venues, type Venue, type InsertVenue } from "@shared/schema";

export interface IStorage {
  getVenues(): Promise<Venue[]>;
  getVenueById(id: number): Promise<Venue | undefined>;
}

export class MemStorage implements IStorage {
  private venues: Map<number, Venue>;
  currentId: number;

  constructor() {
    this.venues = new Map();
    this.currentId = 1;
    this.initializeVenues();
  }

  private async initializeVenues() {
    const fs = await import('fs');
    const path = await import('path');
    const filePath = path.resolve(process.cwd(), 'attached_assets/halls.txt');
    
    try {
      const data = await fs.promises.readFile(filePath, 'utf8');
      const lines = data.split('\n').filter(line => line.trim());
      
      lines.forEach(line => {
        const [name, capacity, additionalMetric, phone, address, price, email] = line.split('\t');
        if (name) {
          const venue: Venue = {
            id: this.currentId++,
            name: name.trim(),
            capacity: parseInt(capacity, 10),
            additionalMetric: parseInt(additionalMetric, 10),
            phone: phone.trim(),
            address: address.trim(),
            price: parseFloat(price.replace(/,/g, '')),
            email: email?.trim() || null
          };
          this.venues.set(venue.id, venue);
        }
      });
    } catch (error) {
      console.error('Error loading venues:', error);
    }
  }

  async getVenues(): Promise<Venue[]> {
    return Array.from(this.venues.values());
  }

  async getVenueById(id: number): Promise<Venue | undefined> {
    return this.venues.get(id);
  }
}

export const storage = new MemStorage();
