import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import TurfCard from '../components/TurfCard';
import { mockTurfs } from '../data/mockTurfs';

export default function HomePage() {
  // Shuffle turfs randomly on initial load/refresh, keeping pagination chunks unique
  const [allTurfs] = useState(() => [...mockTurfs].sort(() => Math.random() - 0.5));

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isScrolled, setIsScrolled] = useState(false);
  const itemsPerPage = 6; // Set to multiple of 6

  // Track scroll position to show/hide the pinned search bar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 350);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredTurfs = allTurfs.filter((turf) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      turf.name.toLowerCase().includes(searchLower) ||
      turf.address.toLowerCase().includes(searchLower) ||
      turf.sports.some(sport => sport.toLowerCase().includes(searchLower))
    );
  });

  const totalPages = Math.ceil(filteredTurfs.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTurfs = filteredTurfs.slice(indexOfFirstItem, indexOfLastItem);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // --- NEW: Scroll to the top of the GRID, not the top of the page ---
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    const gridElement = document.getElementById('venues-grid');
    if (gridElement) {
      gridElement.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300 relative">

      {/* PINNED SEARCH BAR (Appears fixed at top when scrolled past hero) */}
      <div className={`fixed top-4 left-0 right-0 z-40 px-4 transition-all duration-300 transform ${isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'
        }`}>
        <div className="max-w-xl mx-auto bg-white/95 dark:bg-gray-900/95 backdrop-blur-md p-1.5 rounded-full shadow-2xl border border-gray-200 dark:border-gray-800 flex items-center">
          <input
            type="text"
            placeholder="Search turfs by name, location, or sport..."
            className="w-full px-4 py-2 text-sm text-gray-800 dark:text-gray-200 outline-none bg-transparent rounded-full placeholder-gray-400"
            value={searchTerm}
            onChange={handleSearch}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 px-2 text-xs font-bold"
            >
              ✕
            </button>
          )}
          <span className="bg-green-700 text-white px-4 py-2 rounded-full text-xs font-bold">
            Search
          </span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative shadow-sm pb-12 pt-12 transition-colors duration-300 overflow-hidden bg-gradient-to-br from-green-800 via-green-700 to-green-900 dark:from-green-800 dark:to-green-950 dark:border-b dark:border-green-900/50">

        {/* CSS-Only Dot Pattern */}
        <div
          className="absolute inset-0 z-0 opacity-10 dark:opacity-10"
          style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}
        />

        {/* Hero Content */}
        <header className="relative z-10 text-white px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 leading-tight drop-shadow-md">
            तु खेळ, आम्ही जोडतो.
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90 px-2 drop-shadow-md">
            Discover and connect with Latur's premier sports venues.
          </p>

          {/* Main Hero Search Bar */}
          <div className="max-w-xl mx-auto bg-transparent sm:bg-white sm:dark:bg-gray-900 sm:p-2 sm:rounded-full sm:shadow-2xl flex flex-col sm:flex-row items-center gap-3 sm:gap-0 sm:border sm:border-transparent sm:dark:border-green-800 transition-colors duration-300">
            <input
              type="text"
              placeholder="Search by turf name, location, or sport..."
              className="w-full px-6 py-3 sm:py-2 text-gray-800 dark:text-gray-200 outline-none bg-white dark:bg-gray-900 sm:bg-transparent rounded-full sm:rounded-none shadow-md sm:shadow-none placeholder-gray-500 dark:placeholder-gray-400"
              value={searchTerm}
              onChange={handleSearch}
            />
            <button className="w-full sm:w-auto bg-green-700 sm:bg-green-600 dark:bg-green-600 text-white px-6 py-3 sm:py-2 rounded-full font-bold hover:bg-green-800 sm:hover:bg-green-700 dark:hover:bg-green-500 transition shadow-md sm:shadow-none">
              Search
            </button>
          </div>
        </header>
      </div>

      {/* Main Grid Area - Added id="venues-grid" and scroll-mt-24 */}
      <main id="venues-grid" className="flex-grow container mx-auto px-4 py-8 sm:py-12 max-w-6xl scroll-mt-24">

        {/* Featured Venues Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 sm:gap-0 mb-6 border-b border-gray-200 dark:border-gray-800 pb-4 transition-colors duration-300">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">Featured Venues</h2>
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1">Page {totalPages === 0 ? 0 : currentPage} of {totalPages}</p>
          </div>
          <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-800 px-3 py-1 rounded-md sm:bg-transparent sm:px-0 sm:py-0">
            {filteredTurfs.length} {filteredTurfs.length === 1 ? 'Turf' : 'Turfs'} Found
          </div>
        </div>

        {currentTurfs.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-10">
              {currentTurfs.map((turf) => (
                <TurfCard key={turf.id} turf={turf} />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-4 border-t border-gray-200 dark:border-gray-800 pt-8 transition-colors duration-300">
                <button
                  onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 sm:px-5 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm"
                >
                  &larr; Prev
                </button>

                <span className="text-sm sm:text-base text-gray-600 dark:text-gray-400 font-medium">
                  {currentPage} / {totalPages}
                </span>

                <button
                  onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 sm:px-5 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm"
                >
                  Next &rarr;
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16 sm:py-20 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 transition-colors duration-300">
            <span className="text-4xl mb-4 block">🔍</span>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">No venues found</h3>
            <p className="text-gray-500 dark:text-gray-400">Try searching for a different sport or location.</p>
            <button
              onClick={() => { setSearchTerm(''); setCurrentPage(1); }}
              className="mt-4 text-green-700 dark:text-green-400 font-semibold hover:underline"
            >
              Clear Search
            </button>
          </div>
        )}
      </main>

    </div>
  );
}