import React, { useState } from 'react';

export default function ListTurfModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    turfName: '', ownerName: '', phone: '', whatsapp: '', address: '', sports: '', openTime: '', closeTime: '', price: ''
  });
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error

  // Your Google Apps Script Web App URL
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxHeC9h0o9Y8LjjTokRS1Ppx-NmKJTO_mL_Xuo-bHL-pxBzEFx-ADMx04xxdGpBRdPWkw/exec";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    // Convert state object to FormData for Google Apps Script
    const formBody = new FormData();
    Object.keys(formData).forEach(key => formBody.append(key, formData[key]));

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: formBody,
        mode: 'no-cors'
      });
      
      setStatus('success');
      setTimeout(() => {
        onClose();
        setStatus('idle');
        setFormData({ turfName: '', ownerName: '', phone: '', whatsapp: '', address: '', sports: '', openTime: '', closeTime: '', price: '' });
      }, 3000);
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  if (!isOpen) return null;

  return (
    // z-[100] prevents overlapping with navbars
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
      
      {/* max-h-[90dvh] and flex-col ensure it doesn't get hidden under mobile browser bars */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg flex flex-col max-h-[90dvh] relative overflow-hidden">
        
        {/* Header - shrink-0 keeps it pinned at the top */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-900/50 shrink-0">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">List Your Turf</h2>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-3xl leading-none p-2 -mr-2"
          >
            &times;
          </button>
        </div>

        {/* Form Body - overflow-y-auto makes it scrollable on small screens */}
        <div className="p-6 overflow-y-auto">
          {status === 'success' ? (
            <div className="text-center py-8">
              <span className="text-5xl mb-4 block">🎉</span>
              <h3 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">Request Sent!</h3>
              <p className="text-gray-600 dark:text-gray-300">Our team will verify your details and list your turf shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Turf Name *</label>
                  <input required type="text" name="turfName" value={formData.turfName} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 outline-none" placeholder="Royal Arena" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Owner Name *</label>
                  <input required type="text" name="ownerName" value={formData.ownerName} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 outline-none" placeholder="John Doe" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number *</label>
                  <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 outline-none" placeholder="+91 9876543210" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">WhatsApp Number *</label>
                  <input required type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 outline-none" placeholder="+91 9876543210" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sports Available *</label>
                <input required type="text" name="sports" value={formData.sports} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 outline-none" placeholder="e.g. Cricket, Football" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Address *</label>
                <input required type="text" name="address" value={formData.address} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 outline-none" placeholder="Near Ausa Road, Latur" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Opening Time</label>
                  <input required type="time" name="openTime" value={formData.openTime} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Closing Time</label>
                  <input required type="time" name="closeTime" value={formData.closeTime} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 outline-none" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Hourly Price (₹) *</label>
                <input required type="number" name="price" value={formData.price} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 outline-none" placeholder="e.g. 800" />
              </div>

              {status === 'error' && <p className="text-red-500 text-sm">Something went wrong. Please try again.</p>}

              <button 
                type="submit" 
                disabled={status === 'submitting'}
                className="w-full mt-4 bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-4 rounded-lg transition-colors disabled:opacity-70 flex justify-center items-center shrink-0"
              >
                {status === 'submitting' ? 'Submitting...' : 'Submit Listing Details'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}