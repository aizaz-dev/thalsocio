import React from 'react'
import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import PostsWidget from '../widgets/PostsWidget';
import Navbar from '../navBar';

function Trending() {
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
          {/* <SortWidget/> */}
      </Box>
      <Box flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"} >
          {/* <CreatePostWidget/> */}
          <PostsWidget/>
          
      </Box>
      <Box flexBasis={isNonMobileScreens ? "30%" : undefined}>
      {/* <UserWidget userId={_id}  /> */}
      </Box>
      </Box>
    </Box>
  )
}

export default Trending