import WidgetWraper from "../../components/WidgetWraper";
import React from "react";
import FlexBetween from "../../components/FlexBetween";
import { Box, Typography,TableRow,TableCell,useTheme } from "@mui/material";
import UserImage from "../../components/UserImage";


function LeaderboardEntry({ userId, count, upVote, downVote, userName, userPicturePath }) {
    const { palette } = useTheme();
    console.log(userId)
  return (
    <Box m="1rem" backgroundColor= {palette.background.alt}
    borderRadius= "0.75rem">
    <TableRow key={userId} footer={false} p='0rem'>
              <TableCell style={{ width: 70 }} align="right">
                {userId}
              </TableCell>
              <TableCell style={{ width: 50 }} align="right">
              <UserImage image={userPicturePath} size='50px' />
        
              </TableCell>
              <TableCell style={{ width: 500 }} align="left">
                {userName}
              </TableCell>
              <TableCell style={{ width: 160 }} align="center">
                {count}
              </TableCell>
              <TableCell style={{ width: 160 }} align="center">
                {upVote}
              </TableCell>
              <TableCell style={{ width: 160 }} align="center">
                {downVote}
              </TableCell>
            </TableRow>

    </Box>
  );
}

export default LeaderboardEntry;
