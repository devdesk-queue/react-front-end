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
                category: '', // string, required
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
            .props
            .categories
            .sort()
            .map(cat => {
                return <option key={cat.id} value={cat.id}>{cat.name}</option>
            });

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