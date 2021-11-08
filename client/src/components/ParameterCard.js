import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
} from "@mui/material";
import React from "react";
import "./Form.css";

const ParameterCard = ({ serverData, parameter }) => {
  if (parameter === "") {
    return <div></div>;
  }

  return (
    <section className="param-card">
      {serverData.SERVER_PARAMS.map((param, idx) => {
        if (param.PARAMETER_NAME === parameter) {
          return (
            <div key={idx}>
              <span className="bold-text">{param.PARAMETER_NAME}</span>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={3}>
                  <TextField
                    defaultValue={param.PARAMETER_TYPE}
                    name="PARAMETER_TYPE"
                    label="Type"
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    defaultValue={param.PARAMETER_VALUE}
                    name="PARAMETER_VALUE"
                    label="Value"
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    defaultValue={param.Level}
                    name="Level"
                    label="Level"
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    defaultValue={param.Rank}
                    name="Rank"
                    label="Rank"
                    variant="outlined"
                    size="small"
                  />
                </Grid>
              </Grid>
              <FormControlLabel
                control={<Checkbox checked={param.IS_DEFAULT} size="small" />}
                label="Default"
              />
              <div className="add-btn-container">
                <Button variant="contained" size="small">
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
