import React, {useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom';
import Header from './components/Header';
import { Heart } from 'lucide-react'; // Make sure you import this if you're using it

export default function Sresults() {
    const [results, setResults] = useState({})
    const [favorites, setFavorites] = useState([]) // Add this for favorite functionality

    const location = useLocation();
    const { query } = location.state || {};

    useEffect(() => {
        if (query) {
            console.log(query)
            const url = `https://api.themoviedb.org/3/search/multi?query=${query}`
            const options = {
                method: 'GET',
                headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MjE5ZDQ3M2NkYzA1YjZlODEyNzBkMTViNWVjNTE0MCIsIm5iZiI6MTc0NDEwMjkwNC43MTEsInN1YiI6IjY3ZjRlNWY4NmMzNTgzYzk3NTk5NmFjMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rObgl_DLu_QgnydpuBGbvGO2r-8Ctrh0zZpLWwERfhU'
                }
            };
            fetch(url, options)
            .then(res => res.json())
            .then(json => setResults(json))
            .catch(err => console.error(err));
        }
    }, [query])

    // Add these functions for favorites functionality
    const toggleFavorite = (item) => {
        if (isMovieFavorite(item.id)) {
            setFavorites(favorites.filter(fav => fav !== item.id));
        } else {
            setFavorites([...favorites, item.id]);
        }
    }

    const isMovieFavorite = (id) => {
        return favorites.includes(id);
    }

    console.log(results)
    return (
        <div className="bg-black dark:bg-white min-h-screen">
            <Header />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-center mb-8 text-orange-500">Search Results for: {query}</h1>
                
                {results && results.results && results.results.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                        {results.results.map(item => (
                            <div key={item.id} className="bg-black dark:bg-white rounded-xl overflow-hidden shadow-lg transform transition duration-300 hover:scale-105">
                                <div className="relative">
                                    {item.poster_path ? (
                                        <img 
                                            src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} 
                                            alt={item.title || item.name}
                                            className="w-full h-64 object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-64 bg-gray-800 flex items-center justify-center">
                                            <span className="text-gray-400">No image available</span>
                                        </div>
                                    )}
                                    <div className="absolute top-0 right-0 bg-orange-500 text-white dark:text-black px-3 py-1 rounded-bl-lg font-medium">
                                        {item.vote_average?.toFixed(1)}
                                    </div>
                                </div>
                                
                                <div className="p-5">
                                    <div className="flex justify-between items-center mb-2">
                                        <h2 className="text-2xl font-bold text-gray-400 dark:text-gray-700 line-clamp-1">{item.title || item.name}</h2>
                                        <button 
                                            onClick={() => toggleFavorite(item)}
                                            className="focus:outline-none"
                                        >
                                            <Heart 
                                                size={24} 
                                                className={isMovieFavorite(item.id) 
                                                    ? "fill-red-500 text-red-500" 
                                                    : "text-gray-400 dark:text-gray-600"}
                                            />
                                        </button>
                                    </div>
                                    
                                    <div className="flex items-center text-gray-300 dark:text-gray-600 mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <span className="text-sm">{item.release_date || item.first_air_date || 'N/A'}</span>
                                    </div>
                                    
                                    <p className="text-gray-200 dark:text-gray-600 text-sm mb-4 line-clamp-3">{item.overview}</p>
                                    
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center text-gray-200 dark:text-gray-600">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                            <span className="text-sm">{item.popularity?.toFixed(0)}</span>
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
                        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500"></div>
                        <span className="ml-3 text-lg text-gray-300 dark:text-gray-700">
                            {query ? "Searching..." : "Enter a search term"}
                        </span>
                    </div>
                )}
            </div>
        </div>
    )
}