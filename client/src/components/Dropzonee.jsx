import React, {useCallback} from 'react'
import { Box, IconButton,Typography,useTheme } from "@mui/material";
import { EditOutlined,DeleteOutlined} from "@mui/icons-material";
import Dropzone,{useDropzone} from 'react-dropzone'
import FlexBetween from './FlexBetween';


function Dropzonee({image,setImage,type}) {
  const accepteFilesFilter=type==='clip'?{
    'video/mp4':['.mp4','.MP4']
  }:{
    'image/jpeg':[],
    'image/jpg':[],
    'image/png':[]
  }
  const text=type==='clip'?'Video Clip':'Image'
  const { palette } = useTheme();
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;
  
  const onDrop = useCallback(acceptedFiles => {
   setImage(acceptedFiles[0])
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
  accept:accepteFilesFilter})



  return(
    <div {...getRootProps()}>
  <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <input {...getInputProps()} />
            { (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add {text} Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
  
        </Box>
        </div>
        )
  }
  export default Dropzonee