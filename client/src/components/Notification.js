import { Alert, Snackbar } from "@mui/material";
import { forwardRef } from "react";

const MuiAlert = forwardRef(function MuiAlert(props, ref) {
  return <Alert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Notification = ({ alertOpen, setAlertOpen }) => {
  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertOpen(false);
  };
  return (
    <div>
      <Snackbar open={alertOpen} autoHideDuration={3000} onClose={handleClose}>
        <MuiAlert
          onClose={handleClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Successfully Updated !
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default Notification;
