import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class CreateTournament extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: "",
      description: "",
      date: new Date(),
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onChangeDate(date) {
    this.setState({
      date: date,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const tournament = {
      name: this.state.name,
      description: this.state.description,
      date: this.state.date,
      admin: window.sessionStorage.getItem("username"),
      players: [],
      groups: [],
      finals: [],
      isWaiting: true,
      isDone: false,
      winner: "",
    };

    axios
      .post("http://localhost:5000/tournaments/add", tournament)
      .then((res) => (window.location = "/tournaments/" + res.data._id));
  }

  render() {
    return (
      <div className="p-5 mb-4 bg-light rounded-3">
        <div className="container-fluid py-5">
          <h3 className="fs-1 mb-5">Create New Tournament</h3>
          <form onSubmit={this.onSubmit} className="col-md-8">
            <div className="form-floating mb-3">
              <input
                type="text"
                placeholder="Tournaments'name"
                required
                className="form-control"
                value={this.state.name}
                onChange={this.onChangeName}
                id="name"
              />
              <label htmlFor="name">Tournament's name: </label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                required
                id="description"
                placeholder="Description"
                className="form-control"
                value={this.state.description}
                onChange={this.onChangeDescription}
              />
              <label htmlFor="description">Description: </label>
            </div>
            <div className="form-group">
              <label>Start on: </label>
              <div>
                <DatePicker
                  className="mt-2 mb-5"
                  selected={this.state.date}
                  onChange={this.onChangeDate}
                />
              </div>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="confirm"
                required
              />
              <label className="form-check-label" htmlFor="confirm">
                I understand that these information cannot be changed after
                created.
              </label>
            </div>
            <button type="submit" className="btn btn-large btn-primary mt-5">
              Create Tournament
            </button>
          </form>
        </div>
      </div>
    );
  }
}
