import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { AuthProvider } from './AuthContext';


const ProfileContext = createContext();

const ProfileProvider = ({ children }) => {
  const { pathname } = useLocation();
  const [initPath] = useState(pathname);
  const [profile, setProfile] = useState(null);
  const [hasToken, setHasToken] = useState(null);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserProfile = async () => {
    
    try {

      setHasToken(localStorage.getItem('token'))

      const response = await axios.get('https://quit-smoking-app.onrender.com/api/users/profile', {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      });
        console.log(response)
      if (response.status === 200) {
        setProfile(response.data.user);
        
        // console.log(response.data.user);
      } else {
        throw new Error('Failed to fetch user profile');
      }
    } catch (error) {
      console.error('Error retrieving user profile:', error);
      setProfile(null); // Set profile to null on error
    }
  };

  const fetchFromScrape = async () => {
    try {
      const response = await axios.get('http://localhost:3000/scrape');
      const data = response.data;

      // Process the scraped data here
      console.log(data.title);

      data.links.forEach((link) => {
        console.log('Link:', link.text, 'URL:', link.href);
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };



  useEffect(() => {
    fetchUserProfile();
  }, [isLoggedIn]);

  return (
    <ProfileContext.Provider
      value={{ profile, setProfile, fetchUserProfile, hasToken, setHasToken, isLoggedIn, setLoggedIn, isLoading, setIsLoading, initPath }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export { ProfileContext, ProfileProvider };
