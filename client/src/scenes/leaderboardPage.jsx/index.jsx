import React, { useEffect } from "react";
import { Box, useMediaQuery, Grid, Typography,TableRow,TableCell, TableHead } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../../state";
import Navbar from "../navBar";
import LeaderboardEntry from "../widgets/LeaderboardEntry";
import {getUsers} from "../../helpers/api"

function LeaderBoard() {
  const token = useSelector((state) => state.token);
  const usersTest = useSelector((state) => state.users);
  const users=usersTest.slice(0,10)
  const dispatch = useDispatch();

  const getUsersCall = async () => {
    const {data} = await getUsers()
    dispatch(setUsers({ users: data }));
  };

  useEffect(() => {
    getUsersCall();
  }, []);

  return (
    <Box>
      <Navbar />
      <Box p='clamp(1rem,2rem,3rem)'>
      <Box m='0 0 -1.8rem 1.5rem'>
      <TableHead>
      <TableRow footer={false} p='0rem'>
              <TableCell style={{ width: 70 }} align="right">
                
              </TableCell>
              <TableCell style={{ width: 70 }} align="right">
              User
        
              </TableCell>
              <TableCell style={{ width: 500 }} align="left">
                
              </TableCell>
              <TableCell style={{ width: 160 }} align="center">
                Stories
              </TableCell>
              <TableCell style={{ width: 160 }} align="center">
                Up Votes
              </TableCell>
              <TableCell style={{ width: 160 }} align="center">
                Down Votes
              </TableCell>
            </TableRow>
            </TableHead>
            </Box>

      {users && users.map(({
          _id,
          count,
          upVote,
          downVote,
          userName,
          userPic,
        },index)=>{console.log(index);
        return(
          <LeaderboardEntry 
            key={_id}
            userId={index+1}
            userName={userName}
            count={count}
            userPicturePath={userPic}
            upVote={upVote}
            downVote={downVote}
        />)})}
           </Box>
    </Box>
  );
}

export default LeaderBoard;
