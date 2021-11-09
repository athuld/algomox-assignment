import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
} from "@mui/material";
import React from "react";
import "./Form.css";
import _ from "lodash";

const ParameterCard = ({
  setServerData,
  parameter,
  editableData,
  setEditableData,
  setOpen,
}) => {
  const handleParamChange = (idx, e) => {
    const values = [...editableData.SERVER_PARAMS];
    if (e.target.name === "IS_DEFAULT") {
      values[idx][e.target.name] = e.target.checked;
    } else {
      values[idx][e.target.name] = e.target.value;
    }
    setEditableData((prev) => ({
      ...prev,
      SERVER_PARAMS: values,
    }));
  };

  const handleAddParameter = () => {
    const changedData = _.cloneDeep(editableData);
    setServerData(changedData);
    setOpen(false);
  };

  if (parameter === "") {
    return <></>;
  }

  return (
    <section className="param-card">
      {editableData.SERVER_PARAMS.map((param, idx) => {
        if (param.PARAMETER_NAME === parameter) {
          return (
            <div key={idx}>
              <span className="bold-text">{param.PARAMETER_NAME}</span>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={3}>
                  <TextField
                    value={param.PARAMETER_TYPE}
                    name="PARAMETER_TYPE"
                    label="Type"
                    variant="outlined"
                    size="small"
                    onChange={(e) => handleParamChange(idx, e)}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    value={param.PARAMETER_VALUE}
                    name="PARAMETER_VALUE"
                    label="Value"
                    variant="outlined"
                    size="small"
                    onChange={(e) => handleParamChange(idx, e)}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    value={param.Level}
                    name="Level"
                    label="Level"
                    variant="outlined"
                    size="small"
                    onChange={(e) => handleParamChange(idx, e)}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    value={param.Rank}
                    name="Rank"
                    label="Rank"
                    variant="outlined"
                    size="small"
                    onChange={(e) => handleParamChange(idx, e)}
                  />
                </Grid>
              </Grid>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={param.IS_DEFAULT}
                    onChange={(e) => handleParamChange(idx, e)}
                    name="IS_DEFAULT"
                    size="small"
                  />
                }
                label="Default"
              />
              <div className="add-btn-container">
                <Button
                  variant="contained"
                  size="small"
                  onClick={handleAddParameter}
                >
                  Add
                </Button>
              </div>
            </div>
          );
        }
      })}
    </section>
  );
};

export default ParameterCard;
