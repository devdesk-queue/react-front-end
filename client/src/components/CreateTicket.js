import React, {Component} from 'react';
import {connect} from 'react-redux';
import {create} from '../actions/tickets/create';
import {
    Container,
    Row,
    Col,
    Button,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';

class CreateTicket extends Component {
    constructor(props) {
        super(props);

        //Todo: pull student_id from API once auth endpoint is available

        this.state = {
            title: '', // string, max 256 chars, required
            description: '', // string, required
            tried: '', // string, optional
            category: 'Async Redux - Redux Thunk', // string, required
            student_id: 1, // integer, required
        }
    }

    changeHandler = event => {
        //Handles every input field change- Updates state
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    submitHandler = event => {
        event.preventDefault();
        this
            .props
            .create(this.state);
    }

    render() {

        const validCategories = [
            'User Interface I',
            'User Interface II',
            'User Interface III',
            'Git for Web Development',
            'Responsive Design I',
            'Responsive Design II',
            'Preprocessing I',
            'Preprocessing II',
            'JavaScript I',
            'JavaScript II',
            'JavaScript III',
            'JavaScript IV',
            'DOM I',
            'DOM II',
            'Components I',
            'Components II',
            'Build Week: User Interface',
            'Functional Components I',
            'Functional Components II',
            'Class Components I',
            'Class Components II',
            'React Tooling',
            'The React Lifecycle',
            'React Composition Patterns',
            'CSS in JS',
            'React Router I',
            'React Router II',
            'HTTP / AJAX I',
            'HTTP / AJAX II',
            'Redux Fundamentals I',
            'Redux Fundamentals II',
            'Async Redux - Redux Thunk',
            'Redux Middleware / Authentication',
            'Build Week: Front End',
            'Introduction to Node.js and Express',
            'Server-side Routing',
            'Express Middleware',
            'Deployment and Best Practices',
            'Introduction to Relational Databases and SQL',
            'Inserting and Modifying Data',
            'Querying Data',
            'Migrations and Seeding',
            'Introduction to Data Modeling',
            'Introduction to Authentication',
            'Using Sessions and Cookies',
            'Using JSON Web Tokens (JWT)',
            'Client Side Authentication',
            'Testing I',
            'Testing II',
            'Testing III',
            'Testing IV',
            'Build Week: Back End'
        ];

        const options = validCategories.sort().map(cat => <option key={cat} value={cat}>{cat}</option>);

        return (
            <Container>
                <Row>
                    <Col
                        sm="12"
                        md={{
                        size: 6,
                        offset: 3
                    }}>
                        <Form onSubmit={this.submitHandler}>
                            <FormGroup>
                                <Label for="title">Title</Label>
                                <Input
                                    type="text"
                                    name="title"
                                    placeholder="Title"
                                    maxLength="256"
                                    value={this.state.title}
                                    onChange={this.changeHandler}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="description">Description</Label>
                                <Input
                                    type="textarea"
                                    name="description"
                                    placeholder="Description"
                                    value={this.state.description}
                                    onChange={this.changeHandler}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="tried">Tried</Label>
                                <Input
                                    type="text"
                                    name="tried"
                                    placeholder="I already tried.."
                                    value={this.state.tried}
                                    onChange={this.changeHandler}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="category">Category</Label>
                                <Input
                                    type="select"
                                    name="category"
                                    value={this.state.category}
                                    onChange={this.changeHandler}>
                                    {options}
                                </Input>
                            </FormGroup>

                            <Button type="submit">
                                Create Ticket
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = ({tickets}) => {
    return {error: tickets.error, loading: tickets.loading}
}

export default connect(mapStateToProps, {create})(CreateTicket);