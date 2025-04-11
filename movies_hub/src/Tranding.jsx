import React, { useState, useEffect } from 'react';

export default function Trending() {
  const [trending, setTrending] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MjE5ZDQ3M2NkYzA1YjZlODEyNzBkMTViNWVjNTE0MCIsIm5iZiI6MTc0NDEwMjkwNC43MTEsInN1YiI6IjY3ZjRlNWY4NmMzNTgzYzk3NTk5NmFjMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rObgl_DLu_QgnydpuBGbvGO2r-8Ctrh0zZpLWwERfhU'
    }
  };

  useEffect(() => {
    fetch(url, options)
      .then(res => res.json())
      .then(json => {
        setTrending(json);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);
  
  const handlePrevSlide = () => {
    if (trending && trending.results) {
      setCurrentSlide((prevSlide) => 
        prevSlide === 0 ? 9 : prevSlide - 1
      );
    }
  };

  useEffect(() => {
    if (!trending || !trending.results) return;
  
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => {
        const lastIndex = trending.results.length - 1;
        return prevSlide === 9 ? 0 : prevSlide + 1;
      });
    }, 3000);
  
    return () => clearInterval(interval);
  }, [trending]);

  const handleNextSlide = () => {
    if (trending && trending.results) {
      setCurrentSlide((prevSlide) => 
        prevSlide === 9 ? 0 : prevSlide + 1
      );
    }
  };

  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex);
  };

  if (!trending || !trending.results || trending.results.length === 0) {
    return <div className="text-center p-4">No trending movies available</div>;
  }

  // We'll only show first 5 movies in the carousel
  const moviesToShow = trending.results.slice(0, 10);

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-20 px-4">Top Rated Movies</h2>
      
      <div id="movies-carousel" className="relative w-full" data-carousel="slide">
        {/* Carousel wrapper */}
        <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
          {moviesToShow.map((movie, index) => (
            <div 
              key={movie.id} 
              className={`absolute w-full h-full transition-opacity duration-700 ease-in-out ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img 
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} 
                alt={movie.title}
                className="absolute block w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                <h3 className="text-white text-xl font-bold">{movie.title}</h3>
                <p className="text-white">{movie.vote_average} ★ | {movie.release_date.split('-')[0]}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Slider indicators */}
        <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
          {moviesToShow.map((_, index) => (
            <button 
              key={index}
              type="button" 
              className={`w-3 h-3 rounded-full ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
              aria-current={index === currentSlide ? "true" : "false"}
              aria-label={`Slide ${index + 1}`}
              onClick={() => goToSlide(index)}
            ></button>
          ))}
        </div>
        
        {/* Slider controls */}
        <button 
          type="button" 
          className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4  group" 
          onClick={handlePrevSlide}
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-orange-500/30 group-hover:bg-orange-600/50">
            <svg className="w-4 h-4 text-white rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
            </svg>
            <span className="sr-only">Previous</span>
          </span>
        </button>
        <button 
          type="button" 
          className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" 
          onClick={handleNextSlide}
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50">
            <svg className="w-4 h-4 text-white rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
            </svg>
            <span className="sr-only">Next</span>
          </span>
        </button>
      </div>
    </div>
  );
}