import React from 'react';
import { Calendar, Clock, MapPin, Trophy, ChevronRight } from 'lucide-react';
import useMatches from '../../hooks/useMatches';
import { useRouter } from 'next/navigation';

const UpcomingMatches = () => {
  const router = useRouter();
  const { upcomingMatches, loading, error } = useMatches();

  const formatDate = (datetime: string) => {
    return new Date(datetime).toLocaleDateString('en-GB', {
      day: '2-digit', month: 'short', year: 'numeric'
    }).toUpperCase();
  };

  const formatTime = (datetime: string) => {
    return new Date(datetime).toLocaleTimeString('en-US', {
      hour: 'numeric', minute: '2-digit', hour12: true
    });
  };

  if (loading) {
    return (
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background Decorators */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm mb-3 block">The Schedule</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">Upcoming <span className="text-blue-600">Matches</span></h2>
          <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        {error ? (
          <div className="text-center p-8 bg-red-50 text-red-600 rounded-2xl max-w-2xl mx-auto border border-red-100">
            <p className="font-medium mb-4">{error}</p>
            <button onClick={() => window.location.reload()} className="px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors">Retry</button>
          </div>
        ) : upcomingMatches.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-slate-100 max-w-3xl mx-auto">
            <Trophy className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-slate-800 mb-2">No Upcoming Matches</h3>
            <p className="text-slate-500">The squad is training hard. Check back soon for the next fixture!</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-10">
            {upcomingMatches.slice(0, 4).map((match, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-6 md:p-8 shadow-lg shadow-slate-200/40 hover:shadow-xl hover:-translate-y-1 transition-all border border-slate-100 group">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  
                  {/* Home Team */}
                  <div className="flex flex-col items-center flex-1">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-slate-50 border-4 border-white shadow-md p-3 mb-3 flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform">
                      <img src="https://i.ibb.co/JWPpTbt9/hlssa-optimized-1000.png" alt="Little Stars Soccer Academy" className="object-contain" />
                    </div>
                    <span className="font-bold text-slate-900 text-lg">Little Stars Soccer Academy</span>
                  </div>

                  {/* VS Badge */}
                  <div className="flex flex-col items-center justify-center relative">
                    <div className="w-12 h-0.5 bg-slate-200 absolute top-1/2 -z-10 w-full"></div>
                    <span className="bg-blue-600 text-white font-black text-sm px-4 py-2 rounded-full shadow-md z-10">VS</span>
                  </div>

                  {/* Away Team */}
                  <div className="flex flex-col items-center flex-1">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-slate-50 border-4 border-white shadow-md mb-3 flex items-center justify-center group-hover:scale-110 transition-transform overflow-hidden">
                      {match.opponent_image ? (
                        <img src={match.opponent_image} alt={match.opponent_name} className="w-full h-full object-cover" />
                      ) : (
                         <div className="w-full h-full bg-indigo-100 flex items-center justify-center text-indigo-400 font-bold text-2xl">{match.opponent_name.charAt(0)}</div>
                      )}
                    </div>
                    <span className="font-bold text-slate-900 text-lg text-center">{match.opponent_name}</span>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-3 gap-4 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <Calendar className="w-5 h-5 text-blue-500 mb-1" />
                    <span className="text-sm font-medium text-slate-600">{formatDate(match.datetime)}</span>
                  </div>
                  <div className="flex flex-col items-center justify-center border-l border-r border-slate-100">
                    <Clock className="w-5 h-5 text-blue-500 mb-1" />
                    <span className="text-sm font-medium text-slate-600">{formatTime(match.datetime)}</span>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <MapPin className="w-5 h-5 text-blue-500 mb-1" />
                    <span className="text-sm font-medium text-slate-600 line-clamp-1">{match.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {upcomingMatches.length > 0 && (
          <div className="mt-16 text-center">
            <button 
              onClick={() => router.push('/matches')}
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-black text-white px-8 py-4 rounded-full font-bold transition-all hover:pr-6 group"
            >
              View Full Schedule
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default UpcomingMatches;
