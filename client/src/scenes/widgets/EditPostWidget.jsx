import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Box, InputBase, IconButton, useTheme,Typography,Button } from "@mui/material";
import { HighlightOffRounded,EditOutlined,DeleteOutlined} from "@mui/icons-material";
import WidgetWraper from "../../components/WidgetWraper";

import Dropzonee from "../../components/Dropzonee";
import TextEditorWidget from "./TextEditorWidget";
import { updateStory } from "../../helpers/api";
import { setPost } from "../../state";

function EditPostWidget({ setClose, text, content,id }) {
  const [updatedPost, setUpdatedPost] = useState(text);
  const [img, setImg] = useState(content);
  const [image, setImage] = useState(null);
  const [isUpdatePic,setIsUpdatePic]=useState(false)
  const dispatch=useDispatch();
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
    formData.append("message", updatedPost);
    formData.append("tags", '#post');
    if (image) {
      formData.append("content", image);  
    }


    const {data}= await updateStory(id,formData)
    dispatch(setPost({ post:data }));
    setImage(null);
    setClose(false)
    setUpdatedPost("");
   
  };

  return (
    <WidgetWraper>
      <Box display="flex" flexDirection="row-reverse">
        <IconButton onClick={handleClose} color="primary">
          <HighlightOffRounded />
        </IconButton>
      </Box>
      <Box sx={{ width: "30rem" }}>

        <TextEditorWidget content={updatedPost} setChange={setUpdatedPost}/>
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
