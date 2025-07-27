import { useState, useEffect } from 'react';
import { Category } from '../types';

const API_ENDPOINT = '/graphql';
const DEFAULT_LOCALE = 'de_DE';
const CATEGORY_ID = '156126';
const DEFAULT_ARTICLE_LIMIT = 50;

const CATEGORIES_QUERY = `{
  categories: productLists(ids: "${CATEGORY_ID}", locale: ${DEFAULT_LOCALE}) {
    name
    articleCount
    childrenCategories: childrenProductLists {
      list {
        name
        urlPath
      }
    }
    categoryArticles: articlesList(first: ${DEFAULT_ARTICLE_LIMIT}) {
      articles {
        name
        variantName
        prices {
          currency
          regular {
            value
          }
        }
        images(
          format: WEBP
          maxWidth: 200
          maxHeight: 200
          limit: 1
        ) {
          path
        }
      }
    }
  }
}`;

export const useCategories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch(API_ENDPOINT, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        query: CATEGORIES_QUERY
                    }),
                });

                if (!response.ok) {
                    setError(`HTTP error! status: ${response.status}`);
                    return;
                }

                const data = await response.json();

                if (data.errors) {
                    setError(data.errors[0]?.message || 'GraphQL error');
                    return;
                }

                setCategories(data.data?.categories || []);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unexpected error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return { categories, loading, error };
};
