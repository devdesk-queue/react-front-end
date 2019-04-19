import React, {Component} from 'react';
import {NavLink as RRNavLink} from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import {connect} from 'react-redux';

import logo from './lambda-logo.svg';

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.toggle = this
            .toggle
            .bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    logout = _ => {
        localStorage.clear();
        this
            .props
            .history
            .push('/');
    }
    render() {
        const token = localStorage.getItem('token');

        const admin = this.props.info && this.props.info.role === 'admin'
            ? (
                <React.Fragment>
                    <DropdownItem>
                        <NavLink tag={RRNavLink} exact to="/admin" activeClassName="active">Admin Panel</NavLink>
                    </DropdownItem>
                </React.Fragment>
            )
            : null;

        return (
            <React.Fragment>
                <Navbar color="light" light expand="md">
                    <NavbarBrand tag={RRNavLink} to="/">
                        <img src={logo} alt="logo"/>
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink tag={RRNavLink} exact to="/view-tickets" activeClassName="active">View Tickets</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={RRNavLink} exact to="/create-ticket" activeClassName="active">Create Ticket</NavLink>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Account
                                </DropdownToggle>
                                <DropdownMenu right>
                                    {token
                                        ? <React.Fragment>

                                                <DropdownItem>
                                                    <NavLink tag={RRNavLink} exact to="/account" activeClassName="active">Account Panel</NavLink>
                                                </DropdownItem>
                                                {admin}
                                                <DropdownItem divider/>
                                                <DropdownItem onClick={this.logout}>
                                                    Logout
                                                </DropdownItem>
                                            </React.Fragment>
                                        : <React.Fragment>
                                            <DropdownItem>
                                                <NavLink tag={RRNavLink} exact to="/register" activeClassName="active">Register</NavLink>
                                            </DropdownItem>
                                            <DropdownItem>
                                                <NavLink tag={RRNavLink} exact to="/login" activeClassName="active">Login</NavLink>
                                            </DropdownItem>
                                        </React.Fragment>
}

                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </Navbar>
            </React.Fragment>
        );
    }
}

const mapStateToProps = ({account}) => {
    return {info: account.info}
}

export default connect(mapStateToProps)(Navigation)
