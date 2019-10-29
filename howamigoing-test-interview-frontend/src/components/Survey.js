import React, { Component } from 'react';
import {Col, Row, Table} from 'reactstrap';
import DataTable from 'react-data-table-component';
import {Link} from "react-router-dom";
import NoMatch from "./NoMatch";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'

const columns = [
    {
        name: "ID",
        selector: "id",
        sortable: true,
    },
    {
        name: "Email",
        selector: "email",
        sortable: true,
        grow: 2
    },
    {
        name: "Details",
        selector: "details"
    }
];

class Survey extends Component{
    constructor(props){
        super(props);
        this.state = {
            survey: "",
            loading: true,
        };
    }
    componentDidMount() {
        let url = "http://localhost:3001/survey/" + this.props.match.params.id;
        fetch(url)
            .then(res => res.json())
            .then(res => this.setState({survey: res, loading:false}))
            .catch(err => err);
    }

    renderQuestions(questions){
        return (
            <Table striped responsive>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Type</th>
                    <th>Question</th>
                </tr>
                </thead>
                <tbody>
                {questions.map((question, i) => {
                    return (
                        <tr key={i}>
                            <th scope="row">{question.id}</th>
                            <td>{question.type}</td>
                            <td>{question.text}</td>
                        </tr>
                    )
                })}
                </tbody>
            </Table>
        )
    }

    renderAnswers(answers){
        let array = answers.map((answer, i) =>{
           if(!answer.email){
               answer.email = "Anonimous";
           }
            answer.details = (<Link to={{
                pathname: `/answer/${answer.id}`,
            }}>See Answer</Link>)
           return answer;
        });
        return(
            <DataTable
                columns={columns}
                data={array}
                pagination
                responsive
            />
        );

    }

    render(){
        return(
            this.state.loading ? (
                <Row>
                    <Col className={"text-center"}>
                        <Loader
                            type="ThreeDots"
                            color="#00BFFF"
                            height={100}
                            width={100}

                        />
                    </Col>
                </Row>) : (
                this.state.survey ? (
                        <Row>
                            <Col>
                                <h2>{this.state.survey.title}</h2>
                                <p><strong>URL:</strong> {window.location.origin + "/respondant/" + this.state.survey.url}</p>
                                <h3>Questions</h3>
                                {!this.state.survey.questions ? (
                                    "There are no Questions"
                                ) : (
                                    this.renderQuestions(this.state.survey.questions)
                                )
                                }
                                <h3>Answers</h3>
                                {!this.state.survey.answers ? (
                                    "There are no Answers"
                                ) : (
                                    this.renderAnswers(this.state.survey.answers)
                                )
                                }
                            </Col>
                        </Row>
                    ) : (
                        <NoMatch />
                    )
            )
        );
    }
}

export default Survey;