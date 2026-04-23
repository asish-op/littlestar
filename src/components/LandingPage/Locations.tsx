import React, { useEffect, useMemo, useState } from 'react';
import { MapPin, Navigation, Clock, Phone } from 'lucide-react';
import useAbout from '@/hooks/useAbout';

const Locations = () => {
  const { aboutData, loading } = useAbout();
  const [activeLocationIndex, setActiveLocationIndex] = useState(0);
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);

  const academyName = aboutData?.name?.trim() || 'Little Stars Football Academy';
  const rawLocation = aboutData?.location?.trim() || 'Gachibowli Sports Complex, Hyderabad, Telangana, India - 500032';
  const locationList = useMemo(() => {
    const parsed = rawLocation
      .split(/\r?\n|;|\|/)
      .map((item) => item.trim())
      .filter(Boolean);
    return parsed.length ? parsed : [rawLocation];
  }, [rawLocation]);

  const academyAddress = locationList[activeLocationIndex] || locationList[0];
  const academyPhone = aboutData?.contact || '+91 98765 43210';
  const addressLines = academyAddress.split(',').map((part) => part.trim()).filter(Boolean);
  const primaryAddressLine = addressLines[0] || academyAddress;
  const secondaryAddressLine = addressLines.slice(1).join(', ');

  useEffect(() => {
    if (activeLocationIndex > locationList.length - 1) {
      setActiveLocationIndex(0);
    }
  }, [activeLocationIndex, locationList.length]);

  useEffect(() => {
    let isCancelled = false;

    const fetchCoordinates = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(academyAddress)}`,
          { headers: { Accept: 'application/json' } }
        );
        const data = await response.json();

        if (!isCancelled && Array.isArray(data) && data[0]) {
          setCoords({ lat: Number(data[0].lat), lon: Number(data[0].lon) });
        }
      } catch {
        if (!isCancelled) {
          setCoords(null);
        }
      }
    };

    fetchCoordinates();

    return () => {
      isCancelled = true;
    };
  }, [academyAddress]);

  const mapSrc = useMemo(() => {
    if (!coords) {
      return 'https://www.openstreetmap.org/export/embed.html?bbox=78.4500%2C17.4600%2C78.4900%2C17.4900&layer=mapnik&marker=17.4746402%2C78.4716947';
    }

    const delta = 0.02;
    const bbox = `${coords.lon - delta},${coords.lat - delta},${coords.lon + delta},${coords.lat + delta}`;
    return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${coords.lat}%2C${coords.lon}`;
  }, [coords]);

  if (loading) return null;

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16 relative z-10">
          <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm mb-3 block">Facilities</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Where Champions Train
          </h2>
          <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            State-of-the-art training facilities designed to maximize player development.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-stretch relative z-10">
          
          {/* Location Info */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col justify-between h-full">
              <div className="mb-8">
                <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                  <MapPin className="w-8 h-8 text-blue-700" />
                </div>
                <h3 className="text-3xl font-extrabold text-slate-900 mb-2">{academyName}</h3>
                <p className="text-xl text-slate-600 mb-6 font-medium">
                  {primaryAddressLine}
                  {secondaryAddressLine ? (
                    <>
                      <br />
                      {secondaryAddressLine}
                    </>
                  ) : null}
                </p>
                <div className="h-px w-full bg-slate-100 my-6"></div>
                <p className="text-slate-600 text-lg leading-relaxed">
                  {aboutData?.description?.[0] || "Our primary training ground featuring world-class turf, dedicated physical conditioning zones, and tactical briefing rooms."}
                </p>
              </div>

              {locationList.length > 1 ? (
                <div className="mb-8">
                  <h4 className="text-sm font-bold tracking-wide uppercase text-slate-500 mb-3">All Locations</h4>
                  <div className="flex flex-wrap gap-2">
                    {locationList.map((location, index) => (
                      <button
                        key={`${location}-${index}`}
                        type="button"
                        onClick={() => setActiveLocationIndex(index)}
                        className={`rounded-full px-3 py-1.5 text-sm font-semibold transition-colors ${
                          index === activeLocationIndex
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {location}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="grid sm:grid-cols-2 gap-6 pt-6 border-t border-slate-100">
                <div className="flex gap-4">
                  <div className="bg-emerald-50 p-3 rounded-xl self-start">
                    <Clock className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Training Hours</h4>
                    <p className="text-slate-600 mt-1">Mon-Fri: 16:00 - 20:00<br/>Sat-Sun: 07:00 - 11:00</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-indigo-50 p-3 rounded-xl self-start">
                    <Phone className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Contact Desk</h4>
                    <p className="text-slate-600 mt-1">
                      {academyPhone}
                      <br />
                      admissions@cfacademy.com
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-100">
                <a 
                  href={`https://maps.google.com/?q=${encodeURIComponent(academyAddress)}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-colors shadow-lg"
                >
                  <Navigation className="w-5 h-5 fill-white/20" />
                  Get Directions
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white lg:h-full min-h-[400px] relative">
            {/* The Map */}
            <iframe 
              src={mapSrc}
              width="100%" 
              height="100%" 
              style={{ border: 0, minHeight: '100%' }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Training Ground Map"
              className="absolute inset-0"
            ></iframe>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Locations;
