import { Clock, Coins, PlusCircle, XCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { getCurrencyInfo } from '../utils/currencyUtils';

interface TimeZoneData {
  country: string;
  timezone: string;
  flagCode: string;
  capital: string;
  shortCode: string;
  currency: string;
}

interface TimeZoneCardProps {
  country: string;
  timezone: string;
  flagCode: string;
  capital: string;
  shortCode: string;
  currency: string;
  index: number;
  span?: string;
  onAddToFavorites: (newFavorite: any) => void;
}

const TimeZoneCard: React.FC<TimeZoneCardProps & { onAddToFavorites: (data: TimeZoneData) => void; isFavorite: boolean; }> = ({ 
  country, 
  timezone, 
  flagCode,
  capital,
  shortCode,
  currency,
  index,
  span = "col-span-1",
  onAddToFavorites,
  isFavorite
}) => {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<string>("");
  const [offset, setOffset] = useState<string>("");

  useEffect(() => {
    const updateDateTime = () => {
      const date = new Date();
      
      // Format time with seconds for live updates
      const timeString = date.toLocaleTimeString("en-US", {
        timeZone: timezone,
        hour12: true,
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
      });

      // Update current date and day based on timezone
      const options = { 
        timeZone: timezone,
        year: "numeric" as const,
        month: "long" as const,
        day: "numeric" as const,
        weekday: "long" as const
      };
      const dateString = date.toLocaleDateString("en-US", options);
      setCurrentDate(dateString);

      setCurrentTime(timeString);

      // Get UTC offset
      const utcOffset = date.toLocaleString("en-US", {
        timeZone: timezone,
        timeZoneName: "shortOffset",
      }).split(" ").pop();
      setOffset(utcOffset || "");
    };

    const intervalId = setInterval(updateDateTime, 1000);
    return () => clearInterval(intervalId);
  }, [timezone]);

  const handleToggleFavorite = () => {
    onAddToFavorites({ country, timezone, flagCode, capital, shortCode, currency });
  };

  const { name, symbol } = getCurrencyInfo(currency);

  return (
    <div
      className={`${span} relative bg-card backdrop-blur-sm rounded-xl p-4 md:p-6 transition-all duration-300 hover:bg-card-hover transform hover:-translate-y-1 animate-slide-up border border-white/10 hover:border-white/20`}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Header with country info */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <img
            src={`https://flagcdn.com/48x36/${flagCode.toLowerCase()}.png`}
            alt={`${country} flag`}
            className="w-6 h-4 md:w-8 md:h-6 rounded shadow-sm"
            loading="lazy"
          />
          <h3 className="text-sm md:text-base font-semibold text-white/90 tracking-wide">
            {country}
          </h3>
        </div>
        <span className="text-xs md:text-sm bg-background/50 px-2.5 py-1 rounded-md text-white/80 font-medium">
          {shortCode}
        </span>
        <button 
          className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 p-1 rounded-full bg-white/10 hover:bg-white/20 transition duration-200"
          onClick={handleToggleFavorite}
        >
          {isFavorite ? (
            <XCircle className="w-5 h-5 text-white/80" />
          ) : (
            <PlusCircle className="w-5 h-5 text-white/80" />
          )}
        </button>
      </div>
      
      {/* Time display */}
      <div className="space-y-4">
        <div className="flex items-center justify-between bg-background/30 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-white/70" />
            <span className="text-base md:text-lg font-bold text-white tracking-wider font-mono">
              {currentTime}
            </span>
          </div>
          <span className="text-xs md:text-sm text-white/80 font-medium tracking-wide">
            {offset}
          </span>
        </div>

        {/* Date and location info */}
        <div className="space-y-2.5">
          <div className="text-sm text-white/80 font-medium tracking-wide">
            {currentDate}
          </div>
          
          <div className="flex justify-between items-center text-xs text-white/70">
            <span className="text-white/60">{timezone.replace(/_/g, " ")}</span>
            <span className="font-medium text-white/80">Capital: {capital}</span>
          </div>
        </div>

        {/* Currency Display */}
        <div className="flex items-center justify-between bg-background/30 rounded-lg p-3 mt-3">
          <div className="flex items-center gap-2">
            <Coins className="w-4 h-4 text-white/70" />
            <span className="text-sm font-medium text-white/80">{name}</span>
          </div>
          <span className="text-base font-bold text-white/90 font-mono">
            {symbol}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TimeZoneCard;