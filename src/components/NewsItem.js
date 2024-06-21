import React from 'react';

const NewsItem = ({ title, description, url, urlToImage }) => {
    // Function to truncate the title to a maximum of 100 characters
    const truncateTitle = (title) => {
        return title.length > 100 ? `${title.substring(0, 100)}...` : title;
    };

    // Function to truncate the description to a maximum of 500 characters
    const truncateDescription = (description) => {
        if (!description) return ''; // Return empty string if description is null or undefined
        return description.length > 500 ? `${description.substring(0, 500)}...` : description;
    };

    return (
        <>
            <div className="news-item">
                <h3>{truncateTitle(title)}</h3>
            </div>
            <p>{truncateDescription(description)} <a href={url} target="_blank" rel="noopener noreferrer">Read more</a></p>

            {urlToImage && (
                <div className="image-container">
                    <img src={urlToImage} className="article-image" alt={title} />
                </div>
            )}
        </>
    );
};

export default NewsItem;
