import React from 'react';
import { useCategories } from '../../hooks/useCategories';
import './SideBar.css';

const Sidebar: React.FC = () => {
    const { categories, loading, error } = useCategories();

    if (error) {
        return <div
            className="sidebar-error"
            data-testid="sidebar-error"
        >
            Error: {error}
        </div>;
    }

    return (
        <aside className="sidebar">
            <h3 className="sidebar__title">Kategorien</h3>
            {loading ? (
                <div>Loading categories...</div>
            ) : (
                <ul className="sidebar__list">
                    {categories[0]?.childrenCategories.list.map(({ name, urlPath }) => (
                        <li key={urlPath} className="sidebar__item">
                            <a href={`/${urlPath}`} className="sidebar__link">
                                {name}
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </aside>
    );
};

export default Sidebar;
