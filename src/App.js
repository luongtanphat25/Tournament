import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import TournamentsList from "./components/tournaments-list.component";
import TournamentDetail from "./components/tournament-detail.component";
import Login from "./components/login.component";
import Logout from "./components/logout.component";
import Signup from "./components/signup.component";
import CreateTournament from "./components/create-tournament.component";

import PrivateRoute from "./components/private-route.component";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Switch>
            <Route path="/" exact component={TournamentsList} />
            <Route path="/tournaments/:id" exact component={TournamentDetail} />
            <Route path="/login" exact component={Login} />
            <Route path="/logout" exact component={Logout} />
            <Route path="/signup" exact component={Signup} />
            <PrivateRoute
              path="/create-tournament"
              exact
              component={CreateTournament}
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
