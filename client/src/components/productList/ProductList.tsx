import React from 'react';
import { useCategories } from '../../hooks/useCategories';
import ArticleCard from '../articleCard/ArticleCard';
import './ProductList.css';

const ProductList: React.FC = () => {
  const { categories, loading, error } = useCategories();

  if (error) return <div className="error">Error: {error}</div>;
  if (loading) return <div>Loading products...</div>;
  if (!categories.length) return <div>No products found</div>;

  return (
      <main className="product-list">
        <>
          <h1 className="product-list__title">
            {categories[0].name}
            <small> ({categories[0].articleCount})</small>
          </h1>
          <div className="articles">
            {categories[0].categoryArticles.articles.map((article, index) => (
                <ArticleCard
                    key={`${article.name}-${index}`}
                    article={article}
                />
            ))}
          </div>
        </>
      </main>
  );
};

export default ProductList;
