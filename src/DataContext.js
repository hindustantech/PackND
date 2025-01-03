import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create context
export const DataContext = createContext();

// Create a provider component
export const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

  const fetchData = async () => {
    try {
      const id = localStorage.getItem("id");
    
      const response = await axios.get(`${apiBaseUrl}/getuser/${id}`);
      setData(response.data);
     
    } catch (error) {
      setError(error.message); // Set error message in state
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // Set loading to false in finally block
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ data, searchResults, setSearchResults, loading, error }}>
      {children}
    </DataContext.Provider>
  );
};
