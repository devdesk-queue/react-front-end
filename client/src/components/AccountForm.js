import React, {Component} from 'react';
import {connect} from 'react-redux';
import {register} from '../actions/register';
import {login} from '../actions/login';
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

class AccountForm extends Component {
    constructor(props) {
        super(props);

        // This Component is used for both login and registration- Here we test which
        // route the app is on to discern which fields are necessary in state.
        if (props.match.path.includes('register')) {

            this.state = {
                email: '',
                password: '',
                password2: '',
                role: 'student'
            }

        } else {

            this.state = {
                email: '',
                password: ''
            }
        }

    }

    changeHandler = event => {
        //Handles every input field change- Updates state
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    submitHandler = event => {
        // Test if on the registration or login route- Then call the appropriate Redux
        // action
        event.preventDefault();
        this
            .props
            .match
            .path
            .includes('register')
            ? this
                .props
                .register(this.state)
            : this
                .props
                .login(this.state);
    }

    render() {

        //JSX assigned to variables to switch between login and register forms
        const confirmPassword = this
            .props
            .match
            .path
            .includes('register')
            ? (
                <FormGroup>
                    <Label for="password2">Confirm Password</Label>
                    <Input
                        type="password2"
                        name="password2"
                        placeholder="password123"
                        value={this.state.password2}
                        onChange={this.changeHandler}/>
                </FormGroup>
            )
            : null;

        const role = this
            .props
            .match
            .path
            .includes('register')
            ? (
                <FormGroup>
                    <Label for="role">Role</Label>
                    <Input
                        type="select"
                        name="role"
                        id="role"
                        value={this.state.role}
                        onChange={this.changeHandler}>
                        <option value="student">Student</option>
                        <option value="helper">Helper</option>
                    </Input>
                </FormGroup>
            )
            : null;

        const buttonText = this
            .props
            .match
            .path
            .includes('register')
            ? 'Register'
            : 'Login';

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
                                <Label for="email">Email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    placeholder="your@email.com"
                                    value={this.state.email}
                                    onChange={this.changeHandler}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    placeholder="password123"
                                    value={this.state.password}
                                    onChange={this.changeHandler}/>
                            </FormGroup>
                            {confirmPassword}
                            {role}
                            <Button type="submit">
                                {buttonText}
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {error: state.error, loading: state.loading}
}

export default connect(mapStateToProps, {register, login})(AccountForm);