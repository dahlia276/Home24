import React from 'react';
import { render, screen } from '@testing-library/react';
import { useCategories } from '../../hooks/useCategories';
import SideBar from "./SideBar";

jest.mock('../../hooks/useCategories');

describe('Sidebar Component', () => {
    const mockCategories = [
        {
            name: 'Main Category',
            childrenCategories: {
                list: [
                    { name: 'Furniture', urlPath: 'furniture' },
                    { name: 'Lighting', urlPath: 'lighting' },
                    { name: 'Decor', urlPath: 'decor' },
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

        render(<SideBar />);
        expect(screen.getByText('Loading categories...')).toBeInTheDocument();
        expect(screen.queryByText('Kategorien')).toBeInTheDocument();
    });

    it('should render error state', () => {
        const errorMessage = 'Failed to load categories';
        (useCategories as jest.Mock).mockReturnValue({
            categories: [],
            loading: false,
            error: errorMessage,
        });

        render(<SideBar />);
        expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
        expect(screen.getByTestId("sidebar-error")).toHaveClass('sidebar-error');
    });

    it('should render empty state when no categories', () => {
        (useCategories as jest.Mock).mockReturnValue({
            categories: [],
            loading: false,
            error: null,
        });

        render(<SideBar />);
        expect(screen.getByText('Kategorien')).toBeInTheDocument();
        expect(screen.queryByRole('li')).not.toBeInTheDocument();
    });

    it('should render categories list when data is available', () => {
        (useCategories as jest.Mock).mockReturnValue({
            categories: mockCategories,
            loading: false,
            error: null,
        });

        render(<SideBar />);

        // Check title
        expect(screen.getByText('Kategorien')).toBeInTheDocument();

        // Check list structure
        const list = screen.getByRole('list');
        expect(list).toHaveClass('sidebar__list');

        // Check list items
        const items = screen.getAllByRole('listitem');
        expect(items).toHaveLength(3);
        expect(items[0]).toHaveClass('sidebar__item');

        // Check links
        const links = screen.getAllByRole('link');
        expect(links[0]).toHaveAttribute('href', '/furniture');
        expect(links[0]).toHaveTextContent('Furniture');
        expect(links[0]).toHaveClass('sidebar__link');

        expect(links[1]).toHaveAttribute('href', '/lighting');
        expect(links[2]).toHaveAttribute('href', '/decor');
    });

    it('should handle empty children categories', () => {
        (useCategories as jest.Mock).mockReturnValue({
            categories: [{
                name: 'Main Category',
                childrenCategories: {
                    list: [],
                },
            }],
            loading: false,
            error: null,
        });

        render(<SideBar />);
        expect(screen.getByText('Kategorien')).toBeInTheDocument();
        expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
    });
});
