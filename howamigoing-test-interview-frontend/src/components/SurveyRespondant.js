import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import {Row, Col, Button, Form, FormGroup, Label, Input} from 'reactstrap';
import Rating from "react-rating";
import NoMatch from "./NoMatch";
import Loader from "react-loader-spinner";

class SurveyRespondant extends Component{
    constructor(props){
        super(props);
        this.state = {
            redirect: false,
            survey: null,
            completed: false,
            process: false,
            email: "",
            loading: true,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeQuestions = (i, e) => {
        const text = e.target.value;

        this.setState( state => {
            const process = true;
            const survey = state.survey;
            const questions = state.survey.questions.map((item, j) => {
                if (item.id === i) {
                    item.answer = text;
                    return item;
                } else {
                    return item;
                }
            });
            survey.questions = questions;
            return {
                survey,
                process
            };
        });
    };

    handleChangeRating = (i, e) => {
        const text = e;

        this.setState( state => {
            const questions = state.survey.questions.map((item, j) => {
                if (item.id === i) {
                    item.answer = text;
                    return item;
                } else {
                    return item;
                }
            });
            return {
                questions
            };
        });
    };

    handleChangeEmail = (e) => {
        this.setState({email: e.target.value});
    };

    isCompleted = () => {
        let completed = true;
        this.state.survey.questions.forEach((item) => {
              if(typeof item.answer === "undefined" || item.answer.length === 0){
                  completed = false;
              }
        });
        this.setState({completed})
    };

    handleSubmit = (e) => {
        e.preventDefault();
        let answer = {
            email: this.state.email,
            survey: this.state.survey.id
        }
        let questions = [];
        this.state.survey.questions.forEach(function(item){
            const array = {
                textAnswer: item.answer,
                question: item.id
            };
            questions.push(array);
        })
        answer.questionAnswer = questions;
        fetch('http://localhost:3001/answer/'+this.state.survey.id, {
            method: 'POST',
            body: JSON.stringify(answer),
            headers: {"Content-Type": "application/json"}
        })
            .then(res => res.json())
            .then(res => {
                if(res.error){
                    alert("Survey don't exist.");
                }else{
                    this.setState({redirect: true});
                }
            })
            .catch(err => err);
    };
    componentDidUpdate(){
        if(this.state.process){
            this.setState(state => {
                const process = false;
                return {process}
            });
            this.isCompleted();
        }
    }

    componentDidMount(){
        const url = window.location.pathname.replace("/respondant/", "");
        fetch('http://localhost:3001/surveyByURL', {
            method: 'POST',
            body: JSON.stringify({url: url}),
            headers: {"Content-Type": "application/json"}
        })
            .then(res => res.json())
            .then(res => {
                res.questions = res.questions.map((question, i) => {
                    if(question.type === "Likert"){
                        question.answer = 1
                    }
                    return question;
                })
                this.setState( state => {
                    return {
                        survey:res,
                        loading: false
                    };
                });
            })
            .catch(err => err);
    }

    renderRedirect = () => {
        if(this.state.redirect) {
            return <Redirect push to={'/survey-completed'} />;
        }
    };

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
                            <h1>{this.state.survey.title}</h1>
                            <Form onSubmit={this.handleSubmit}>
                                {this.state.survey.questions.map((question, i) => {
                                    return (<FormGroup key={i}>
                                        <Label for={"question"+question.id}>{question.text}</Label>
                                        {question.type === "Text" ? (
                                                <textarea rows="3" className={"form-control"} type="textarea" name={"question"+question.id} maxLength="300"
                                                          id={"question-"+question.id}
                                                          onChange={ (e) => this.handleChangeQuestions(question.id, e)} />)
                                            : (
                                                <div>
                                                    <Rating
                                                        startCount={5}
                                                        initialRating={question.answer || 1}
                                                        emptySymbol={<img src="/assets/images/star-empty.png" alt="empty star" className="icon" />}
                                                        fullSymbol={<img src="/assets/images/star.png" alt="star" className="icon"/>}
                                                        onChange={(e) => this.handleChangeRating(question.id, e)}
                                                    />
                                                </div>

                                            )}
                                    </FormGroup>)
                                })
                                }
                                <FormGroup>
                                    <Label for="email">Email (optional)</Label>
                                    <Input type="email" name="email" id="email" disabled={!this.state.completed} onChange={this.handleChangeEmail}/>
                                </FormGroup>
                                <FormGroup className={"d-flex justify-content-center"}>
                                    <Button>Submit</Button>
                                </FormGroup>
                            </Form>

                            {this.renderRedirect()}
                        </Col>
                    </Row>
                ) : (
                    <NoMatch />
                )
            )
        );
    }
}

export default SurveyRespondant;