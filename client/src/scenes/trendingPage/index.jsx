import React from "react";
import { Box, useMediaQuery, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import PostsWidget from "../widgets/PostsWidget";
import WidgetWraper from "../../components/WidgetWraper";
import Navbar from "../navBar";
import "@fontsource/roboto/400.css";

function Trending() {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id } = useSelector((state) => state.user);
  return (
    <Box>
      <Navbar />

      <Box
        display="flex"
        flexWrap="wrap"
        alignContent="stretch"
        justifyContent="space-between"
        overflow="auto"
        m="1rem"
      >
        <Box maxWidth="20rem" maxHeight="50rem" height="100%">
          <WidgetWraper
            flexDirection="row-reverse"
            m="2rem 0 0 0"
            padding="0rem 0"
          >
            <Typography fontFamily="Roboto" m="20rem 0 0 0" fontSize="3.52rem">
              # Trending
            </Typography>
          </WidgetWraper>
        </Box>
        <PostsWidget pageType="trending" />
      </Box>
      <Box
        flexBasis={isNonMobileScreens ? "20%" : undefined}
        mt={isNonMobileScreens ? undefined : "2rem"}
      >
        {/* <CreatePostWidget/> */}
      </Box>
      <Grid item xs={12} sm={12} md={6} lg={3}></Grid>
    </Box>
  );
}

export default Trending;
