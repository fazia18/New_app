import React from 'react';
import { Modal } from 'react-bootstrap';

const NewsDetailModal = ({ show, onClose, article }) => {
    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>{article.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>{article.source.name}</h5>
                <p>{article.content}</p>
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                    Read full article
                </a>
            </Modal.Body>
        </Modal>
    );
};

export default NewsDetailModal;