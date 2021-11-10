import "./App.css";
import { MenuItem, FormControl, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import MainForm from "./components/MainForm";
import _ from "lodash";

function App() {
  const [server, setServer] = useState("");
  const [serverData, setServerData] = useState({});
  const [editableData, setEditableData] = useState({});
  const [showParameter, setShowParameter] = useState({});
  const [orgParam, setOrgParm] = useState({});

  const handleServerChange = async (e) => {
    setServer(e.target.value);
    try {
      const res = await axios.get(
        `http://localhost:5000/api/server/get/${e.target.value}`
      );
      setEditableData(res.data);
      const ogData = _.cloneDeep(res.data);
      setServerData(ogData);

      res.data.SERVER_PARAMS.forEach((param) => {
        setShowParameter((prev) => ({
          ...prev,
          [param.PARAMETER_NAME]: true,
        }));
        setOrgParm((prev) => ({
          ...prev,
          [param.PARAMETER_NAME]: true,
        }));
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="content-container">
      <div className="main-container">
        <div className="config">
          <span className="main-heading">Configuration</span>
        </div>
        <div className="server-select">
          <FormControl fullWidth>
            <TextField
              select
              value={server}
              onChange={handleServerChange}
              variant="outlined"
              label="Server Name"
              size="small"
            >
              <MenuItem value="First">First</MenuItem>
              <MenuItem value="Second">Second</MenuItem>
            </TextField>
          </FormControl>
        </div>
        <MainForm
          server={server}
          serverData={serverData}
          setServerData={setServerData}
          editableData={editableData}
          setEditableData={setEditableData}
          showParameter={showParameter}
          setShowParameter={setShowParameter}
          orgParam={orgParam}
        />
      </div>
    </div>
  );
}

export default App;
