import React, { Component } from "react";
import axios from "axios";

export default class Login extends Component {
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

    axios
      .post("http://localhost:5000/users/login", user)
      .then((res) => {
        if (res.status === 200) {
          window.sessionStorage.setItem("isAuthenticated", true);
          window.sessionStorage.setItem("username", res.data);
          window.location = "/";
        }
      })
      .catch((err) => {
        alert("Log in failed. Please try again! " + err);
      });
  }

  render() {
    return (
      <div className="mx-auto" style={{ width: "350px", height: "450px" }}>
        <h4 className="text-center mt-5">Log in to QFHO Tournament</h4>
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
          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Log in
          </button>
          <div className="text-center mt-5">
            <a href="/forgot" className="link-primary">
              Forgot password?
            </a>
          </div>
          <div className="text-center mt-3">
            <p>
              New to QFHO?{" "}
              <a href="/signup" className="link-primary">
                Create an account
              </a>
            </p>
          </div>
        </form>
      </div>
    );
  }
}
