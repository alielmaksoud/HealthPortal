import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleModal } from '../actions/index';
 
class Modal extends Component {
	constructor(props) {
		super(props);
	}

	onHandleSubmit(e) {
		e.preventDefault();
		this.props.toggleModal(true);
	}

	closeModal(e) {
		e.preventDefault();
		this.props.toggleModal(true);
	}

	renderInputs(data, action) {
		data.unshift("table");
		switch (action) {
			case "updateInfo":
			case "addRow":
				return data.map(i => {
					return (
						<div className="input-group" key={i}>
		  				<span className="input-group-addon" id="basic-addon1"/>
		  				<input type="text" className="form-control" placeholder={i} name={i}/>
						</div>
					)
				});
			case "addCol":
				return (
					<div>
						<div className="input-group">
							<span className="input-group-addon" id="basic-addon1"/>
							<input type="text" className="form-control" placeholder="table" name="table"/>
						</div>
						<div className="input-group">
							<span className="input-group-addon" id="basic-addon1"/>
							<input type="text" className="form-control" placeholder="column name" name="column"/>
						</div>
						<div className="input-group">
							<span className="input-group-addon" id="basic-addon1"/>
							<input type="text" className="form-control" placeholder="column type" name="colType"/>
						</div>
					</div>
				);
			case "delRow":
				return (
					<div>
						<div className="input-group">
							<span className="input-group-addon" id="basic-addon1"/>
							<input type="text" className="form-control" placeholder="table" name="table"/>
						</div>
						<div className="input-group">
							<span className="input-group-addon" id="basic-addon1"/>
							<input type="text" className="form-control" placeholder="column name" name="table"/>
						</div>
						<div className="input-group">
							<span className="input-group-addon" id="basic-addon1"/>
							<input type="text" className="form-control" placeholder="column value" name="data"/>
						</div>
					</div>
				);
			case "delCol":
				return (
					<div>
						<div className="input-group">
							<span className="input-group-addon" id="basic-addon1"/>
							<input type="text" className="form-control" placeholder="table" name="table"/>
						</div>
						<div className="input-group">
							<span className="input-group-addon" id="basic-addon1"/>
							<input type="text" className="form-control" placeholder="column" name="column"/>
						</div>
					</div>
				);
		}

		return null;
	}

  render() {
    return (
    	<div className="modal" role="dialog">
  			<div className="modal-dialog" role="document">
    			<form onSubmit={this.onHandleSubmit.bind(this)} className="modal-content">
   				 	<div className="modal-header">
      				<h4 className="modal-title">Table {this.props.table}</h4>
    				</div>
    				<div className="modal-body">
        			{this.renderInputs(this.props.columns, this.props.action)}
      			</div>
      			<div className="modal-footer">
        			<button onClick = {this.closeModal.bind(this)} type="button" className="btn btn-default">Close</button>
        			<button type="sumbit" className="btn btn-primary">Save changes</button>
      			</div>
    			</form>
  			</div>
			</div>
    );
  }
}

function mapStateToProps(state) {
  return { modal: state.adminReducer.modal[0] };
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ toggleModal }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);