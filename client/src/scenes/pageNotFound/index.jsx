
import React from "react";
import { Typography, Box,Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
    const navigate=useNavigate()
  return (
    <Box sx={{  }}>
    <Box sx= {{ display:"flex",flexDirection:'column', alignItems:"center", justifyContent:"center",}}>
      <Typography
        fontWeight="bold"
        fontSize="16rem"
        color="primary"    
      >
        Oops!
      </Typography>
      <Typography
      fontWeight="bold" fontSize='2rem'>
      <Box>404 - PAGE NOT FOUND</Box>
        
      </Typography>
      <Typography>
      <Box sx={{ lineHeight: 3, m: 1 }}>Page you are looking for might be removed or changed.</Box>
        
      </Typography>
      <Button variant="contained" onClick={() => navigate("/home")}
        sx={{
          "&:hover": {
            color: "primary",
            cursor: "pointer",
          },
        }}>
            Back to Homepage
      </Button>
    </Box>
    </Box>
  );
}

export default PageNotFound;
