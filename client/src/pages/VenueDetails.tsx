import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { type Venue } from "@shared/schema";
import { BookingForm } from "@/components/BookingForm";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { categorizeVenue, formatPrice, getImageUrl } from "@/lib/venues";
import { Phone, Mail, MapPin, Users } from "lucide-react";

export default function VenueDetails() {
  const { id } = useParams<{ id: string }>();
  
  const { data: venue, isLoading } = useQuery<Venue>({
    queryKey: [`/api/venues/${id}`],
  });

  if (isLoading || !venue) {
    return <div>Loading...</div>;
  }

  const category = categorizeVenue(Number(venue.price));

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <img
              src={getImageUrl(venue.id)}
              alt={venue.name}
              className="w-full h-[400px] object-cover rounded-lg"
            />
            
            <Card className="mt-8">
              <CardContent className="p-6">
                <h1 className="text-3xl font-bold mb-2">{venue.name}</h1>
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant={category === "High" ? "destructive" : category === "Middle" ? "default" : "secondary"}>
                    {category} Class
                  </Badge>
                  <span className="text-xl font-semibold">
                    {formatPrice(Number(venue.price))}
                  </span>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <span>Capacity: {venue.capacity} guests</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <span>{venue.phone}</span>
                  </div>
                  
                  {venue.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                      <span>{venue.email}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <span>{venue.address}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-6">Book This Venue</h2>
                <BookingForm venue={venue} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
