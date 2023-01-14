import React, { useState } from "react";
import {
  EditOutlined,
  DeleteOutlined,
  ImageOutlined,
  MoreHorizOutlined,
  CommentsDisabled,
} from "@mui/icons-material";
import SendIcon from "@mui/icons-material/Send";
import { InputBase, useTheme, IconButton, useMediaQuery } from "@mui/material";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import { useSelector } from "react-redux";
import { addComment } from "../helpers/api";

function AddComment({ postId, commentUpdater, Comments }) {
  const [comment, setComment] = useState("");
  const { _id, pic, name } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const { palette } = useTheme();

  const handlePost = async () => {
    const body = {
      "userId": _id,
      "storyId": postId,
      "comment": comment,
    };
    const { data } = await addComment(body);
    data.userId = _id;
    data.userPic = pic;
    data.userName = name;
    commentUpdater([...Comments, data]);
    setComment("");
  };

  return (
    <FlexBetween gap="0.5rem">
      <UserImage image={pic} size="30px" />
      <InputBase
        placeholder="   Add a comment..."
        onChange={(e) => setComment(e.target.value)}
        value={comment}
        sx={{
          width: "90%",
          backgroundColor: palette.neutral.light,
          borderRadius: "1.5rem",
          margin: "1rem",
          padding: "0.5rem",
        }}
      />
      <IconButton
        disabled={!comment}
        onClick={handlePost}
        sx={{
          color: palette.background.alt,
          backgroundColor: palette.primary.main,
          borderRadius: "3rem",
        }}
      >
        <SendIcon />
      </IconButton>
    </FlexBetween>
  );
}

export default AddComment;
