import { useContext, useState } from "react";
import ThemeContext from "../hooks/ThemeContext";
import DictionaryContext from "../hooks/DictionaryContext";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { pink } from "@mui/material/colors";
import { IconButton } from "@mui/material";
import FavoriteContext from "../hooks/FavoriteContext";

export function HeadingL({
  vocubulary,
  phoneticText,
  spacing,
  setOpenDrawer,
  openDrawer,
}) {
  const { isNight } = useContext(ThemeContext);
  const { toggleFavorites } = useContext(FavoriteContext);
  const { word } = useContext(DictionaryContext);
  const [isFav, setIsFav] = useState(false);
  const heartStyle = {
    color: pink[500],
    fontSize: 30,
  };

  const handleToggleFavorites = async (word) => {
    setIsFav((prev) => !prev);
    try {
      await toggleFavorites(word);
    } catch (e) {
      console.error(
        "Error in toggleFavorites:",
        e.response?.data?.error || e.message
      );
      setIsFav((prev) => !prev);
    }
  };

  return (
    <div className={`flex flex-col items-start ${spacing}`}>
      <div className="flex items-center">
        <h1
          className={`text-[32px] md:text-[64px] font-bold mr-4 ${
            isNight ? "text-white" : "text-Black-3"
          } transition duration-400 ease-in-out`}
        >
          {vocubulary}
        </h1>
        <IconButton id="margin" onClick={() => setOpenDrawer(!openDrawer)}>
          {isFav ? (
            <FavoriteIcon sx={heartStyle} />
          ) : (
            <FavoriteBorderIcon sx={heartStyle} />
          )}
        </IconButton>
      </div>
      <h2 className="text-[24px] font-bold text-Purple-1">{phoneticText}</h2>
    </div>
  );
}

export function HeadingM({ data }) {
  const { isNight } = useContext(ThemeContext);
  return (
    <h2
      className={`text-[18px] md:text-[24px] font-bold  mb-4 grow ${
        isNight ? "text-white" : "text-Black-3"
      } transition duration-400 ease-in-out`}
    >
      {data}
    </h2>
  );
}

export function HeadingS({ data }) {
  return (
    <h3 className="text-[16px] md:text-[20px] font-medium text-Gray-1 mb-2">
      {data}
    </h3>
  );
}

export function HeadingS_a({ data }) {
  return (
    <h3 className="text-[16px] md:text-[20px] font-medium text-Purple-1 cursor-pointer">
      {data}
    </h3>
  );
}
