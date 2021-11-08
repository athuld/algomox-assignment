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

const MainForm = ({ serverData }) => {
  const [parameter, setParameter] = useState("");
  const [basicData, setBasicData] = useState(serverData);

  const handleParamChange = (e) => {
    setParameter(e.target.value);
  };

  const handleBasicChange = (e) => {
    setBasicData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClick = () => {
    console.log(basicData);
  };

  if (serverData.length === 0) {
    return <h2>Please select a server</h2>;
  }

  return (
    <main>
      <div className="form-container">
        <TextField
          variant="standard"
          label="Display Name"
          defaultValue={serverData.SERVER_DISPLAY_NAME}
          value={basicData.SERVER_DISPLAY_NAME || ""}
          name="SERVER_DISPLAY_NAME"
          size="small"
          onChange={handleBasicChange}
        />
        <TextField
          variant="standard"
          label="Server Port"
          defaultValue={serverData.SERVER_PORT}
          value={basicData.SERVER_PORT || ""}
          name="SERVER_PORT"
          size="small"
          onChange={handleBasicChange}
        />
      </div>
      <div className="server-select">
        <FormControl fullWidth>
          <InputLabel id="server-select">Parameter</InputLabel>
          <Select
            labelId="server-select"
            value={parameter}
            onChange={handleParamChange}
            variant="outlined"
            label="Server Name"
            size="small"
          >
            {serverData.SERVER_PARAMS.map((param, idx) => (
              <MenuItem key={idx} value={param.PARAMETER_NAME}>
                {param.PARAMETER_NAME}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>Select a parameter to edit</FormHelperText>
        </FormControl>
      </div>
      <ParameterCard serverData={serverData} parameter={parameter} />
      <ParamDisplayCard serverData={serverData} />
      <div className="submit-btn">
        <Button variant="contained" onClick={handleClick}>
          Submit
        </Button>
      </div>
    </main>
  );
};

export default MainForm;
