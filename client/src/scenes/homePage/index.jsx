import React from 'react'
import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "../navBar/index";
import UserWidget from "../widgets/UserWidget";
import CreatePostWidget from '../widgets/CreatePostWidget';
import PostsWidget from '../widgets/PostsWidget';
import SortWidget from '../widgets/SortWidget';
import PageWidget from '../widgets/PageWidget';
import GridPostWidget from '../widgets/GridPostWidget';

function HomePage({pageType,userId}) {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id } = useSelector((state) => state.user);
  const view=useSelector((state)=>state.view)
  return (
    <Box>
      <Navbar />
      {view == "list" && (
        <Box
          width="100%"
          padding="2rem 6%"
          display={isNonMobileScreens ? "flex" : "block"}
          gap="0.5rem"
          justifyContent="space-between"
        >
          <Box flexBasis={isNonMobileScreens ? "15%" : undefined}>
            <SortWidget />
          </Box>
          <Box
            flexBasis={isNonMobileScreens ? "42%" : undefined}
            maxWidth="30rem"
            mt={isNonMobileScreens ? undefined : "2rem"}
          >
            <CreatePostWidget />
            <PostsWidget pageType={pageType} userId={userId}/>
            <PageWidget />
          </Box>
          <Box flexBasis={isNonMobileScreens ? "30%" : undefined}>
            <UserWidget userId={_id} />
          </Box>
        </Box>
      )}
      {view == "module" && (
        <Box
          width="100%"
          padding="2rem 6%"
          display={isNonMobileScreens ? "flex" : "block"}
          gap="0.5rem"
          justifyContent="space-between"
        >
          <Box flexBasis={isNonMobileScreens ? "15%" : undefined}>
            <SortWidget />
            <UserWidget userId={_id} />
          </Box>
          <Box
            flexBasis={isNonMobileScreens ? "100%" : undefined}
            mt={isNonMobileScreens ? undefined : "2rem"}
          >
            <CreatePostWidget />
            <GridPostWidget pageType={pageType} userId={userId}/>
            <PageWidget />
          </Box>
          
        </Box>
      )}
    </Box>
  );
}


export default HomePage

