import React, { createContext, useState, useEffect } from 'react';

export const Context = createContext();

const ContextProvider = ({ children }) => {
    const [homeSelection, setHomeSelection] = useState('popular');
    const [homeItems, setHomeItems] = useState([]);
    const [genres, setGenres] = useState(undefined);
    const [currPage, setCurrPage] = useState(1);
    const [totalPages, setTotalPages] = useState(undefined);
    const [searchbarStr, setSearchbarStr] = useState('');
    const [isUsingSearchbar, setIsUsingSearchbar] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [users, setUsers] = useState([]);
    const [currUser, setCurrUser] = useState(undefined);
    const [currUserData, setCurrUserData] = useState(undefined);
    const [movieScrId, setMovieScrId] = useState(undefined);
    const [movieScrDetails, setMovieScrDetails] = useState(undefined);
    const [movieScrCredits, setMovieScrCredits] = useState(undefined);
    const [movieScrTrailer, setMovieScrTrailer] = useState(undefined);
    const [movieScrRecom, setMovieScrRecom] = useState(undefined);
    //unique key from api
    const key = '?????';

    const updateStatesFromFetch = async (resp) =>{
        const data = await resp.json();
        setHomeItems(data.results);
        setTotalPages(data.total_pages);
    }

    //pressing metric buttons on homepage
    const fetchHomeDataByMetric = async (metric, byPage, page) => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${metric}?api_key=${key}&language=en-US&page=${!byPage ? '1' : page}`);
            updateStatesFromFetch(response);
        } catch(error){
            console.log(error);
        }
    }

    //typing in movie title in searchbar
    const fetchHomeDataBySearchbar = async (searchbarString, byPage, page) => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${searchbarString}&language=en-US&page=${!byPage ? '1' : page}&include_adult=true`);
            updateStatesFromFetch(response);
        } catch(error){
            console.log(error);
        }
    }

    //fetch array of all genre types from api
    const fetchGenres = async () => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${key}&language=en-US`);
            const data = await response.json();
            setGenres(data.genres);
        } catch(error){
            console.log(error);
        }
    }

    //run all async 'MovieScr' functions; data for 'MovieScreen'
    const runMovieScrFuncs = () => {
        fetchMovieScrDetails();
        fetchMovieScrCredits();
        fetchMovieScrTrailer();
        fetchMovieSrcRecom();
    }

    const fetchMovieScrDetails = async () => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${movieScrId}?api_key=${key}&language=en-US`);
            const data = await response.json();
            setMovieScrDetails(data);
        } catch(error){
            console.log(error);
        }
    }

    const fetchMovieScrCredits = async () => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${movieScrId}/credits?api_key=${key}&language=en-US`);
            const data = await response.json();
            setMovieScrCredits(data.cast.slice(0,8));
        } catch(error){
            console.log(error);
        }
    }

    const fetchMovieScrTrailer = async () => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${movieScrId}/videos?api_key=${key}&language=en-US`);
            const data = await response.json();
            setMovieScrTrailer(data.results.find(curr => curr.type === 'Trailer').key);
        } catch(error){
            console.log(error);
        }
    }

    const fetchMovieSrcRecom = async () => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${movieScrId}/recommendations?api_key=${key}&language=en-US&page=1`);
            const data = await response.json();
            setMovieScrRecom(data.results);
        } catch(error){
            console.log(error);
        }
    }

    const clearMetricBtns = () => {
        document.querySelectorAll('.home__metric-btn').forEach(curr => curr.classList.remove('btn__selected'));
    }

    const addToUsers = (obj) => {
        setUsers([...users, obj]);
    }

    useEffect(() => {
        fetchHomeDataByMetric(homeSelection, false, undefined);
        setCurrPage(1);
    }, [homeSelection])

    useEffect(() => {
        if(movieScrId) runMovieScrFuncs();
    }, [movieScrId])

    useEffect(() => {
        fetchGenres();
    }, [])

    return (
        <Context.Provider value={{ homeItems, homeSelection, genres, totalPages, currPage, searchbarStr, isUsingSearchbar, isLoggedIn, users, 
                                    currUser, currUserData, movieScrDetails, movieScrCredits, movieScrTrailer, movieScrRecom,
                                    setCurrUserData, setMovieScrId, setCurrUser, addToUsers, setIsLoggedIn, setIsUsingSearchbar, setSearchbarStr, 
                                    setCurrPage, setHomeSelection, fetchHomeDataByMetric, fetchHomeDataBySearchbar, clearMetricBtns }}>
            {children}
        </Context.Provider>
    )
}

export default ContextProvider;