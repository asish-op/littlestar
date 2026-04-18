import React from 'react';
import { ArrowRight, Play, Star, Trophy, Users } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative min-h-[88vh] md:min-h-[90vh] flex items-center pt-16 md:pt-24 pb-12 md:pb-16 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-12 items-center">
          
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-700 font-semibold text-sm mb-8 uppercase tracking-wide">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600"></span>
              </span>
              Registration for 2025 Season Open
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-slate-900 leading-tight mb-6 tracking-tight">
              Develop Your <br/>
              <span className="text-blue-700">Potential.</span><br />
              Achieve Greatness.
            </h1>
            
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 mb-8 md:mb-10 leading-relaxed max-w-xl font-medium">
              Join the region's elite soccer academy. We combine professional coaching, top-tier facilities, and a proven development methodology to elevate your game.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
              <a href="#contact" className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2 group">
                Start Free Trial
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              
              <a href="#contact" className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-8 py-4 rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2">
                <Play className="w-5 h-5 fill-slate-800" />
                Watch Video
              </a>
            </div>
            
            <div className="mt-12 flex items-center gap-6 sm:gap-10 border-t border-slate-100 pt-8">
              <div className="flex -space-x-4">
                {[1,2,3,4].map(i => (
                  <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Student" className="w-12 h-12 rounded-full border-2 border-white object-cover shadow-sm" />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 mb-1">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-slate-600 font-semibold">Over 1,000+ happy players</p>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-blue-700 rounded-3xl translate-x-4 translate-y-4 -z-10"></div>
             <img 
              src="https://res.cloudinary.com/dwlccnvfh/image/upload/v1753936491/pf9tswepd5vcngpx6cnt_nhc29f.webp" 
              alt="Soccer Match at Little Stars Soccer Academy" 
              className="w-full h-auto aspect-square lg:aspect-[4/5] object-cover rounded-3xl shadow-lg border-4 border-white"
            />
            {/* Floating badges */}
            <div className="absolute top-10 -left-10 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4">
               <div className="bg-blue-100 p-3 rounded-full text-blue-700">
                  <Trophy className="w-6 h-6" />
               </div>
               <div>
                  <p className="font-bold text-slate-900 text-lg">15+ Cups</p>
                  <p className="text-slate-500 text-sm font-medium">Won Locally</p>
               </div>
            </div>

            <div className="absolute bottom-10 -right-4 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4">
               <div className="bg-amber-100 p-3 rounded-full text-amber-600">
                  <Users className="w-6 h-6" />
               </div>
               <div>
                  <p className="font-bold text-slate-900 text-lg">500+ Students</p>
                  <p className="text-slate-500 text-sm font-medium">Actively enrolled</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

