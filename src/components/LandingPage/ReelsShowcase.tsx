import React from 'react';

const ReelsShowcase = () => {
  const reels = [
    'https://www.instagram.com/reel/DWrUbTPEsOz/embed',
    'https://www.instagram.com/reel/DO00BMMj1z5/embed',
  ];

  return (
    <section id="reels" className="py-16 md:py-20 bg-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-blue-700 mb-3">Latest Reels</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Training Moments</h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 place-items-center">
          {reels.map((reel) => (
            <div key={reel} className="w-full max-w-md rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm">
              <iframe
                src={reel}
                title="Instagram Reel"
                className="w-full h-[640px]"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReelsShowcase;
