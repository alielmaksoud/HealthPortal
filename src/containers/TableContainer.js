import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Table from '../components/Table';

import { getTable } from '../actions/index';
import { modifyLineThrough } from '../helpers/helpers';

class TableContainer extends Component {
	constructor(props) {
    super(props);
  }

  componentWillMount() {
  	const tableName = modifyLineThrough(this.props.params.tableName);
    this.props.getTable(tableName);
  }

  shouldComponentUpdate(nextProps) {
  	return nextProps.table !== this.props.table;
  }
	
  render() {
    if(this.props.table) {
    	const arr = this.props.table.column_name;
    	localStorage.setItem('tableData', JSON.stringify(arr));
    	const columns = arr.map( i => {
				return { 
			    	header: i.column_name, 
			    	columns: [{
			      	accessor: i.column_name
			    }]
			  }
			});
      return (
        <Table data={this.props.table.data} columns={columns} />
      );
    } else {
      return <Table loading={true}/>
    }
  }
}

function mapStateToProps(state) {
  return { 
  	table: state.adminReducer.table
   };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getTable }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TableContainer);