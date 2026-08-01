import React from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactGA from 'react-ga4';
import { mockTurfs } from '../data/mockTurfs';

export default function TurfDetailsPage() {
  const params = useParams();
  const routeParam = params.slug || params.id;

  const createSlug = (name) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  };

  const turf = mockTurfs.find(t => createSlug(t.name) === routeParam);
  const placeholderImage = "https://images.unsplash.com/photo-1529900965798-240f1c4e7fcd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80";

  if (!turf) {
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

  // --- GOOGLE ANALYTICS TRACKING FUNCTIONS ---
  const handleWhatsAppClick = () => {
    ReactGA.event({
      category: "Lead Generation",
      action: "Clicked WhatsApp",
      label: turf.name // Tracks exactly WHICH turf got the message
    });
  };

  const handleCallClick = () => {
    ReactGA.event({
      category: "Lead Generation",
      action: "Clicked Call",
      label: turf.name // Tracks exactly WHICH turf got the call
    });
  };
  // -------------------------------------------

  return (
    // Clean outer wrapper (inherits from index.css)
    <div className="pb-12">

      {/* Hero Image Section - Added dark:bg-gray-800 */}
      <div
        className="w-full bg-gray-300 dark:bg-gray-800 relative bg-cover bg-center"
        style={{ backgroundImage: `url('${placeholderImage}')` }}
      >
        <div className="absolute inset-0 bg-black/60 dark:bg-black/70"></div>

        {/* 
          FIXED: Removed 'absolute bottom-0' and fixed heights.
          Added 'relative z-10' and vertical padding (py-12 md:py-16) to naturally space the content.
        */}
        <div className="relative z-10 w-full px-4 py-12 md:py-16 container mx-auto max-w-5xl text-white">
          <Link to="/" className="text-sm font-semibold text-gray-300 hover:text-white mb-6 inline-block tracking-wide">
            &larr; BACK TO DIRECTORY
          </Link>
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-3xl md:text-5xl font-extrabold">{turf.name}</h1>
            {turf.isVerified && (
              <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-sm">
                ✓ Verified
              </span>
            )}
          </div>
          <p className="text-lg opacity-90 flex items-center">
            <span className="mr-2">📍</span> {turf.address}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-5xl mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Main Content */}
        <div className="md:col-span-2 space-y-8">
          {/* Card 1: Added dark:bg-gray-900, dark:border-gray-800, dark:text-white */}
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 transition-colors duration-300">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Available Sports</h3>
            <div className="flex flex-wrap gap-2">
              {turf.sports.map(sport => (
                <span key={sport} className="bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-400 border border-green-200 dark:border-green-800/50 px-4 py-2 rounded-lg font-semibold transition-colors duration-300">
                  {sport}
                </span>
              ))}
            </div>

            {turf.amenities && turf.amenities.length > 0 && (
              <>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Amenities</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-600 dark:text-gray-400">
                  {turf.amenities.map(amenity => (
                    <li key={amenity} className="flex items-center">
                      <span className="text-green-500 dark:text-green-400 mr-2 font-bold">✓</span> {amenity}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          {/* Card 2: Map Section */}
          {/* Card 2: Map Section */}
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 transition-colors duration-300">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Location</h3>
            <div className="bg-gray-100 dark:bg-gray-800 w-full h-64 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 transition-colors duration-300 relative">

              <iframe
                title={`Map of ${turf.name}`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                // This is the 100% FREE magic URL! No API key needed.
                src={`https://maps.google.com/maps?q=${encodeURIComponent(`${turf.name}, ${turf.address}`)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              ></iframe>

            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Card 3: Pricing Section */}
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 sticky top-6 transition-colors duration-300">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Pricing</h3>
            <p className="text-3xl font-extrabold text-gray-900 dark:text-white mb-1">
              {turf.priceDay}
            </p>
            {turf.priceDay !== "Contact Venue" && <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">per hour</p>}

            <div className="space-y-3 mt-6">
              {turf.phone ? (
                <a href={`tel:${turf.phone}`} onClick={handleCallClick} className="block w-full text-center bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-3 rounded-lg font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300 border border-transparent dark:border-gray-700">
                  📞 Call Venue
                </a>
              ) : (
                <button disabled className="block w-full bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 py-3 rounded-lg font-bold cursor-not-allowed opacity-60">
                  📞 Number Unavailable
                </button>
              )}

              {turf.whatsapp ? (
                <a href={`https://wa.me/91${turf.whatsapp}?text=Hi,%20I%20saw%20${encodeURIComponent(turf.name)}%20on%20TuKhel%20and%20wanted%20to%20inquire%20about%20slots.`} onClick={handleWhatsAppClick} target="_blank" rel="noreferrer" className="block w-full text-center bg-green-600 dark:bg-green-700 text-white py-3 rounded-lg font-bold hover:bg-green-700 dark:hover:bg-green-600 transition-colors duration-300 shadow-md dark:shadow-none">
                  💬 Message on WhatsApp
                </a>
              ) : (
                <button disabled className="block w-full bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-600 py-3 rounded-lg font-bold cursor-not-allowed opacity-60">
                  💬 WhatsApp Unavailable
                </button>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}