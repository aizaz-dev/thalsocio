import React,{useState} from 'react'
import {
    EditOutlined,
    DeleteOutlined,
    ImageOutlined,
    MoreHorizOutlined,
    CommentsDisabled,
    
  } from "@mui/icons-material";
  import SendIcon from '@mui/icons-material/Send';
  import {
    InputBase,
    useTheme,
    IconButton,
    useMediaQuery,
  } from "@mui/material";
import FlexBetween from './FlexBetween';
import UserImage from './UserImage';
import { useSelector } from 'react-redux';

  
function AddComment({postId,commentUpdater,Comments}) {
    const [comment, setComment] = useState("");
    const { _id,pic,name } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const { palette } = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;

    const handlePost = async () => {
    
        const response = await fetch(`http://localhost:3001/api/comment/`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: _id,
            storyId: postId,
            comment: comment,
          }),
        });
        const posts = await response.json();
        posts.userId=_id
        posts.userPic=pic
        posts.userName=name
        // dispatch(setPosts({ posts }));
        commentUpdater([...Comments,posts])
        console.log(posts)
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
            padding:"0.5rem"
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
          <SendIcon/>
        </IconButton>
      </FlexBetween>
  )
}

export default AddComment