import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Table from '../components/Table';

import { getHeartRates } from '../actions/index';

class HeartRateTable extends Component {
  componentWillMount() {
      this.props.getHeartRates();
      const arr = ['patient_id', 'heart_rate', 'timestamp'];
      localStorage.setItem('heartRate', JSON.stringify(arr));
  }
	
  render() {
    if(this.props.heartRate) {
      return (
        <Table data={this.props.heartRate} columns={columns}/>
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
    header: 'heart_rate',
    columns: [{
      accessor: 'heart_rate'
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
  return { heartRate: state.adminReducer.heartRate };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getHeartRates }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HeartRateTable);