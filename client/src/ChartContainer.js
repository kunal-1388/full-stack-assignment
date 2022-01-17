import React, { Component } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  Label,
  AreaChart,
  Area,
} from "recharts";
import GraphSelector from "./GraphSelector";
const axios = require("axios");

export default class ChartContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      id: "60508885da4c96019c357c19_b9879a81a0b17d3be056691d43a88427",
    };

    this.changeGraphType = this.changeGraphType.bind(this);
  }

  async componentDidMount() {
    const { id } = this.state;
    // console.log("metric loading in component did mount before changing state");
    const result = await axios.get(`/${id}`);

    this.setState({
      id,
      data: result.data,
    });
    // console.log("metric loading in component did mount after changing state");

    // console.log(result);
  }

  async changeGraphType(newId) {
    // console.log(
    //   "metric change click event fired before change in parent component"
    // );

    const result = await axios.get(`/${newId}`);
    console.log(result);
    this.setState({
      id: newId,
      data: result.data,
    });
    // console.log(
    //   "metric change click event fired after change in parent component"
    // );
    // console.log(result);
  }

  render() {
    const { data, id } = this.state;
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <GraphSelector changeGraphType={this.changeGraphType} currValue={id} />
        <ResponsiveContainer width={"100%"} height="80%">
          <AreaChart
            width={730}
            height={250}
            data={data}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid stroke="#ccc" />
            <Area
              type="monotone"
              dataKey="max_band"
              stroke="black"
              Legend="Max. Band"
              strokeWidth={1.5}
              dot={false}
              fillOpacity={1}
              fill={"rgb(155, 188, 242)"}
            />
            <Area
              type="monotone"
              dataKey="original_value"
              stroke="rgb(4, 25, 59)"
              dot={false}
              strokeWidth={1}
              fillOpacity={0}
            />
            <Area
              type="monotone"
              dataKey="forecasted_value"
              stroke="blue"
              strokeWidth={1}
              dot={false}
              strokeDasharray="5 5"
              fillOpacity={0}
            />
            <Area
              type="monotone"
              dataKey="min_band"
              stroke="black"
              dot={false}
              strokeWidth={1.5}
              fillOpacity={1}
              fill={"white"}
            />

            <XAxis tick={false} label="Time--->"></XAxis>
            <YAxis />
            <Tooltip />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

// <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
// <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
