import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import TurfDetailsPage from './pages/TurfDetailsPage';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter basename="/tukhel">
      <div className="min-h-screen flex flex-col">
        <Navbar />

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

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;