import React, { Component } from "react";
import axios from "axios";

const username = window.sessionStorage.getItem("username");

export default class TournamentDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      name: "",
      description: "",
      admin: "",
      date: "",
      players: null,
      isWaiting: null,
      isDone: null,
      groups: null,
      finals: null,
      sma: "",
      smb: "",
      smc: "",
      smd: "",

      fna: "",
      fnb: "",
      winner: "",
    };

    this.onChangeRadioButton1 = this.onChangeRadioButton1.bind(this);
    this.onChangeRadioButton2 = this.onChangeRadioButton2.bind(this);
    this.onChangeRadioButton3 = this.onChangeRadioButton3.bind(this);
    this.onChangeRadioButton4 = this.onChangeRadioButton4.bind(this);

    this.onChangeFinal1 = this.onChangeFinal1.bind(this);
    this.onChangeFinal2 = this.onChangeFinal2.bind(this);

    this.onChangeWinner = this.onChangeWinner.bind(this);

    this.setSemiFinal = this.setSemiFinal.bind(this);
    this.setFinal = this.setFinal.bind(this);
    this.setWinner = this.setWinner.bind(this);
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/tournaments/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          id: response.data._id,
          name: response.data.name,
          description: response.data.description,
          admin: response.data.admin,
          date: response.data.date.substring(0, 10),
          players: response.data.players,
          isWaiting: response.data.isWaiting,
          isDone: response.data.isDone,
          groups: response.data.groups,
          finals: response.data.finals,
          winner: response.data.winner,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //JOIN THE PLAYER LIST
  join(id) {
    window.confirm("You can't unjoined. Do you want to join now?")
      ? axios
          .patch(
            "http://localhost:5000/tournaments/join/" + id + "/" + username
          )
          .then((response) => {
            window.location = "/tournaments/" + id;
          })
          .catch((err) => {
            console.log(err);
          })
      : console.log("No");
  }

  //SET SEMIFINAL
  onChangeRadioButton1(e) {
    this.setState({
      sma: e.target.value,
    });
  }
  onChangeRadioButton2(e) {
    this.setState({
      smb: e.target.value,
    });
  }
  onChangeRadioButton3(e) {
    this.setState({
      smc: e.target.value,
    });
  }
  onChangeRadioButton4(e) {
    this.setState({
      smd: e.target.value,
    });
  }
  setSemiFinal(e) {
    e.preventDefault();
    const id = this.state.id;
    const a = this.state.sma;
    const b = this.state.smb;
    const c = this.state.smc;
    const d = this.state.smd;
    axios
      .patch(
        "http://localhost:5000/tournaments/groups/" +
          id +
          "/" +
          a +
          "/" +
          b +
          "/" +
          c +
          "/" +
          d
      )
      .then((res) => {
        window.location = "/tournaments/" + id;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onChangeFinal1(e) {
    this.setState({
      fna: e.target.value,
    });
  }
  onChangeFinal2(e) {
    this.setState({
      fnb: e.target.value,
    });
  }
  setFinal(e) {
    e.preventDefault();
    axios
      .patch(
        "http://localhost:5000/tournaments/finals/" +
          this.state.id +
          "/" +
          this.state.fna +
          "/" +
          this.state.fnb
      )
      .then((res) => {
        window.location = "/tournaments/" + this.state.id;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onChangeWinner(e) {
    this.setState({
      winner: e.target.value,
    });
  }
  setWinner(e) {
    e.preventDefault();
    axios
      .patch(
        "http://localhost:5000/tournaments/winner/" +
          this.state.id +
          "/" +
          this.state.winner
      )
      .then((res) => {
        window.location = "/tournaments/" + this.state.id;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <input name="username" value={username} id="username" hidden readOnly />
        <div className="p-5 mb-4 bg-light rounded-3">
          <div className="container-fluid py-5">
            <h3 className="display-5 fw-bold">{this.state.name}</h3>
            <p className="text-muted mb-0">Created by {this.state.admin}</p>
            <p className="text-muted">Start on {this.state.date}</p>
            <div className="row">
              <p className=" col-md-8 fs-4">{this.state.description}</p>
              {this.state.winner !== "" && (
                <h3 className="col-md-4 text-end">
                  {" "}
                  Winner:{" "}
                  <span className="badge bg-success">{this.state.winner}</span>
                </h3>
              )}
            </div>

            {this.state.isWaiting && (
              <button
                className="btn btn-outline-primary btn-large"
                onClick={() => this.join(this.state.id)}
                disabled={
                  this.state.players.includes(username) || username === null
                }
              >
                Join now
              </button>
            )}
          </div>
        </div>

        {this.state.players !== null && (
          <div className=" text-center">
            <h3 className="mt-5">Player list</h3>
            <div className="row mb-5">
              {this.state.players.map(function (player, index, array) {
                if (index % 2 === 0) {
                  return (
                    <div className="col-3" key={index}>
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th scope="col" colSpan="2">
                              Round
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{player}</td>
                          </tr>
                          <tr>
                            <td>{array[index + 1] || "is waiting"}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  );
                } else {
                  return null;
                }
              })}
            </div>
          </div>
        )}

        {username === this.state.admin &&
          !this.state.isWaiting &&
          this.state.groups?.length !== 4 && (
            <form
              className="p-5 mb-4 bg-light rounded-3 mt-5"
              onSubmit={this.setSemiFinal}
            >
              <div className="row">
                {this.state.players.map((player, index, array) => {
                  if (index % 2 === 0) {
                    return (
                      <div className="col-3" key={index}>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name={
                              index === 0
                                ? "sma"
                                : index === 2
                                ? "smb"
                                : index === 4
                                ? "smc"
                                : "smd"
                            }
                            id={index}
                            value={player}
                            require="true"
                            onChange={
                              index === 0
                                ? this.onChangeRadioButton1
                                : index === 2
                                ? this.onChangeRadioButton2
                                : index === 4
                                ? this.onChangeRadioButton3
                                : this.onChangeRadioButton4
                            }
                          />
                          <label
                            className="form-check-label mb-3 h5"
                            htmlFor={index}
                          >
                            {player}
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name={
                              index === 0
                                ? "sma"
                                : index === 2
                                ? "smb"
                                : index === 4
                                ? "smc"
                                : "smd"
                            }
                            id={index + 1}
                            value={array[index + 1]}
                            onChange={
                              index === 0
                                ? this.onChangeRadioButton1
                                : index === 2
                                ? this.onChangeRadioButton2
                                : index === 4
                                ? this.onChangeRadioButton3
                                : this.onChangeRadioButton4
                            }
                          />
                          <label
                            className="form-check-label h5"
                            htmlFor={index + 1}
                          >
                            {array[index + 1]}
                          </label>
                        </div>
                      </div>
                    );
                  } else return null;
                })}
              </div>
              <button type="submit" className="btn btn-outline-primary mt-3">
                Set Semifinal
              </button>
            </form>
          )}

        {this.state.groups?.length === 4 && (
          <div className="text-center bg-light p-5 rounded-3">
            <h3 className="my-3">Semifinal List</h3>
            <div className="row">
              {this.state.groups.map(function (player, index, array) {
                if (index % 2 === 0) {
                  return (
                    <div className="col-6" key={index}>
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th scope="col" colSpan="2">
                              Round
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{player}</td>
                          </tr>
                          <tr>
                            <td>{array[index + 1] || "is waiting"}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  );
                } else {
                  return null;
                }
              })}
            </div>
          </div>
        )}

        {username === this.state.admin &&
          !this.state.isWaiting &&
          this.state.groups?.length === 4 &&
          this.state.finals?.length !== 2 && (
            <form
              className="p-5 mb-4 bg-gray-300 rounded-3 mt-5"
              onSubmit={this.setFinal}
            >
              <div className="row">
                {this.state.groups.map((player, index, array) => {
                  if (index % 2 === 0) {
                    return (
                      <div className="col-6" key={index}>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name={index === 0 ? "fna" : "fnb"}
                            id={index}
                            value={player}
                            require="true"
                            onChange={
                              index === 0
                                ? this.onChangeFinal1
                                : this.onChangeFinal2
                            }
                          />
                          <label
                            className="form-check-label mb-3 h5"
                            htmlFor={index}
                          >
                            {player}
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name={index === 0 ? "fna" : "fnb"}
                            id={index + 1}
                            value={array[index + 1]}
                            onChange={
                              index === 0
                                ? this.onChangeFinal1
                                : this.onChangeFinal2
                            }
                          />
                          <label
                            className="form-check-label h5"
                            htmlFor={index + 1}
                          >
                            {array[index + 1]}
                          </label>
                        </div>
                      </div>
                    );
                  } else return null;
                })}
              </div>
              <button type="submit" className="btn btn-outline-primary mt-3">
                Set Finals
              </button>
            </form>
          )}

        {this.state.finals?.length === 2 && (
          <div className="text-center bg-light p-5 rounded-3 mt-5">
            <h3 className="mb-5">Final List</h3>
            <form onSubmit={this.setWinner}>
              <div className="row">
                <div className="form-check col-6">
                  <input
                    type="radio"
                    className="btn-check"
                    name="winner"
                    id="winner1"
                    value={this.state.finals[0] || ""}
                    onChange={this.onChangeWinner}
                    disabled={this.state.admin !== username}
                  />
                  <label
                    className="btn btn-outline-info btn-large w-100"
                    htmlFor="winner1"
                  >
                    {this.state.finals[0]}
                  </label>
                </div>

                <div className="form-check col-6">
                  <input
                    type="radio"
                    className="btn-check"
                    name="winner"
                    id="winner2"
                    value={this.state.finals[1] || ""}
                    onChange={this.onChangeWinner}
                    disabled={this.state.admin !== username}
                  />
                  <label
                    className="btn btn-outline-danger btn-large w-100"
                    htmlFor="winner2"
                  >
                    {this.state.finals[1]}
                  </label>
                </div>
              </div>
              {this.state.admin === username && !this.state.isDone && (
                <button type="submit" className="btn btn-outline-primary mt-5">
                  Set Winner
                </button>
              )}
            </form>
          </div>
        )}
      </div>
    );
  }
}
