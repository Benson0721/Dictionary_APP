import { createContext, useState } from "react";

const ThemeContext = createContext({
  isNight: {},
  setIsNight: () => {},
});

export const ThemeContentProvider = (props) => {
  const [isNight, setIsNight] = useState(false);

  return (
    <ThemeContext.Provider value={{ isNight: isNight, setIsNight: setIsNight }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
