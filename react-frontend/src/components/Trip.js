import React, { Component } from 'react';


class Trip extends Component {
  render() {
    return (
      <div className="inputContainer">
        <h1>{this.props.tripData.title}</h1>
        <ul className="tripList">
        <li className="tripPlanItem">
          <button className="tripBtn" onClick={((e) => this.props.handleDeleteTripClick(this.props.tripData.id))}>Delete Trip</button>
        </li>
          <li className="tripPlanItem">
            <label>
              Begins
              <input className="tripInput" type="text" value={this.props.tripData.begins} onChange={((e) => this.props.handleTripPlanItemChange(e, 'begins'))} />
            </label>
          </li>
          <li className="tripPlanItem">
            <label>
              Ends
              <input className="tripInput" type="text" value={this.props.tripData.ends} onChange={((e) => this.props.handleTripPlanItemChange(e, 'ends'))} />
            </label>
          </li>
          <li className="tripPlanItem">
            <label>
              Airfare booked?
              <input className="tripCheckbox" type="checkbox" checked={this.props.tripData.airfare_booked} onChange={((e) => this.props.handleTripCheckbox(e, 'airfare_booked'))} />
            </label>
          </li>
          <li className="tripPlanItem">
            <label>
              Hotel booked?
              <input className="tripCheckbox" type="checkbox" checked={this.props.tripData.hotel_booked} onChange={((e) => this.props.handleTripCheckbox(e, 'hotel_booked'))} />
            </label>
          </li>
          <li className="tripPlanItem">
            <label>
              Work calendar updated?
              <input className="tripCheckbox" type="checkbox" checked={this.props.tripData.work_calendar_updated} onChange={((e) => this.props.handleTripCheckbox(e, 'work_calendar_updated'))} />
            </label>
          </li>
          <li className="tripPlanItem">
            <label>
              Notes
              <input className="tripInput" type="text" value={this.props.tripData.notes} onChange={((e) => this.props.handleTripPlanItemChange(e, 'notes'))} />
            </label>
          </li>
          <li className="tripPlanItem">
            <button className="tripBtn" onClick={((e) => this.props.handleSubmitButtonClick(this.props.tripData.id))}>Submit</button>
          </li>
        </ul>
      </div>
    )
  }
}

export default Trip
