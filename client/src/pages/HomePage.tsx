import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { VenueCard } from "@/components/VenueCard";
import { VenueFilters } from "@/components/VenueFilters";
import { type Venue } from "@shared/schema";
import { categorizeVenue } from "@/lib/venues";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function HomePage() {
  const [capacity, setCapacity] = useState([100, 3000]);
  const [priceRange, setPriceRange] = useState([200000, 1000000]);
  const [category, setCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

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
    const meetsSearch = searchQuery
      ? venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        venue.address.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    return meetsCapacity && meetsPrice && meetsCategory && meetsSearch;
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
    <div className="min-h-screen bg-background">
      {/* Hero Section with Search */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background py-12 border-b">
        <div className="max-w-7xl mx-auto px-8">
          <h1 className="text-4xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Find Your Perfect Wedding Venue
          </h1>
          <p className="text-lg text-center text-muted-foreground mb-8">
            Discover and book the most beautiful wedding venues in your area
          </p>
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search venues by name or location..."
              className="pl-10 h-12"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:sticky md:top-4 h-fit">
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