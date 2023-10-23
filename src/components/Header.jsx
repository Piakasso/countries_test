import { AppBar, Switch, Toolbar, Typography } from "@mui/material";
import React from "react";

const Header = ({ toggleTheme, activeTheme }) => {
  return (
    <AppBar color="default" position="sticky">
      <Toolbar>
        <Typography variant="h6" component="span" sx={{ flexGrow: 1 }}>
          Countries Material UI
        </Typography>
        <Switch
          checked={activeTheme === "dark" && true}
          onChange={toggleTheme}
          color="default"
        />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
