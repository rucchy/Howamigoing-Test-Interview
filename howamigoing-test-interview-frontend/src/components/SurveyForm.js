import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { Row, Col, Button, Form, FormGroup, Label, Input, Modal, ModalBody, ModalFooter} from 'reactstrap';

class SurveyForm extends Component{
    constructor(props){
        super(props);
        this.myRefs = [];
        this.state = {
            questions: [],
            cont: 0,
            removingQuestion: false,
            title: "",
            url: "",
            question1: "",
            type1: "TEXT",
            url_exists: false,
            redirect: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }

    handleChange = (param, e) => {
        this.setState({[param]: e.target.value});
    };

    handleChangeQuestions = (i,e) => {
        const text = e.target.value;
        this.setState( state => {
            const questions = state.questions.map((item, j) => {
                if (item.id === i) {
                    item.text = text;
                    return item;
                } else {
                    return item;
                }
            });
            return {
                questions,
            };
        });
    };

    handleChangeType = (i,e) => {
        const type = e.target.value;
        this.setState( state => {
            const questions = this.state.questions.map((item, j) => {
                if (item.id === i) {
                    item.type = type;
                    return item;
                } else {
                    return item;
                }
            });
            return {
                questions,
            };
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        let form = {
            title: this.state.title,
            url: encodeURI(this.state.url),
        };
        let questions = [
            {
                type: this.state.type1,
                text: this.state.question1
            },
        ];
         if(this.state.questions.length > 0){
             this.state.questions.forEach(function(item){
                 const array = {
                     type: item.type,
                     text: item.text
                 };
                 questions.push(array);
             })
         }
        form.questions = questions;
        fetch('http://localhost:3001/surveyCreator', {
            method: 'POST',
            body: JSON.stringify(form),
            headers: {"Content-Type": "application/json"}
        })
            .then(res => res.json())
            .then(res => {
                if(res.error){
                    this.toggleModal()
                }else{
                    this.setState({redirect: true});
                }
            })
            .catch(err => err);
    };

    addQuestion = () => {
        this.setState(state => {
            const cont = this.state.cont+1;
            const questions = state.questions.concat({id: state.cont, text: "", type: "TEXT"});
            return {
                questions,
                cont
            };
        });
    };

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

    componentDidUpdate(){
        if(this.state.removingQuestion){
            this.state.questions.forEach((item) => {
                this.myRefs["question-"+item.id].value = item.text;
                this.myRefs["type-"+item.id].value = item.type;
            });
            this.setState(state => {
                const removingQuestion = false;
                return {removingQuestion}
            });
        }

    }

    toggleModal() {
        const modal = this.state.url_exists;
        this.setState({
            url_exists: !modal
        })
    }

    renderRedirect = () => {
      if(this.state.redirect) {
          return <Redirect push to='/surveys?new=true' />;
      }
    };

    render(){
        return(
            <Row>
                <Col>
                    <h1>New Survey</h1>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="title">Title</Label>
                            <Input type="text" name="title" id="title" required onChange={(e) => this.handleChange("title", e)} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="url">URL</Label>
                            <div className={"d-flex align-items-center"}>
                                <div className="input-group-prepend">
                                    <span className="input-group-text">{window.location.origin}/</span>
                                </div>
                                <Input type="text" name="url" id="url" required onChange={(e) => this.handleChange("url", e)} />
                            </div>
                        </FormGroup>
                        <Row form className={"align-items-center"}>
                            <Col md={10}>

                                <FormGroup>
                                    <Label for="question">Question 1</Label>
                                    <Input rows="3" type="textarea" name="question[]" id="question" maxLength="300" required onChange={(e) => this.handleChange("question1", e)} />
                                </FormGroup>
                            </Col>
                            <Col md={2}>
                                <FormGroup>
                                    <Label for="type">Type</Label>
                                    <Input type="select" name="type" id="type" required defaultValue={"TEXT"} onChange={(e) => this.handleChange("type1", e)}>
                                        <option value="TEXT">Text</option>
                                        <option value="LIKERT">Likert</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                        </Row>
                        {this.state.questions && this.state.questions.map((question, i) => {
                            return (<FormGroup key={i} row className={"align-items-center"}>
                                <Label xs={12} for="question">Question {i+2}</Label>
                                <Col md={8}>
                                    <textarea rows="3" className={"form-control"} type="textarea" name="question[]" maxLength="300"
                                              ref={(ref) => this.myRefs["question-"+question.id] = ref}
                                              id={"question-"+question.id}
                                              defaultValue={question.text}
                                              onChange={ (e) => this.handleChangeQuestions(question.id, e)} />
                                </Col>
                                <Col md={2}>
                                    <FormGroup>
                                        <Label for="type">Type</Label>
                                        <select className={"form-control"} type="select" name="type[]"
                                               id={"type-"+question.id}
                                               ref={(ref) => this.myRefs["type-"+question.id] = ref}
                                               defaultValue={question.type}
                                               onChange={ (e) => this.handleChangeType(question.id, e)}>
                                            <option value="TEXT">Text</option>
                                            <option value="LIKERT">Likert</option>
                                        </select>
                                    </FormGroup>
                                </Col>
                                <Col md={2}>
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
                    <Modal isOpen={this.state.url_exists} toggle={this.toggleModal} >
                        <ModalBody>URL exists!</ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.toggleModal}>OK</Button>
                        </ModalFooter>
                    </Modal>
                    {this.renderRedirect()}
                </Col>
            </Row>
        );
    }
}

export default SurveyForm;