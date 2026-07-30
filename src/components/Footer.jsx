import React from 'react';
import { Link } from 'react-router-dom';

// Accept the onOpenListModal prop here
export default function Footer({ onOpenListModal }) {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-auto border-t border-gray-800">
      <div className="container mx-auto px-4 max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div>
          <h3 className="text-xl font-bold mb-4 text-green-500">TuKhel</h3>
          <p className="text-gray-400 text-sm">तु खेळ, आम्ही जोडतो.<br/>Latur's premier sports venue discovery platform.</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link to="/" className="hover:text-green-400 transition">Home</Link></li>
            
            {/* Convert this into a button that triggers the modal */}
            <li>
              <button 
                onClick={onOpenListModal} 
                className="hover:text-green-400 transition text-left"
              >
                List Your Turf
              </button>
            </li>
            
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <p className="text-sm text-gray-400">Email: support@tukhel.com</p>
          <p className="text-sm text-gray-400 mt-2">📍 Latur, Maharashtra</p>
        </div>
        
      </div>
      
      <div className="text-center text-xs text-gray-600 mt-10 pt-4 border-t border-gray-800">
        &copy; {new Date().getFullYear()} TuKhel. All rights reserved.
      </div>
    </footer>
  );
}