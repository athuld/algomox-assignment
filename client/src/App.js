import "./App.css";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import MainForm from "./components/MainForm"

function App() {
  const [server, setServer] = useState("");
  const [serverData, setServerData] = useState([]);

  const handleServerChange = async (e) => {
    setServer(e.target.value);
    try {
      const res = await axios.get(
        `http://localhost:5000/api/server/get/${e.target.value}`
      );
      setServerData(res.data);
      console.log(res.data)
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
            <InputLabel id="server-select">Server Name</InputLabel>
            <Select
              labelId="server-select"
              value={server}
              onChange={handleServerChange}
              variant="outlined"
              label="Server Name"
              size="small"
            >
              <MenuItem value="First">First</MenuItem>
              <MenuItem value="Second">Second</MenuItem>
            </Select>
          </FormControl>
        </div>
        <MainForm serverData={serverData} />
      </div>
    </div>
  );
}

export default App;
