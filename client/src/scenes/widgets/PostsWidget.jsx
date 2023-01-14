import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid, IconButton, Card } from "@mui/material";
import { setPosts} from "../../state";
import PostWidget from "./PostWidget";
import GridPostWidget from "./GridPostWidget";
import { fetchStoriesByCreator,fetchStories } from "../../helpers/api";


const PostsWidget = ({ userId, pageType }) => {
  const [isDeleted, setDeleted] = useState(false);
  const dispatch = useDispatch();
  const loggedinUserId=useSelector((state)=>state.user._id)
  const posts = useSelector((state) => state.posts);
  const view = useSelector((state) => state.view);
  let sort = useSelector((state) => state.sort);
  let trend = useSelector((state) => state.trend);
  let page = useSelector((state) => state.page);
  const cardWidth = pageType == "trending" ? "20rem" : "auto";
  const getPosts = async () => {
    const body={"userId":loggedinUserId}
    if(pageType=='trending'){

      const {data} =await fetchStories( page, '+', 'upVote',body);
      dispatch(setPosts({ posts: data }));
    }else{
      
      const {data} =await fetchStories( page, trend, sort,body);
      dispatch(setPosts({ posts: data }));
    }
  };

  const getUserPosts = async () => {
    const { data } = await fetchStoriesByCreator(userId, page, trend, sort);
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (pageType=='profile') {
      getUserPosts();
    } else {
      getPosts();
    }
  }, [sort, trend, page, view]);

  if(!posts.length){
    return(
      <>
        <h2>No Posts Available</h2>
      </>
    )
  }

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
