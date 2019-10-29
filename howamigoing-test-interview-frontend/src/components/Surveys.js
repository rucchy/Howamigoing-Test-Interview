import React, { Component } from 'react';
import {Col, Row, Alert} from 'reactstrap';
import DataTable from 'react-data-table-component';
import {Link} from "react-router-dom";

const columns = [
    {
        name: "ID",
        selector: "id",
        sortable: true,
    },
    {
        name: "Title",
        selector: "title",
        sortable: true,
        grow: 3
    },
    {
        name: "URL",
        selector: "url",
        sortable: true,
        grow: 4
    },
    {
        name: "Details",
        selector: "details"
    }
];

class Surveys extends Component{

    constructor(props){
        super(props);
        this.state = {
            surveys: "",
        };
    }

    componentDidMount() {
        fetch("http://localhost:3001/surveys")
            .then(res => res.json())
            .then( res => {
                let array = res.map(function(survey){
                        const url = "respondant/" + survey.url;
                        survey.url = (<Link to={{
                            pathname: url
                        }}>{window.location.origin + "/" + url}</Link>);
                        survey.details = (<Link to={{
                            pathname: `/survey/${survey.id}`,
                        }}>Details</Link>);
                        return survey;
                    }
                );
                this.setState({surveys: array})
                }
            )
            .catch(err => err);
    }


    render(){
        const query = new URLSearchParams(window.location.search);
        return (
            <Row>
                <Col>
                    {query.get("new") ? (
                        <Alert color="success">
                            Survey added!
                        </Alert>
                    ) : (
                        ""
                    )}
                    <h1 className={"text-center"}>List of Surveys</h1>
                    {this.state.surveys.length === 0 ? (
                        <p>There are no surveys created</p>
                    ) : (
                        <DataTable
                            columns={columns}
                            data={this.state.surveys}
                            pagination
                            responsive
                        />
                    )}

                </Col>
            </Row>
        );
    }
}

export default Surveys;