import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  Container,
  Row,
  Col,
} from 'reactstrap';
import {
  Switch,
  Route,
    Link
} from "react-router-dom";
import Home from "./Home";
import Surveys from "./Surveys";

class App extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
        <div>
          <Navbar color="inverse" light expand="md">
            <Link to="/" className="navbar-brand">Howamigoing test interview FRONTEND</Link>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <Link to="/surveys" className={"nav-link"}>Surveys</Link>
                </NavItem>
                <NavItem>
                  <Link to="/survey/add" className={"nav-link"}>Add new Survey</Link>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
          <main>
            <Container>
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/surveys">
                  <Surveys />
                </Route>
              </Switch>
            </Container>
          </main>
          <footer>
            <Container>
              <Row>
                <Col>
                  Developed by José Mª Ruano
                </Col>
              </Row>
            </Container>
          </footer>
        </div>
    );
  }
}

export default App;