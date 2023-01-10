import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid, IconButton, Card } from "@mui/material";
import { setPosts } from "../../state";
import PostWidget from "./PostWidget";
import GridPostWidget from "./GridPostWidget";
import { fetchStoriesByCreator } from "../../helpers/api";

const PostsWidget = ({ userId, isProfile = false, pageType }) => {
  const [isDeleted, setDeleted] = useState(false);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const { _id } = useSelector((state) => state.user);
  const view = useSelector((state) => state.view);
  const sort = useSelector((state) => state.sort);
  const trend = useSelector((state) => state.trend);
  const page = useSelector((state) => state.page);
  const cardWidth = pageType == "trending" ? "20rem" : "auto";
  const getPosts = async () => {
    const response = await fetch(
      `http://localhost:3001/api/story?page=${page}&sortby=${trend}${sort}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();

    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    const { data } = await fetchStoriesByCreator(userId, page, trend, sort);
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, [sort, trend, page, view]);

  return (
    <>
      {view == "list" &&
        posts.map(
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
            <Box key={_id} maxWidth={cardWidth}>
              <PostWidget
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
                onDelete={setDeleted}
                delState={isDeleted}
              />
            </Box>
          )
        )}

      {view == "module" && (
        <Grid sx={{ flexGrow: 1 }} container>
          <Grid container justifyContent="center">
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
                <Grid key ={_id}>
                  <IconButton>
                    <Card sx={{ maxWidth: "9rem"}}>
                      <GridPostWidget 
                        postId={_id}
                content={content}
                description={message}
                      />
                    </Card>
                  </IconButton>
                </Grid>
              )
            )}
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default PostsWidget;
