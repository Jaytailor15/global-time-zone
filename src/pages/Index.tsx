import { Search } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import AlphabetFilter from "../components/AlphabetFilter";
import FavoritesSection from "../components/FavoritesSection";
import GitHubIcon from "../components/GitHubIcon";
import TimeZoneCard from "../components/TimeZoneCard";
import TimeZoneCardSkeleton from "../components/TimeZoneCardSkeleton";
import Watermark from "../components/Watermark";
import { ALL_TIMEZONES } from "../data/timezones";
import { TimeZoneData } from "../types/timezone";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTimezones, setFilteredTimezones] = useState(ALL_TIMEZONES);
  const [favorites, setFavorites] = useState<TimeZoneData[]>(() => {
    const savedFavorites = localStorage.getItem('timezone-favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem('timezone-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const filterTimezones = useCallback((query: string, letter: string | null) => {
    let filtered = ALL_TIMEZONES;

    // Apply search query filter
    if (query) {
      filtered = filtered.filter(tz =>
        tz.country.toLowerCase().includes(query.toLowerCase()) ||
        tz.timezone.toLowerCase().includes(query.toLowerCase()) ||
        tz.capital.toLowerCase().includes(query.toLowerCase()) ||
        tz.shortCode.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Apply alphabet filter
    if (letter) {
      filtered = filtered.filter(tz =>
        tz.country.startsWith(letter)
      );
    }

    return filtered;
  }, []);

  useEffect(() => {
    setFilteredTimezones(filterTimezones(searchQuery, selectedLetter));
  }, [searchQuery, selectedLetter, filterTimezones]);

  const handleAddToFavorites = useCallback((data: TimeZoneData) => {
    setFavorites(prev => {
      const exists = prev.some(f => f.timezone === data.timezone);
      if (exists) {
        return prev.filter(f => f.timezone !== data.timezone);
      }
      return [...prev, data];
    });
  }, []);

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 md:p-8">
      <GitHubIcon />
      <Watermark />

      <div className="max-w-[1800px] mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center text-white/90">
          Global Time Zones
        </h1>
        <p className="text-center text-white/50 mb-4">
          A simple way to explore the current time in different regions of the world.
        </p>
        
        <FavoritesSection 
          favorites={favorites}
          onAddToFavorites={handleAddToFavorites}
        />

        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search countries, capitals, timezones..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 bg-card border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/20"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
          </div>

          <AlphabetFilter
            selectedLetter={selectedLetter}
            onLetterSelect={setSelectedLetter}
          />
        </div>
        
        <div className="text-sm text-white/50 mb-4">
          Showing {filteredTimezones.length} {filteredTimezones.length === 1 ? 'result' : 'results'}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {loading
            ? Array(20).fill(null).map((_, index) => (
                <TimeZoneCardSkeleton key={index} />
              ))
            : filteredTimezones.map((data, index) => (
                <TimeZoneCard
                  key={`${data.country}-${index}`}
                  {...data}
                  index={index}
                  onAddToFavorites={handleAddToFavorites}
                  isFavorite={favorites.some(f => f.timezone === data.timezone)}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default Index;