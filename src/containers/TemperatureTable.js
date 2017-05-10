import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Table from '../components/Table';

import { getTemperature } from '../actions/index';

class TemperatureTable extends Component {
  componentWillMount() {
      this.props.getTemperature();
      const arr = ['patient_id', 'temperature', 'timestamp'];
      localStorage.setItem('temperature', JSON.stringify(arr));
  }
	
  render() {
    if(this.props.temperature) {
      return (
        <Table data={this.props.temperature} columns={columns}/>
      )
    } else {
      return <Table columns={columns} loading={true}/>
    }
  }
}

const columns = [
  { 
    header: 'patient_id', 
    columns: [{
      accessor: 'patient_id'
    }]
  },
  { 
    header: 'temperature',
    columns: [{
      accessor: 'temperature'
    }]
  }, 
  { 
    header: 'timestamp',
    columns: [{
      accessor: 'timestamp'
    }]
  }
]

function mapStateToProps(state) {
  return { temperature: state.adminReducer.temperature };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getTemperature }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TemperatureTable);