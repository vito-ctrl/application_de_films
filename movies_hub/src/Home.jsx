import './Home.css';
import { useState, useEffect } from 'react';
import vid from "./assets/4010131-uhd_4096_2160_25fps.mp4";
import Header from './components/Header';
import Topwatch from './Topwatch';
import Mplaying from './Mplaying';
import Tplaying from './Tplaying';
import Footer from './components/Footer';

const Home = () => {
    const [data, setData] = useState(null);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        fetchMovieData();
        
        // Listen for theme changes in localStorage
        const handleStorageChange = () => {
            const currentTheme = localStorage.getItem('theme') || 'light';
            setTheme(currentTheme);
        };
        
        // Set up event listener for storage changes
        window.addEventListener('storage', handleStorageChange);
        
        // Check for theme changes periodically
        const themeChecker = setInterval(() => {
            const currentTheme = localStorage.getItem('theme') || 'light';
            if (currentTheme !== theme) {
                setTheme(currentTheme);
            }
        }, 500);
        
        return () => {
            window.removeEventListener('storage', handleStorageChange);
            clearInterval(themeChecker);
        };
    }, [theme]);

    const fetchMovieData = async() => {
        try {
            const res = await fetch('http://www.omdbapi.com/?t=game&apikey=f93e5905');
            if(!res.ok) {
                throw new Error(`HTTP ERROR! STATUS: ${res.status}`);   
            }
            const movieData = await res.json();
            setData(movieData);
        } catch (error) {
            console.error("Failed to fetch movie data:", error);
        }
    };

    return (
        <>
        <div className={`movie-page ${theme === 'dark' ? 'dark' : ''}`}>
            <Header />
            <div className="content-container">
                <div className="video-background">
                    <video className="background-video" autoPlay loop muted>
                        <source src={vid} type="video/mp4" />
                    </video>
                </div>
                
                <div className="movie-content">
                    {data ? (
                        <div className="movie-card">
                            <div className="movie-main-content">
                                <div className="poster-container">
                                    <h2 className="movie-title">{data.Title}</h2>
                                    <img src={data.Poster} alt={data.Title} className="movie-poster" />
                                    <div className="movie-meta">
                                        <span className="movie-year">{data.Year}</span>
                                        <span className="movie-rating">{data.imdbRating}</span>
                                        <span className="movie-runtime">{data.Runtime}</span>
                                    </div>
                                </div>
                                
                                <div className="movie-info">
                                    <p className="movie-plot">{data.Plot}</p>
                                    <div className="movie-details">
                                        <p><strong>Director:</strong> {data.Director}</p>
                                        <p><strong>Starring:</strong> {data.Actors}</p>
                                        <p><strong>Genre:</strong> {data.Genre}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="loading">Loading movie data...</div>
                    )}
                </div>
            </div>
        </div>
            <Topwatch/>
            <Mplaying/>
            <Tplaying/>
            <Footer/>
        </>
    );
};

export default Home;