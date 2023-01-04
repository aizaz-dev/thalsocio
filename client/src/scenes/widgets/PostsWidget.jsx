import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const { _id } = useSelector((state) => state.user);

  const getPosts = async () => {
    const response = await fetch(
      `http://localhost:3001/api/story/63b5023dd21573f19c6ab7a0/${_id}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${userId}/posts`,
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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
          />
        )
      )}
    </>
  );
};

export default PostsWidget;
