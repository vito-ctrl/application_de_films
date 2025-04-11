import './Home.css';
import { useState, useEffect } from 'react';
import vid from "./assets/videoooo.mp4";
import Header from './components/Header';

const Home = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetchMovieData();
    }, []);

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
        <div className="movie-page">
            <Header />
            <div className="content-container">
                <div className="video-background">
                    <video className="background-video" autoPlay loop muted>
                        <source src={vid} type="video/mp4" />
                    </video>
                </div>
                
                <div className="movie-content">
                    {data && (
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
                                    <p className="movie-plot dark:black">{data.Plot}</p>
                                    <div className="movie-details">
                                        <p><strong>Director:</strong> {data.Director}</p>
                                        <p><strong>Starring:</strong> {data.Actors}</p>
                                        <p><strong>Genre:</strong> {data.Genre}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;