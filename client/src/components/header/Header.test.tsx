import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header Component', () => {
    it('renders correctly', () => {
        render(<Header />);
        expect(screen.getByRole('banner')).toBeInTheDocument();
    });

    it('displays the Home24 logo', () => {
        render(<Header />);
        const logo = screen.getByAltText('Home24 Logo');
        expect(logo).toBeInTheDocument();
        expect(logo).toHaveAttribute('src', 'home-24-logo.svg');
        expect(logo).toHaveClass('header__logo');
    });

    it('contains a search input with proper attributes', () => {
        render(<Header />);
        const searchInput = screen.getByPlaceholderText('What are you looking for?');
        expect(searchInput).toBeInTheDocument();
        expect(searchInput).toHaveAttribute('aria-label', 'Search products');
        expect(searchInput).toHaveClass('header__search');
    });
});
