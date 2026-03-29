'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';

interface Movie {
  id: string;
  title: string;
  image: string;
  match?: number;
  rating?: string;
  duration?: string;
}

interface MovieRowProps {
  title: string;
  movies: Movie[];
}

export default function MovieRow({ title, movies }: MovieRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);

  const handleClick = (direction: 'left' | 'right') => {
    setIsMoved(true);
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth 
        : scrollLeft + clientWidth;
      
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="py-6 relative group">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 flex items-center justify-between">
        <h2 className="text-xl md:text-2xl font-display font-semibold text-white">
          {title}
        </h2>
        <Link href={`/browse?category=${title.toLowerCase()}`} className="text-sm text-brand hover:text-brand-hover transition-colors font-medium hidden sm:block">
          Explore All
        </Link>
      </div>

      <div className="relative">
        {isMoved && (
          <button 
            onClick={() => handleClick('left')}
            className="absolute left-0 top-0 bottom-0 w-12 z-20 bg-gradient-to-r from-background to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft className="w-8 h-8 text-white" />
          </button>
        )}

        <div 
          ref={rowRef}
          className="flex gap-4 overflow-x-scroll hide-scrollbar px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        >
          {movies.map((movie) => (
            <Link 
              key={movie.id} 
              href={`/movie/${movie.id}`}
              className="relative flex-none w-[160px] sm:w-[200px] md:w-[240px] aspect-[2/3] rounded-lg overflow-hidden group/card transition-transform duration-300 hover:scale-105 hover:z-30"
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

        <button 
          onClick={() => handleClick('right')}
          className="absolute right-0 top-0 bottom-0 w-12 z-20 bg-gradient-to-l from-background to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronRight className="w-8 h-8 text-white" />
        </button>
      </div>
    </div>
  );
}
