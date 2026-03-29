import Hero from '@/components/Hero';
import MovieRow from '@/components/MovieRow';

// Mock data generator for demonstration
const generateMovies = (seed: string, count: number = 10) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `${seed}-${i}`,
    title: `Movie Title ${i + 1}`,
    image: `https://picsum.photos/seed/${seed}${i}/400/600`,
    match: Math.floor(Math.random() * 20) + 80, // 80-99%
    rating: ['TV-MA', 'R', 'PG-13', 'TV-14'][Math.floor(Math.random() * 4)],
    duration: `${Math.floor(Math.random() * 2) + 1}h ${Math.floor(Math.random() * 59)}m`,
  }));
};

export default function Home() {
  return (
    <div className="pb-20">
      <Hero />
      
      <div className="relative z-20 -mt-32 md:-mt-40 space-y-8 md:space-y-12">
        <MovieRow 
          title="Trending Now" 
          movies={generateMovies('trending')} 
        />
        <MovieRow 
          title="Top Picks For You" 
          movies={generateMovies('picks')} 
        />
        <MovieRow 
          title="Action Thrillers" 
          movies={generateMovies('action')} 
        />
        <MovieRow 
          title="Sci-Fi & Fantasy" 
          movies={generateMovies('scifi')} 
        />
        <MovieRow 
          title="Critically Acclaimed" 
          movies={generateMovies('drama')} 
        />
      </div>

      {/* CTA Section for non-subscribers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="bg-gradient-to-r from-surface to-surface-hover rounded-2xl p-8 md:p-12 border border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Unlock the Full Experience
            </h2>
            <p className="text-text-secondary text-lg mb-6">
              Go Premium to watch in 4K HDR, download for offline viewing, and enjoy an ad-free experience. Cancel anytime.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-brand hover:bg-brand-hover text-white px-8 py-4 rounded-full font-semibold transition-colors">
                Start 7-Day Free Trial
              </button>
              <button className="bg-surface-hover hover:bg-white/10 text-white px-8 py-4 rounded-full font-semibold transition-colors border border-white/10">
                View Plans
              </button>
            </div>
          </div>
          <div className="hidden lg:block">
            {/* Decorative element */}
            <div className="w-48 h-48 rounded-full bg-brand/20 blur-3xl" />
          </div>
        </div>
      </section>
    </div>
  );
}
