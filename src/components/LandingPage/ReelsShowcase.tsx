import React from 'react';

const ReelsShowcase = () => {
  const reels = [
    '/reels/DWrUbTPEsOz.mp4',
    '/reels/DO00BMMj1z5.mp4',
  ];

  return (
    <section id="reels" className="py-16 md:py-20 bg-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-blue-700 mb-3">Latest Reels</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Training Moments</h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 place-items-center">
          {reels.map((reel, index) => (
            <div key={reel} className="w-full max-w-md rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm">
              <video
                src={reel}
                className="w-full h-[640px] object-cover"
                autoPlay
                muted
                loop
                playsInline
                controls
                preload="metadata"
                aria-label={`Training reel ${index + 1}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReelsShowcase;
