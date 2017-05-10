import React, { Component } from 'react';

export default class Modal extends Component {
  render() {
    return (
      <form 
        className="form"
        onSubmit={ this.onHandleSubmit }
      >
        { this.renderAlert() } 
        <fieldset className={`form-group ${this.props.errorMessage ? "has-error": ""}`}>
          <label htmlFor="doctorId">Doctor ID: </label>
          <input 
            type="text" 
            className="form-control" 
            id="doctorId" 
            placeholder="Your ID"
          />
        </fieldset>
        <button type="submit" className="btn btn-default">Submit</button>
      </form>
    );
  }
}
