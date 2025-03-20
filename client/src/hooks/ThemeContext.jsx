import { createContext, useState, useMemo } from "react";

const ThemeContext = createContext({
  isNight: {},
  setIsNight: () => {},
  font: "Inter",
  setFont: () => {},
});

export const ThemeContentProvider = (props) => {
  const [isNight, setIsNight] = useState(false);
  const [font, setFont] = useState("Inter");

  const contextValue = useMemo(
    () => ({
      isNight,
      setIsNight,
      font,
      setFont,
    }),
    [isNight, setIsNight, font, setFont]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
