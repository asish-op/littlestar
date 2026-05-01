import React from 'react';
import { Trophy, Star, Shield, ArrowRight } from 'lucide-react';
import useAchievements from '../../hooks/useAchievements';
import { useRouter } from 'next/navigation';

const AchievementsShowcase = () => {
  const { achievements, loading } = useAchievements();
  const router = useRouter();

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <span className="text-amber-600 font-semibold tracking-wider uppercase text-sm mb-3 block">Trophy Cabinet</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Decorated History
          </h2>
          <div className="w-24 h-1.5 bg-amber-500 mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Our academy&apos;s commitment to excellence has resulted in numerous regional and national titles.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 text-center hover:-translate-y-2 transition-transform">
            <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trophy className="w-8 h-8 text-amber-600" />
            </div>
            <h3 className="text-4xl font-extrabold text-slate-900 mb-2">15+</h3>
            <p className="text-slate-600 font-medium">Championships Won</p>
          </div>
          
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 text-center hover:-translate-y-2 transition-transform">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Star className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-4xl font-extrabold text-slate-900 mb-2">10</h3>
            <p className="text-slate-600 font-medium">State Player Reps</p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 text-center hover:-translate-y-2 transition-transform">
            <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-4xl font-extrabold text-slate-900 mb-2">3</h3>
            <p className="text-slate-600 font-medium">Consecutive League Titles</p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 text-center hover:-translate-y-2 transition-transform">
            <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trophy className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="text-4xl font-extrabold text-slate-900 mb-2">#1</h3>
            <p className="text-slate-600 font-medium">Ranked Academy</p>
          </div>
        </div>

        {achievements && achievements.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 border-t border-slate-100 pt-10">
            {achievements.slice(0, 3).map((achievement, idx) => (
              <div key={idx} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl mb-6">
                  <div className="absolute inset-0 transition-opacity opacity-0 group-hover:opacity-100 z-10"></div>
                  <img 
                    src={achievement.image || 'https://images.unsplash.com/photo-1518605338461-8cfdb32b6e13'} 
                    alt={achievement.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white text-slate-900 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md z-20">
                     {achievement.year || '2024'}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors">{achievement.title}</h3>
                <p className="text-slate-600 line-clamp-2">{achievement.description}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <button 
            onClick={() => router.push('/achievements')}
            className="inline-flex items-center gap-2 text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-8 py-4 rounded-xl font-bold text-lg transition-colors group"
          >
            View Hall of Fame
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};

export default AchievementsShowcase;

