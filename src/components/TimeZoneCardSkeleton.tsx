const TimeZoneCardSkeleton = () => {
  return (
    <div className="bg-card rounded-xl p-4 md:p-6 animate-pulse border border-white/5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-4 md:w-8 md:h-6 bg-white/5 rounded" />
          <div className="h-4 md:h-5 bg-white/5 rounded w-24" />
        </div>
        <div className="h-4 md:h-5 bg-white/5 rounded w-12" />
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 md:w-4 md:h-4 bg-white/5 rounded-full" />
            <div className="h-5 md:h-6 bg-white/5 rounded w-20" />
          </div>
          <div className="h-4 md:h-5 bg-white/5 rounded w-12" />
        </div>
        
        <div className="space-y-1">
          <div className="h-3 md:h-4 bg-white/5 rounded w-32" />
          <div className="flex justify-between">
            <div className="h-3 md:h-4 bg-white/5 rounded w-16" />
            <div className="h-3 md:h-4 bg-white/5 rounded w-24" />
          </div>
        </div>
        
        <div className="flex items-center justify-between bg-white/5 rounded-lg p-3 mt-3">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-white/5 rounded" />
            <div className="h-4 bg-white/5 rounded w-24" />
          </div>
          <div className="h-4 bg-white/5 rounded w-8" />
        </div>
      </div>
    </div>
  );
};

export default TimeZoneCardSkeleton;