'use client';

import { useState, useEffect, useRef, use } from 'react';
import { ArrowLeft, Play, Pause, Volume2, VolumeX, Maximize, Settings, SkipForward } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function WatchPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [progress, setProgress] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleMouseMove = () => {
      setShowControls(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setShowControls(false), 3000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleMute = () => setIsMuted(!isMuted);

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col justify-between overflow-hidden">
      {/* Video Element Placeholder */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-full bg-surface relative">
          <Image 
            src={`https://picsum.photos/seed/${resolvedParams.id}/1920/1080`} 
            alt="Video Placeholder" 
            fill
            className="object-cover opacity-50"
            referrerPolicy="no-referrer"
          />
          {/* Simulated Playback Overlay */}
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            {!isPlaying && (
              <button onClick={togglePlay} className="w-24 h-24 rounded-full bg-brand/80 flex items-center justify-center hover:bg-brand transition-colors">
                <Play className="w-12 h-12 text-white fill-white ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Top Controls */}
      <div className={`absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-black/80 to-transparent transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href={`/movie/${resolvedParams.id}`} className="text-white hover:text-brand transition-colors">
              <ArrowLeft className="w-8 h-8" />
            </Link>
            <h1 className="text-white font-display font-semibold text-xl">Movie Title {resolvedParams.id}</h1>
          </div>
          <button className="text-white hover:text-brand transition-colors">
            <Settings className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className={`absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        {/* Progress Bar */}
        <div className="w-full h-1 bg-white/20 rounded-full mb-6 cursor-pointer relative group">
          <div className="absolute top-0 left-0 h-full bg-brand rounded-full" style={{ width: `${progress}%` }} />
          <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-brand rounded-full opacity-0 group-hover:opacity-100 transition-opacity" style={{ left: `${progress}%`, transform: 'translate(-50%, -50%)' }} />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button onClick={togglePlay} className="text-white hover:text-brand transition-colors">
              {isPlaying ? <Pause className="w-8 h-8 fill-white" /> : <Play className="w-8 h-8 fill-white" />}
            </button>
            <button className="text-white hover:text-brand transition-colors">
              <SkipForward className="w-6 h-6 fill-white" />
            </button>
            <button onClick={toggleMute} className="text-white hover:text-brand transition-colors">
              {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
            </button>
            <span className="text-white text-sm font-medium">01:24:30 / 02:15:00</span>
          </div>

          <div className="flex items-center gap-6">
            <button className="text-white hover:text-brand transition-colors text-sm font-medium">
              Next Episode
            </button>
            <button className="text-white hover:text-brand transition-colors">
              <Maximize className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
