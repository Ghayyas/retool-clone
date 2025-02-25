"use client";

import React, { useContext } from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import { DesktopWindows, PhoneIphone } from "@mui/icons-material";
import { SizeContext } from "@/app/context/NavbarContext";

function Navbar() {
const { setSelectedSize } = useContext(SizeContext);

  const handleSizeChange = (size:string) => {
    setSelectedSize(size);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className="flex-grow">
          Responsive Layout
        </Typography>
        <IconButton
          aria-label="desktop"
          onClick={() => handleSizeChange("desktop")}
          color={"inherit"}
        >
          <DesktopWindows />
        </IconButton>
        <IconButton
          aria-label="mobile"
          onClick={() => handleSizeChange("mobile")}
          color={"inherit"}
        >
          <PhoneIphone />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;