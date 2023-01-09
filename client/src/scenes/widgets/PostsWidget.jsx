import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { setPosts } from "../../state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false, pageType }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const { _id } = useSelector((state) => state.user);
  const view=useSelector(state=>state.view)
  const sort=useSelector(state=>state.sort)
  const trend=useSelector(state=>state.trend)
  const page=useSelector(state=>state.page)
const cardWidth=pageType=='trending'?'20rem':'auto'
  const getPosts = async () => {
    const response = await fetch(
      `http://localhost:3001/api/story?page=${page}&sortby=${trend}${sort}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    console.log(data[0])
    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `http://localhost:3001/api/story/${userId}?page=${page}&sortby=${trend}${sort}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, [sort,trend,page,view]); 

  return (
    <>
      {posts.map(
        ({
          _id,
          message,
          content,
          tags,
          upVote,
          downVote,
          createdAt,
          updatedAt,
          userName,
          userPic,
          userId,
          vote,
        }) => (
          <Box maxWidth={cardWidth}>
          <PostWidget
            key={_id}
            postId={_id}
            authorId={userId}
            userName={userName}
            description={message}
            tags={tags}
            content={content}
            userPicturePath={userPic}
            upVote={upVote}
            downVote={downVote}
            vote={vote}
            createdAt={createdAt}
          />
          </Box>
        )
      )}
    </>
  );
};

export default PostsWidget;
