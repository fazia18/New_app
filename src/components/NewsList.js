import React from 'react';
import { Row } from 'react-bootstrap';
import NewsCard from './NewsCard';

const NewsList = ({ articles, onShowDetail }) => {
    return (
        <Row>
            {articles.map((article, index) => (
                <NewsCard key={index} article={article} onShowDetail={onShowDetail} />
            ))}
        </Row>
    );
};

export default NewsList;