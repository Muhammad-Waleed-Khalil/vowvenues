import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { VenueCard } from "@/components/VenueCard";
import { VenueFilters } from "@/components/VenueFilters";
import { type Venue } from "@shared/schema";
import { categorizeVenue } from "@/lib/venues";

export default function HomePage() {
  const [capacity, setCapacity] = useState([100, 3000]);
  const [priceRange, setPriceRange] = useState([200000, 1000000]);
  const [category, setCategory] = useState("all");

  const { data: venues, isLoading } = useQuery<Venue[]>({
    queryKey: ["/api/venues"],
  });

  const filteredVenues = venues?.filter((venue) => {
    const meetsCapacity =
      venue.capacity >= capacity[0] && venue.capacity <= capacity[1];
    const meetsPrice =
      Number(venue.price) >= priceRange[0] && Number(venue.price) <= priceRange[1];
    const meetsCategory =
      category === "all" || categorizeVenue(Number(venue.price)) === category;

    return meetsCapacity && meetsPrice && meetsCategory;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>Loading filters...</div>
            <div className="md:col-span-3">Loading venues...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Find Your Perfect Wedding Venue
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <VenueFilters
              capacity={capacity}
              onCapacityChange={setCapacity}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              category={category}
              onCategoryChange={setCategory}
            />
          </div>
          
          <div className="md:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVenues?.map((venue) => (
                <VenueCard key={venue.id} venue={venue} />
              ))}
            </div>
            
            {filteredVenues?.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">
                  No venues match your criteria
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
