import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../Context.js';
import { Link } from 'react-router-dom';
import logo from '../Res/moviedb-logo2.svg';

const MovieComponent = ({ id, img, title, rating, desc, genreIds, isWatchlistComp}) => {
    const { genres, setMovieScrId } = useContext(Context);
    const [genreNames, setGenreNames] = useState([]);
    //regular expression to replace spaces in string with underscore
    const titleWUnderscr = title.replace(/\s/g, '_');
    
    const findGenreNames = (genreids) => {
        let matchedGenreNames;

        !isWatchlistComp ? 
        matchedGenreNames = genreids.map(id => genres.find(genre => genre.id === id).name) :
        matchedGenreNames = genreids.map(obj => genres.find(genre => genre.id === obj.id).name);
        
        setGenreNames(matchedGenreNames);
    } 

    const movieCompOnClick = () => {
        setMovieScrId(id);
    }

    useEffect(() => {
        if(genres) findGenreNames(genreIds);
    }, [genres])

    return (
        <Link to={`/${titleWUnderscr}`} className='movieComp__wrapper' onClick={movieCompOnClick}>
            <div className='movieComp col transition'>
                <img src={img.slice(-4) === 'null' ? logo : img} alt={`${title} Image`} className='movieComp__img'/>
                
                <h3>{title} &ndash; <span className='movieComp__rating'>{rating}</span></h3>

                <div className='movieComp__desc'>   
                    <h4 style={{textAlign: 'start', marginTop: '-25px'}}>{desc}</h4>  
                </div>

                <h4 className='movieComp__tags'>{genreNames.join(', ')}</h4>
            </div>
        </Link>
    )
}

export default MovieComponent;