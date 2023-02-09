import React, { useState, useEffect, createContext } from 'react';
import { Product } from '../types/Product';
export const FavoritesContext = createContext({
  favorites: [],
  addToFavorites: () => {},
});

const FavoriteProvider: React.FC = ({ children }:any) => {
  const [favorites, setFavorites] = useState<Product[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (product: Product) => {
    if (favorites.some(fav => fav.id === product.id)) {
      setFavorites(favorites.filter(fav => fav.id !== product.id));
    } else {
      setFavorites([...favorites, product]);
    }
  };
  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};
export default FavoriteProvider;