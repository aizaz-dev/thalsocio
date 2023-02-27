import React from "react";
import { Box, useMediaQuery, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "../navBar";
import "@fontsource/roboto/400.css";
import GridPostWidget from "../widgets/GridPostWidget";

function Trending() {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id } = useSelector((state) => state.user);
  return (
    <Box>
      <Navbar />

   <GridPostWidget pageType="trending"/>

 
    </Box>
  );
}

export default Trending;
