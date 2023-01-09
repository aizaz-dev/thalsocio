import { Box } from "@mui/material";
import { imgPath } from "../helpers/functions";

const UserImage = ({ image, size = "190px" }) => {
    const img=imgPath(image,'profile')
  

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