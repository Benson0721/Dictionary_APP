import { useEffect, useState, useContext } from "react";
import * as Icons from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconsDialog from "./IconsDialog";
import FavoriteListsContext from "../../hooks/FavoriteListsContext";
import FavoriteWordsContext from "../../hooks/FavoriteWordsContext";
import DictionaryContext from "../../hooks/DictionaryContext";
import AuthContext from "../../hooks/AuthContext";
import { pink } from "@mui/material/colors";
import { set } from "mongoose";
export default function FavListDrawer({ openDrawer, setOpenDrawer }) {
  const [inputList, setInputList] = useState(""); // 輸入框的值
  const [mode, setMode] = useState(null);
  const [selectedIcon, setSelectedIcon] = useState(null); // 選擇的 icon
  const [openDialog, setOpenDialog] = useState(false);
  const { lists, setLists, addLists, updateLists, deleteLists } =
    useContext(FavoriteListsContext);
  const { user, setUser } = useContext(AuthContext);
  const theme = useTheme(); // 取得 MUI 主題
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // 判斷是否為手機
  const Icon = Icons[selectedIcon];
  const [selectedListID, setSelectedListID] = useState(null);
  const [curWord, setCurWord] = useState(null);
  const [curWordList, setCurWordList] = useState([]);
  const { addFavWord, allFavoriteWords, setIsFav, isFav } =
    useContext(FavoriteWordsContext);
  const { word } = useContext(DictionaryContext);
  const { vocabulary, phonetics, meanings } = word;
  console.log(word);
  console.log(isFav);
  useEffect(() => {
    if (word.vocabulary && word.meanings) {
      const curWordData = {
        word: vocabulary,
        audio: phonetics?.audio,
        meaning: meanings[0]?.definitions[0]?.definition,
      };
      console.log(curWordData);
      console.log(allFavoriteWords);
      setCurWord(curWordData);

      setIsFav(() =>
        allFavoriteWords?.some((fav) => fav.word === word.vocabulary)
          ? true
          : false
      );
      /*allFavoriteWords.map((fav) => {//map會遍歷所有單字，造成setcurwordlist重複調用失去值
        if (fav.word === word.vocabulary) {
          console.log("已是收藏單字");
          console.log(fav.favoriteLists);
          setCurWordList(fav.favoriteLists);
          console.log(curWordList);
        } else {
          setCurWordList([]);
        }
       
      });*/
      const foundFav = allFavoriteWords?.find(
        (fav) => fav.word === word.vocabulary
      );
      if (foundFav) {
        console.log("已是收藏單字");
        console.log(foundFav.favoriteLists);
        setCurWordList(foundFav.favoriteLists);
      } else {
        setCurWordList([]); // 若未找到，清空 curWordList
      }
    }
  }, [word, allFavoriteWords]);

  const handleCreate = async (name, icon) => {
    await addLists({ name, icon });
    setInputList("");
    setMode(null);
    setSelectedIcon(null);
  };
  const handleEdit = async (updatedLists) => {
    console.log("ui收到", updatedLists);
    await updateLists(updatedLists);
    setInputList("");
    setMode(null);
    setSelectedIcon(null);
  };

  // 取消新增
  const handleCancel = () => {
    setMode(null);
    setInputList("");
    setSelectedIcon(null);
  };
  const handleDelete = (id) => {
    deleteLists(id);
    setInputList("");
    setSelectedIcon(null);
  };

  const heartStyle = {
    color: pink[500],
    fontSize: 20,
  };

  console.log("lists:", lists);
  console.log("mode:", mode);
  const DrawerList = (
    <Box
      sx={{
        width: isMobile ? "100vw" : "400px",
        height: isMobile ? "50vh" : "100%",
        display: "flex",
        flexDirection: "column",
      }}
      role="presentation"
    >
      <List>
        {lists?.map((list, index) => {
          const Icon = Icons[list?.icon];
          return mode === "edit" ? (
            <ListItem disablePadding key={index}>
              <ListItemButton>
                <ListItemIcon>
                  <IconButton
                    onClick={() => {
                      setOpenDialog(true);
                      setSelectedListID(list._id);
                    }}
                  >
                    <Icon />
                  </IconButton>
                </ListItemIcon>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={list.name}
                  onChange={(e) =>
                    setLists((prevLists) =>
                      prevLists.map((item) =>
                        item._id === list._id
                          ? { ...item, name: e.target.value }
                          : item
                      )
                    )
                  }
                  placeholder="Enter new list name"
                />

                <IconButton
                  color="error"
                  onClick={() => handleDelete(list._id)}
                >
                  <CloseIcon />
                </IconButton>
              </ListItemButton>
            </ListItem>
          ) : (
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={() => addFavWord(list._id, curWord)}>
                <ListItemIcon>
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={list.name} />
                {curWordList.map((id) => {
                  if (id === list._id) {
                    return <FavoriteIcon sx={heartStyle} />;
                  }
                })}
              </ListItemButton>
            </ListItem>
          );
        })}

        {mode === "create" && (
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <IconButton onClick={() => setOpenDialog(true)}>
                  {selectedIcon ? <Icon /> : <AddIcon />}
                </IconButton>
              </ListItemIcon>
              <TextField
                fullWidth
                variant="outlined"
                value={inputList}
                onChange={(e) => setInputList(e.target.value)}
                placeholder="Enter new list name"
              />
              <IconButton
                color="success"
                disabled={!inputList || !selectedIcon}
                onClick={() => handleCreate(inputList, selectedIcon)}
              >
                <CheckIcon />
              </IconButton>
              <IconButton color="error" onClick={handleCancel}>
                <CloseIcon />
              </IconButton>
            </ListItemButton>
          </ListItem>
        )}
      </List>

      <Box
        sx={{
          mt: "auto",
          p: 2,
          display: "flex",
          gap: 1,
          justifyContent: "center",
          bgcolor: "#f8f9fa",
        }}
      >
        <Divider />
        {mode === "edit" ? (
          <Button
            variant="contained"
            sx={{ flexGrow: 1 }}
            onClick={() => handleEdit(lists)}
            color="success"
          >
            <CheckIcon />
            End edit
          </Button>
        ) : (
          <>
            <Button
              variant="contained"
              sx={{ flexGrow: 1 }}
              onClick={() => setMode("create")}
              disabled={mode == "create"} // 防止重複點擊
            >
              Create
            </Button>
            <Button
              variant="contained"
              sx={{ flexGrow: 1 }}
              onClick={() => {
                setMode("edit");
              }}
              disabled={mode == "edit"}
              color="success"
            >
              Edit
            </Button>
          </>
        )}
      </Box>
    </Box>
  );

  return (
    <div>
      <IconsDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        setSelectedIcon={setSelectedIcon}
        selectedIcon={selectedIcon}
        selectedListID={selectedListID}
        setLists={setLists}
      />
      <Drawer
        anchor={isMobile ? "bottom" : "right"}
        open={openDrawer}
        onClose={() => {
          setOpenDrawer(false);
          setMode(null);
        }}
      >
        {DrawerList}
      </Drawer>
    </div>
  );
}

