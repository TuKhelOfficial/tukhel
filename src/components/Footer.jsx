import React from 'react';
import { Link } from 'react-router-dom';
// Import the same logo used in the Navbar
import logo from '../assets/tukhel-logo.png'; 

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300 py-12 border-t border-gray-800 mt-auto transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-6xl">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* Brand Section */}
          <div className="flex flex-col items-start">
            <Link to="/" className="mb-4 inline-block">
              {/* Logo blends perfectly into the dark background here too */}
              <img 
                src={logo} 
                alt="TuKhel Logo" 
                className="h-12 md:h-14 w-auto rounded-sm opacity-90 hover:opacity-100 transition-opacity" 
              />
            </Link>
            <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
              Discover and connect with Latur's premier sports venues.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-lg font-bold mb-4">Explore</h4>
            <ul className="space-y-2 text-sm font-medium">
              <li>
                <Link to="/" className="text-gray-400 hover:text-green-400 transition-colors">Home Directory</Link>
              </li>
              <li>
                <button className="text-gray-400 hover:text-green-400 transition-colors">List Your Turf</button>
              </li>
              <li>
                <button className="text-gray-400 hover:text-green-400 transition-colors">Verification Process</button>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="text-white text-lg font-bold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start text-gray-400">
                <span className="mr-2">📍</span> 
                <span>Latur, Maharashtra<br/>India</span>
              </li>
              <li className="flex items-center text-gray-400">
                <span className="mr-2">📧</span> 
                <a href="mailto:tukhel.official@gmail.com" className="hover:text-green-400 transition-colors">
                  tukhel.official@gmail.com
                </a>
              </li>
            </ul>
          </div>
          
        </div>

        {/* Copyright Section */}
        <div className="pt-8 border-t border-gray-800 text-center flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} TuKhel. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <button className="hover:text-gray-300 transition-colors">Privacy Policy</button>
            <button className="hover:text-gray-300 transition-colors">Terms of Service</button>
          </div>
        </div>

      </div>
    </footer>
  );
}