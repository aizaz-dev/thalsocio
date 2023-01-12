import React from "react";
import {
  EditOutlined,
  DeleteOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MoreHorizOutlined,
  TextFormat,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
  Tooltip,
} from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import Dropzonee from "../../components/Dropzonee";
import UserImage from "../../components/UserImage";
import WidgetWrapper from "../../components/WidgetWraper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../state/index";
import TextEditorWidget from "./TextEditorWidget";
import { createStory } from "../../helpers/api";

function CreatePostWidget() {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [isFormat, setIsFormat] = useState(false);
  const { palette } = useTheme();
  const { _id,pic } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 400px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;


  const handlePost = async () => {
    const formData = new FormData();
    formData.append("message", text);
    formData.append("tags", '#post');
    if (image) {
      formData.append("content", image);  
    }

    const {data} = await createStory(formData);
    dispatch(createPost({ post:data }));
    setImage(null);
    setText("");
    setIsFormat(!isFormat)
  };

  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <UserImage image={pic} size="50px" />
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setText(e.target.value)}
          value={text}
          multiline={true}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>
      {isFormat && <TextEditorWidget setChange={setText}/>}
      {isImage && (
        <Dropzonee image={image} setImage={setImage}/>
      )}

      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexBetween>
        <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
        <Tooltip title='Add Photo'>
          <ImageOutlined sx={{ color: mediumMain }} />

        </Tooltip>
          {isNonMobileScreens && (<Typography
            color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
          >
            Image
          </Typography>)}
        </FlexBetween>

        
          <>
            <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
            <Tooltip title="Add Video">
              <GifBoxOutlined sx={{ color: mediumMain, }} />
              </Tooltip>
              {isNonMobileScreens && (<Typography
            color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
          >
            Clip
          </Typography>)}
            </FlexBetween>

            <FlexBetween gap="0.25rem" onClick={() => setIsFormat(!isFormat)}>
            <Tooltip title="Add Rich Text">
              <TextFormat sx={{ color: mediumMain }} />
              </Tooltip>
              {isNonMobileScreens && (<Typography
            color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
          >
            Format
          </Typography>)}
            </FlexBetween>
          </>
 

        <Button
          disabled={!text && !image}
          onClick={handlePost}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          POST
        </Button>
      </FlexBetween>

    
     
    </WidgetWrapper>
  );
}

export default CreatePostWidget;

