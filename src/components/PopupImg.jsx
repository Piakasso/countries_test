import { Box, Modal } from "@mui/material";

const styles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  minWidth: 275,
  maxWidth: 500,
  height: 400,
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    overflow: "hidden",
  },
};

const PopupImg = ({ isImgOpen, closeImgModal, flag }) => {
  return (
    <div>
      <Modal open={isImgOpen} onClose={closeImgModal}>
        <Box sx={styles}>
          <img src={flag} alt="" />
        </Box>
      </Modal>
    </div>
  );
};

export default PopupImg;
