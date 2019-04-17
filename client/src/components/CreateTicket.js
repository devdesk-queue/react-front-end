import React, {Component} from 'react';
import {connect} from 'react-redux';
import {create} from '../actions/tickets/create';
import {viewAllCategories} from '../actions/categories/viewAll';
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

        this.state = {
            newTicket: {
                title: '', // string, max 256 chars, required
                description: '', // string, required
                tried: '', // string, optional
                category: 'Async Redux - Redux Thunk', // string, required
            },
            categories: []
        }
    }

    componentDidMount() {
        this.props.viewAllCategories();
        let validCategories = this.props.categories;
        if (validCategories.length === 0) {
            validCategories = [
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
        } else {
            validCategories = this
                .props
                .viewAllCategories()
        }
        this.setState({categories: validCategories});
    }

    changeHandler = event => {
        //Handles every input field change- Updates state
        this.setState({
            newTicket: {
                ...this.state.newTicket,
                [event.target.name]: event.target.value
            }
        });
    }

    submitHandler = event => {
        event.preventDefault();
        this
            .props
            .create(this.state.newTicket);
    }

    render() {

        const options = this
            .state
            .categories
            .sort()
            .map(cat => <option key={cat} value={cat}>{cat}</option>);

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

                            <Button block type="submit">
                                Create Ticket
                            </Button>
                            <span className="text-danger">{this.props.error}</span>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = ({tickets, categories}) => {
    return {error: tickets.error, loading: tickets.loading, categories: categories.categories}
}

export default connect(mapStateToProps, {create, viewAllCategories})(CreateTicket);