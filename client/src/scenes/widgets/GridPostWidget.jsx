
  import {
    Box,

    Typography,
    useTheme,
  } from "@mui/material";
  import {  useSelector } from "react-redux";
  import { imgPath } from "../../helpers/functions"
  import WidgetWraper from "../../components/WidgetWraper";
  import PostsWidget from "./PostsWidget";
  
  const GridPostWidget = ({
pageType
  }) => {
    const type=pageType=="trending"?'trending':'grid';
  
    return (
       <Box
        display="flex"
        flexWrap="wrap"
        alignContent="stretch"
        justifyContent="space-around"
        overflow="auto"
        m="1rem"
      >
      {pageType=='trending' && (

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
      )}
        
        <PostsWidget pageType={type} />
      </Box>
    );
  };
  
  export default GridPostWidget;
  