import React from 'react';
import { useParams } from 'react-router-dom';
import NewsList from './NewsList';
import Carousel from './Carousel';
import Category from './Category';
import Ticker from './Ticker';


const HomePage = () => {
    const { category } = useParams();

    return (
        <>
            <Ticker />
            <div className='carousel'>
                <Carousel />
            </div>
            <div className="home-page">
                <NewsList category={category || 'general'} />
            </div>
            <div className="category">
                <Category />
            </div>



        </>
    );
};

export default HomePage;
