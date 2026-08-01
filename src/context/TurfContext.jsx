import React, { createContext, useState, useEffect, useContext } from 'react';

export const TurfContext = createContext();
export const useTurfs = () => useContext(TurfContext);

export const TurfProvider = ({ children }) => {
  // 1. Try to load from browser memory first. If nothing is there, start with an EMPTY array.
  const [turfs, setTurfs] = useState(() => {
    try {
      const savedTurfs = localStorage.getItem('tukhel_turfs');
      return savedTurfs ? JSON.parse(savedTurfs) : [];
    } catch (e) {
      return [];
    }
  });

  // 2. Track if we are currently talking to Google Sheets
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ⚠️ REPLACE THIS WITH YOUR ACTUAL GOOGLE APP SCRIPT URL
    const GOOGLE_SHEET_API_URL = 'https://script.google.com/macros/s/AKfycbxW8LYnm5AmIkbvO_IQro365jbrje0CHUD40D_4gcGNnR0KoRttjx08PQ6pjXtAQ_5l/exec';

    fetch(GOOGLE_SHEET_API_URL)
      .then(res => res.json())
      .then(freshData => {
        if (freshData && freshData.length > 0) {
          setTurfs(freshData);
          localStorage.setItem('tukhel_turfs', JSON.stringify(freshData));
        }
        setLoading(false); // We got the data, stop loading
      })
      .catch(err => {
        console.error("Failed to fetch from Google Sheets:", err);
        setLoading(false);
      });
  }, []);

  return (
    // Pass 'loading' down so the Details page can use it!
    <TurfContext.Provider value={{ turfs, loading }}>
      {children}
    </TurfContext.Provider>
  );
};