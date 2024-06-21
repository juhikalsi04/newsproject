import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Ticker = () => {
    const [headlines, setHeadlines] = useState([]);
    const [tickerIndex, setTickerIndex] = useState(0);

    useEffect(() => {
        const fetchHeadlines = async () => {
            const apiKey = 'afe0be49500349008d504648e4826890';
            const url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`;

            try {
                const response = await axios.get(url);
                const articles = response.data.articles.map(article => article.title);
                setHeadlines(articles);
            } catch (error) {
                console.error('Error fetching headlines:', error);
            }
        };

        fetchHeadlines();
    }, []);

    useEffect(() => {
        const tickerTimer = setInterval(() => {
            setTickerIndex(prevIndex => (prevIndex + 1) % headlines.length);
        }, 2000);

        return () => clearInterval(tickerTimer);
    }, [headlines]);

    return (
        <div className="ticker">
            {headlines.length > 0 && (
                <div className="ticker-content">
                    {headlines.map((headline, index) => (
                        <span key={index} className={index === tickerIndex ? 'ticker-item active' : 'ticker-item'}>
                            {headline}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Ticker;
