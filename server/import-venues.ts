import fs from 'fs';
import path from 'path';
import { db } from './db';
import { venues } from '@shared/schema';

export async function importVenues() {
  try {
    // Check if venues already exist
    const existingVenues = await db.select().from(venues);
    if (existingVenues.length > 0) {
      console.log('Venues already imported, skipping...');
      return;
    }

    const filePath = path.resolve(process.cwd(), 'attached_assets/halls.txt');
    const data = await fs.promises.readFile(filePath, 'utf8');
    const lines = data.split('\n').filter(line => line.trim());

    for (const line of lines) {
      const [name, capacity, additionalMetric, phone, address, price, email] = line.split('\t');
      if (name) {
        await db.insert(venues).values({
          name: name.trim(),
          capacity: parseInt(capacity, 10),
          additionalMetric: parseInt(additionalMetric, 10),
          phone: phone.trim(),
          address: address.trim(),
          price: price.replace(/,/g, ''),
          email: email?.trim() || null,
        });
      }
    }
    console.log('Successfully imported venues from halls.txt');
  } catch (error) {
    console.error('Error importing venues:', error);
  }
}
