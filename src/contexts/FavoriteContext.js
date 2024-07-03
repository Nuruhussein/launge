// FavoriteContext.js
import React, { createContext, useState } from "react";

export const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const [favoriteItems, setFavoriteItems] = useState([]);

  const addToFavorites = (item) => {
    setFavoriteItems((prevFavoriteItems) => [...prevFavoriteItems, item]);
  };

  const removeFromFavorites = (id) => {
    setFavoriteItems((prevFavoriteItems) =>
      prevFavoriteItems.filter((item) => item.id !== id)
    );
  };

  const isFavorite = (id) => {
    return favoriteItems.some((item) => item.id === id);
  };

  return (
    <FavoriteContext.Provider
      value={{ favoriteItems, addToFavorites, removeFromFavorites, isFavorite }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};