/*export default function FavListDrawer({ openDrawer, setOpenDrawer }) {
  const [lists, setLists] = useState([
    { id: 1, text: "Inbox", icon: <EmojiObjectsIcon /> },
    { id: 2, text: "Starred", icon: <EmojiObjectsIcon /> },
    { id: 3, text: "Send email", icon: <EmojiObjectsIcon /> },
    { id: 4, text: "Drafts", icon: <EmojiObjectsIcon /> },
  ]);
  const [newList, setNewList] = useState(""); // 輸入框的值
  const [editing, setEditing] = useState(false); // 是否正在編輯
  const [adding, setAdding] = useState(false); // 是否正在編輯
  const [selectedIcon, setSelectedIcon] = useState(<EmojiObjectsIcon />); // 選擇的 icon

  useEffect(() => {
    setFilteredIcons(
      Object.entries(Icons)
        .filter(([name]) => !/Outlined$|TwoTone$|Rounded$|Sharp$/.test(name)) //過濾名字
        .filter(([name]) =>
          searchIcon ? name.toLowerCase().includes(searchIcon) : true
        ) //以搜尋列過濾，未搜尋時自動回傳9個圖標
        .slice(0, 9) //回傳前9個(0~8)
    );
  }, [searchIcon]);

  // 確認新增
  const handleSave = () => {
    if (newList.trim()) {
      setLists([...lists, { text: newList, icon: selectedIcon }]);
    }
    setEditing(false);
    setNewList("");
    setSelectedIcon(<EmojiObjectsIcon />); // 重置 icon
  };

  // 取消新增
  const handleCancel = () => {
    setAdding(false);
    setEditing(false);
    setNewList("");
    setSelectedIcon(<EmojiObjectsIcon />);
  };
  const handleDelete = (id) => {
    setLists((prev) => {
      const newLists = prev.filter((item) => item.id != id);
      return newLists;
    });
    setNewList("");
    setSelectedIcon(<EmojiObjectsIcon />);
  };

  const DrawerList = (
    <Box
      sx={{
        width: 400,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      role="presentation"
    >
      <List>
        {lists.map((item, index) =>
          editing ? (
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <IconButton onClick={() => console.log("選擇 Icon")}>
                    {item.icon}
                  </IconButton>
                </ListItemIcon>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={item.text}
                  onChange={(e) => setNewList(e.target.value)}
                  placeholder="Enter new list name"
                />
                <IconButton color="success" onClick={handleSave}>
                  <CheckIcon />
                </IconButton>
                <IconButton color="error" onClick={() => handleDelete(item.id)}>
                  <CloseIcon />
                </IconButton>
              </ListItemButton>
            </ListItem>
          ) : (
            <ListItem key={index} disablePadding>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          )
        )}

        {adding && (
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <IconButton onClick={() => console.log("選擇 Icon")}>
                  <AddIcon />
                </IconButton>
              </ListItemIcon>
              <TextField
                fullWidth
                variant="outlined"
                value={newList}
                onChange={(e) => setNewList(e.target.value)}
                placeholder="Enter new list name"
              />
              <IconButton color="success" onClick={handleSave}>
                <CheckIcon />
              </IconButton>
              <IconButton color="error" onClick={handleCancel}>
                <CloseIcon />
              </IconButton>
            </ListItemButton>
          </ListItem>
        )}
      </List>

      <Box
        sx={{
          mt: "auto",
          p: 2,
          display: "flex",
          gap: 1,
          justifyContent: "center",
          bgcolor: "#f8f9fa",
        }}
      >
        <Divider />
        {editing ? (
          <Button
            variant="contained"
            sx={{ flexGrow: 1 }}
            onClick={() => setEditing(false)}
            color="error"
          >
            End edit
          </Button>
        ) : (
          <>
            <Button
              variant="contained"
              sx={{ flexGrow: 1 }}
              onClick={() => setAdding(true)}
              disabled={adding} // 防止重複點擊
            >
              Create
            </Button>
            <Button
              variant="contained"
              sx={{ flexGrow: 1 }}
              onClick={() => setEditing(true)}
              disabled={editing}
              color="success"
            >
              Edit
            </Button>
          </>
        )}
      </Box>
    </Box>
  );

  return (
    <div>
      <Drawer
        anchor={"right"}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        {DrawerList}
      </Drawer>
    </div>
  );
} */
