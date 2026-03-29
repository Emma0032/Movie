import Link from 'next/link';
import { Play, Info, Plus } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
  return (
    <div className="relative h-[85vh] w-full flex items-center">
      {/* Background Image & Gradient */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://picsum.photos/seed/dune/1920/1080" 
          alt="Featured Movie" 
          fill
          className="object-cover"
          priority
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-2 py-1 bg-brand text-white text-xs font-bold rounded-sm uppercase tracking-wider">
              New Release
            </span>
            <span className="text-text-secondary text-sm font-medium">
              2026 • Sci-Fi • 2h 45m
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight">
            DUNE: <br/> PART THREE
          </h1>
          
          <p className="text-lg text-text-secondary mb-8 line-clamp-3 max-w-xl leading-relaxed">
            The epic conclusion to the saga. Paul Atreides faces his ultimate destiny as the holy war spreads across the known universe. A visual masterpiece that redefines sci-fi cinema.
          </p>
          
          <div className="flex flex-wrap items-center gap-4">
            <Link 
              href="/watch/dune-3" 
              className="flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-white/90 transition-colors"
            >
              <Play className="w-5 h-5 fill-black" />
              Watch Now
            </Link>
            <button className="flex items-center gap-2 bg-surface/80 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold hover:bg-surface transition-colors border border-white/10">
              <Info className="w-5 h-5" />
              More Info
            </button>
            <button className="flex items-center justify-center w-14 h-14 rounded-full bg-surface/80 backdrop-blur-md text-white hover:bg-surface transition-colors border border-white/10">
              <Plus className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
