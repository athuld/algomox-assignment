import { Chip, Divider } from "@mui/material";
import React from "react";

const ParamDisplayCard = ({ serverData, showParameter }) => {
  return (
    <section className="param-display-section">
      {serverData.SERVER_PARAMS.map((param, idx) => {
        const paramName = param.PARAMETER_NAME;
        return showParameter[`${paramName}`] === true ? (
          <div key={idx} className="param-display-card">
            <span className="bold-text">{param.PARAMETER_NAME}</span>
            <div className="param-display-info">
              <div className="block">
                <div>
                  <span className="bold-text">Type : </span>
                  <span>{param.PARAMETER_TYPE}</span>
                </div>
                <div>
                  <span className="bold-text">Value : </span>
                  <span>{param.PARAMETER_VALUE}</span>
                </div>
              </div>
              <div className="block">
                <div>
                  <span className="bold-text">Level : </span>
                  <span>{param.Level}</span>
                </div>
                <div>
                  <span className="bold-text">Rank : </span>
                  <span>{param.Rank}</span>
                </div>
              </div>
            </div>
            <Divider />
            {param.IS_DEFAULT ? (
              <div className="chip-block">
                <Chip label="Default" color="primary" size="small" />
              </div>
            ) : (
              <div className="chip-block-padding"></div>
            )}
          </div>
        ) : (
          <div key={idx}></div>
        );
      })}
    </section>
  );
};

export default ParamDisplayCard;
