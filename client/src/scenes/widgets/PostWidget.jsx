import {
  ChatBubbleOutlineOutlined,
  ThumbDownOutlined,
  ThumbUpOutlined,
  ShareOutlined,
  EditOutlined,
  DeleteOutline,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  Popover,
  Tooltip,
  Typography,
  useTheme,
  CardMedia,
  Button,
} from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import Author from "../../components/Author";
import Comment from "../../components/comment";
import AddComment from "../../components/AddComment";
import WidgetWrapper from "../../components/WidgetWraper";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../../state";
import EditPostWidget from "./EditPostWidget";
import { imgPath,postType } from "../../helpers/functions";
import { deleteStory, VoteStory, fetchComment } from "../../helpers/api";
import Description from "../../components/Description";

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
  onDelete,
  delState,
}) => {
  const [isDeleted, setDeleted] = useState(false);
  const [isComments, setIsComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
  const loggedInUserId = useSelector((state) => state.user._id);
  const [userVote, setVote] = useState(vote);
  const [stateupVote, setupVote] = useState(upVote);
  const [statedownVote, setDownVote] = useState(downVote);
  content = imgPath(content, "post");
  const contentType=postType(content)
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const getComments = async () => {
    const { data } = await fetchComment(postId);
    setComments(data);
    //dispatch(setPost({ comments: commentsReceived }));
  };

  const patchLike = async (e) => {
    setVote(e);
    e == 1 ? setupVote(upVote + 1) : setDownVote(downVote + 1);
    const body = {
      userId: loggedInUserId,
      storyId: postId,
      value: e,
    };
    const response = await VoteStory(body);
    // dispatch(setPost({ post: updatedPost }));
  };

  const handleEdit = () => {
    setEdit(true);
  };

  const handleDelete = async () => {
    const res = await deleteStory(postId, authorId);
    onDelete(!delState);
    setDeleted(true);
    //dispatch(deletePost({post_id:postId}))
  };

  useEffect(() => {
    //getComments()
  }, []);
  return (
    <WidgetWrapper m="0.5rem 0">
      {isDeleted && <Box>This post is deleted.</Box>}
      {!isDeleted && (
        <>
          <Box display="flex" justifyContent="space-between">
            <Author
              authorId={authorId}
              authorName={userName}
              authorPic={userPicturePath}
              createdAt={createdAt}
            />
            {authorId == loggedInUserId && (
              <Box m="1rem 0">
                <Tooltip title="Edit Post">
                  <IconButton onClick={handleEdit}>
                    <EditOutlined />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete Post">
                  <IconButton onClick={handleDelete}>
                    <DeleteOutline />
                  </IconButton>
                </Tooltip>
              </Box>
            )}

            <Popover
              open={edit}
              anchorReference="anchorPosition"
              anchorPosition={{ top: 150, left: 350 }}
            >
              <EditPostWidget
                setClose={setEdit}
                text={description}
                content={content}
                id={postId}
              />
            </Popover>
          </Box>
     
          <Description text={description} content={content}/>
          {content && (
            <CardMedia
              component={contentType}
              controls
              height="300rem"
              alt="post"
              style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
              image={content}
            />
          )}
          <FlexBetween mt="0.25rem">
            <FlexBetween gap="1rem">
              <FlexBetween gap="0.3rem">
                <IconButton
                  disabled={userVote != "-1"}
                  onClick={() => patchLike(1)}
                >
                  {userVote == 1 ? (
                    <ThumbUpOutlined sx={{ color: primary }} />
                  ) : (
                    <ThumbUpOutlined />
                  )}
                </IconButton>
                <Typography>{stateupVote}</Typography>
              </FlexBetween>

              <FlexBetween gap="0.3rem">
                <IconButton
                  disabled={userVote != "-1"}
                  onClick={() => patchLike(0)}
                >
                  {userVote == 0 ? (
                    <ThumbDownOutlined sx={{ color: primary }} />
                  ) : (
                    <ThumbDownOutlined />
                  )}
                </IconButton>
                <Typography>{statedownVote}</Typography>
              </FlexBetween>

              <FlexBetween gap="0.3rem">
                <IconButton
                  onClick={() => {
                    setIsComments(!isComments);
                  }}
                >
                  <ChatBubbleOutlineOutlined />
                </IconButton>
                <Typography>{comments.length || 0}</Typography>
              </FlexBetween>
            </FlexBetween>

            <IconButton>
              <ShareOutlined />
            </IconButton>
          </FlexBetween>
          {isComments && (
            <Box mt="0.5rem">
              {comments.map((comment) => (
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
              <AddComment
                postId={postId}
                commentUpdater={setComments}
                Comments={comments}
              />
            </Box>
          )}
        </>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
