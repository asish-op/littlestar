"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Play, Star } from 'lucide-react';
import EnrollmentModal from './EnrollmentModal';

const INSTAGRAM_URL = 'https://www.instagram.com/hydlittlestars.official/';

const Hero = () => {
  const [isEnrollOpen, setIsEnrollOpen] = useState(false);

  return (
    <div className="relative min-h-[88vh] md:min-h-[90vh] flex items-center pt-16 md:pt-24 pb-12 md:pb-16 overflow-hidden bg-slate-900">
      <img
        src="https://res.cloudinary.com/dwlccnvfh/image/upload/v1753936491/pf9tswepd5vcngpx6cnt_nhc29f.webp"
        alt="Soccer Match at Sreenidhi Deccan Little Stars Academy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/65 to-slate-900/50" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 text-white font-semibold text-sm mb-8 uppercase tracking-wide backdrop-blur-sm border border-white/20">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600"></span>
            </span>
            Hyderabad Little Stars Football Academy
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 tracking-tight">
            Train with <br />
            <span className="text-blue-300">Sreenidhi Deccan Little Stars Academy</span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-slate-100 mb-8 md:mb-10 leading-relaxed max-w-xl font-medium">
            Build match-winning habits through structured coaching, competitive exposure, and discipline-led player development at Sreenidhi Deccan Little Stars Academy.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
            <button
              type="button"
              onClick={() => setIsEnrollOpen(true)}
              className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2 group"
            >
              Enroll Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/15 hover:bg-white/25 text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2 border border-white/30 backdrop-blur-sm"
            >
              <Play className="w-5 h-5 fill-white" />
              Watch Videos
            </a>
          </div>

          <div className="mt-12 flex items-center gap-6 sm:gap-10 border-t border-white/25 pt-8">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map(i => (
                <img key={i} src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Student" className="w-12 h-12 rounded-full border-2 border-white object-cover shadow-sm" />
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1 mb-1">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />)}
              </div>
              <p className="text-slate-100 font-semibold">Trusted by 1,000+ players and families</p>
            </div>
          </div>
        </div>

        <div className="group hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 items-center gap-5 rounded-3xl border border-white/35 bg-white/15 px-8 py-7 backdrop-blur-md shadow-2xl transition-transform duration-300 hover:scale-110 hover:-translate-y-[52%] overflow-hidden">
          <span className="pointer-events-none absolute -left-2/3 top-0 h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/45 to-transparent opacity-0 transition-all duration-700 group-hover:left-[140%] group-hover:opacity-100" />
          <Image
            src="/lssa-logo.png"
            alt="Sreenidhi Deccan Little Stars Academy logo"
            width={224}
            height={224}
            quality={100}
            sizes="(min-width: 1280px) 112px, 96px"
            className="h-24 w-24 rounded-full border-2 border-white/50 bg-white object-contain p-1"
          />
          <span className="text-5xl font-black text-white">x</span>
          <Image
            src="/sreenidi-logo.jpg"
            alt="Sreenidhi Deccan Football Club logo"
            width={224}
            height={224}
            quality={100}
            sizes="(min-width: 1280px) 112px, 96px"
            className="h-24 w-24 rounded-full border-2 border-white/50 bg-white object-contain p-1"
          />
        </div>
      </div>

      <EnrollmentModal isOpen={isEnrollOpen} onClose={() => setIsEnrollOpen(false)} />
    </div>
  );
};

export default Hero;
