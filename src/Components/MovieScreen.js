import React, { useContext } from 'react';
import { Context } from '../Context.js'; 
import watchlistIcon from '../Res/bookmark-o.svg';
import releaseDateIcon from '../Res/calendar.svg';
import durationIcon from '../Res/back-in-time.svg';
import revenueIcon from '../Res/line-chart.svg';
import budgetIcon from '../Res/credit.svg';
import tempBackground from '../Res/moviedb-logo2.svg';
import spinner from '../Res/spinner.gif';
import MovieComponent from './MovieComponent.js';

const MovieScreen = () => {
    const { movieScrDetails, movieScrCredits, movieScrTrailer, movieScrRecom, currUserData, isLoggedIn } = useContext(Context);

    const addToWatchlistOnClick = () => {
        currUserData.watchlist.push(movieScrDetails);
        alert('Added to watchlist!');
    }
    const alertNotSignedIn = () => {
        alert('Please sign in to save this movie to your watchlist');
    }
     
    return (
        <div className='movieScr screen col' style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), 
                                                                        url('${movieScrDetails ? `https://image.tmdb.org/t/p/w500/${movieScrDetails.poster_path}` : tempBackground}')`}}>
            {
                movieScrDetails && movieScrCredits && movieScrTrailer && movieScrRecom ?
                <div className='movieScr__inner col'>
                    <div className='movieScr__details row'>
                        <img src={`https://image.tmdb.org/t/p/w500/${movieScrDetails.poster_path}`} alt='moviePoster' className='movieScr__details--img'/>
                    
                        <div className='movieScr__details--info col'>
                            <h1>{movieScrDetails.title}</h1>

                            <h2>{movieScrDetails.tagline}</h2>

                            <h3 style={{textTransform: 'initial', width: '90%'}}>{movieScrDetails.overview}</h3>

                            <button className='movieScr__details--btn-watchlist row' onClick={isLoggedIn ? addToWatchlistOnClick : alertNotSignedIn}>
                                <img src={watchlistIcon} alt='watchlist-icon' className='icon' style={{marginRight: '10px'}}/>

                                Add to Watchlist
                            </button>

                            <div className='movieScr__details--genres row'>
                                <h3>Genres &ndash; &nbsp;</h3>

                                <div className='movieScr__details--tags row'>
                                    {
                                        movieScrDetails.genres.map((curr, index) => 
                                            <span key={index} className='movieScr__details--tag'>{curr.name}</span>  
                                        ) 
                                    }
                                </div>
                            </div>

                            <div className='movieScr__details--wrapper-row row'>
                                <div className='movieScr__details--wrapper row'>
                                    <img src={releaseDateIcon} alt='release-date-icon' className='icon movieScr__details--wrapper-icon'/>

                                    <h4>Release Date &ndash; {movieScrDetails.release_date}</h4>
                                </div>

                                <div className='movieScr__details--wrapper row'>
                                    <img src={durationIcon} alt='duration-icon' className='icon movieScr__details--wrapper-icon'/>

                                    <h4>Duration &ndash; {movieScrDetails.runtime} mins</h4>
                                </div>

                                <div className='movieScr__details--wrapper row'>
                                    <img src={revenueIcon} alt='revenue-icon' className='icon movieScr__details--wrapper-icon'/>

                                    <h4>Revenue &ndash; ${movieScrDetails.revenue.toLocaleString()}</h4>
                                </div>

                                <div className='movieScr__details--wrapper row'>
                                    <img src={budgetIcon} alt='budget-icon' className='icon movieScr__details--wrapper-icon'/>

                                    <h4>Budget &ndash; ${movieScrDetails.budget.toLocaleString()}</h4>
                                </div>
                            </div>

                            <span className='movieScr__rating center'>{movieScrDetails.vote_average}</span>
                        </div>  
                    </div>

                    <div className='movieScr__cast col'>
                        <h1>Main Cast</h1>

                        <div className='movieScr__cast--cont row'>
                            {
                                movieScrCredits.map((curr,index) => 
                                    <div key={index} className='movieScr__cast--box col'>
                                        <img src={`https://image.tmdb.org/t/p/w185${curr.profile_path}`} alt='cast-image'/>

                                        <h3>{curr.original_name}</h3>

                                        <h4>{curr.character}</h4>
                                    </div>
                                )
                            }
                        </div>
                    </div>

                    <div className='movieScr__trailer col'>
                        <h1>Trailer</h1>

                        <iframe src={`https://www.youtube.com/embed/${movieScrTrailer}`} width="1280" height="720" frameBorder="0" allowFullScreen></iframe>
                    </div>

                    <div className='movieScr__recom col'>
                        <h1 >Recommended</h1>

                        <div className='movieScr__recom--row row'>
                            {
                                movieScrRecom.map((curr,index) => 
                                    <MovieComponent
                                        key={index}
                                        id={curr.id}
                                        img={`https://image.tmdb.org/t/p/w500/${curr.backdrop_path}`}
                                        title={curr.title}
                                        rating={curr.vote_average}
                                        desc={curr.overview}
                                        genreIds={curr.genre_ids}
                                        isWatchlistComp={false}
                                    />
                                )
                            }
                        </div>
                    </div>
                </div> :
                <img src={spinner} alt='spinner' className='spinner'/>
            }
        </div>
    )
}

export default MovieScreen;