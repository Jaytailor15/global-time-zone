import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import GitHubIcon from "../components/GitHubIcon";
import TimeZoneCard from "../components/TimeZoneCard";
import TimeZoneCardSkeleton from "../components/TimeZoneCardSkeleton";
import Watermark from "../components/Watermark";

interface TimeZoneData {
  country: string;
  timezone: string;
  flagCode: string;
  capital: string;
  shortCode: string;
  span?: string;
}

const ALL_TIMEZONES: TimeZoneData[] = [
  { country: "United States", timezone: "America/New_York", flagCode: "US", capital: "Washington, D.C.", shortCode: "USA" },
  { country: "United Kingdom", timezone: "Europe/London", flagCode: "GB", capital: "London", shortCode: "GBR" },
  { country: "Japan", timezone: "Asia/Tokyo", flagCode: "JP", capital: "Tokyo", shortCode: "JPN" },
  { country: "Australia", timezone: "Australia/Sydney", flagCode: "AU", capital: "Canberra", shortCode: "AUS" },
  { country: "Germany", timezone: "Europe/Berlin", flagCode: "DE", capital: "Berlin", shortCode: "DEU" },
  { country: "France", timezone: "Europe/Paris", flagCode: "FR", capital: "Paris", shortCode: "FRA" },
  { country: "Canada", timezone: "America/Toronto", flagCode: "CA", capital: "Ottawa", shortCode: "CAN" },
  { country: "China", timezone: "Asia/Shanghai", flagCode: "CN", capital: "Beijing", shortCode: "CHN" },
  { country: "India", timezone: "Asia/Kolkata", flagCode: "IN", capital: "New Delhi", shortCode: "IND" },
  { country: "Brazil", timezone: "America/Sao_Paulo", flagCode: "BR", capital: "Brasília", shortCode: "BRA" },
  { country: "Russia", timezone: "Europe/Moscow", flagCode: "RU", capital: "Moscow", shortCode: "RUS" },
  { country: "Singapore", timezone: "Asia/Singapore", flagCode: "SG", capital: "Singapore", shortCode: "SGP" },
  { country: "South Korea", timezone: "Asia/Seoul", flagCode: "KR", capital: "Seoul", shortCode: "KOR" },
  { country: "United Arab Emirates", timezone: "Asia/Dubai", flagCode: "AE", capital: "Abu Dhabi", shortCode: "ARE" },
  { country: "South Africa", timezone: "Africa/Johannesburg", flagCode: "ZA", capital: "Pretoria", shortCode: "ZAF" },
  { country: "Mexico", timezone: "America/Mexico_City", flagCode: "MX", capital: "Mexico City", shortCode: "MEX" },
  { country: "Spain", timezone: "Europe/Madrid", flagCode: "ES", capital: "Madrid", shortCode: "ESP" },
  { country: "Italy", timezone: "Europe/Rome", flagCode: "IT", capital: "Rome", shortCode: "ITA" },
  { country: "Netherlands", timezone: "Europe/Amsterdam", flagCode: "NL", capital: "Amsterdam", shortCode: "NLD" },
  { country: "Sweden", timezone: "Europe/Stockholm", flagCode: "SE", capital: "Stockholm", shortCode: "SWE" },
  { country: "Switzerland", timezone: "Europe/Zurich", flagCode: "CH", capital: "Bern", shortCode: "CHE" },
  { country: "Norway", timezone: "Europe/Oslo", flagCode: "NO", capital: "Oslo", shortCode: "NOR" },
  { country: "Denmark", timezone: "Europe/Copenhagen", flagCode: "DK", capital: "Copenhagen", shortCode: "DNK" },
  { country: "Finland", timezone: "Europe/Helsinki", flagCode: "FI", capital: "Helsinki", shortCode: "FIN" },
  { country: "Poland", timezone: "Europe/Warsaw", flagCode: "PL", capital: "Warsaw", shortCode: "POL" },
  { country: "Turkey", timezone: "Europe/Istanbul", flagCode: "TR", capital: "Ankara", shortCode: "TUR" },
  { country: "Israel", timezone: "Asia/Jerusalem", flagCode: "IL", capital: "Jerusalem", shortCode: "ISR" },
  { country: "Saudi Arabia", timezone: "Asia/Riyadh", flagCode: "SA", capital: "Riyadh", shortCode: "SAU" },
  { country: "Qatar", timezone: "Asia/Qatar", flagCode: "QA", capital: "Doha", shortCode: "QAT" },
  { country: "Thailand", timezone: "Asia/Bangkok", flagCode: "TH", capital: "Bangkok", shortCode: "THA" },
  { country: "Vietnam", timezone: "Asia/Ho_Chi_Minh", flagCode: "VN", capital: "Hanoi", shortCode: "VNM" },
  { country: "Indonesia", timezone: "Asia/Jakarta", flagCode: "ID", capital: "Jakarta", shortCode: "IDN" },
  { country: "Malaysia", timezone: "Asia/Kuala_Lumpur", flagCode: "MY", capital: "Kuala Lumpur", shortCode: "MYS" },
  { country: "Philippines", timezone: "Asia/Manila", flagCode: "PH", capital: "Manila", shortCode: "PHL" },
  { country: "New Zealand", timezone: "Pacific/Auckland", flagCode: "NZ", capital: "Wellington", shortCode: "NZL" },
  { country: "Argentina", timezone: "America/Argentina/Buenos_Aires", flagCode: "AR", capital: "Buenos Aires", shortCode: "ARG" },
  { country: "Chile", timezone: "America/Santiago", flagCode: "CL", capital: "Santiago", shortCode: "CHL" },
  { country: "Colombia", timezone: "America/Bogota", flagCode: "CO", capital: "Bogotá", shortCode: "COL" },
  { country: "Peru", timezone: "America/Lima", flagCode: "PE", capital: "Lima", shortCode: "PER" },
  { country: "Venezuela", timezone: "America/Caracas", flagCode: "VE", capital: "Caracas", shortCode: "VEN" },
  { country: "Egypt", timezone: "Africa/Cairo", flagCode: "EG", capital: "Cairo", shortCode: "EGY" },
  { country: "Nigeria", timezone: "Africa/Lagos", flagCode: "NG", capital: "Abuja", shortCode: "NGA" },
  { country: "Kenya", timezone: "Africa/Nairobi", flagCode: "KE", capital: "Nairobi", shortCode: "KEN" },
  { country: "Morocco", timezone: "Africa/Casablanca", flagCode: "MA", capital: "Rabat", shortCode: "MAR" },
  { country: "Greece", timezone: "Europe/Athens", flagCode: "GR", capital: "Athens", shortCode: "GRC" },
  { country: "Portugal", timezone: "Europe/Lisbon", flagCode: "PT", capital: "Lisbon", shortCode: "PRT" },
  { country: "Ireland", timezone: "Europe/Dublin", flagCode: "IE", capital: "Dublin", shortCode: "IRL" },
  { country: "Austria", timezone: "Europe/Vienna", flagCode: "AT", capital: "Vienna", shortCode: "AUT" },
  { country: "Belgium", timezone: "Europe/Brussels", flagCode: "BE", capital: "Brussels", shortCode: "BEL" },
  { country: "Czech Republic", timezone: "Europe/Prague", flagCode: "CZ", capital: "Prague", shortCode: "CZE" },
  { country: "Zimbabwe", timezone: "Africa/Harare", flagCode: "ZW", capital: "Harare", shortCode: "ZWE" }
];

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTimezones, setFilteredTimezones] = useState(ALL_TIMEZONES);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const filtered = ALL_TIMEZONES.filter(tz =>
      tz.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tz.timezone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tz.capital.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tz.shortCode.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTimezones(filtered);
  }, [searchQuery]);

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
        
        <div className="relative mb-6">
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
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {loading
            ? Array(20)
                .fill(null)
                .map((_, index) => <TimeZoneCardSkeleton key={index} />)
            : filteredTimezones.map((data, index) => (
                <TimeZoneCard
                  key={`${data.country}-${index}`}
                  {...data}
                  index={index}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default Index;