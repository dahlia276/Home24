import React from 'react';
import './Header.css';
import logo from '../../assets/home-24-logo.svg';

const Header: React.FC = () => {
    return (
        <header className="header">
                <div className="header__container">
                    <img
                        src={logo}
                        alt="Home24 Logo"
                        className="header__logo"
                    />
                    <input
                        className="header__search"
                        placeholder="What are you looking for?"
                        aria-label="Search products"
                    />
                </div>
        </header>
    );
};

export default Header;
