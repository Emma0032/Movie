'use client';

import Link from 'next/link';
import { Search, Bell, User, Menu } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-background/95 backdrop-blur-md border-b border-white/10' : 'bg-gradient-to-b from-black/80 to-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo & Desktop Nav */}
          <div className="flex items-center gap-8">
            <Link href="/" className="text-brand font-display font-bold text-2xl md:text-3xl tracking-tighter">
              CINESTREAM
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-text-secondary">
              <Link href="/" className="text-white hover:text-white transition-colors">Home</Link>
              <Link href="/browse?genre=movies" className="hover:text-white transition-colors">Movies</Link>
              <Link href="/browse?genre=series" className="hover:text-white transition-colors">Series</Link>
              <Link href="/browse?genre=trending" className="hover:text-white transition-colors">Trending</Link>
              <Link href="/watchlist" className="hover:text-white transition-colors">My List</Link>
            </nav>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4 md:gap-6">
            <Link href="/search" className="text-white hover:text-brand transition-colors">
              <Search className="w-5 h-5 md:w-6 md:h-6" />
            </Link>
            <button className="text-white hover:text-brand transition-colors hidden sm:block">
              <Bell className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <Link href="/profile" className="flex items-center gap-2 text-white hover:text-brand transition-colors">
              <div className="w-8 h-8 rounded-full bg-surface-hover flex items-center justify-center overflow-hidden border border-white/10">
                <User className="w-5 h-5" />
              </div>
            </Link>
            <button className="md:hidden text-white">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
