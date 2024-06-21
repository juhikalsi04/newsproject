import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NewsItem from './NewsItem';
import Loader from './Loader';

const NewsList = ({ category }) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedArticle, setSelectedArticle] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            const apiKey = 'afe0be49500349008d504648e4826890';
            const url = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${apiKey}`;

            try {
                const response = await axios.get(url);
                const filteredArticles = response.data.articles.filter(article => article.urlToImage);
                setArticles(filteredArticles);
            } catch (error) {
                console.error('Error fetching the news:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, [category]);

    const handleHeadlineClick = (article) => {
        setSelectedArticle(article);
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="news-list">
            <div className="lhs">
                {selectedArticle ? (
                    <div className="main-news-item">
                        <NewsItem {...selectedArticle} />
                    </div>
                ) : (
                    articles.length > 0 && (
                        <div className="main-news-item">
                            <NewsItem {...articles[0]} />
                        </div>
                    )
                )}
            </div>
            <div className="rhs">
                <h3><b>Top Headlines</b></h3>
                <div className="news-headlines">
                    <div className="headlines-list">
                        {articles.slice(1, 11).map((article, index) => (
                            <div key={index} className="headline-item" onClick={() => handleHeadlineClick(article)}>
                                {article.title}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsList;
