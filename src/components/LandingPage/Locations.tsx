'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import type { LatLngExpression } from 'leaflet';

const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), {
  ssr: false,
});

const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), {
  ssr: false,
});

const Marker = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), {
  ssr: false,
});

const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), {
  ssr: false,
});

interface Location {
  id: number;
  name: string;
  address: string;
  area: string;
  position: { lat: number; lng: number };
  mapsUrl: string;
}

const locations: Location[] = [
  { id: 1, name: 'Cyclone Sports HQ', address: '8-1-346/41, Sabza Colony, Brindavan Colony, Toli Chowki, Hyderabad, Telangana 500008', area: 'Toli Chowki', position: { lat: 17.4020, lng: 78.4090 }, mapsUrl: 'https://maps.app.goo.gl/oFM8qN3g4tG8N8pm7' },
  { id: 2, name: 'Leo 11', address: '7 Tombs Road, Tolichowki', area: 'Tolichowki', position: { lat: 17.4025, lng: 78.4095 }, mapsUrl: 'https://maps.app.goo.gl/2LMtiz7EwqP2v2CP7' },
  { id: 3, name: 'Korner Kick', address: 'Alkhapur', area: 'Alkhapur', position: { lat: 17.3850, lng: 78.4200 }, mapsUrl: 'https://maps.app.goo.gl/VsuD29v43RF28UZQ7' },
  { id: 4, name: 'One More Game', address: 'Freedom Park, Manikonda', area: 'Manikonda', position: { lat: 17.4100, lng: 78.3800 }, mapsUrl: 'https://maps.app.goo.gl/MAPWXv6cx23GSGd6A' },
  { id: 5, name: 'Inplay', address: 'Bangla gudda Gagir, SunCity', area: 'SunCity', position: { lat: 17.4300, lng: 78.3900 }, mapsUrl: 'https://maps.app.goo.gl/ucrJ9ETc6f9QKzwL8' },
  { id: 6, name: 'HOS', address: 'SunCity', area: 'SunCity', position: { lat: 17.4320, lng: 78.3920 }, mapsUrl: 'https://maps.app.goo.gl/uhToaju6RZ7uPRn98' },
  { id: 7, name: 'Infinity Sports Arena', address: 'Attapur, Piller no 177', area: 'Attapur', position: { lat: 17.3700, lng: 78.4300 }, mapsUrl: 'https://maps.app.goo.gl/CrgJwRhkuGRYweoc9' },
  { id: 8, name: 'Mag Arena', address: 'Attapur, Piller no 210', area: 'Attapur', position: { lat: 17.3720, lng: 78.4320 }, mapsUrl: 'https://maps.app.goo.gl/QZMXfmLrUnrZnpf39' },
  { id: 9, name: 'GR Arena', address: 'Khilwat, Old City', area: 'Old City', position: { lat: 17.3500, lng: 78.4500 }, mapsUrl: 'https://maps.app.goo.gl/WumPqfrHVTzFDNRr8' },
  { id: 10, name: 'Knockout Arena', address: 'Alwal, Secunderabad', area: 'Secunderabad', position: { lat: 17.5000, lng: 78.4900 }, mapsUrl: 'https://maps.app.goo.gl/yV6kNcTJyoE69uru5' },
  { id: 11, name: 'Olympians Arena', address: 'Location TBD', area: 'Hyderabad', position: { lat: 17.4000, lng: 78.4400 }, mapsUrl: 'https://maps.app.goo.gl/MWz7N2oxbRfbMeFdA' },
];

const AcademyMap: React.FC = () => {
  const mapCenter: LatLngExpression = [17.415, 78.43];

  React.useEffect(() => {
    const configureLeafletIcons = async () => {
      const L = await import('leaflet');

      // @ts-expect-error Leaflet stores this private icon URL resolver on the prototype.
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });
    };

    configureLeafletIcons();
  }, []);

  return (
    <section id="contact" className="bg-slate-50 py-14 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Our Branches Across Hyderabad
          </h2>
        </div>

        <div className="h-[420px] w-full overflow-hidden rounded-2xl shadow-xl md:h-[540px]">
          <MapContainer
            center={mapCenter}
            zoom={12}
            scrollWheelZoom={false}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright"></a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {locations.map((loc) => (
              <Marker
                key={loc.id}
                position={[loc.position.lat, loc.position.lng] as LatLngExpression}
                eventHandlers={{
                  mouseover: (event: { target: { openPopup: () => void } }) => {
                    event.target.openPopup();
                  },
                  mouseout: (event: { target: { closePopup: () => void } }) => {
                    event.target.closePopup();
                  },
                  click: () => {
                    window.open(loc.mapsUrl, '_blank');
                  }
                }}
              >
                <Popup>
                  <div style={{ padding: '1rem', maxWidth: '250px' }}>
                    <h3 style={{ margin: 0, marginBottom: '0.5rem' }}>{loc.name}</h3>
                    <p style={{ margin: '0.25rem 0' }}><strong>Address:</strong> {loc.address}</p>
                    <p style={{ margin: '0.25rem 0' }}><strong>Area:</strong> {loc.area}</p>
                    <button
                      style={{
                        marginTop: '0.5rem',
                        padding: '0.5rem 1rem',
                        backgroundColor: '#facc15',
                        color: '#1e3a8a',
                        border: 'none',
                        borderRadius: '9999px',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: 'bold'
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(loc.mapsUrl, '_blank');
                      }}
                    >
                      View on Google Maps
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </section>
  );
};

export default AcademyMap;
