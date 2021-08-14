import React, { useContext, useState, useEffect, useRef } from 'react';
import { Context } from '../Context.js';
import MovieComponent from './MovieComponent.js';
import arrowLeftIcon from '../Res/chevron-left.svg';
import arrowRightIcon from '../Res/chevron-right.svg';

const HomeScreen = () => {
    const { homeItems, homeSelection, setHomeSelection, totalPages, currPage, setCurrPage, fetchHomeDataByMetric, fetchHomeDataBySearchbar, 
            searchbarStr, isUsingSearchbar, setIsUsingSearchbar, clearMetricBtns } = useContext(Context);
    const [totalPaginBtns, setTotalPaginBtns] = useState(7);
    const [paginBtnArr, setPaginBtnArr] = useState([]);
    const isPaginBtnArrInit = useRef(false);

    const metricBtnOnClick = (eventTarget) => {
        setIsUsingSearchbar(false);
        setHomeSelection(eventTarget.id);
        styleCurrMetricBtn(eventTarget);
        setPaginBtnArr([]);
        setCurrPage(1);
    }

    const styleCurrMetricBtn = (eventTarget) => {
        clearMetricBtns();
        eventTarget.classList.add('btn__selected');
    }

    const paginBtnOnClick = (eventTarget) => {
        setCurrPage(Number(eventTarget.id));
    }

    const updateCurrPaginBtn = () => {
        const allPaginBtns = document.querySelectorAll('.home__pagination-btn-num');
        const currPaginBtn = Array.from(allPaginBtns).find(curr => Number(curr.id) === currPage);

        allPaginBtns.forEach(curr => curr.classList.remove('home__pagination-btn-num--current'));
        currPaginBtn.classList.add('home__pagination-btn-num--current');
    }

    const calcPaginBtnArr = () => {
        let newArr;

        if(currPage <= 4){
            newArr = paginBtnArr.map((curr, index) => index + 1);

        } else if(currPage > totalPages - 3 && currPage <= totalPages){
            newArr = (paginBtnArr.map((curr, index) => totalPages - index)).reverse();

        } else if(currPage > 4 || currPage < totalPages - 3){
            newArr = paginBtnArr.map((curr, index) => {
                const calculation = currPage - (3 - index);

                if(calculation < 0){
                    //double negative in maths results in addition
                    return currPage - calculation;
                } else {
                    return calculation;
                }
            })
        }
        
        //update state and re-render what's changed
        setPaginBtnArr(newArr);
    }

    const incrementPage = () => {
        currPage === totalPages ? setCurrPage(1) : setCurrPage(currPage => currPage + 1);
    }

    const decrementPage = () => {
        currPage === 1 ? setCurrPage(totalPages) : setCurrPage(currPage => currPage - 1);
    }

    useEffect(() => {
        //init 'paginBtnArr'
        if(paginBtnArr.length < totalPaginBtns){
            setPaginBtnArr([...paginBtnArr, paginBtnArr.length + 1]);
            return;
        }

        //after initing 'paginBtnArr', the element that has same id number as 'currPage' is styled to show it's the current page
        if(!isPaginBtnArrInit.current && paginBtnArr.length === totalPaginBtns){
            updateCurrPaginBtn();
            isPaginBtnArrInit.current = true;
            return;
        }

        //updating current pagination button when using searchbar
        if(isPaginBtnArrInit.current && homeItems.length >= 1){
            updateCurrPaginBtn();
        } 
    }, [paginBtnArr])

    //whenever 'currPage' is changed
    useEffect(() => {
        if(isPaginBtnArrInit.current) {
            calcPaginBtnArr(); 
            
            isUsingSearchbar ? fetchHomeDataBySearchbar(searchbarStr, true, currPage) : fetchHomeDataByMetric(homeSelection, true, currPage);
        } 
    }, [currPage])

    //'fetchHome...BySearchbar' and '...ByMetric' both update 'totalPages' state based on a 'total_pages' property returned from api
    useEffect(() => {
        //if using searchbar, different searchbar queries have a differing number of pages of results; so need to reset paginBtnArr based on 'total_pages'
        if(isPaginBtnArrInit.current){
            isUsingSearchbar ? setTotalPaginBtns(totalPages >= 7 ? 7 : totalPages) : setTotalPaginBtns(7);
    
            setPaginBtnArr([]);
        }
    }, [totalPages])

    return (
        <div className='home screen col'>
            <div className='home__row row'>
                <div className='home__wrapper'>
                    <button className={homeSelection === 'popular' ? 'home__metric-btn btn__selected transition' : 'home__metric-btn transition'} 
                        id='popular' onClick={(e) => metricBtnOnClick(e.target)}>Popular</button>
                </div>

                <div className='home__wrapper'>
                    <button className={homeSelection === 'now_playing' ? 'home__metric-btn btn__selected transition' : 'home__metric-btn transition'} 
                        id='now_playing' onClick={(e) => metricBtnOnClick(e.target)}>Now Playing</button>
                </div>

                <div className='home__wrapper'>
                    <button className={homeSelection === 'top_rated' ? 'home__metric-btn btn__selected transition' : 'home__metric-btn transition'} 
                        id='top_rated' onClick={(e) => metricBtnOnClick(e.target)}>Top Rated</button>
                </div>

                <div className='home__wrapper'>
                    <button className={homeSelection === 'upcoming' ? 'home__metric-btn btn__selected transition' : 'home__metric-btn transition'} 
                        id='upcoming' onClick={(e) => metricBtnOnClick(e.target)}>Upcoming</button>
                </div>
           </div>

           <div className='home__results row'>
                {
                    homeItems.length !== 0 ?
                    homeItems.map((curr, index) => 
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
                    ) : 
                    <div style={{height: '71vh', width: '100%', fontSize: '60px'}} className='center'>No results found</div>
                }
           </div>

            <div className='home__pagination row'>
                <button className='home__pagination-btn center' onClick={decrementPage}>
                    <img src={arrowLeftIcon} alt='arrowleft' className='icon-smallest'/>
                </button>

                {
                    paginBtnArr.length === totalPaginBtns ?
                    paginBtnArr.map(curr => <button key={curr} className='home__pagination-btn-num center transition' id={curr} onClick={(e) => paginBtnOnClick(e.target)}>{curr}</button>) :
                    <h3>Loading btns</h3>
                }

                <button className='home__pagination-btn center' onClick={incrementPage}>
                    <img src={arrowRightIcon} alt='arrowright' className='icon-smallest'/>
                </button>
           </div>
        </div>
    )
}

export default HomeScreen;