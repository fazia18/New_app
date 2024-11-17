import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Navbar, Modal, Button } from 'react-bootstrap';
import Sidebar from './components/Sidebar';
import NewsCard from './components/NewsCard';
import './App.css';

const API_KEY = process.env.REACT_APP_API_KEY;


const App = () => {
  const [newsData, setNewsData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [selectedNews, setSelectedNews] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const fetchNews = async (category) => {
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${API_KEY}`
      );
      const validArticles = response.data.articles.filter(article =>
        article.content &&
        article.description &&
        article.urlToImage
      );

      setNewsData(validArticles);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    fetchNews(category);
    setSelectedNews(null);
  };

  const handleShowDetail = (article) => {
    setSelectedNews(article);
    if (isMobile) setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    fetchNews(selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark" className="mb-4">
        <Navbar.Brand href="#">NewsApp</Navbar.Brand>
      </Navbar>
      <Sidebar onCategoryChange={handleCategoryChange} selectedCategory={selectedCategory} />
      <Container fluid className="news-container">
        <Row>
          <Col
            md={selectedNews && !isMobile ? 6 : 12}
            className={`news-feed ${selectedNews && !isMobile ? 'feed-collapsed' : ''}`}
          >
            <Row>
              {newsData.map((article, index) => (
                <Col md={12} key={index} className="mb-3">
                  <NewsCard article={article} onShowDetail={handleShowDetail} isMobile={isMobile} />
                </Col>
              ))}
            </Row>
          </Col>

          {selectedNews && !isMobile && (
            <Col md={6} className="news-detail">
              <h2 className='heading'>{selectedNews.title}</h2>
              <p>{selectedNews.description}</p>
              <p>{selectedNews.content}</p>
              <a href={selectedNews.url} target="_blank" rel="noopener noreferrer" className="read-full-article-link">
                Read full article
              </a>
            </Col>
          )}
        </Row>
      </Container>

      {isMobile && selectedNews && (
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>{selectedNews.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{selectedNews.description}</p>
            <p>{selectedNews.content}</p>
            <a href={selectedNews.url} target="_blank" rel="noopener noreferrer" className="read-full-article-link">
              Read full article
            </a>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default App;


