import React, { Component } from 'react';
import axios from 'axios';
import update from 'immutability-helper';
import Trip from './Trip';

class TripsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      trips: [],
      inputTrip: '',
      selectedTrip: {}
    }
  }

  getTrips() {
    axios.get('/api/v1/trips')
    .then(response => {
      this.setState({trips: response.data})
    })
    .catch(error => console.log(error))
  }

  componentDidMount() {
    this.getTrips()
  }

  createTrip = (e) => {
    if (e.key === 'Enter') {
      axios.post('/api/v1/trips', {trip:
        {title: e.target.value,
         begins: '',
         ends: '',
         airfare_booked: false,
         hotel_booked: false,
         work_calendar_updated: false,
         notes: ''
        }})
      .then(response => {
        const trips = update(this.state.trips, {
          $splice: [[0, 0, response.data]]
        })
        this.setState({
          trips: trips,
          inputTrip: ''
        })
      })
      .catch(error => console.log(error))
    }
  }

  handleDeleteTripClick = (id) => {
    axios.delete(`/api/v1/trips/${id}`)
    .then(response => {
      const tripIndex = this.state.trips.findIndex(x => x.id === id)
      const trips = update(this.state.trips, {
        $splice: [[tripIndex, 1]]
      })
      this.setState({
        trips: trips
      })
    })
    .catch(error => console.log(error))
    this.setState({selectedTrip: {}})
  }

  handleTripInputChange = (e) => {
    this.setState({inputTrip: e.target.value});
  }

  handleTripClick = (e, trip) => {
    this.setState({selectedTrip: trip})
  }

  handleTripCheckbox = (e, boxValue) => {
    const trip = this.state.selectedTrip
    trip[boxValue] = !trip[boxValue]
    this.setState({selectedTrip: trip})
  }

  handleTripPlanItemChange = (e, boxValue) => {
    const trip = this.state.selectedTrip
    trip[boxValue] = e.target.value
    this.setState({selectedTrip: trip})
  }

  updateTrip = (id) => {
    axios.put(`/api/v1/trips/${id}`, {trip: this.state.selectedTrip})
    .then(response => {
      const tripIndex = this.state.trips.findIndex(x => x.id === response.data.id)
      const trips = update(this.state.trips, {
        [tripIndex]: {$set: response.data}
      })
      this.setState({
        trips: trips
      })
    })
    .catch(error => console.log(error))
  }

  handleSubmitButtonClick = (e, id) => {
    this.updateTrip(e, id)
    this.setState({selectedTrip: {}})
  }

  render() {
    const isTripSelected = !Object.keys(this.state.selectedTrip).length
    return (
      <div>
        {isTripSelected &&
        <div>
          <h1>Where to next?</h1>
          <div className="inputContainer">
            <input className="tripInput" type="text"
             placeholder="Add a trip" maxLength="50"
             onKeyPress={this.createTrip}
             value={this.state.inputTrip}
             onChange={this.handleTripInputChange} />
          </div>
          <div className="listWrapper">
           <ul className="tripList">
            {this.state.trips.map((trip) => {
              return(
                <li className="trip" trip={trip} key={trip.id} onClick={((e) => this.handleTripClick(e, trip))}>
                  <label className="tripLabel">{trip.title}</label>
                </li>
              )
            })}
           </ul>
          </div>
        </div>
      }
      {
        !isTripSelected &&
        <div>
          <Trip
            tripData={this.state.selectedTrip}
            handleTripCheckbox={this.handleTripCheckbox}
            handleTripPlanItemChange={this.handleTripPlanItemChange}
            handleSubmitButtonClick={this.handleSubmitButtonClick}
            handleDeleteTripClick={this.handleDeleteTripClick}
          />
        </div>
      }
      </div>
    )
  }
}

export default TripsContainer
