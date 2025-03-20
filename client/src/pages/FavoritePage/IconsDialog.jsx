import * as React from "react";
import * as Icons from "@mui/icons-material";
import { useState, useEffect } from "react";
import {
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  ToggleButton,
} from "@mui/material";
import Grid from "@mui/material/Grid2";



export default function IconsDialog({
  openDialog,
  setOpenDialog,
  setSelectedIcon,
  selectedIcon,
  setLists,
  selectedListID,
}) {
  const [searchIcon, setSearchIcon] = useState("");
  const [filteredIcons, setFilteredIcons] = useState([]);

  useEffect(() => {
    setFilteredIcons(
      Object.entries(Icons)
        .filter(([name]) => !/Outlined$|TwoTone$|Rounded$|Sharp$/.test(name)) //過濾名字
        .filter(([name]) =>
          searchIcon ? name.toLowerCase().includes(searchIcon) : true
        ) //以搜尋列過濾，未搜尋時自動回傳9個圖標
        .slice(0, 6) //回傳前9個(0~8)
    );
  }, [searchIcon]);

  const handleClose = () => {
    setSearchIcon(null);
    setOpenDialog(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        slotProps={{
          paper: {
            sx: {
              width: "350px", // 設定固定寬度
              height: "350px", // 設定固定高度
              maxWidth: "none", // 取消 MUI 預設的 maxWidth 限制
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            },
          },
        }}
      >
        <Box
          sx={{
            width: "80%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            margin: "1rem",
            padding: "1rem",
          }}
        >
          <DialogContent>
            <TextField
              id="outlined-textarea"
              label="Search"
              placeholder="Search"
              sx={{ marginTop: "15px", width: "100%" }}
              multiline
              onChange={(e) => {
                setSearchIcon(e.target.value);
              }}
            />
          </DialogContent>
          <Grid
            container
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {filteredIcons.map(([iconName, Icon]) => (
              <Grid
                size={1}
                key={iconName}
                sx={{
                  display: "inline-flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  width: 40,
                  mx: 1,
                }}
              >
                <ToggleButton
                  value={iconName}
                  onClick={() => {
                    setSelectedIcon(iconName);
                    setLists((prevLists) =>
                      prevLists.map((item) =>
                        item._id === selectedListID
                          ? { ...item, icon: iconName }
                          : item
                      )
                    );
                  }}
                  selected={iconName === selectedIcon}
                >
                  <Icon />
                </ToggleButton>
              </Grid>
            ))}
          </Grid>
        </Box>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

