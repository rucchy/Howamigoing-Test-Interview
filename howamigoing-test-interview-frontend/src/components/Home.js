import React, { Component } from 'react';
import {Col, Row} from "reactstrap";
import {Link} from "react-router-dom";

class Home extends Component {
    render() {
        return (
            <Row>
                <Col>
                    <h1 id={"title-home"} className={"text-center"}>Welcome to<br/> Howamigoing test interview FRONTEND</h1>
                    <div className={"mt-5 d-flex justify-content-around"}>
                        <Link
                            to="/surveys"
                            className={"btn-home btn btn-success btn-large"}
                        >
                            List of Surveys
                        </Link>
                        <Link
                            to="/survey/add"
                            className={"btn-home btn btn-success btn-large"}
                        >
                            Add new Survey
                        </Link>
                    </div>
                </Col>
            </Row>
        );
    }
}

export default Home;