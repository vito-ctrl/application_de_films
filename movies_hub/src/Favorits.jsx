import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './components/Header';
import { Heart, Home } from 'lucide-react';
import Footer from './components/Footer';

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem('movieFavorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Remove a movie from favorites
  const removeFromFavorites = (movieId) => {
    const updatedFavorites = favorites.filter(movie => movie.id !== movieId);
    setFavorites(updatedFavorites);
    localStorage.setItem('movieFavorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="bg-black dark:bg-white min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-800">My Favorite Movies</h1>
          <Link to="/" className="flex items-center text-orange-500 hover:text-orange-700">
            <Home className="mr-2" size={20} />
            <span>Back to Home</span>
          </Link>
        </div>

        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {favorites.map(movie => (
              <div key={movie.id} className="bg-black dark:bg-white rounded-xl overflow-hidden shadow-lg transform transition duration-300 hover:scale-105">
                <div className="relative">
                  <img 
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                    alt={movie.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-0 right-0 bg-orange-500 text-white dark:text-black px-3 py-1 rounded-bl-lg font-medium">
                    {movie.vote_average.toFixed(1)}
                  </div>
                </div>
                
                <div className="p-5">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-2xl font-bold text-gray-400 dark:text-gray-700 line-clamp-1">{movie.title}</h2>
                    <button 
                      onClick={() => removeFromFavorites(movie.id)}
                      className="focus:outline-none"
                    >
                      <Heart size={24} className="fill-red-500 text-red-500" />
                    </button>
                  </div>
                  
                  <div className="flex items-center text-gray-300 dark:text-gray-600 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm">{new Date(movie.release_date).toLocaleDateString()}</span>
                  </div>
                  
                  <p className="text-gray-200 dark:text-gray-600 text-sm mb-4 line-clamp-3">{movie.overview}</p>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-gray-200 dark:text-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span className="text-sm">{movie.popularity.toFixed(0)}</span>
                    </div>
                    
                    <button className="bg-orange-500 hover:bg-orange-700 text-white dark:text-black px-4 py-2 rounded-lg text-sm font-medium transition duration-300">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-800 dark:bg-gray-200 rounded-lg p-8 text-center">
            <h2 className="text-xl text-gray-300 dark:text-gray-700 mb-4">You haven't added any favorite movies yet!</h2>
            <Link to="/" className="inline-block bg-orange-500 hover:bg-orange-700 text-white dark:text-black px-6 py-3 rounded-lg text-lg font-medium transition duration-300">
              Browse Movies
            </Link>
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
}