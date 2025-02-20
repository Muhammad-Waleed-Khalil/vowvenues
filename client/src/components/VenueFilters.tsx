import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FiltersProps {
  capacity: number[];
  onCapacityChange: (value: number[]) => void;
  priceRange: number[];
  onPriceRangeChange: (value: number[]) => void;
  category: string;
  onCategoryChange: (value: string) => void;
}

export function VenueFilters({
  capacity,
  onCapacityChange,
  priceRange,
  onPriceRangeChange,
  category,
  onCategoryChange,
}: FiltersProps) {
  return (
    <div className="space-y-6 p-4 bg-card rounded-lg">
      <div className="space-y-2">
        <Label>Guest Capacity</Label>
        <Slider
          min={100}
          max={3000}
          step={100}
          value={capacity}
          onValueChange={onCapacityChange}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{capacity[0]} guests</span>
          <span>{capacity[1]} guests</span>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Price Range</Label>
        <Slider
          min={200000}
          max={1000000}
          step={50000}
          value={priceRange}
          onValueChange={onPriceRangeChange}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>PKR {priceRange[0].toLocaleString()}</span>
          <span>PKR {priceRange[1].toLocaleString()}</span>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Category</Label>
        <Select value={category} onValueChange={onCategoryChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="High">High Class</SelectItem>
            <SelectItem value="Middle">Middle Class</SelectItem>
            <SelectItem value="Lower">Lower Class</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
