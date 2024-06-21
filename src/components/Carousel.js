import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import axios from 'axios';

const defaultImage = process.env.PUBLIC_URL + "/images/news-wallpapers.jpg";

const apiKey = 'afe0be49500349008d504648e4826890';

const CarouselComponent = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            const categories = ['general', 'entertainment', 'sports', 'technology', 'health', 'science', 'business'];
            const fetchedNews = [];

            const fetchCategory = async (category) => {
                try {
                    const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${apiKey}`);
                    const data = response.data;
                    if (data.articles && data.articles.length > 0) {
                        const article = data.articles.find(article => article.urlToImage) || data.articles[0];
                        if (!article.urlToImage) {
                            article.urlToImage = defaultImage;
                        }
                        fetchedNews.push(article);
                    }
                } catch (error) {
                    if (error.response && error.response.status === 429) {
                        console.log(`Rate limit exceeded for category ${category}. Retrying...`);
                        await new Promise(resolve => setTimeout(resolve, 5000));
                        return await fetchCategory(category);
                    } else {
                        console.error(`Error fetching news for category ${category}:`, error);
                    }
                }
            };

            for (let category of categories) {
                await fetchCategory(category);
            }

            setNews(fetchedNews);
            setLoading(false);
        };

        fetchNews();
    }, []);


    if (loading) {
        return <Loader />;
    }


    return (
        <div id="carouselExampleCaptions" className="carousel slide " data-bs-ride="carousel">
            <div className="carousel-indicators">
                {news.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        data-bs-target="#carouselExampleCaptions"
                        data-bs-slide-to={index}
                        className={index === 0 ? 'active' : ''}
                        aria-current={index === 0 ? 'true' : 'false'}
                        aria-label={`Slide ${index + 1}`}
                    ></button>
                ))}
            </div>
            <div className="carousel-inner">
                {news.map((article, index) => (
                    <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                        <img src={article.urlToImage} className="d-block w-100" alt={article.title} onError={(e) => e.target.src = defaultImage} />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>{article.title}</h5>
                            <p>{article.description}</p>
                        </div>
                    </div>
                ))}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
};

export default CarouselComponent;
