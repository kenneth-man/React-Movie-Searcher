import React, { useContext, useEffect, useRef } from 'react';
import { Context } from '../Context.js';
import logo from '../Res/moviedb-logo.svg';
import magnifyinglass from '../Res/magnifying-glass.svg';
import { Link } from 'react-router-dom';

const SearchbarComponent = () => {
    const { fetchHomeDataBySearchbar, setCurrPage, searchbarStr, setSearchbarStr, setIsUsingSearchbar, clearMetricBtns, currUser } = useContext(Context);
    const isAfterFirstRun = useRef(false);

    useEffect(() => {
        if(isAfterFirstRun.current){
            if(searchbarStr){
                setIsUsingSearchbar(true);
                fetchHomeDataBySearchbar(searchbarStr, false, undefined);
                setCurrPage(1);
                clearMetricBtns();
            }
        } else {
            isAfterFirstRun.current = true;
        }
    },[searchbarStr])

    return (
        <div className='searchbar row' style={{justifyContent: 'space-between'}}>
            <div className='search__row row'>
                <Link to='/' exact='true' className='center'>
                    <img src={logo} alt='logo' className='logo'/>
                </Link>

                <div className='search row'>
                    <input type='text' placeholder='Search by movie title...' value={searchbarStr} onChange={(e) => setSearchbarStr(e.target.value)}/>

                    <button className='btn__icon center'>
                        <img src={magnifyinglass} alt='magnifyinglass' className='icon'/>
                    </button>
                </div>
            </div>

            <Link to={currUser ? `/Profile/${currUser}` : '/SignIn'} exact='true' className='link'>{currUser ? currUser : 'Sign In'}</Link>
        </div>
    )
}

export default SearchbarComponent;