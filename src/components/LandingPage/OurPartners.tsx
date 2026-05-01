import React, { useState } from 'react';
import usePartners from '../../hooks/usePartners';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

const toAbsoluteUrl = (value: string) => {
  const src = value.trim();

  if (!src) return '';
  if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:')) return src;
  if (src.startsWith('//')) return `https:${src}`;
  if (src.startsWith('/partners/')) return src;

  if (API_BASE_URL) {
    if (src.startsWith('/')) return `${API_BASE_URL}${src}`;
    return `${API_BASE_URL}/${src}`;
  }

  return src;
};

const getPartnerImage = (partner: { name?: string; image?: string; logo_url?: string }) => {
  const resolved = toAbsoluteUrl(partner.image || partner.logo_url || '');

  // API-only rendering: do not replace with hardcoded brand assets.
  if (!resolved || resolved.includes('via.placeholder.com')) return '';
  return resolved;
};

const OurPartners = () => {
  const { partners, loading, error } = usePartners();
  const activePartners = partners || [];
  const isCompactLayout = activePartners.length <= 2;
  const [failedImageMap, setFailedImageMap] = useState<Record<number, boolean>>({});

  if (loading) {
    return (
      <section className="py-16 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">Trusted By The Best</h2>
            <div className="w-24 h-1.5 bg-slate-200 mx-auto rounded-full mb-6"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 opacity-70 animate-pulse">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="h-16 rounded-xl bg-slate-100"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Trusted By The Best
          </h2>
          <div className="w-24 h-1.5 bg-slate-200 mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            We partner with industry-leading brands and clubs to provide our athletes with unparalleled opportunities.
          </p>
        </div>

        {error ? (
          <div className="text-center text-red-600 font-medium py-8">
            Failed to load partners from API.
          </div>
        ) : activePartners.length === 0 ? (
          <div className="text-center text-slate-500 font-medium py-8">
            No partners available right now.
          </div>
        ) : (
          <div
            className={`items-center opacity-70 hover:opacity-100 transition-opacity duration-500 ${
              isCompactLayout
                ? 'flex flex-wrap justify-center gap-10 lg:gap-14 max-w-3xl mx-auto'
                : 'grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 justify-center'
            }`}
          >
            {activePartners.map((partner, index) => {
              const partnerId = Number(partner.id ?? index);
              const imageSrc = getPartnerImage(partner);
              const showTextFallback = !imageSrc || failedImageMap[partnerId];

              return (
              <a
                key={partner.id || index}
                href={partner.website_link || '#'}
                target="_blank"
                rel="noreferrer"
                className={`flex justify-center items-center p-6 grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-110 ${
                  isCompactLayout ? 'w-40 sm:w-48' : ''
                }`}
                aria-label={partner.name}
              >
                {showTextFallback ? (
                  <span className="text-xs sm:text-sm font-bold tracking-wide text-slate-500 text-center uppercase">
                    {partner.name}
                  </span>
                ) : (
                  <img 
                    src={imageSrc}
                    alt={partner.name} 
                    className="max-h-16 w-auto object-contain"
                    onError={() => {
                      setFailedImageMap((prev) => ({ ...prev, [partnerId]: true }));
                    }}
                  />
                )}
              </a>
              );
            })}
          </div>
        )}

        {/* Partnership Benefits */}
        <div className="mt-14 max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              Partnership Benefits
            </h3>
            <p className="text-lg text-slate-600">
              Our partnerships enable us to provide world-class facilities and opportunities
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">🏟️</div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">Premium Facilities</h4>
              <p className="text-slate-600 text-sm">Access to state-of-the-art training grounds and equipment</p>
            </div>
            
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">🎯</div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">Professional Opportunities</h4>
              <p className="text-slate-600 text-sm">Direct pathways to professional clubs and trials</p>
            </div>
            
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">🏆</div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">Tournament Access</h4>
              <p className="text-slate-600 text-sm">Participation in high-level competitions and leagues</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default OurPartners;

