import { Box } from "@mui/material";

const UserImage = ({ image, size = "190px" }) => {
  const basePath='http://127.0.0.1:3001/'
  let img=basePath+'assets/user/default.webp'
  if(image){
     img=basePath+image}
  console.log(image)
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={img}
        // src={defaultImg}
      />
    </Box>
  );
};

export default UserImage;