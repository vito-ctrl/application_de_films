import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './components/Header';
import { Heart } from 'lucide-react';

export default function Tplaying () {
  const [trending, setTrending] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on component mount
  const url = 'https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MjE5ZDQ3M2NkYzA1YjZlODEyNzBkMTViNWVjNTE0MCIsIm5iZiI6MTc0NDEwMjkwNC43MTEsInN1YiI6IjY3ZjRlNWY4NmMzNTgzYzk3NTk5NmFjMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rObgl_DLu_QgnydpuBGbvGO2r-8Ctrh0zZpLWwERfhU'
  }
};

  // Fetch trending movies
  useEffect(() => {
    fetch(url, options)
      .then(res => res.json())
      .then(json => setTrending(json.results))
      .catch(err => console.error(err));
  }, []);

  // Toggle favorite status of a movie
  const toggleFavorite = (movie) => {
    const isFavorite = favorites.some(fav => fav.id === movie.id);
    let updatedFavorites;
    
    if (isFavorite) {
      // Remove from favorites
      updatedFavorites = favorites.filter(fav => fav.id !== movie.id);
    } else {
      // Add to favorites
      updatedFavorites = [...favorites, movie];
    }
    
    // Update state and localStorage
    setFavorites(updatedFavorites);
    localStorage.setItem('movieFavorites', JSON.stringify(updatedFavorites));
  };

  // Check if a movie is in favorites
  const isMovieFavorite = (movieId) => {
    return favorites.some(fav => fav.id === movieId);
  };

  return (
    <div className="bg-black dark:bg-white min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-orange-500">Playing Tv Series</h1>
        
        {trending.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {trending.map(movie => (
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
                      onClick={() => toggleFavorite(movie)}
                      className="focus:outline-none"
                    >
                      <Heart 
                        size={24} 
                        className={isMovieFavorite(movie.id) 
                          ? "fill-red-500 text-red-500" 
                          : "text-gray-400 dark:text-gray-600"}
                      />
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
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600"></div>
            <span className="ml-3 text-lg text-gray-700">Loading popular movies...</span>
          </div>
        )}
      </div>
    </div>
  );
}