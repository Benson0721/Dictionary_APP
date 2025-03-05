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
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects"; // 預設 icon
import MenuIcon from "@mui/icons-material/Menu"; // 選擇 icon 的按鈕
import IconsDialog from "./IconsDialog";
import FavoriteListsContext from "../../hooks/FavoriteListsContext";
export default function FavListDrawer({ openDrawer, setOpenDrawer }) {
  const [newList, setNewList] = useState(""); // 輸入框的值
  const [mode, setMode] = useState(null);
  const [selectedIcon, setSelectedIcon] = useState(null); // 選擇的 icon
  const [openDialog, setOpenDialog] = useState(false);
  const { lists, addLists, updateLists, deleteLists } =
    useContext(FavoriteListsContext);
  const theme = useTheme(); // 取得 MUI 主題
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // 判斷是否為手機
  const Icon = Icons[selectedIcon];
  const handleCreate = async (name, icon) => {
    await addLists({ name, icon });
    setMode(null);
    setSelectedIcon(null);
  };
  const handleEdit = async (listID, updatedList) => {
    await updateLists(listID, updatedList);
    setMode(null);
    setSelectedIcon(null);
  };

  // 取消新增
  const handleCancel = () => {
    setMode(null);
    setNewList("");
    setSelectedIcon(null);
  };
  const handleDelete = (id) => {
    deleteLists(id);
    setNewList("");
    setSelectedIcon(null);
  };

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
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <IconButton onClick={() => setOpenDialog(true)}>
                    <Icon />
                  </IconButton>
                </ListItemIcon>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={list.name}
                  onChange={(e) => setNewList(e.target.value)}
                  placeholder="Enter new list name"
                />
                <IconButton
                  color="success"
                  onClick={handleEdit(list._id, {
                    name: newList,
                    icon: selectedIcon,
                  })}
                >
                  <CheckIcon />
                </IconButton>
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
              <ListItemButton>
                <ListItemIcon>
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={list.name} />
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
                value={newList}
                onChange={(e) => setNewList(e.target.value)}
                placeholder="Enter new list name"
              />
              <IconButton
                color="success"
                onClick={() => handleCreate(newList, selectedIcon)}
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
            onClick={() => setMode(null)}
            color="error"
          >
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
              onClick={() => setMode("edit")}
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
