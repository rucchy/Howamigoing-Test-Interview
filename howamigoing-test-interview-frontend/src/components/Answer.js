import React, { Component } from 'react';
import NoMatch from "./NoMatch";
import { Row, Col, ListGroupItem, ListGroup} from 'reactstrap';
import Rating from "react-rating";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'

class Answer extends Component{
    constructor(props){
        super(props);
        this.state = {
            answer: "",
            loading: true
        };
    }
    componentDidMount() {
        let url = "http://localhost:3001/answer/" + this.props.match.params.id;
        fetch(url)
            .then(res => res.json())
            .then(res => this.setState({answer: res, loading: false}))
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
                this.state.answer ? (
                    <Row>
                        <Col>
                            <h1>Answer to: <strong>{this.state.answer[0].surveyTitle}</strong></h1>
                            <p>by: <strong>{this.state.answer[0].email ? (this.state.answer[0].email) : ( "Anonimous" )}</strong></p>
                            <p>URL: <strong>{window.location.origin + "/respondant/" +this.state.answer[0].surveyURL}</strong></p>
                            {this.renderQuestionsAnswers(this.state.answer)}
                        </Col>
                    </Row>
                ) : (
                    <NoMatch />
                )
        ));

    }
}

export default Answer;