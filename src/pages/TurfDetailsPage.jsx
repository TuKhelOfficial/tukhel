import React from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactGA from 'react-ga4';
import { useTurfs } from '../context/TurfContext';

export default function TurfDetailsPage() {
  const { turfs, loading } = useTurfs();

  const params = useParams();
  const routeParam = params.slug || params.id;

  const createSlug = (name) => {
    if (!name) return '';
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  };

  const turf = turfs.find(t => createSlug(t.name) === routeParam);

  // --- WAIT FOR GOOGLE SHEETS BEFORE SAYING "NOT FOUND" ---
  if (!turf) {
    if (loading) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950">
          <div className="animate-spin text-5xl mb-4">⚽</div>
          <p className="text-gray-500 dark:text-gray-400 font-medium">Fetching venue details...</p>
        </div>
      );
    }

    return (
      <div className="container mx-auto px-4 py-20 text-center flex flex-col items-center">
        <span className="text-6xl mb-6 block">🏟️</span>
        <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Venue not found</h2>
        <p className="text-xl text-gray-500 dark:text-gray-400 mb-8">
          We couldn't find the turf you were looking for.
        </p>
        <Link to="/" className="bg-green-700 text-white px-8 py-3 rounded-full font-bold hover:bg-green-800 transition shadow-lg">
          Return to Directory
        </Link>
      </div>
    );
  }

  // Safely parse sports array
  const sportsList = Array.isArray(turf.sports)
    ? turf.sports
    : typeof turf.sports === 'string'
      ? turf.sports.split(',').map(s => s.trim()).filter(Boolean)
      : [];

  // Safely parse amenities array
  const amenitiesList = Array.isArray(turf.amenities)
    ? turf.amenities
    : typeof turf.amenities === 'string'
      ? turf.amenities.split(',').map(a => a.trim()).filter(Boolean)
      : [];

  const handleWhatsAppClick = () => {
    ReactGA.event({
      category: "Lead Generation",
      action: "Clicked WhatsApp",
      label: turf.name 
    });
  };

  const handleCallClick = () => {
    ReactGA.event({
      category: "Lead Generation",
      action: "Clicked Call",
      label: turf.name 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 pb-28 md:pb-12 transition-colors duration-300">
      
      {/* 
        HERO SECTION 
        UPDATED: Now perfectly matches the Home Page's vibrant green gradient and dot pattern!
      */}
      <div className="relative shadow-sm pb-12 pt-12 transition-colors duration-300 overflow-hidden bg-gradient-to-br from-green-800 via-green-700 to-green-900 dark:from-green-800 dark:to-green-950 dark:border-b dark:border-green-900/50">
        
        {/* CSS-Only Dot Pattern (Exact match to HomePage) */}
        <div
          className="absolute inset-0 z-0 opacity-10 dark:opacity-10"
          style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}
        />

        {/* Content Layer */}
        <div className="relative z-10 container mx-auto max-w-5xl px-4 py-6 md:py-10 text-center md:text-left">
          
          <Link 
            to="/" 
            className="inline-flex items-center text-sm font-bold uppercase tracking-wider text-green-100 hover:text-white mb-6 transition drop-shadow-sm"
          >
            &larr; Back to Directory
          </Link>

          <div className="flex flex-col md:flex-row md:items-center gap-3 mb-3">
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white drop-shadow-md">
              {turf.name}
            </h1>
            {turf.isVerified && (
              <span className="inline-flex self-center md:self-auto bg-green-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-sm border border-green-400">
                ✓ Verified
              </span>
            )}
          </div>

          <p className="text-base md:text-lg text-green-50 flex items-center justify-center md:justify-start gap-2 drop-shadow-md">
            <span>📍</span> {turf.address}
          </p>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <div className="container mx-auto max-w-5xl px-4 mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: SPORTS, AMENITIES, MAP */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Sports Card */}
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 transition-colors">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <span>⚽</span> Available Sports
            </h3>
            
            {sportsList.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {sportsList.map((sport, i) => (
                  <span 
                    key={i} 
                    className="bg-green-50 dark:bg-green-950/50 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800/60 px-4 py-2 rounded-xl text-sm font-bold shadow-xs transition-colors"
                  >
                    {sport}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">Contact venue for details.</p>
            )}

            {/* Amenities Section */}
            {amenitiesList.length > 0 && (
              <>
                <hr className="my-6 border-gray-100 dark:border-gray-800 transition-colors" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <span>✨</span> Amenities
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                  {amenitiesList.map((amenity, i) => (
                    <li key={i} className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800/40 px-3 py-2 rounded-lg border border-gray-100 dark:border-gray-800 transition-colors">
                      <span className="text-green-500 font-bold">✓</span> {amenity}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          {/* Location Map Card */}
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 transition-colors">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <span>🗺️</span> Location Map
            </h3>
            <div className="w-full h-72 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-inner">
              <iframe
                title={`Map of ${turf.name}`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(`${turf.name}, ${turf.address}`)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: PRICING & SIDEBAR ACTION */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 sticky top-6 transition-colors">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
              Pricing Details
            </h3>
            
            <div className="flex items-baseline gap-1 my-2">
              <p className="text-3xl font-black text-gray-900 dark:text-white">
                {turf.priceDay && turf.priceDay.toLowerCase() !== "contact venue" ? `₹${turf.priceDay}` : "Contact Venue"}
              </p>
              {turf.priceDay && turf.priceDay.toLowerCase() !== "contact venue" && (
                <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">/ hour</span>
              )}
            </div>

            {/* Desktop Action Buttons */}
            <div className="space-y-3 mt-6 hidden md:block">
              {turf.phone ? (
                <a 
                  href={`tel:${turf.phone}`} 
                  onClick={handleCallClick} 
                  className="flex items-center justify-center gap-2 w-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white py-3.5 rounded-xl font-bold transition border border-blue-200 dark:border-blue-900/50 shadow-xs"
                >
                  📞 Call Venue
                </a>
              ) : (
                <button disabled className="w-full bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 py-3.5 rounded-xl font-bold cursor-not-allowed border border-transparent">
                  📞 Number Unavailable
                </button>
              )}

              {turf.whatsapp ? (
                <a 
                  href={`https://wa.me/91${turf.whatsapp}?text=Hi,%20I%20saw%20${encodeURIComponent(turf.name)}%20on%20TuKhel%20and%20wanted%20to%20inquire%20about%20slots.`} 
                  onClick={handleWhatsAppClick} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white py-3.5 rounded-xl font-bold transition shadow-md"
                >
                  💬 Message on WhatsApp
                </a>
              ) : (
                <button disabled className="w-full bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 py-3.5 rounded-xl font-bold cursor-not-allowed border border-transparent">
                  💬 WhatsApp Unavailable
                </button>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* MOBILE STICKY BOTTOM BAR */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 p-3 z-50 shadow-2xl transition-colors">
        <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
          {turf.phone ? (
            <a 
              href={`tel:${turf.phone}`} 
              onClick={handleCallClick} 
              className="flex items-center justify-center gap-2 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-bold py-3 px-2 rounded-xl border border-blue-200 dark:border-blue-900/40 text-base transition-colors"
            >
              📞 Call
            </a>
          ) : (
            <button disabled className="flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 font-bold py-3 px-2 rounded-xl cursor-not-allowed text-base transition-colors">
              📞 Unavailable
            </button>
          )}

          {turf.whatsapp ? (
            <a 
              href={`https://wa.me/91${turf.whatsapp}?text=Hi,%20I%20saw%20${encodeURIComponent(turf.name)}%20on%20TuKhel%20and%20wanted%20to%20inquire%20about%20slots.`} 
              onClick={handleWhatsAppClick} 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center justify-center gap-2 bg-green-600 text-white font-bold py-3 px-2 rounded-xl shadow-md text-base transition-colors"
            >
              💬 WhatsApp
            </a>
          ) : (
            <button disabled className="flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 font-bold py-3 px-2 rounded-xl cursor-not-allowed text-base transition-colors">
              💬 Unavailable
            </button>
          )}
        </div>
      </div>

    </div>
  );
}