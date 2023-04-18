import { Modal, Typography, Button, Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import theme from "../../../utils/theme";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CreateChatGroup = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Create Group</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Enter Group Name
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  ${"" /* background-color: ${theme.color.gray0}; */}
  padding: 10px;
  height: 60px;
`;

const InformationContainer = styled.div`
  display: flex;
  gap: 10%;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled(Typography)`
  font-size: 18px;
`;

const Message = styled(Typography)`
  font-size: 14px;
  color: ${theme.color.gray2};
`;

export default CreateChatGroup;
