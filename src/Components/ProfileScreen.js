import React, { useContext, useState } from 'react';
import { Context } from '../Context.js';
import { Link } from 'react-router-dom';
import MovieComponent from './MovieComponent.js';

const ProfileScreen = () => {
    const { isLoggedIn, setIsLoggedIn, currUserData, currUser, setCurrUser } = useContext(Context);
    const [fn, setFn] = useState('');
    const [ln, setLn] = useState('');

    const saveBtnOnClick = () => {
        if(fn) currUserData.firstName = fn;
        if(ln) currUserData.lastName = ln;

        setFn('');
        setLn('');
    }

    const signoutBtnOnClick = () => {
        setIsLoggedIn(false);
        setCurrUser(undefined);
    }

    return (
        <div className={isLoggedIn ? 'profile screen col' : 'blur'}>
            <h1>{currUser}'s profile</h1>

            <h2>Email &ndash; {currUserData.email}</h2>

            <div className='col'>
                <h2>First Name &ndash; {currUserData.firstName}</h2>

                <input type='text' placeholder='Change First Name' value={fn} onChange={(e) => setFn(e.target.value)}/>
            </div>

            <div className='col'>
                <h2>Last Name &ndash; {currUserData.lastName}</h2>

                <input type='text' placeholder='Change Last Name' value={ln} onChange={(e) => setLn(e.target.value)}/>
            </div>

            <div className='profile__watchlist row'>
                {
                    currUserData.watchlist.length !== 0 ?
                    currUserData.watchlist.map((curr,index) => 
                        <MovieComponent
                            key={index}
                            id={curr.id}
                            img={`https://image.tmdb.org/t/p/w500/${curr.backdrop_path}`} 
                            title={curr.title} 
                            rating={curr.vote_average} 
                            desc={curr.overview} 
                            genreIds={curr.genres} 
                            isWatchlistComp={true}
                        />
                    ) :
                    <h1>No items found in Watchlist</h1>
                }
            </div>

            <div className='row' style={{width: '30%'}}>
                <button onClick={saveBtnOnClick}>Save Changes</button>

                <Link to='/' exact='true' onClick={signoutBtnOnClick} className='link'>Sign Out</Link>
            </div>
        </div>
    )
}

export default ProfileScreen;