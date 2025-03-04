import * as React from "react";
import * as Icons from "@mui/icons-material";
import { useState, useEffect } from "react";
import {
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogContent,
  DialogTitle,
  TextField,
  ToggleButton,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

/*const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));*/

export default function IconsDialog({
  openDialog,
  setOpenDialog,
  setSelectedIcon,
  selectedIcon,
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
            {filteredIcons.map(([name, Icon]) => (
              <Grid
                size={1}
                key={name}
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
                  value={name}
                  onClick={() => setSelectedIcon(name)}
                  selected={name === selectedIcon}
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

/*<Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          margin: "1rem",
        }}
      >
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)} id="myForm1">
            <Box
              sx={{
                width: "50%",
                display: "flex",
                flexDirection: "column",
                paddingTop: "15px",
              }}
            >
              <TextField
                {...register("icon", {
                  maxLength: {
                    value: 8,
                    message: "I bet you can't find icon above 8",
                  },
                })}
                id="outlined-textarea"
                label="New Icon"
                placeholder="New Icon"
                sx={{ marginTop: "15px" }}
                multiline
                onChange={(e) => {
                  setSearchIcon(e.target.value);
                }}
                error={errors?.icon}
                helperText={errors?.icon && errors.icon.message}
              />
            </Box>
          </form>
        </DialogContent>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {filteredIcons.map(([name, Icon]) => (
            <Grid
              size={3}
              key={name}
              sx={{
                display: "inline-flex",
                flexDirection: "row",
                width: 40,
                mx: 1,
              }}
            >
              <Item>
                <ToggleButton
                  value={name}
                  onClick={() => setNewIcon(name)}
                  selected={name === newIcon}
                >
                  <Icon />
                </ToggleButton>
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>*/

/*  {filteredIcons.map(([name, Icon]) => (
            <Box
              key={name}
              sx={{
                display: "inline-flex",
                flexDirection: "column",
                width: 40,
                mx: 1,
              }}
            >
              <ToggleButton
                value={name}
                onClick={() => setNewIcon(name)}
                selected={name === newIcon}
              >
                <Icon />
              </ToggleButton>
              <Typography
                variant="caption"
                align="center"
                sx={{
                  textOverflow: "ellipsis",
                  overflow: "hidden", //textOverflow: "ellipsis"=將文字溢出的部分以...省略
                  //overflow: 'hidden'= 將溢出的字隱藏起來
                }}
              >
                {name}
              </Typography>
            </Box>
          ))} */
