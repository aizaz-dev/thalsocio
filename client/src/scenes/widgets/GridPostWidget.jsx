
  import {
    Box,

    Typography,
    useTheme,
  } from "@mui/material";
  import {  useSelector } from "react-redux";
  import { imgPath } from "../../helpers/functions"
  
  const GridPostWidget = ({
    postId,
    authorId,
    description,
    content,
  }) => {

    content = imgPath(content,'post')
  
  
    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;
  
    return (
      <Box sx={{padding:'0 0 0 0'}}>
        {/* <Typography color={main} sx={{ mt: "1rem" }}>
          {description}
        </Typography> */}
        {content && (
          <img
            width="100%"
            height="auto"
            alt="post"
            
            src={content}
          />
        )}        
      </Box>
    );
  };
  
  export default GridPostWidget;
  