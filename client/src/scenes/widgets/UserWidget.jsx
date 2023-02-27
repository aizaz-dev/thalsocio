import {
    ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined,
  } from "@mui/icons-material";
  import { Box, Typography, Divider, useTheme } from "@mui/material";
  import UserImage from "../../components/UserImage";
  import FlexBetween from "../../components/FlexBetween";
  import Widgetwraper from "../../components/WidgetWraper";
  import { useSelector } from "react-redux";
  import { useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";
  
  const UserWidget = ({ userId }) => {
    const [user, setUser] = useState(null);
    const { palette } = useTheme();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const userlogged = useSelector((state) => state.user)//this can be used instead
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;
  
    const getUser = async () => {
      const response = await fetch(`http://localhost:3001/api/user/${userId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
       setUser(data[0]);
    };
  
    useEffect(() => {
      getUser();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
    if (!user) {
      console.log('User not found')
      return null;
    }
  
    const {
      userName,
      user_name,
      bio,
      userPic,
      count,
      upVote,
      downVote,
    } = user;
  
    return (
      <Widgetwraper>
        {/* FIRST ROW */}
        <Box display="flex" justifyContent="center" pb="1.1rem">
          <UserImage image={userPic} />
        </Box>
        <Box
          gap="1rem"
          pb="1.1rem"
          display="flex"
          justifyContent="center"
          onClick={() => navigate(`/profile/${userId}`)}
        >
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {userName}
            </Typography>
            <Typography
              variant="h5"
              color={medium}
              fontWeight="300"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {user_name}
            </Typography>
          </Box>

          <ManageAccountsOutlined />
        </Box>

        <Divider />

        {/* SECOND ROW */}
        <Box p="1rem 0">
          <Box
            display="flex"
            justifyContent="space-around"
            alignItems="center"
            gap="1rem"
            m="0.5rem"
          >
            <LocationOnOutlined fontSize="large" sx={{ color: main }} />
            <Typography color={medium}>England</Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="space-around"
            alignItems="center"
            gap="1rem"
            m="0.5rem"
          >
            <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
            <Typography color={medium}>Influencer</Typography>
          </Box>
        </Box>

        <Divider />

        {/* THIRD ROW */}
        <Box p="1rem 0">
          <FlexBetween mb="0.5rem">
            <Typography color={medium}>Total Stories Poted</Typography>
            <Typography color={main} fontWeight="500">
              {count}
            </Typography>
          </FlexBetween>
          <FlexBetween mb="0.5rem">
            <Typography color={medium}>Total Upvotes Received</Typography>
            <Typography color={main} fontWeight="500">
              {upVote}
            </Typography>
          </FlexBetween>
          <FlexBetween>
            <Typography color={medium}>Total Downvotes Received</Typography>
            <Typography color={main} fontWeight="500">
              {downVote}
            </Typography>
          </FlexBetween>
        </Box>
      </Widgetwraper>
    );
  };
  
  export default UserWidget;