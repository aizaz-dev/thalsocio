import React,{useState,useEffect} from 'react';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import {timeSince} from "../helpers/functions"

const Comment = ({ authorName,authorPic,authorId,createdAt,message }) => {
  const [time, setTime] = useState('')
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  useEffect(() => {

    setTime(timeSince(createdAt))
  }, []); 

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={authorPic} size="30px" />
        <Box
          onClick={() => {
            navigate(`/profile/${authorId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {authorName}
          </Typography>
          <Typography>{message}</Typography>
          <Typography sx={{ color: medium }}>{time}</Typography>
        </Box>
      </FlexBetween>
      <IconButton>
        <MoreVertOutlinedIcon/>
        {/* Here I'll add edit and delete post */}
      </IconButton>
    </FlexBetween>
  );
};

export default Comment;