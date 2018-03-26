/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// react-select
import Select from 'react-select';
import 'react-select/dist/react-select.css';

// Recharts
import {
  CartesianGrid,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { createStateSetter } from '../util';

export default class Chart extends Component {
  constructor(props) {
    super(props);
    this.setStateFromInput = createStateSetter(this);
    this.state = {
      data: props.data,
      xaxis: 'gdp per capita',
      yaxis: 'life expectancy',
    };
  }

  render() {
    const {
      data,
      xaxis,
      yaxis,
    } = this.state;
    const fields = Object.keys(data[0]);
    const options = fields.map(f => ({ label: f, value: f }));

    return (
      <div>
        <form>
          <div className="form-group">
            <label>X</label>
            <Select
              name="xaxis"
              value={xaxis}
              onChange={this.setStateFromInput('xaxis')}
              options={options}
            />
          </div>
          <div className="form-group">
            <label>Y</label>
            <Select
              name="yaxis"
              value={yaxis}
              onChange={this.setStateFromInput('yaxis')}
              options={options}
            />
          </div>
        </form>
        <ResponsiveContainer height={600} width="100%">
          <ScatterChart
            data={data}
            margin={{
              top: 5, right: 20, left: 10, bottom: 5,
            }}
          >
            <XAxis dataKey={xaxis} type="number" name={xaxis} />
            <YAxis dataKey={yaxis} type="number" name={yaxis} />
            <Tooltip />
            <CartesianGrid />
            <Scatter name="blah" fill="#cccccc" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

Chart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};
