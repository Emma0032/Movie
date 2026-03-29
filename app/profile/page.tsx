'use client';

import { useState } from 'react';
import { User, Settings, CreditCard, LogOut, PlayCircle, Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const TABS = ['Watch History', 'Watchlist', 'Settings', 'Billing'];

const generateMovies = (seed: string, count: number = 6) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `${seed}-${i}`,
    title: `Movie Title ${i + 1}`,
    image: `https://picsum.photos/seed/${seed}${i}/400/600`,
    progress: Math.floor(Math.random() * 100),
  }));
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('Watch History');
  const history = generateMovies('history');
  const watchlist = generateMovies('watchlist');

  return (
    <div className="min-h-screen pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Sidebar */}
        <div className="w-full md:w-64 shrink-0">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-full bg-surface-hover flex items-center justify-center overflow-hidden border-2 border-brand">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-display font-bold text-white">Alex Doe</h2>
              <p className="text-sm text-brand font-medium">Premium Member</p>
            </div>
          </div>

          <nav className="space-y-2">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab 
                    ? 'bg-brand text-white' 
                    : 'text-text-secondary hover:bg-surface hover:text-white'
                }`}
              >
                {tab === 'Watch History' && <PlayCircle className="w-5 h-5" />}
                {tab === 'Watchlist' && <Heart className="w-5 h-5" />}
                {tab === 'Settings' && <Settings className="w-5 h-5" />}
                {tab === 'Billing' && <CreditCard className="w-5 h-5" />}
                {tab}
              </button>
            ))}
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-500 hover:bg-red-500/10 transition-colors mt-8">
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          <h1 className="text-3xl font-display font-bold text-white mb-8">{activeTab}</h1>

          {activeTab === 'Watch History' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {history.map((movie) => (
                <Link 
                  key={movie.id} 
                  href={`/movie/${movie.id}`}
                  className="relative aspect-[2/3] rounded-lg overflow-hidden group/card transition-transform duration-300 hover:scale-105"
                >
                  <Image
                    src={movie.image}
                    alt={movie.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover/card:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <h3 className="text-white font-semibold text-sm md:text-base line-clamp-1 mb-2">{movie.title}</h3>
                    <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-brand" style={{ width: `${movie.progress}%` }} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {activeTab === 'Watchlist' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {watchlist.map((movie) => (
                <Link 
                  key={movie.id} 
                  href={`/movie/${movie.id}`}
                  className="relative aspect-[2/3] rounded-lg overflow-hidden group/card transition-transform duration-300 hover:scale-105"
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
                    <button className="mt-2 text-xs text-brand font-medium hover:underline">Remove</button>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {activeTab === 'Settings' && (
            <div className="max-w-2xl space-y-8">
              <div className="bg-surface p-6 rounded-xl border border-white/5">
                <h3 className="text-lg font-semibold text-white mb-4">Profile Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-text-secondary mb-1">Name</label>
                    <input type="text" defaultValue="Alex Doe" className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-brand" />
                  </div>
                  <div>
                    <label className="block text-sm text-text-secondary mb-1">Email</label>
                    <input type="email" defaultValue="alex@example.com" className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-brand" />
                  </div>
                  <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>

              <div className="bg-surface p-6 rounded-xl border border-white/5">
                <h3 className="text-lg font-semibold text-white mb-4">Playback Preferences</h3>
                <div className="space-y-4">
                  <label className="flex items-center gap-3">
                    <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-white/20 bg-background text-brand focus:ring-brand focus:ring-offset-background" />
                    <span className="text-white">Autoplay next episode</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-white/20 bg-background text-brand focus:ring-brand focus:ring-offset-background" />
                    <span className="text-white">Autoplay previews while browsing</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Billing' && (
            <div className="max-w-2xl space-y-8">
              <div className="bg-gradient-to-r from-brand/20 to-surface p-6 rounded-xl border border-brand/50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Current Plan</h3>
                  <span className="bg-brand text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Premium</span>
                </div>
                <p className="text-text-secondary mb-6">Your next billing date is April 28, 2026 for $9.99.</p>
                <div className="flex gap-4">
                  <Link href="/pricing" className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                    Change Plan
                  </Link>
                  <button className="text-text-secondary hover:text-white px-6 py-2 font-medium transition-colors">
                    Cancel Subscription
                  </button>
                </div>
              </div>

              <div className="bg-surface p-6 rounded-xl border border-white/5">
                <h3 className="text-lg font-semibold text-white mb-4">Payment Method</h3>
                <div className="flex items-center gap-4 p-4 bg-background rounded-lg border border-white/10 mb-4">
                  <CreditCard className="w-6 h-6 text-text-secondary" />
                  <div>
                    <p className="text-white font-medium">•••• •••• •••• 4242</p>
                    <p className="text-xs text-text-secondary">Expires 12/28</p>
                  </div>
                </div>
                <button className="text-brand hover:text-brand-hover font-medium transition-colors">
                  Update Payment Method
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
