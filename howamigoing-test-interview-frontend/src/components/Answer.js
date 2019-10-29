import React, { Component } from 'react';
import NoMatch from "./NoMatch";
import ListGroup from "reactstrap/es/ListGroup";
import ListGroupItem from "reactstrap/es/ListGroupItem";
import Rating from "react-rating";

class Answer extends Component{
    constructor(props){
        super(props);
        this.state = {
            answer: ""
        };
    }
    componentDidMount() {
        let url = "http://localhost:3001/answer/" + this.props.match.params.id;
        fetch(url)
            .then(res => res.json())
            .then(res => this.setState({answer: res}))
            .catch(err => err);
    }

    renderQuestionsAnswers(answers){
        return (
            <div>
                <h2>Questions</h2>
                <ListGroup>
                    {answers.map((answer, i) => {
                        return (
                            <ListGroupItem key={i}>
                                <p><strong>Question:</strong> {answer.question}</p>
                                {answer.questionType === "Text" ?
                                    <div><strong>Answer:</strong> {answer.answer}</div> :
                                    <Rating
                                        readonly
                                        startCount={5}
                                        initialRating={answer.answer}
                                        emptySymbol={<img src="/assets/images/star-empty.png" alt="empty star" className="icon" />}
                                        fullSymbol={<img src="/assets/images/star.png" alt="star" className="icon" />}
                                    />
                                }

                            </ListGroupItem>
                            )
                        }
                    )}
                </ListGroup>
            </div>
        );
    }

    render() {
        return(
            this.state.answer ? (
                <div>
                    <h1>Answer to: <strong>{this.state.answer[0].surveyTitle}</strong></h1>
                    <p>by: <strong>{this.state.answer[0].email ? (this.state.answer[0].email) : ( "Anonimous" )}</strong></p>
                    <p>URL: <strong>{window.location.origin + "/" +this.state.answer[0].surveyURL}</strong></p>
                    {this.renderQuestionsAnswers(this.state.answer)}
                </div>
            ) : (
                <NoMatch />
            )
        );

    }
}

export default Answer;