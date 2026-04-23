import React from 'react';

const QuickAbout = () => {
  return (
    <section className="bg-white py-14 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-blue-50 p-8 md:p-10">
          <div className="mb-5 flex items-center gap-3">
            <img
              src="/sreenidi-logo.jpg"
              alt="Sreenidi Deccan Football Club logo"
              className="h-14 w-14 rounded-full object-cover border border-slate-200 bg-white"
            />
            <p className="text-sm font-semibold text-slate-600">Partnership Spotlight</p>
          </div>
          <p className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-blue-700 mb-3">About Sreenidi Deccan Football Club</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
            Professional standards, grassroots spirit.
          </h2>
          <p className="text-slate-700 text-base md:text-lg leading-relaxed max-w-4xl">
            Sreenidi Deccan Football Club is one of India&apos;s most ambitious football projects, known for disciplined play,
            competitive excellence, and a clear player-development pathway. Our grassroots coaching approach draws from that
            same culture to help young players build technical quality, tactical intelligence, and winning character.
          </p>
        </div>
      </div>
    </section>
  );
};

export default QuickAbout;
