import {
  ChatBubbleOutlineOutlined,
  ThumbDownOutlined,
  ThumbUpOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import Author from "../../components/Author";
import Comment from "../../components/comment";
import AddComment from "../../components/AddComment";
import WidgetWrapper from "../../components/WidgetWraper";
import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../../state";

const PostWidget = ({
  postId,
  authorId,
  userName,
  description,
  tags,
  content,
  userPicturePath,
  upVote,
  downVote,
  vote,
  createdAt,
}) => {
  const [isComments, setIsComments] = useState(false);
  const [comments,setComments]=useState([])
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  let isUpVoted = vote==='1'; //
  let isDownVoted = vote==='0'; //

  const basePath = "http://127.0.0.1:3001/";

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const getComments = async () => {
    const response = await fetch(`http://localhost:3001/api/comment/${postId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const commentsReceived = await response.json();
    setComments(commentsReceived)
    console.log(comments)
    dispatch(setPost({ comments: commentsReceived }));
  };

  const patchLike = async (e) => {
    const response = await fetch(
      `http://localhost:3001/api/vote/${loggedInUserId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: loggedInUserId,
          storyId: postId,
          value: e,
        }),
      }
    );
    //Have to update state
     const updatedPost = await response.json();
     vote=e;
     upVote+=1
     isUpVoted = vote==='1'; //
     isDownVoted = vote==='0'; //
    // dispatch(setPost({ post: updatedPost }));
  };

  useEffect(()=>{
    getComments()
  },[])
  return (
    <WidgetWrapper m="2rem 0">
      <Author
        authorId={authorId}
        authorName={userName}
        authorPic={userPicturePath}
        createdAt={createdAt}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {content && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={basePath + content}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => patchLike(1)}>
              {isUpVoted ? (
                <ThumbUpOutlined sx={{ color: primary }} />
              ) : (
                <ThumbUpOutlined />
              )}
            </IconButton>
            <Typography>{upVote}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => patchLike(0)}>
            {isDownVoted?(
              <ThumbDownOutlined sx={{color:primary}}/>
            ):(
              <ThumbDownOutlined/>
            )}
              
            </IconButton>
            <Typography>{downVote}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => {setIsComments(!isComments)}}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length||0}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComments && (
          <Box mt="0.5rem">
            {
              comments.map((comment) => (
              <Box key={comment._id}>
                <Divider />
                  <Comment 
                    authorName={comment.userName}
                    authorPic={comment.userPic}
                    authorId={comment.userId}
                    createdAt={comment.createdAt}
                    message={comment.comment}
                  />
              </Box>
            ))}
            <Divider />
            <AddComment postId={postId} commentUpdater={setComments} Comments={comments}/>
          </Box>
        )}
    </WidgetWrapper>
  );
};

export default PostWidget;
