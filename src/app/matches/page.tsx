"use client";
import React, { useState } from 'react';
import useMatches from '@/hooks/useMatches';

export default function MatchesPage() {
  const { matches, loading, error } = useMatches();
  const [tab, setTab] = useState<'upcoming' | 'completed'>('upcoming');

  const now = new Date();
  const validMatches = matches || [];

  const upcomingMatches = validMatches.filter(m => new Date(m.datetime) > now).sort((a,b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime());
  const completedMatches = validMatches.filter(m => new Date(m.datetime) <= now).sort((a,b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime());
  
  const display = tab === 'upcoming' ? upcomingMatches : completedMatches;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
      <h1 className="text-3xl md:text-4xl font-black mb-8 border-b-4 border-blue-600 inline-block pb-2">Match Center</h1>
      
      <div className="flex flex-wrap gap-2 mb-8">
        <button onClick={() => setTab('upcoming')} className={`px-6 py-2 rounded-md font-bold text-sm ${tab === 'upcoming' ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-600'}`}>Upcoming</button>
        <button onClick={() => setTab('completed')} className={`px-6 py-2 rounded-md font-bold text-sm ${tab === 'completed' ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-600'}`}>Completed</button>
      </div>

      {loading ? <p>Loading matches...</p> : error ? <p className="text-red-500">{error}</p> : (
        <div className="space-y-4">
          {display.length === 0 ? (
            <p className="text-slate-500 bg-white p-8 rounded-xl text-center border border-slate-200">No {tab} matches found.</p>
          ) : (
            display.map(match => (
              <div key={match.id} className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col md:flex-row items-center gap-4 md:gap-6">
                
                <div className="bg-slate-50 p-4 rounded-lg min-w-32 text-center border border-slate-100 w-full md:w-auto">
                  <div className="text-2xl font-black">{new Date(match.datetime).getDate()}</div>
                  <div className="text-sm font-bold uppercase">{new Date(match.datetime).toLocaleString('default', {month:'short'})}</div>
                </div>

                <div className="flex-1 flex justify-between items-center w-full gap-2">
                  <div className="flex-1 text-right font-bold text-base md:text-xl pr-2 md:pr-4 break-words">Little Stars Soccer Academy</div>
                  <div className="bg-slate-100 px-4 py-1 rounded font-black text-slate-500">VS</div>
                  <div className="flex-1 text-left font-bold text-base md:text-xl pl-2 md:pl-4 break-words">{match.opponent_name}</div>
                </div>

                 {tab === 'completed' && match.result && (
                   <div className="text-2xl font-black text-blue-600 bg-blue-50 px-4 py-2 rounded-lg">{match.result}</div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}