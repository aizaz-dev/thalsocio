import React, { useState } from "react";
import { Box, InputBase, IconButton, useTheme,Typography,Button } from "@mui/material";
import { HighlightOffRounded,EditOutlined,DeleteOutlined} from "@mui/icons-material";
import WidgetWraper from "../../components/WidgetWraper";

import Dropzonee from "../../components/Dropzonee";


function EditPostWidget({ setClose, text, content }) {
  const [post, setPost] = useState(text);
  const [img, setImg] = useState(content);
  const [image, setImage] = useState(null);
  const [isUpdatePic,setIsUpdatePic]=useState(false)
  const { palette } = useTheme();
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;
  const handleClose = () => {
    setClose(false);
  };
  const handlePicUpdate=()=>{
    setImg(null)
    setIsUpdatePic(true)
  }

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("message", post);
    formData.append("tags", '#post');
    if (image) {
      formData.append("content", image);  
    }

    const response = await fetch(`http://localhost:3001/api/story/create/${_id}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const posts = await response.json();
    //dispatch(setPosts({ posts }));
    setImage(null);
    setClose(false)
    setPost("");
  };

  return (
    <WidgetWraper>
      <Box display="flex" flexDirection="row-reverse">
        <IconButton onClick={handleClose} color="primary">
          <HighlightOffRounded />
        </IconButton>
      </Box>
      <Box sx={{ width: "30rem" }}>
        <InputBase
          placeholder={text}
          onChange={(e) => setPost(e.target.value)}
          value={post}
          multiline={true}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
            margin: "dense",
          }}
        />
        {img && (
            <Box>
            <Box display='flex' flexDirection='row-reverse' m='2rem 0 -3.5rem'>
            <IconButton size='medium' onClick={handlePicUpdate}>
                <EditOutlined color='primary' />
            </IconButton>
            </Box>
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={content}
        />
        </Box>
      )}
      {isUpdatePic &&(
        
        <Dropzonee image={image} setImage={setImage}/>
      )

      }
      <Box display='flex' flexDirection='row-reverse'>
      <Button
          onClick={handlePost}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
            margin:"1rem"
          }}
        >
          Update
        </Button>
        </Box>
      </Box>
    </WidgetWraper>
  );
}

export default EditPostWidget;
