import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ReactGA from 'react-ga4';

// Component Imports
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import TurfDetailsPage from './pages/TurfDetailsPage';
import Footer from './components/Footer';
import ListTurfModal from './components/ListTurfModal';
import AnalyticsTracker from './components/AnalyticsTracker';

// NEW: Import the ScrollToTop component
import ScrollToTop from './components/ScrollToTop';

// Initialize Google Analytics with your specific Measurement ID
ReactGA.initialize("G-H9CYLR4DW6");

function App() {
  // Global state for the List Turf Modal
  const [isListModalOpen, setIsListModalOpen] = useState(false);

  return (
    <BrowserRouter basename="/tukhel">
      {/* This invisible component tracks page views automatically */}
      <AnalyticsTracker />

      {/* NEW: Place it right here! Now every page change will start at the top */}
      <ScrollToTop />

      <div className="min-h-screen flex flex-col relative">

        {/* Pass the open function as a prop to Navbar */}
        <Navbar onOpenListModal={() => setIsListModalOpen(true)} />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/turf/:slug" element={<TurfDetailsPage />} />

            <Route path="*" element={
              <div className="container mx-auto px-4 py-32 text-center flex flex-col items-center">
                <span className="text-6xl mb-6 block">🏟️</span>
                <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Out of Bounds!</h2>
                <p className="text-xl text-gray-500 dark:text-gray-400 mb-8">
                  The page or turf you are looking for doesn't exist.
                </p>
                <Link to="/" className="bg-green-700 text-white px-8 py-3 rounded-full font-bold hover:bg-green-800 transition shadow-lg">
                  Return to Directory
                </Link>
              </div>
            } />
          </Routes>
        </main>

        {/* Pass the open function to Footer as well */}
        <Footer onOpenListModal={() => setIsListModalOpen(true)} />
      </div>

      {/* Render the modal at the root level, sitting above all pages */}
      <ListTurfModal
        isOpen={isListModalOpen}
        onClose={() => setIsListModalOpen(false)}
      />
    </BrowserRouter>
  );
}

export default App;