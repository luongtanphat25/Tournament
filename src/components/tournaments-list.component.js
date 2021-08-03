import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Tournament = (props) => {
  return (
    <div className="col">
      <div
        className={
          props.tournament.isWaiting
            ? "card border-success h-100"
            : props.tournament.isDone
            ? "card border-primary h-100"
            : "card border-warning h-100"
        }
      >
        <div className="card-header">
          {props.tournament.isWaiting
            ? "Open"
            : props.tournament.isDone
            ? "Finished"
            : "Playing"}
        </div>
        <div className="card-body">
          <h5 className="card-title">{props.tournament.name}</h5>
          <p className="card-subtitle mb-2 text-muted">
            Date: {props.tournament.date.substring(0, 10)}
          </p>
          <p className="card-text">
            Description: {props.tournament.description.substring(0, 100)} ...
          </p>
          {props.tournament.isWaiting && (
            <p className="card-text">
              <small className="text-muted">
                waiting for {8 - props.tournament.players.length} more players
                to start...
              </small>
            </p>
          )}
          <Link
            to={"/tournaments/" + props.tournament._id}
            className="card-link"
          >
            View Detail
          </Link>
        </div>
        <div className="card-footer d-flex justify-content-between d-flex align-items-center">
          <small className="text-muted">
            Created by: {props.tournament.admin}
          </small>
          {props.tournament.admin ===
            window.sessionStorage.getItem("username") && (
            <button
              className="btn btn-outline-danger"
              onClick={() => {
                axios
                  .delete(
                    "http://localhost:5000/tournaments/" + props.tournament._id
                  )
                  .then(window.location.reload());
              }}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default class TournamentsList extends Component {
  constructor(props) {
    super(props);
    this.deleteTournament = this.deleteTournament.bind(this);
    this.state = { tournaments: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/tournaments/")
      .then((response) => {
        this.setState({
          tournaments: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteTournament(id) {
    this.setState({
      tournaments: this.state.tournaments.filter((t) => t._id !== id),
    });
  }

  tournamentsList() {
    return this.state.tournaments.map((t) => {
      return <Tournament tournament={t} key={t._id} />;
    });
  }

  render() {
    return (
      <div>
        <h3 className="my-3">List of Tournament</h3>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {this.tournamentsList()}
        </div>
      </div>
    );
  }
}
