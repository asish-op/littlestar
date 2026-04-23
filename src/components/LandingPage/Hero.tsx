import React from 'react';
import { ArrowRight, Play, Star } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative min-h-[88vh] md:min-h-[90vh] flex items-center pt-16 md:pt-24 pb-12 md:pb-16 overflow-hidden bg-slate-900">
      <img
        src="https://res.cloudinary.com/dwlccnvfh/image/upload/v1753936491/pf9tswepd5vcngpx6cnt_nhc29f.webp"
        alt="Soccer Match at Little Stars Soccer Academy"
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
              Little Stars Football Academy
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-tight mb-6 tracking-tight">
              Train with <br />
              <span className="text-blue-300">Little Stars</span><br />
              Football Excellence.
          </h1>
            
          <p className="text-base sm:text-lg lg:text-xl text-slate-100 mb-8 md:mb-10 leading-relaxed max-w-xl font-medium">
              Build match-winning habits through structured coaching, competitive exposure, and discipline-led player development at Little Stars Football Academy.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
            <a href="#contact" className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2 group">
                Enroll Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
              
            <a href="#reels" className="bg-white/15 hover:bg-white/25 text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2 border border-white/30 backdrop-blur-sm">
                <Play className="w-5 h-5 fill-white" />
                Watch Reels
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
      </div>
    </div>
  );
};

export default Hero;

