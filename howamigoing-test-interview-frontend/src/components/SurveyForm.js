import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input} from 'reactstrap';

class SurveyForm extends Component{
    constructor(props){
        super(props);
        this.myRefs = [];
        this.state = {
            questions: [],
            cont: 0,
            removingQuestion: false
        };
    }

    handleChange = (i,e) => {
        const questions = this.state.questions.map((item, j) => {
            if (item.id === i) {
                item.text = e.target.value;
                return item;
            } else {
                return item;
            }
        });
        return {
            questions,
        };
    };

    addQuestion = () => {
        this.setState(state => {
            const cont = this.state.cont+1;
            const questions = state.questions.concat({id: state.cont, text: ""});
            return {
                questions,
                cont
            };
        });
    };

    componentDidUpdate(){
        if(this.state.removingQuestion){
            this.state.questions.forEach((item) => {
                this.myRefs["question-"+item.id].value = item.text;
            });
            this.setState(state => {
                const removingQuestion = false;
                return {removingQuestion}
            });
        }

    }


    removeQuestion = (i) => {
        this.myRefs["question-"+i].value = "";
        this.setState(state => {
            const questions = state.questions.filter(item => item.id !== i);
            const removingQuestion = true;
            return {
                questions,
                removingQuestion,
            }
        });

    };

    handleSubmit = (e) => {
        e.preventDefault();
    };

    render(){
        return(
            <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Label for="title">Title</Label>
                    <Input type="text" name="title" id="title" required/>
                </FormGroup>
                <FormGroup>
                    <Label for="url">URL</Label>
                    <div className={"d-flex align-items-center"}>
                        <div className="input-group-prepend">
                            <span className="input-group-text">{window.location.origin}/</span>
                        </div>
                        <Input type="text" name="url" id="url" required/>
                    </div>
                </FormGroup>
                <FormGroup>
                    <Label for="type">Type</Label>
                    <Input type="select" name="type" id="type" required>
                        <option value="TEXT" defaultChecked={true}>Text</option>
                        <option value="LIKERT">Likert</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="question">Question 1</Label>
                    <Input rows="3" type="textarea" name="question[]" id="question" maxLength="300" required />
                </FormGroup>
                {this.state.questions && this.state.questions.map((question, i) => {
                    return (<FormGroup row className={"align-items-center"}>
                        <Label xs={12} for="question">Question {i+2}</Label>
                        <Col xs={10}>
                            <textarea rows="3" className={"form-control"} type="textarea" name="question[]" maxLength="300"
                                      ref={(ref) => this.myRefs["question-"+question.id] = ref}
                                      id={"question-"+question.id}
                                      defaultValue={question.text}
                                      onChange={ (e) => this.handleChange(question.id, e)} />
                        </Col>
                        <Col xs={2}>
                            <Button color="danger" onClick={() => this.removeQuestion(question.id)}>Remove Question</Button>
                        </Col>
                    </FormGroup>)
                })
                }
                <FormGroup className={"d-flex justify-content-center"}>
                    <Button onClick={this.addQuestion}>Add Question</Button>
                </FormGroup>
                <FormGroup className={"d-flex justify-content-center"}>
                        <Button>Submit</Button>
                </FormGroup>
            </Form>
        );
    }
}

export default SurveyForm;