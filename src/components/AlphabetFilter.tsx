import React from 'react';
import '../styles/globals.css';

interface AlphabetFilterProps {
  selectedLetter: string | null;
  onLetterSelect: (letter: string | null) => void;
}

const AlphabetFilter: React.FC<AlphabetFilterProps> = ({
  selectedLetter,
  onLetterSelect,
}) => {
  // Generate alphabet array A-Z
  const alphabet = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ');

  return (
    <div className="w-full mb-6 overflow-x-auto scrollbar-thin">
      <div className="flex flex-nowrap md:flex-wrap gap-1 md:gap-1.5 min-w-max mx-auto justify-start md:justify-center p-2">
        {/* All button */}
        <button
          onClick={() => onLetterSelect(null)}
          className={`
            px-2.5 py-1.5 rounded-md text-sm font-medium transition-all duration-200
            ${!selectedLetter
              ? 'bg-background-secondary text-white border border-white/20'
              : 'bg-card hover:bg-card-hover text-white/70 hover:text-white'}
          `}
        >
          All
        </button>

        {/* Alphabet buttons */}
        {alphabet.map((letter) => (
          <button
            key={letter}
            onClick={() => onLetterSelect(letter)}
            className={`
              min-w-[36px] px-2.5 py-1.5 rounded-md text-sm font-medium transition-all duration-200
              ${selectedLetter === letter
                ? 'bg-background-secondary text-white border border-white/20'
                : 'bg-card hover:bg-card-hover text-white/70 hover:text-white'}
            `}
          >
            {letter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AlphabetFilter; 