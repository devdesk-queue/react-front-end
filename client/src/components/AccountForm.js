import React, {Component} from 'react';
import {connect} from 'react-redux';
import {register} from '../actions/account/register';
import {login} from '../actions/account/login';
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
                username: '',
                password: '',
                password2: '',
                role: 'student'
            }

        } else {

            this.state = {
                username: '',
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
                .register({email: this.state.email, username: this.state.username, password: this.state.password})
            : this
                .props
                .login({username: this.state.username, password: this.state.password});
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
                        type="password"
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

        const email = this
            .props
            .match
            .path
            .includes('register')
            ? <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                        type="email"
                        name="email"
                        placeholder="your@email.com"
                        value={this.state.email}
                        onChange={this.changeHandler}/>
                </FormGroup>
            : null;

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
                            {email}
                            <FormGroup>
                                <Label for="username">Username</Label>
                                <Input
                                    type="text"
                                    name="username"
                                    placeholder="username"
                                    value={this.state.username}
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
                            <br/>
                            <span className="text-danger">{this.props.error}</span>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = ({account}) => {
    return {error: account.error, loading: account.loading}
}

export default connect(mapStateToProps, {register, login})(AccountForm);