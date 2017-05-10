import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, browserHistory } from 'react-router';
import { getPatient } from '../actions/index';

import Graph from '../components/Graph';
import Loader from '../components/Loader';

class PatientGraph extends Component {
	constructor(props) {
		super(props);

		this.state = {
			seeAverage: false
		}
	}

  componentWillMount() {
    this.props.getPatient(this.props.params.patientId);
  }

  handleChange(e) {
    const ifSeeAverage = document.getElementById("checkbox").checked ? true: false;
    this.setState({seeAverage: ifSeeAverage});
    this.renderGraph(this.props.data, ifSeeAverage);
  }

  renderGraph(data, seeAverage) {
  	if(data) {
  		return ( 
  			<div>
          <div className="page-controls">
            <button onClick={browserHistory.goBack} className="btn btn-link">Go Back</button>
          </div>
          <header className="graph-title">
            Patient {this.props.patient.name}, ID: {this.props.patient.patientId}
          </header>
  				<Graph data={data} average={seeAverage}/>
  				<div className="input-group">
            <span className="input-group-addon">
              <input 
                type="checkbox"
                id="checkbox" 
                onChange={this.handleChange.bind(this)}
                style={{marginRight: '1rem'}}
              />
              <label htmlFor="checkbox">show/hide average reading</label> :
            </span>
          </div>
    		</div>
  		)
  	} else {
  		return <Loader />
  	}
  }

  render() {
    return (
    	<div>
  			{
  				this.renderGraph(this.props.patient, this.state.seeAverage)
  			}
    	</div>
    );
  }
}

function mapStateToProps(state) {
  return { 
  	patient: state.userReducer.patient
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getPatient }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientGraph);