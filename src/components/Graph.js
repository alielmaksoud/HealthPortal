import React, { Component } from 'react';
import ReactChart from 'echarts-for-react';

export default class Graph extends Component {
  constructor(props) {
    super(props);

    this.setOption = this.setOption.bind(this);

    this.getHeartRate = this.getHeartRate.bind(this);
    this.getTemperature = this.getTemperature.bind(this);
    this.getTime = this.getTime.bind(this);
    this.renderChart = this.renderChart.bind(this);
  }

  getHeartRate(patient_data) {
    const data = patient_data.heart_rate.map((i) => i.heart_rate);
    return data;
  }

  getTemperature(patient_data) {
    const data = patient_data.temperature.map((i) => i.temperature);
    return data;
  }

  getTime(patient_data) {
    const data = patient_data.heart_rate.map((i) => i.timestamp); 
    return data;
  }

  renderChart(patient_data, seeAverage) {
    const options = this.setOption(patient_data, seeAverage);
    if(seeAverage) {
      return (
      <ReactChart 
        option={options}
      />);
    } else {
      return (
        <div>
          <ReactChart option={options} />
        </div>
      );
    }
  }

  setOption(patient_data, seeAverage) {
    const xAix = this.getTime(patient_data);
    const temp = this.getTemperature(patient_data);
    const hr = this.getHeartRate(patient_data);
    let options = {
      title: {},
      tooltip: {},
      legend: {
          data:['Temperature', 'Heart Rates']
      },
      xAxis: {
          data: xAix
      },
      yAxis: {},
      dataZoom: [
        {
          type: 'inside',
          yAxisIndex: [0],
          start: 70,
          end: 150
        }
      ],
      series: [
        {
          name: 'Temperature',
          type: 'line',
          data: temp
        },
        {
          name: 'Heart Rates',
          type: 'line',
          data: hr
        }
      ]
    };
    if(seeAverage) {
      options.series.forEach( s => {
        s.markLine = {
          data: [
            {type: 'average', name: 'averge'}
          ]
        }
      });
    }

    return options;
  }

  render() {
    return (
      <div className="graph">
      	<div className="graph-container">
      		<div className="graph-group">
      			{this.renderChart(this.props.data, this.props.average)}
      		</div>
      	</div>
      </div>
    );
  }
}