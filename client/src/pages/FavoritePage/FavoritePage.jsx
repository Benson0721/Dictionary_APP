import { useContext, useEffect, useRef, useState } from "react";
import FavoriteListsContext from "../../hooks/FavoriteListsContext";
import FavoriteWordsContext from "../../hooks/FavoriteWordsContext";
import "./FavoritePage.scss";
import * as Icons from "@mui/icons-material";
import AudioPlayer from "../../components/AudioPlayer/AudioPlayer";
import Navbar from "../../components/Navbar/Navbar";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AuthContext from "../../hooks/AuthContext";
import ThemeContext from "../../hooks/ThemeContext";
import avatar from "../../assets/images/emojinoko.jpg";
import { FavWordHeading } from "../../components/Headings";
import { useMediaQuery } from "@mui/material";
const ListDrawer = ({ isOpen, setIsOpen, user }) => {
  const { lists, fetchLists, setCurrentList,setLists } =
    useContext(FavoriteListsContext);

  const { isNight } = useContext(ThemeContext);
  const menuRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const drawerWidth = 240;
  const leftDrawerStyle = {
    width: drawerWidth,
    top: "123px",
    height: "calc(100% - 123px)", // 讓 sidebar 從 navbar 底下開始
    boxSizing: "border-box",
    position: "absolute",
    left: 0,
    color: isNight ? "white" : "#2d2d2d",
    backgroundColor: isNight ? "#2d2d2d" : "white",
    transition: "background-color 0.3s ease-in-out, color 0.3s ease-in-out",
  };
  const bottomDrawerStyle = {
    width: "100%", // 讓 sidebar 從 navbar 底下開始
    boxSizing: "border-box",
    left: 0,
    height: "300px",
    color: isNight ? "white" : "#2d2d2d",
    backgroundColor: isNight ? "#2d2d2d" : "white",
    transition: "background-color 0.3s ease-in-out, color 0.3s ease-in-out",
  };

  useEffect(() => {
    const handleLoading = () => {
      if (lists && lists.length > 0) {
        setIsLoading(false);
      }
    };

    handleLoading();
  }, [lists, fetchLists,setLists]);

  /* useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobile) {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);*/

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        "& .MuiDrawer-paper": isMobile ? bottomDrawerStyle : leftDrawerStyle,
      }}
      variant={isMobile ? "temporary" : "permanent"}
      anchor={isMobile ? "bottom" : "left"}
      open={isOpen}
      onClose={() => setIsOpen(false)}
      ref={menuRef}
    >
      <Divider />
      {isMobile ? (
        <></>
      ) : (
        <ListItem>
          <ListItemIcon>
            <img
              className="Dictionary__navbar-interface__avatar"
              src={avatar}
              alt="avatar"
            />
          </ListItemIcon>
          {user.username}
        </ListItem>
      )}

      <Divider />
      <List>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          lists.map((list) => {
            const Icon = Icons[list.icon];
            return (
              <ListItem key={list._id} disablePadding>
                <ListItemButton
                  onClick={() => {
                    setCurrentList(() => ({ id: list._id, name: list.name }));
                    setIsOpen(false);
                  }}
                >
                  <ListItemIcon>
                    <Icon sx={{ color: isNight ? "white" : "#2d2d2d" }} />
                  </ListItemIcon>
                  <ListItemText primary={list.name} />
                </ListItemButton>
              </ListItem>
            );
          })
        )}
      </List>
      <Divider />
    </Drawer>
  );
};

export default function FavoritePage() {
  const { currentList, setCurrentList } = useContext(FavoriteListsContext);
  const { currentFavWords, removeFavWord, fetchCurrentFavWords,setCurrentFavWords } =
    useContext(FavoriteWordsContext);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const { font, isNight } = useContext(ThemeContext);

  useEffect(() => {
    const handleLoading = () => {
      if (currentFavWords && currentFavWords.length > 0) {
        setIsLoading(false);
      }
    };

    handleLoading();
  }, [currentFavWords, removeFavWord,setCurrentFavWords]);

  useEffect(() => {
    const handleResize = () => {
      const isWideScreen = window.innerWidth >= 768;
      setIsMobile(!isWideScreen);
      setIsOpen(isWideScreen);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [user]);

  useEffect(() => {
    const handleFetch = async () => {
      if (currentList) {
        await fetchCurrentFavWords(currentList.id);
      }
    };

    handleFetch();
  }, [currentList, setCurrentList]);

  return (
    <div
      className={`Dictionary__favoritePage__bg font-${font} ${
        isNight ? "bg-Black-3 text-white" : "bg-white text-Black-3"
      }`}
    >
      <div className="Dictionary__favoritePage">
        <Navbar />
        <div className="flex ">
          <ListDrawer
            isMobile={isMobile}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            user={user}
          />
          <div className="Dictionary__favoritePage__main">
            {currentList ? (
              <>
                <h1
                  className={`text-[28px] md:text-[36px] font-bold mr-4  mb-3`}
                >
                  {currentList?.name}
                </h1>
                <p className="text-[14px] md:text-[18px] text-gray-500">
                  Organize and manage your saved words.
                </p>
              </>
            ) : (
              <>
                <h1
                  className={`text-[28px] md:text-[36px] font-bold mr-4 text-Black-3 mb-3`}
                >
                  Select your favorite list
                </h1>
              </>
            )}
            <Divider />
            <ul className="Dictionary__favoritePage__list">
              {isLoading ? (
                <></>
              ) : (
                currentFavWords.map((favWord, index) => (
                  <>
                    <li
                      key={index}
                      className="Dictionary__favoritePage__list__item"
                    >
                      <AudioPlayer audioSrc={favWord.audio} />
                      <FavWordHeading word={favWord.word} {...favWord} />
                      <Icons.Delete
                        sx={{
                          fontSize: 50,
                          marginTop: "48px",
                          cursor: "pointer",
                          marginLeft: "auto",
                        }}
                        onClick={() =>
                          removeFavWord(currentList.id, favWord._id)
                        }
                      />
                    </li>
                    <hr />
                  </>
                ))
              )}
            </ul>
            {isMobile ? (
              <button
                className="Dictionary__favoritePage__button bg-purple-600 text-white"
                onClick={() => setIsOpen(true)}
              >
                Open Lists
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
