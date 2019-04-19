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
                category: [], // array, required
            }
        }
    }

    componentDidMount() {
        this
            .props
            .viewAllCategories();
    }

    changeHandler = event => {
        //Handles every input field change- Updates state
        if (event.target.name === 'category') {
            const category = Array.from(event.target.options)
                .filter(option => option.selected)
                .map(option => option.value);

            this.setState(state => ({
                newTicket: { ...state.newTicket, category }
            }));
        } else {
            const target = event.target;
            this.setState(state => ({
                newTicket: {
                    ...state.newTicket,
                    [target.name]: target.value
                }
            }));
        }
    }

    submitHandler = event => {
        event.preventDefault();
        this
            .props
            .create(this.state.newTicket)
            .then(response=>response ? this.props.history.push('/') : null);
    }

    render() {

        const options = this
            .props
            .categories
            .sort()
            .map(cat => {
                return <option key={cat.id} value={cat.name}>{cat.name}</option>
            });

        const { newTicket } = this.state;

        return (
            <Container className="ticket-form">
                <h2 className="ticket-form-title">Create a Ticket</h2>
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
                                    value={newTicket.title}
                                    onChange={this.changeHandler}
                                    required/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="description">Description</Label>
                                <Input
                                    type="textarea"
                                    name="description"
                                    placeholder="Description"
                                    className="ticket-textarea"
                                    value={newTicket.description}
                                    onChange={this.changeHandler}
                                    required/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="tried">Tried</Label>
                                <Input
                                    type="textarea"
                                    name="tried"
                                    placeholder="I already tried.."
                                    className="ticket-textarea"
                                    value={newTicket.tried}
                                    onChange={this.changeHandler}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="category">Category</Label>
                                <Input
                                    type="select"
                                    name="category"
                                    onChange={this.changeHandler}
                                    multiple
                                    required>
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
