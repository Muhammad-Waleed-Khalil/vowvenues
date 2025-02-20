import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type Venue } from "@shared/schema";
import { categorizeVenue, formatPrice, getImageUrl } from "@/lib/venues";
import { Link } from "wouter";

interface VenueCardProps {
  venue: Venue;
}

export function VenueCard({ venue }: VenueCardProps) {
  const category = categorizeVenue(Number(venue.price));
  
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <img 
        src={getImageUrl(venue.id)} 
        alt={venue.name}
        className="w-full h-48 object-cover"
      />
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{venue.name}</h3>
          <Badge variant={category === "High" ? "destructive" : category === "Middle" ? "default" : "secondary"}>
            {category}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mb-2">{venue.address}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm">Capacity: {venue.capacity} guests</span>
          <span className="font-semibold">{formatPrice(Number(venue.price))}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link href={`/venue/${venue.id}`} className="w-full">
          <button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md">
            View Details
          </button>
        </Link>
      </CardFooter>
    </Card>
  );
}
