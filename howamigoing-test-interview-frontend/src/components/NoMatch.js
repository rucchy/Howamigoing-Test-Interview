import React, { Component } from 'react';
import {Col, Row} from "reactstrap";

class NoMatch extends Component{
    render(){
        return(
            <Row>
                <Col>
                    <h3>Error 404: Not Found!</h3>
                </Col>
            </Row>
        );
    }
}

export default NoMatch;