import React from 'react';
import { Card, Button } from 'react-bootstrap';
import '../App.css';

const NewsCard = ({ article, onShowDetail }) => {
    return (
        <Card className="news-card">
            <div className="news-card-content">
                <div className="news-card-image">
                    <Card.Img variant="top" src={article.urlToImage || 'placeholder.jpg'} />
                </div>
                <div className="news-card-details">
                    <Card.Body>
                        <Card.Title>{article.title}</Card.Title>
                        <Card.Text className="news-card-description">
                            {article.description || 'No description available.'}
                        </Card.Text>
                        <Button variant="danger" onClick={() => onShowDetail(article)}>
                            Read More
                        </Button>
                    </Card.Body>
                </div>
            </div>
        </Card>
    );
};

export default NewsCard;