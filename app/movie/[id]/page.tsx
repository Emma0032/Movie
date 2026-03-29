import Image from 'next/image';
import Link from 'next/link';
import { Play, Plus, ThumbsUp, Share2, Download, Check } from 'lucide-react';

export default async function MovieDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  return (
    <div className="min-h-screen pb-20">
      {/* Hero Banner */}
      <div className="relative h-[60vh] md:h-[70vh] w-full">
        <div className="absolute inset-0 z-0">
          <Image 
            src={`https://picsum.photos/seed/${resolvedParams.id}/1920/1080`}
            alt="Movie Banner" 
            fill
            className="object-cover"
            priority
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-12">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-4">
              Movie Title {resolvedParams.id}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-text-secondary mb-6">
              <span className="text-green-500 font-semibold">98% Match</span>
              <span>2026</span>
              <span className="border border-white/40 px-1 rounded text-white/80">TV-MA</span>
              <span>2h 15m</span>
              <span className="px-2 py-0.5 bg-white/10 rounded text-white">4K Ultra HD</span>
            </div>

            <p className="text-lg text-text-secondary mb-8 leading-relaxed max-w-2xl">
              When a mysterious anomaly appears in the sky, a team of scientists and military personnel must work together to understand its origins before it threatens the very fabric of reality.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link 
                href={`/watch/${resolvedParams.id}`}
                className="flex items-center gap-2 bg-brand text-white px-8 py-4 rounded-full font-semibold hover:bg-brand-hover transition-colors"
              >
                <Play className="w-5 h-5 fill-white" />
                Play
              </Link>
              <button className="flex items-center justify-center w-14 h-14 rounded-full bg-surface/80 backdrop-blur-md text-white hover:bg-surface transition-colors border border-white/10">
                <Plus className="w-6 h-6" />
              </button>
              <button className="flex items-center justify-center w-14 h-14 rounded-full bg-surface/80 backdrop-blur-md text-white hover:bg-surface transition-colors border border-white/10">
                <ThumbsUp className="w-5 h-5" />
              </button>
              <button className="flex items-center justify-center w-14 h-14 rounded-full bg-surface/80 backdrop-blur-md text-white hover:bg-surface transition-colors border border-white/10">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            {/* Cast & Crew */}
            <section>
              <h3 className="text-xl font-display font-semibold text-white mb-6">Cast & Crew</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-surface overflow-hidden relative">
                      <Image src={`https://picsum.photos/seed/actor${i}/100/100`} alt="Actor" fill className="object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">Actor Name</p>
                      <p className="text-text-secondary text-xs">Character</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Episodes (if series) or More Details */}
            <section>
              <h3 className="text-xl font-display font-semibold text-white mb-6">More Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                <div>
                  <span className="text-text-secondary block mb-1">Genres</span>
                  <p className="text-white">Sci-Fi, Thriller, Action</p>
                </div>
                <div>
                  <span className="text-text-secondary block mb-1">Director</span>
                  <p className="text-white">Jane Doe</p>
                </div>
                <div>
                  <span className="text-text-secondary block mb-1">Audio</span>
                  <p className="text-white">English, Spanish, French</p>
                </div>
                <div>
                  <span className="text-text-secondary block mb-1">Subtitles</span>
                  <p className="text-white">English, Spanish, French, German</p>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-surface rounded-xl p-6 border border-white/5">
              <h4 className="text-white font-medium mb-4">Download for Offline</h4>
              <p className="text-sm text-text-secondary mb-6">
                Premium members can download this title to watch offline on mobile devices.
              </p>
              <button className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-lg font-medium transition-colors">
                <Download className="w-5 h-5" />
                Download
              </button>
            </div>

            <div>
              <h4 className="text-white font-medium mb-4">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {['Mind-bending', 'Dark', 'Suspenseful', 'Space', 'Future'].map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-surface rounded-full text-xs text-text-secondary border border-white/5">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
