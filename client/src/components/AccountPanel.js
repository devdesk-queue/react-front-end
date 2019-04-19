import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateUser} from '../actions/users/update';
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

class AccountPanel extends Component {
    constructor(props) {
        super(props);

        //If accountInfo has already been retrieved from the API
        if (props.accountInfo.role !== undefined) {
            this.state = {
                username: props.accountInfo.username,
                email: props.accountInfo.email,
                newPassword: '',
                newPassword2: '',
                currentPassword: ''
            }
        } else {
            this.state = {
                username: '',
                email: '',
                newPassword: '',
                newPassword2: '',
                currentPassword: ''
            }
        }
    }

    componentWillReceiveProps = nextProps => {
        // If the user navigates to this route without accessing another route first,
        // then the redux store might not have retrieve the user info yet, so here when
        // the account info is retrieved from API and the store mapped props update we
        // update the username and email field.
        if (nextProps.accountInfo && nextProps.accountInfo.role !== undefined && this.state.username === '')
            this.setState({username: nextProps.accountInfo.username, email: nextProps.accountInfo.email});
        }

    changeHandler = event => {
        //Handles every input field change- Updates state
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    submitHandler = event => {
        event.preventDefault();
        const payload = {};

        if (this.state.newPassword !== '' && this.state.newPassword === this.state.newPassword2) {
            payload.newPassword = this.state.newPassword;
        }

        if (this.state.username !== this.props.accountInfo.username) {
            payload.username = this.state.username;
        }

        if (this.state.email !== this.props.accountInfo.email) {
            payload.email = this.state.email;
        }

        payload.currentPassword = this.state.currentPassword;

        this
            .props
            .updateUser({id: this.props.accountInfo.id, payload});
    }

    render() {

        return (
            <Container>
                <Row>
                    <Col
                        sm="12"
                        md={{
                        size: 6,
                        offset: 3
                    }}>
                        <h1 className="display-4">Account Panel</h1>
                        Update your account information below. The new password fields are <b>optional</b>, but
                        you must enter your current password to make any changes.
                        <Form onSubmit={this.submitHandler} className="account-form">
                            <FormGroup>
                                <Label for="title">Username</Label>
                                <Input
                                    type="text"
                                    name="username"
                                    placeholder="username"
                                    value={this.state.username}
                                    onChange={this.changeHandler}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="description">Email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={this.state.email}
                                    onChange={this.changeHandler}/>
                            </FormGroup>

                            <FormGroup>
                                <Label for="tried">New Password</Label>
                                <Input
                                    type="password"
                                    name="newPassword"
                                    placeholder="New Password"
                                    value={this.state.newPassword}
                                    onChange={this.changeHandler}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="tried">Repeat New Password</Label>
                                <Input
                                    type="password"
                                    name="newPassword2"
                                    placeholder="New Password"
                                    value={this.state.newPassword2}
                                    onChange={this.changeHandler}/>
                            </FormGroup>

                            <FormGroup>
                                <Label for="tried">Current Password</Label>
                                <Input
                                    type="password"
                                    name="currentPassword"
                                    placeholder="Current Password"
                                    value={this.state.currentPassword}
                                    onChange={this.changeHandler}/>
                            </FormGroup>

                            <Button block type="submit">
                                Update User
                            </Button>
                            <span className="text-danger">{this.props.error}</span>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = ({account}) => {
    return {accountInfo: account.info}
}

export default connect(mapStateToProps, {updateUser})(AccountPanel);
