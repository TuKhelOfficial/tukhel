import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function TurfCard({ turf }) {
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [suggestionText, setSuggestionText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const placeholderImage = "https://images.unsplash.com/photos-1529900965798-240f1c4e7fcd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
  
  const createSlug = (name) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  };

  const turfSlug = createSlug(turf.name);

  const handleSuggestionSubmit = async (e) => {
    e.preventDefault();
    if (!suggestionText.trim()) return;

    const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbwwujZqtl865AHyfgMa-3GnU1seMfmx-2aArMNRK1InY1ly1cQ1BNs1DXnWbCXFVOyS/exec';

    // Use URLSearchParams to avoid CORS preflight errors on the first click
    const formData = new URLSearchParams();
    formData.append('date', new Date().toLocaleString());
    formData.append('turf', turf.name);
    formData.append('slug', turfSlug);
    formData.append('suggestion', suggestionText);

    try {
      await fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: formData, // Automatically sets correct form headers without triggering preflight
      });

      setSubmitted(true);
      setSuggestionText('');
      setTimeout(() => {
        setSubmitted(false);
        setIsSuggesting(false);
      }, 2500);
    } catch (error) {
      console.error('Error submitting suggestion:', error);
      alert('Failed to send suggestion. Please try again.');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-none border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl dark:hover:shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:-translate-y-1 hover:border-green-300 dark:hover:border-gray-600 transition-all duration-300 flex flex-col h-full justify-between">
      
      <div>
        <Link to={`/turf/${turfSlug}`} className="block relative group shrink-0">
          <div 
            className="h-44 bg-gray-200 dark:bg-gray-700 relative bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
            style={{ backgroundImage: `url('${placeholderImage}')` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            
            {turf.isVerified ? (
              <div className="absolute top-3 right-3 bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-bold shadow-sm flex items-center z-10">
                 <span className="mr-1">✓</span> Verified
              </div>
            ) : (
              <div className="absolute top-3 right-3 bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full font-bold shadow-sm flex items-center z-10">
                 <span className="mr-1">⏳</span> Under Verification
              </div>
            )}
          </div>
        </Link>
        
        <div className="p-5 flex flex-col relative z-10 bg-white dark:bg-gray-800">
          <Link to={`/turf/${turfSlug}`}>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 hover:text-green-700 dark:hover:text-green-400 transition">{turf.name}</h3>
          </Link>
          
          <div className="flex flex-wrap gap-2 mb-3 mt-2">
            {turf.sports.map(sport => (
              <span key={sport} className="text-xs bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-md font-medium">
                {sport}
              </span>
            ))}
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 min-h-[40px]">
            📍 {turf.address}
          </p>

          <div className="mb-4">
            <p className="text-xs text-gray-400 dark:text-gray-500 font-medium uppercase">Rates starting from</p>
            <p className="text-lg font-extrabold text-gray-900 dark:text-white">
              {turf.priceDay}
              {turf.priceDay !== "Contact Venue" && <span className="text-sm font-normal text-gray-500 dark:text-gray-400">/hr</span>}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100 dark:border-gray-700">
            {turf.phone ? (
              <a href={`tel:${turf.phone}`} className="flex items-center justify-center bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-2 rounded-lg text-sm font-bold hover:bg-gray-200 dark:hover:bg-gray-600 transition">
                📞 Call
              </a>
            ) : (
               <button disabled className="flex items-center justify-center bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 py-2 rounded-lg text-sm font-bold cursor-not-allowed opacity-60">
                📞 Call
              </button>
            )}

            {turf.whatsapp ? (
              <a href={`https://wa.me/91${turf.whatsapp}?text=Hi,%20I%20saw%20${encodeURIComponent(turf.name)}%20on%20TuKhel%20and%20wanted%20to%20inquire%20about%20slots.`} target="_blank" rel="noreferrer" className="flex items-center justify-center bg-green-600 text-white py-2 rounded-lg text-sm font-bold hover:bg-green-700 transition">
                💬 WhatsApp
              </a>
            ) : (
              <button disabled className="flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 py-2 rounded-lg text-sm font-bold cursor-not-allowed opacity-60">
                💬 WhatsApp
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="px-5 pb-4 pt-2 border-t border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
        {!isSuggesting ? (
          <button 
            onClick={() => setIsSuggesting(true)}
            className="text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-green-700 dark:hover:text-green-400 transition flex items-center gap-1 w-full justify-between"
          >
            <span>💡 Notice something inaccurate?</span>
            <span className="underline">Suggest Edit</span>
          </button>
        ) : (
          <form onSubmit={handleSuggestionSubmit} className="mt-2 text-left">
            {submitted ? (
              <div className="text-xs text-green-600 dark:text-green-400 font-semibold py-2 text-center bg-green-50 dark:bg-green-900/30 rounded-lg">
                ✓ Thank you! Suggestion received.
              </div>
            ) : (
              <div>
                <textarea 
                  rows="2"
                  placeholder="Suggest a correction (e.g. pricing, timing, sports)..."
                  value={suggestionText}
                  onChange={(e) => setSuggestionText(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 outline-none focus:ring-1 focus:ring-green-600 resize-none"
                  required
                />
                <div className="flex justify-end gap-2 mt-1.5">
                  <button 
                    type="button"
                    onClick={() => setIsSuggesting(false)}
                    className="text-xs px-2.5 py-1 rounded-md text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="text-xs px-3 py-1 rounded-md bg-green-700 hover:bg-green-800 text-white font-bold transition shadow-sm"
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}
          </form>
        )}
      </div>

    </div>
  );
}