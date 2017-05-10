import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginUser } from '../actions/index';
import { validate } from '../helpers/helpers';
 
class Auth extends Component {
	constructor(props) {
		super(props);

		localStorage.setItem("user", "");

		this.onHandleSubmit = this.onHandleSubmit.bind(this);
	}

	onHandleSubmit(e) {
		e.preventDefault();
		const docId = document.getElementById('doctorId').value;;
		if(validate(docId)) {
			this.props.loginUser({ docId });
		}
	}

	renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }


  render() {
    return (
    	<section className="hero-body column">
    		<h1 className="hero-title">
    			Monitor how <br/>
    			your patients are doing.
    		</h1>
    		<h2 className="hero-subtitle">
    			A Transforming, Healing Presence.
    		</h2>	
	      <form 
	      	className="form"
	      	onSubmit={ this.onHandleSubmit }
	      >
	      	{ this.renderAlert() } 
				  <fieldset className={`form-group column ${this.props.errorMessage ? "has-error": ""}`}>
				    <input 
				    	type="text" 
				    	className="form-control" 
				    	id="doctorId" 
				    	placeholder="Your Doctor ID"
				    />
				  </fieldset>
				  <fieldset className="form-group column">
	  				<button type="submit" className="btn btn-primary">Submit</button>
	  			</fieldset>
				</form>
			</section>
    );
  }
}

Auth.contextTypes = {
	router: PropTypes.object
};

function mapStateToProps(state) {
  return { errorMessage: state.authReducer.error };
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ loginUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);