import { useState } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Button,
} from "@mui/material";
import "./Form.css";
import ParameterCard from "./ParameterCard";
import ParamDisplayCard from "./ParamDisplayCard";
import axios from "axios";
import Notification from "./Notification";

const MainForm = ({
  server,
  serverData,
  setServerData,
  editableData,
  setEditableData,
}) => {
  const [parameter, setParameter] = useState("");
  const [open, setOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  const handleParamChange = (e) => {
    setParameter(e.target.value);
    setOpen(true);
  };

  const handleBasicChange = (e) => {
    setEditableData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await axios.post(
        `http://localhost:5000/api/server/update/${server}`,
        serverData
      );
      setAlertOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  if (
    Object.keys(serverData).length === 0 &&
    serverData.constructor === Object
  ) {
    return (
      <div className="initial-select">
        <span>Please select a server to continue</span>
      </div>
    );
  }

  return (
    <main>
      <div className="form-container" onChange={handleBasicChange}>
        <TextField
          variant="standard"
          label="Display Name"
          value={editableData.SERVER_DISPLAY_NAME}
          name="SERVER_DISPLAY_NAME"
          size="small"
        />
        <TextField
          variant="standard"
          label="Server Port"
          value={editableData.SERVER_PORT}
          name="SERVER_PORT"
          size="small"
        />
      </div>
      <div className="server-select">
        <FormControl fullWidth>
          <TextField
            select
            value={parameter}
            onChange={handleParamChange}
            variant="outlined"
            label="Parameter"
            size="small"
          >
            {serverData.SERVER_PARAMS.map((param, idx) => (
              <MenuItem key={idx} value={param.PARAMETER_NAME}>
                {param.PARAMETER_NAME}
              </MenuItem>
            ))}
          </TextField>
          <FormHelperText>Select a parameter to edit</FormHelperText>
        </FormControl>
      </div>
      {open && (
        <ParameterCard
          setServerData={setServerData}
          parameter={parameter}
          editableData={editableData}
          setEditableData={setEditableData}
          setOpen={setOpen}
        />
      )}
      <ParamDisplayCard serverData={serverData} />
      <div className="submit-btn">
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
      <Notification alertOpen={alertOpen} setAlertOpen={setAlertOpen} />
    </main>
  );
};

export default MainForm;
