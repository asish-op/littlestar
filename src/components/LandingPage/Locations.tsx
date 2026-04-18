import React from 'react';
import { MapPin, Navigation, Clock, Phone } from 'lucide-react';

const Locations = () => {
  const academyName = 'Hyderabad Little Stars Soccer Academy';
  const academyAddressLine1 = 'Gachibowli Sports Complex';
  const academyAddressLine2 = 'Hyderabad, Telangana';
  const academyAddressLine3 = 'India - 500032';
  const academyAddress = `${academyAddressLine1}, ${academyAddressLine2}, ${academyAddressLine3}`;
  const academyPhone = '+91 79939 94704';
  const academyWebsite = 'https://hydlittlestars.com/';
  const academyMapEmbed = 'https://www.google.com/maps?q=Gachibowli%20Sports%20Complex%2C%20Hyderabad%2C%20Telangana%2C%20India%20500032&output=embed';

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
                  {academyAddressLine1}
                  <br />
                  {academyAddressLine2}
                </p>
                <div className="h-px w-full bg-slate-100 my-6"></div>
                <p className="text-slate-600 text-lg leading-relaxed">
                  Our primary training ground featuring world-class turf, dedicated physical conditioning zones, and tactical briefing rooms.
                </p>
              </div>

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
                      <a href={academyWebsite} target="_blank" rel="noreferrer" className="text-blue-700 hover:underline">
                        hydlittlestars.com
                      </a>
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
              src={academyMapEmbed}
              width="100%" 
              height="100%" 
              style={{ border: 0, minHeight: '100%' }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Hyderabad Little Stars Soccer Academy Map"
              className="absolute inset-0"
            ></iframe>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Locations;
