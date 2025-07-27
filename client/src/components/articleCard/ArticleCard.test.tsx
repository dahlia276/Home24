import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ArticleCard } from './ArticleCard';
import { Article } from '../../types';

const mockArticle: Article = {
    id: '1',
    name: 'Test Product',
    images: [
        {
            path: 'https://example.com/test-image.jpg',
            alt: 'Test product image'
        }
    ],
    prices: {
        regular: {
            value: 2599
        },
        currency: 'EUR'
    }
};

describe('ArticleCard', () => {
    it('renders article information correctly', () => {
        render(<ArticleCard article={mockArticle} />);
        expect(screen.getByText('Test Product')).toBeInTheDocument();
        expect(screen.getByText('25,99 €')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Add to cart' })).toBeInTheDocument();
    });

    it('renders article image with correct attributes', () => {
        render(<ArticleCard article={mockArticle} />);
        const image = screen.getByRole('img', { name: 'Test Product' });
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', 'https://example.com/test-image.jpg');
        expect(image).toHaveAttribute('alt', 'Test Product');
    });

    it('formats price correctly for different values', () => {
        const expensiveArticle: Article = {
            ...mockArticle,
            prices: {
                regular: {
                    value: 123456
                },
                currency: 'EUR'
            }
        };

        render(<ArticleCard article={expensiveArticle} />);
        expect(screen.getByText('1.234,56 €')).toBeInTheDocument();
    });

    it('handles zero price correctly', () => {
        const freeArticle: Article = {
            ...mockArticle,
            prices: {
                regular: {
                    value: 0
                },
                currency: 'EUR'
            }
        };

        render(<ArticleCard article={freeArticle} />);
        expect(screen.getByText('0,00 €')).toBeInTheDocument();
    });

    it('renders with correct CSS classes and test IDs', () => {
        render(<ArticleCard article={mockArticle} />);
        const cardContainer = screen.getByTestId('article-card');
        expect(cardContainer).toHaveClass('article-card');
        const image = screen.getByTestId('article-image');
        expect(image).toHaveClass('article-card__image');
    });

    it('uses first image from images array', () => {
        const multiImageArticle: Article = {
            ...mockArticle,
            images: [
                { path: 'https://example.com/first-image.jpg', alt: 'First' },
                { path: 'https://example.com/second-image.jpg', alt: 'Second' }
            ]
        };

        render(<ArticleCard article={multiImageArticle} />);
        const image = screen.getByRole('img');
        expect(image).toHaveAttribute('src', 'https://example.com/first-image.jpg');
    });
});
