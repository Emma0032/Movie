'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const GENRES = ['All', 'Action', 'Comedy', 'Drama', 'Sci-Fi', 'Horror', 'Romance', 'Documentary'];
const SORT_OPTIONS = ['Popularity', 'Newest', 'Rating', 'A-Z'];

// Mock data generator
const generateMovies = (seed: string, count: number = 24) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `${seed}-${i}`,
    title: `Movie Title ${i + 1}`,
    image: `https://picsum.photos/seed/${seed}${i}/400/600`,
    match: Math.floor(Math.random() * 20) + 80,
    rating: ['TV-MA', 'R', 'PG-13', 'TV-14'][Math.floor(Math.random() * 4)],
  }));
};

export default function BrowsePage() {
  const [activeGenre, setActiveGenre] = useState('All');
  const [activeSort, setActiveSort] = useState('Popularity');
  const movies = generateMovies(activeGenre.toLowerCase());

  return (
    <div className="min-h-screen pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <h1 className="text-3xl md:text-5xl font-display font-bold text-white">Browse Movies</h1>
        
        <div className="flex items-center gap-4 overflow-x-auto hide-scrollbar pb-2 md:pb-0">
          <div className="flex items-center gap-2 bg-surface p-1 rounded-lg border border-white/5">
            {SORT_OPTIONS.map((sort) => (
              <button
                key={sort}
                onClick={() => setActiveSort(sort)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                  activeSort === sort ? 'bg-white/10 text-white' : 'text-text-secondary hover:text-white'
                }`}
              >
                {sort}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Genre Filters */}
      <div className="flex items-center gap-3 overflow-x-auto hide-scrollbar mb-12 pb-4">
        {GENRES.map((genre) => (
          <button
            key={genre}
            onClick={() => setActiveGenre(genre)}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap border ${
              activeGenre === genre 
                ? 'bg-brand border-brand text-white' 
                : 'bg-transparent border-white/20 text-text-secondary hover:border-white/40 hover:text-white'
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
        {movies.map((movie) => (
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

      {/* Load More */}
      <div className="mt-16 flex justify-center">
        <button className="px-8 py-4 rounded-full border border-white/20 text-white font-medium hover:bg-white/5 transition-colors">
          Load More
        </button>
      </div>
    </div>
  );
}
