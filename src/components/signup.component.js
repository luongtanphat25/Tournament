import React, { Component } from "react";
import axios from "axios";

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = { username: "", password: "" };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username,
      password: this.state.password,
    };

    axios.post("http://localhost:5000/users/signup", user).then((res, err) => {
      if (res.data === "User already exists.") {
        alert("User already exists.");
        window.location = "/login";
      } else if (res.data === "User added!") {
        window.location = "/login";
      }
    });
  }

  render() {
    return (
      <div className="mx-auto" style={{ width: "350px", height: "450px" }}>
        <h4 className="text-center mt-5">Welcome to QFHO Tournament</h4>
        <p className="text-muted text-center">
          <small>Lorem ipsum dolore magna aliqua.</small>
        </p>
        <form onSubmit={this.onSubmit}>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Username"
              value={this.state.username}
              onChange={this.onChangeUsername}
              required
            />
            <label htmlFor="username">Username</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.onChangePassword}
              required
            />
            <label htmlFor="password">Password</label>
          </div>
          <input
            className="w-100 btn btn-lg btn-primary"
            type="submit"
            value="Sign up"
          />
        </form>
      </div>
    );
  }
}
