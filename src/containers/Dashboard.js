import React, { Component } from 'react';
import { Link } from 'react-router';


import Graph from '../components/Graph';
import Loader from '../components/Loader';
import ReactGridLayout from 'react-grid-layout';
import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

//This is a component.
export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      doc: null
    }
  }

  componentWillMount() {
    this.setState({doc: JSON.parse(localStorage.getItem("user"))});
  }

  renderGraph(allData) {
    const data = allData.patients;
    return data.map( (p, i) => {
      return (
        <div key={i.toString()}>
          <Link className="title" to={`/dashboard/${allData.doctor_id}/${p.patient_id}`}>
            Patient { p.name }, ID: { p.patient_id} 
          </Link>
          <Graph data={p}></Graph>
        </div>
      );
    })
  }

  setLayout(numberOfPatients) {
    const layout = [];
    for(let j = 0; j < numberOfPatients; j++) {
      const option = {
        i: j.toString(),
        x: 0,
        y: 0,
        w: 12,
        h: 3
      }
      if(j%2 === 0) {
        option.x = 6
      }
      layout.push(option);
    }
    console.log(layout);
    return layout
  }

  render() {
    const patientsData = this.state.doc.patients;
    const numberOfPatients = patientsData.length;
    const layout = this.setLayout(numberOfPatients);
    if(this.state.doc) {
      return (
        <div className="main">
          <h2 className="dashboard-title">Hi, Dr. {this.state.doc.name}. Here are your Reports: </h2>
          <ReactGridLayout
            className="layout" 
            layout={layout} 
            cols={12} 
            width={1200}
            margin={[16, 16]}
          >
            {this.renderGraph(this.state.doc)}
          </ReactGridLayout>
        </div>
      );
    } else {
      return <Loader />
    }
  }
}