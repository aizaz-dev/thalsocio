import React from 'react'
import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "../navBar/index";
import UserWidget from "../widgets/UserWidget";
import CreatePostWidget from '../widgets/CreatePostWidget';
import PostsWidget from '../widgets/PostsWidget';
import SortWidget from '../widgets/SortWidget';
import PageWidget from '../widgets/PageWidget';

function HomePage() {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id } = useSelector((state) => state.user);
  return (
    <Box>
      <Navbar/>
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      > 
      <Box flexBasis={isNonMobileScreens ? "15%" : undefined} >
          <SortWidget/>
      </Box>
      <Box flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}  >
          <CreatePostWidget/>
          <PostsWidget pageType='home'/>
          <PageWidget/>
          
      </Box>
      <Box flexBasis={isNonMobileScreens ? "30%" : undefined}>
      <UserWidget userId={_id}  />
      </Box>
      </Box>
    </Box>
  )
}


export default HomePage

