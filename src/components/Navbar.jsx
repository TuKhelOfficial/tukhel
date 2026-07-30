import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/tukhel-logo.png';
import ListTurfModal from './ListTurfModal'; // <-- Import the modal

export default function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  const [isListModalOpen, setIsListModalOpen] = useState(false); // <-- Add state

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className="w-full bg-green-700 dark:bg-gray-900 text-white transition-colors duration-300 relative z-20 shadow-md">
        <div className="container mx-auto px-4 max-w-6xl flex justify-between items-center h-16">
          
          <Link to="/" className="flex items-center group shrink-0">
            <img src={logo} alt="TuKhel" className="h-8 md:h-10 w-auto transform group-hover:scale-105 transition-transform duration-300"/>
          </Link>
          
          <div className="hidden lg:flex items-center space-x-6">
            <Link to="/" className="text-sm font-medium opacity-90 hover:opacity-100 hover:text-green-200 transition">Home</Link>
            <button onClick={() => scrollToSection('featured-venues')} className="text-sm font-medium opacity-90 hover:opacity-100 hover:text-green-200 transition">Explore Venues</button>
            <span className="text-xs bg-green-800 dark:bg-gray-800 border border-green-600 dark:border-gray-700 px-3 py-1 rounded-full text-green-100 dark:text-green-400 font-semibold tracking-wide">
              ✨ Latur's Premier Sports Hub
            </span>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-4 shrink-0">
            <span className="text-sm font-medium hidden md:inline-flex items-center opacity-90">📍 Latur</span>
            
            <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 rounded-full transition flex items-center justify-center w-9 h-9 md:w-10 md:h-10">
              {isDarkMode ? '☀️' : '🌙'}
            </button>

            {/* --> Update this button to open the modal <-- */}
            <button 
              onClick={() => setIsListModalOpen(true)}
              className="bg-white text-green-800 dark:bg-green-600 dark:text-white px-4 py-2 rounded-full text-sm font-bold shadow-sm hover:shadow-md hover:scale-105 transition-all"
            >
              List Your Turf
            </button>
          </div>
        </div>
      </nav>

      {/* Render the Modal here */}
      <ListTurfModal isOpen={isListModalOpen} onClose={() => setIsListModalOpen(false)} />
    </>
  );
}