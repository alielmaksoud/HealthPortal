import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { getAllTables, toggleModal, getTable } from '../actions/index';

import Modal from './Modal';

import { hasUnderscore, modifyUnderscore } from '../helpers/helpers';

class Admin extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getAllTables();
  }

  openModal(action) {
    this.props.toggleModal(this.props.modal, action);
  }

  handleClick(table_name) {
    this.props.getTable(table_name)

    return (e) => {
      e.preventDefault();
    }
  }

  displayList(data) {
    const tableNames = data;
    const baseUrl = '/admin/';
    let listItems;
    if(tableNames) {
      return listItems = tableNames.map( i => {
        let table = i.table_name;
        if(hasUnderscore(table)) {
          table = modifyUnderscore(table);
        }
        return (
          <li key={ table }>
            <Link 
              to={ baseUrl + table } 
              activeClassName="active"
              onClick={() => { return this.handleClick(i.table_name) }}
            >
              {i.table_name}
            </Link>
          </li>
        )
      });
    } else {
      <div className="loading-page">Loading...</div>
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-sm-3 col-md-2 sidebar">
        	<ul className="nav nav-sidebar">
        		{ this.displayList(this.props.tables) }
        	</ul>
        </div>

        <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2">
          {/*<div className={`control-area ${this.props.children? "show": "hidden"}`}>
            <button 
              className="btn btn-primary"
              onClick={() => this.openModal("addRow")}
            >
              Add Row
            </button>
            <button 
              className="btn btn-success add-col"
              onClick={() => this.openModal("addCol")}
            >
              Add Column
            </button>
            <button 
              className="btn btn-default update"
              onClick={() => this.openModal("updateInfo")}
            >
              Update Info
            </button>
            <button 
              className="btn btn-danger del-row"
              onClick={() => this.openModal("delRow")}
            >
              Delete Row
            </button>
            <button 
              className="btn btn-danger del-col"
              onClick={() => this.openModal("delCol")}
            >
              Delete Column
            </button>
          </div>*/}
        	<div className="table-responsive">
        		{this.props.children}
        	</div>
          { 
            this.props.modal? 
            <Modal
              table={window.location.pathname.split('/')[2]}
              action={this.props.action}
              columns={JSON.parse(localStorage.getItem(window.location.pathname.split('/')[2]))}
            /> 
            : null
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { 
    tables: state.adminReducer.tables,
    modal: state.adminReducer.modal[0],
    action: state.adminReducer.modal[1]
   };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getAllTables, toggleModal, getTable }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);