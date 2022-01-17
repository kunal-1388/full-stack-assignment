import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./GraphSelector.css";
const metricsData = require("./data/metrics.json");

export default function GraphSelector(props) {
  const handleChange = (event) => {
    // console.log("metric change click event fired");
    props.changeGraphType(event.target.value);
  };
  // console.log(metricsData);
  const { currValue } = props;
  return (
    <div className="graph-selector">
      <div className="container">
        <Box sx={{ minWidth: 300 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Metric</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={currValue}
              label="Metric"
              onChange={handleChange}
            >
              {metricsData.map((el, index) => (
                <MenuItem value={el._id}>
                  {/* {`${el.measure.replaceAll("_", " ").toLocaleUpperCase()} (${
                    el.dimensions[0].value
                  })`} */}
                  {`Metric ${index + 1}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </div>
    </div>
  );
}
