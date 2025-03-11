import { useContext, useEffect, useState } from "react";
import FavoriteListsContext from "../../hooks/FavoriteListsContext";
import FavoriteWordsContext from "../../hooks/FavoriteWordsContext";
import "./FavoritePage.css";
import * as Icons from "@mui/icons-material";
import { HeadingS_a } from "../../components/Headings";
import { BodyM } from "../../components/Bodys";
import AudioPlayer from "../../components/AudioPlayer/AudioPlayer";
import Navbar from "../../components/Navbar/Navbar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import AuthContext from "../../hooks/AuthContext";
import avatar from "../../assets/images/emojinoko.jpg";
import { FavWordHeading } from "../../components/Headings";

const ListDrawer = ({ isOpen, isMobile, setIsOpen, user }) => {
  const { lists, fetchLists, currentList, setCurrentList } =
    useContext(FavoriteListsContext);

  const [isLoading, setIsLoading] = useState(false);

  const drawerWidth = 240;
  const leftDrawerStyle = {
    width: drawerWidth,
    top: "123px",
    height: "calc(100% - 123px)", // 讓 sidebar 從 navbar 底下開始
    boxSizing: "border-box",
    position: "absolute",
    left: 0,
    height: "100vh",
  };
  const bottomDrawerStyle = {
    width: "100%", // 讓 sidebar 從 navbar 底下開始
    boxSizing: "border-box",
    left: 0,
    height: "300px",
  };

  useEffect(() => {
    const handleLoading = () => {
      if (lists && lists.length > 0) {
        setIsLoading(false);
      }
    };

    handleLoading();
  }, [lists, fetchLists]);
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        "& .MuiDrawer-paper": isMobile ? bottomDrawerStyle : leftDrawerStyle,
      }}
      variant={isMobile ? "temporary" : "permanent"}
      anchor={isMobile ? "bottom" : "left"}
      open={isOpen}
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
                    <Icon />
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
  const { lists, fetchLists, currentList, setCurrentList } =
    useContext(FavoriteListsContext);
  const { currentFavWords, removeFavWord, fetchCurrentFavWords } =
    useContext(FavoriteWordsContext);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(AuthContext);
  console.log(lists);
  console.log(currentList);
  console.log(currentFavWords);

  useEffect(() => {
    const handleLoading = () => {
      if (currentFavWords && currentFavWords.length > 0) {
        setIsLoading(false);
      }
    };

    handleLoading();
  }, [currentFavWords, removeFavWord]);

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
    const handleClickOutside = (event) => {
      if (window.innerWidth <= 767) {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleFetch = async () => {
      if (currentList) {
        await fetchCurrentFavWords(currentList.id);
      }
    };

    handleFetch();
  }, [currentList, setCurrentList]);

  return (
    <div className="Dictionary__favoritePage__bg">
      <div className="Dictionary__favoritePage">
        <Navbar />
        <div className="flex">
          <ListDrawer
            isMobile={isMobile}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            user={user}
          />
          <div className="Dictionary__favoritePage__main flex-1">
            {currentList ? (
              <>
                <h1
                  className={`text-[28px] md:text-[36px] font-bold mr-4 text-Black-3 mb-3`}
                >
                  {currentList?.name}
                </h1>
                <p className="text-[14px] md:text-[18px] text-gray-500">
                  Organize and manage your saved words.
                </p>
                {isMobile ? (
                  <button onClick={() => setIsOpen(true)}>Open Lists</button>
                ) : (
                  ""
                )}
              </>
            ) : (
              <>
                <h1
                  className={`text-[28px] md:text-[36px] font-bold mr-4 text-Black-3 mb-3`}
                >
                  Select your favorite list
                </h1>
                {isMobile ? (
                  <button onClick={() => setIsOpen(true)}>Open Lists</button>
                ) : (
                  ""
                )}
              </>
            )}
            <Divider />
            <ul className="Dictionary__favoritePage__list">
              {isLoading ? (
                <div>Loading...</div>
              ) : (
                currentFavWords.map((favWord, index) => (
                  <li
                    key={index}
                    className="Dictionary__favoritePage__list__item"
                  >
                    <AudioPlayer audioSrc={favWord.audio} />
                    <FavWordHeading word={favWord.word} {...favWord} />
                    <Icons.Delete
                      sx={{
                        fontSize: 50,
                        marginTop: "20px",
                        cursor: "pointer",
                        marginLeft: "auto",
                      }}
                      onClick={() => removeFavWord(currentList.id, favWord._id)}
                    />
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

/*<nav className="flex items-center">
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          lists.map((list) => {
            const Icon = Icons[list.icon];
            return (
              <div key={list.id} className="flex items-center">
                <div className="flex items-center">
                  <Icon />
                  <h3
                    onClick={() => setCurrentList(list._id)}
                    className="text-[16px] md:text-[24px] font-bold mr-4 text-Black-3 transition duration-400 ease-in-out"
                  >
                    {list.name}
                  </h3>
                </div>
              </div>
            );
          })
        )}
      </nav>
      <div className="flex items-center">
        {currentFavWords.length > 0 ? (
          currentFavWords.map((favWord, index) => (
            <li
              key={index}
              className="text-[13px] md:text-[16px] font-medium text-Purple-1 cursor-pointer mr-4"
            >
              <HeadingS_a data={favWord.word} />
              {favWord.word}
              <AudioPlayer word={favWord.audio} />
              <BodyM data={{ definition: favWord.meaning }} />
              <Icons.Delete
                onClick={() => removeFavWord(currentList, favWord._id)}
              />
            </li>
          ))
        ) : (
          <li className="text-[13px] md:text-[16px] font-medium text-Purple-1 cursor-pointer mr-4">
            No favorite words
          </li>
        )}
      </div>*/
