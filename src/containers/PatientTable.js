import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Table from '../components/Table';

import { getAllPatients } from '../actions/index';

class PatientTable extends Component {
  componentWillMount() {
      this.props.getAllPatients();
      const arr = ['patient_id', 'name', 'med_rec_num'];
      localStorage.setItem('patients', JSON.stringify(arr));
  }
	
  render() {
    if(this.props.patients) {
      return (
        <Table data={this.props.patients} columns={columns}/>
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
    header: 'name',
    columns: [{
      accessor: 'name'
    }]
  }, 
  { 
    header: 'med_rec_num',
    columns: [{
      accessor: 'med_rec_num'
    }]
  }
]

function mapStateToProps(state) {
  return { patients: state.adminReducer.patients };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getAllPatients }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientTable);