import { type Venue } from "@shared/schema";

export const categorizeVenue = (price: number): "High" | "Middle" | "Lower" => {
  if (price >= 750000) return "High";
  if (price >= 500000) return "Middle";
  return "Lower";
};

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(price);
};

export const getImageUrl = (id: number) => {
  return `https://source.unsplash.com/800x600/?wedding,venue,hall&sig=${id}`;
};
