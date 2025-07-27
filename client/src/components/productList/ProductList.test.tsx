import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductList from './ProductList';
import { useCategories } from '../../hooks/useCategories';

jest.mock('../../hooks/useCategories');

describe('ProductList Component', () => {
  const mockCategories = [
    {
      name: 'Living Room',
      articleCount: 42,
      categoryArticles: {
        articles: [
          {
            name: 'Kinosofa 4-Sitzer SALENTO',
            variantName: 'Gray',
            prices: {
              currency: 'EUR',
              regular: {
                value: 899,
              },
            },
            images: [
              {
                path: 'sofa-gray.webp',
              },
            ],
          },
          {
            name: 'Coffee Table',
            variantName: 'Oak',
            prices: {
              currency: 'EUR',
              regular: {
                value: 249,
              },
            },
            images: [
              {
                path: 'table-oak.webp',
              },
            ],
          },
        ],
      },
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render loading state', () => {
    (useCategories as jest.Mock).mockReturnValue({
      categories: [],
      loading: true,
      error: null,
    });

    render(<ProductList />);
    expect(screen.getByText('Loading products...')).toBeInTheDocument();
  });

  it('should render error state', () => {
    const errorMessage = 'Failed to fetch data';
    (useCategories as jest.Mock).mockReturnValue({
      categories: [],
      loading: false,
      error: errorMessage,
    });

    render(<ProductList />);
    expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
  });

  it('should render empty state when no categories', () => {
    (useCategories as jest.Mock).mockReturnValue({
      categories: [],
      loading: false,
      error: null,
    });

    render(<ProductList />);
    expect(screen.getByText('No products found')).toBeInTheDocument();
  });

  it('should render product list with correct data', () => {
    (useCategories as jest.Mock).mockReturnValue({
      categories: mockCategories,
      loading: false,
      error: null,
    });

    render(<ProductList />);
    expect(screen.getByRole('main')).toHaveClass('product-list');
    expect(screen.getByRole('heading', { level: 1 })).toHaveClass('product-list__title');

    // Check category title
    expect(screen.getByText('Living Room')).toBeInTheDocument();
    expect(screen.getByText('(42)')).toBeInTheDocument();

    // Check products are rendered
    expect(screen.getByText('Kinosofa 4-Sitzer SALENTO')).toBeInTheDocument();
    expect(screen.getByText('Coffee Table')).toBeInTheDocument();

  });

  it('should handle duplicate article names with unique keys', () => {
    const duplicateCategories = [
      {
        ...mockCategories[0],
        categoryArticles: {
          articles: [
            ...mockCategories[0].categoryArticles.articles,
            {
              name: 'Kinosofa 4-Sitzer SALENTO', // Duplicate name
              variantName: 'Black',
              prices: {
                currency: 'EUR',
                regular: {
                  value: 999,
                },
              },
              images: [
                {
                  path: 'sofa-black.webp',
                },
              ],
            },
          ],
        },
      },
    ];

    (useCategories as jest.Mock).mockReturnValue({
      categories: duplicateCategories,
      loading: false,
      error: null,
    });

    const { container } = render(<ProductList />);

    // Check that all articles are rendered despite duplicate names
    const articles = container.querySelectorAll('.articles > *');
    expect(articles.length).toBe(3);
    expect(screen.getAllByText(/Kinosofa 4-Sitzer SALENTO/).length).toBe(2);
  });
});
