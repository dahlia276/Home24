import React from 'react';
import { Article } from '../../types';
import './ArticleCard.css';

interface ArticleCardProps {
    article: Article;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
    const formatter = new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
    });

    return (
        <div className="article-card"  data-testid="article-card">
            <img
                src={article.images[0].path}
                alt={article.name}
                className="article-card__image"
                data-testid="article-image"
            />
            <div className="article-card__name">{article.name}</div>
            <div className="article-card__price">
                {formatter.format(article.prices.regular.value / 100)}
            </div>
            <button className="article-card__button">
                Add to cart
            </button>
        </div>
    );
};

export default ArticleCard;
