import { createContext, useState } from "react";



const FavoriteContext = createContext({
  favorite: {},
  favHandler: () => {},
});

export const FavoriteContentProvider = (props) => {
  const [favorite, setfavorite] = useState([]);

  const favHandler = (word) => {
    const newFavorite = [...favorite, word];
    setfavorite(newFavorite);

  };

  
  const handleSearch = (newWord) => {
    setCurrentSearch(newWord);
    setHistory((prevHistory) => {
      const newHistory = [newWord, ...prevHistory];
      if (prevHistory.includes(newWord)) {
        const newprev = prevHistory.filter((word) => word != newWord);
        const newHistory = [newWord, ...newprev];
        console.log(history);
        return newHistory.slice(0, 5);
      } else {
        console.log(history);
        return newHistory.slice(0, 5);
      }
    });
  };

  return (
    <FavoriteContext.Provider
      value={{ favorite: favorite, favHandler: favHandler }}
    >
      {props.children}
    </FavoriteContext.Provider>
  );
};

export default DictionaryContext;
