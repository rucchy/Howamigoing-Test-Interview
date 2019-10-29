import React, { Component } from 'react';
import {Row, Col, Alert} from "reactstrap";
import {Link} from "react-router-dom";

class SurveyCorrect extends Component{
    render(){
        return(
            <Row>
                <Col className={"text-center"}>
                    <Alert color="success">
                        Survey completed!
                    </Alert>
                    <Link
                        to="/surveys"
                        className={"btn-home btn btn-primary btn-large"}
                    >
                        Go to the list of surveys
                    </Link>
                </Col>
            </Row>
        )
    }
}

export default SurveyCorrect;