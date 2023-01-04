import React,{useState,useEffect} from 'react';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

const Author = ({ authorName,authorPic,authorId }) => {
  const [author, setAuthor] = useState(null)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  // const getAuthor = async () => {
  //   const response = await fetch(`http://localhost:3001/api/user/${authorId}`, {
  //     method: "GET",
  //     headers: { Authorization: `Bearer ${token}` },
  //   });
  //   const data = await response.json();
  //   setAuthor(data);
  // };

  useEffect(() => {
    //getAuthor();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // if (!author) {
  //   return null;
  // }

  // const {
  //   name,
  //   pic,
  // } = author;
 

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={authorPic} size="55px" />
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
        </Box>
      </FlexBetween>
      <IconButton>
        <MoreVertOutlinedIcon/>
      </IconButton>
      {/* <IconButton  
        onClick={() => patchFriend()}
        sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
      >
        {isFriend ? (
          <PersonRemoveOutlined sx={{ color: primaryDark }} />
        ) : (
          <PersonAddOutlined sx={{ color: primaryDark }} />
        )}
      </IconButton> */}
    </FlexBetween>
  );
};

export default Author;