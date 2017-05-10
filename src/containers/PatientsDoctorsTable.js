import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Table from '../components/Table';

import { getPatientsDoctors } from '../actions/index';

class PatientsDoctorsTable extends Component {
  componentWillMount() {
      this.props.getPatientsDoctors();
      const arr = ['doctor_id', 'patient_id'];
      localStorage.setItem('patientsDoctors', JSON.stringify(arr));
  }
	
  render() {
    if(this.props.patientsDoctors) {
      return (
        <Table data={this.props.patientsDoctors} columns={columns}/>
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
    header: 'doctor_id',
    columns: [{
      accessor: 'doctor_id'
    }]
  }
]

function mapStateToProps(state) {
  return { patientsDoctors: state.adminReducer.patientsDoctors };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getPatientsDoctors }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientsDoctorsTable);