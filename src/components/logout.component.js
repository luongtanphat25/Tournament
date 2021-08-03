import { Component } from "react";
import axios from "axios";

export default class Login extends Component {
  constructor() {
    super();
    axios.get("http://localhost:5000/users/logout");
    window.sessionStorage.clear();
    window.location = "/login";
  }
}
