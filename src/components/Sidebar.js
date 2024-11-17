import React from 'react';
import { Nav } from 'react-bootstrap';

const categories = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];

const Sidebar = ({ onCategoryChange, selectedCategory }) => {
    return (
        <Nav className="sidebar-nav justify-content-center" activeKey={selectedCategory}>
            {categories.map((category) => (
                <Nav.Link
                    key={category}
                    onClick={() => onCategoryChange(category)}
                    className={`category-link ${selectedCategory === category ? 'selected-category' : ''}`}
                >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                </Nav.Link>
            ))}
        </Nav>
    );
};

export default Sidebar;
