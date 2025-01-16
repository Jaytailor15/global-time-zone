import React from 'react';
import { TimeZoneData } from '../types/timezone';
import TimeZoneCard from './TimeZoneCard';

interface FavoritesSectionProps {
  favorites: TimeZoneData[];
  onAddToFavorites: (data: TimeZoneData) => void;
}

const FavoritesSection: React.FC<FavoritesSectionProps> = ({
  favorites,
  onAddToFavorites,
}) => {
  if (favorites.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 text-white/80">Favorites</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {favorites.map((data, index) => (
          <TimeZoneCard
            key={`favorite-${data.timezone}`}
            {...data}
            index={index}
            onAddToFavorites={onAddToFavorites}
            isFavorite={true}
          />
        ))}
      </div>
    </div>
  );
};

export default FavoritesSection; 