import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Table from '../components/Table';

import { getAllDoctors } from '../actions/index';

class DoctorTable extends Component {
  componentWillMount() {
      this.props.getAllDoctors();
      const arr = ['doctor_id', 'name', 'department']
      localStorage.setItem('doctors', JSON.stringify(arr));
  }
	
  render() {
    if(this.props.doctors) {
      return (
        <Table data={this.props.doctors} columns={columns} />
      )
    } else {
      return <Table columns={columns} loading={true}/>
    }
  }
}

const columns = [
  { 
    header: 'doctor_id', 
    columns: [{
      accessor: 'doctor_id'
    }]
  },
  { 
    header: 'name',
    columns: [{
      accessor: 'name'
    }]
  }, 
  { 
    header: 'department',
    columns: [{
      accessor: 'department'
    }]
  }
]

function mapStateToProps(state) {
  return { doctors: state.adminReducer.doctors };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getAllDoctors }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorTable);