'use client';

import { useState } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const TRENDING_SEARCHES = ['Inception', 'The Matrix', 'Interstellar', 'Dune', 'Blade Runner'];

const generateMovies = (seed: string, count: number = 12) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `${seed}-${i}`,
    title: `Movie Title ${i + 1}`,
    image: `https://picsum.photos/seed/${seed}${i}/400/600`,
    match: Math.floor(Math.random() * 20) + 80,
    rating: ['TV-MA', 'R', 'PG-13', 'TV-14'][Math.floor(Math.random() * 4)],
  }));
};

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const results = query.length > 2 ? generateMovies(query) : [];

  return (
    <div className="min-h-screen pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Search Bar */}
      <div className="relative max-w-3xl mx-auto mb-16">
        <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
          <SearchIcon className="h-6 w-6 text-text-secondary" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies, series, genres..."
          className="block w-full pl-16 pr-12 py-6 bg-surface border border-white/10 rounded-full text-xl text-white placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all"
          autoFocus
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute inset-y-0 right-0 pr-6 flex items-center text-text-secondary hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        )}
      </div>

      {/* Content Area */}
      {query.length === 0 ? (
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-display font-semibold text-white mb-6">Trending Searches</h2>
          <div className="flex flex-wrap gap-3">
            {TRENDING_SEARCHES.map((term) => (
              <button
                key={term}
                onClick={() => setQuery(term)}
                className="px-6 py-3 bg-surface hover:bg-surface-hover border border-white/5 rounded-full text-sm font-medium text-text-secondary hover:text-white transition-colors flex items-center gap-2"
              >
                <SearchIcon className="w-4 h-4" />
                {term}
              </button>
            ))}
          </div>
        </div>
      ) : results.length > 0 ? (
        <div>
          <h2 className="text-xl font-display font-semibold text-white mb-8">
            Results for &quot;{query}&quot;
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {results.map((movie) => (
              <Link 
                key={movie.id} 
                href={`/movie/${movie.id}`}
                className="relative aspect-[2/3] rounded-lg overflow-hidden group/card transition-transform duration-300 hover:scale-105 hover:z-30"
              >
                <Image
                  src={movie.image}
                  alt={movie.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover/card:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <h3 className="text-white font-semibold text-sm md:text-base line-clamp-1 mb-1">{movie.title}</h3>
                  <div className="flex items-center gap-2 text-xs font-medium">
                    {movie.match && <span className="text-green-500">{movie.match}% Match</span>}
                    {movie.rating && <span className="border border-white/40 px-1 rounded text-white/80">{movie.rating}</span>}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-20">
          <SearchIcon className="w-16 h-16 text-text-secondary/50 mx-auto mb-6" />
          <h2 className="text-2xl font-display font-semibold text-white mb-2">No results found</h2>
          <p className="text-text-secondary">We couldn&apos;t find anything matching &quot;{query}&quot;. Try another search term.</p>
        </div>
      )}
    </div>
  );
}
