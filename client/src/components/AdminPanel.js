import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
    Button,
    Card,
    CardTitle,
    CardText,
    Row,
    Col,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import classnames from 'classnames';
import DefaultCard from './DefaultCard';
import {viewAllCategories} from '../actions/categories/viewAll';
import {viewAllUsers} from '../actions/users/viewAll';
import {viewAllRoles} from '../actions/roles/viewAll';
import {viewAllTickets} from '../actions/tickets/viewAll';

class AdminPanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: 'tickets',
            assignHelperToTicket: {
                user: '',
                helper: ''
            },
            changeTicketStatus: {
                ticket: '',
                status: ''
            },
            createCategory: {
                name: ''
            },
            editCategory: {
                category: '',
                name: ''
            },
            deleteCategory: {
                category: ''
            },
            deleteTicket: {
                ticket: ''
            },
            changeUserRole: {
                user: '',
                role: ''
            },
            deleteUser: {
                user: ''
            }
        };
    }

    componentDidMount() {

        //Ensure Redux store is filled with all necessary info for Admin Panel
        this
            .props
            .viewAllCategories();
        this
            .props
            .viewAllUsers();
        this
            .props
            .viewAllRoles();
        this
            .props
            .viewAllTickets();
    }
    toggle = tab => {
        if (this.state.activeTab !== tab) {
            this.setState({activeTab: tab});
        }
    }

    changeHandler = event => {

        // Name fields use a delimiter of - The value before the dash is the object in
        // state That is assigned specifically to that form The value after the dash is
        // the property in that form's object in state
        const storeKeys = event
            .target
            .name
            .split('-');

        this.setState({
            [storeKeys[0]]: {
                ...this.state[storeKeys[0]],
                [storeKeys[1]]: event.target.value
            }
        });
    }

    assignHelperToTicket = event => {
        this.props.assignHelperToTicket(this.state.assignHelperToTicket)
    }

    changeTicketStatus = event => {
        this.props.changeTicketStatus(this.state.changeTicketStatus)
    }

    deleteTicket = event => {
        this.props.deleteTicket(this.state.deleteTicket)
    }

    createCategory= event => {
        this.props.createCategory(this.state.createCategory)
    }

    editCategory = event => {
        this.props.editCategory(this.state.editCategory)
    }

    deleteCategory = event => {
        this.props.deleteCategory(this.state.deleteCategory)
    }

    changeUserRole = event => {
        this.props.changeUserRole(this.state.changeUserRole)
    }

    deleteUser = event => {
        this.props.deleteUser(this.state.deleteUser)
    }

    render() {

        const categoryOptions = this
            .props
            .categories
            .categories
            .sort()
            .map(cat => {
                return <option key={cat.id} value={cat.name}>{cat.name}</option>
            });

        const userOptions = this
            .props
            .users
            .users
            .sort()
            .map(user => {
                return <option key={user.id} value={user.id}>{user.username}</option>
            });

        const helperOptions = this
            .props
            .users
            .users
            .filter(user => user.role === 'helper' || user.role === 'admin')
            .sort()
            .map(user => {
                return <option key={user.id} value={user.id}>{user.username}</option>
            });

        const roleOptions = this
            .props
            .roles
            .roles
            .sort()
            .map(role => {
                return <option key={role.id} value={role.id}>{role.name}</option>
            });

        const statusOptions = ['enQueue', 'open', 'resolved'].map(status => {
            return <option key={status} value={status}>{status}</option>
        });

        const ticketOptions = this
            .props
            .tickets
            .tickets
            .sort()
            .map(ticket => {
                return <option key={ticket.id} value={ticket.id}>{ticket.title}</option>
            });

        return (
            <div className="text-center">
                <h1 className="display-3">Admin Panel</h1>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({
                            active: this.state.activeTab === 'tickets'
                        })}
                            onClick={() => {
                            this.toggle('tickets');
                        }}>
                            <h2 className="display-4">Tickets</h2>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({
                            active: this.state.activeTab === 'categories'
                        })}
                            onClick={() => {
                            this.toggle('categories');
                        }}>
                            <h2 className="display-4">Categories</h2>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({
                            active: this.state.activeTab === 'users'
                        })}
                            onClick={() => {
                            this.toggle('users');
                        }}>
                            <h2 className="display-4">Users</h2>
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="tickets">
                        <DefaultCard title="Assign Helper To Ticket">
                            <Form onSubmit={this.assignHelperToTicket}>
                                <FormGroup>
                                    <Label for="role">Ticket</Label>
                                    <Input
                                        type="select"
                                        name="assignHelperToTicket-ticket"
                                        value={this.state.assignHelperToTicket.ticket}
                                        onChange={this.changeHandler}>
                                        {ticketOptions}
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="role">Helper</Label>
                                    <Input
                                        type="select"
                                        name="assignHelperToTicket-helper"
                                        value={this.state.assignHelperToTicket.helper}
                                        onChange={this.changeHandler}>
                                        {helperOptions}
                                    </Input>
                                </FormGroup>
                                <Button type="submit">Assign Helper</Button>
                            </Form>
                        </DefaultCard>
                        <DefaultCard title="Change Ticket Status">
                            <Form onSubmit={this.changeTicketStatus}>
                                <FormGroup>
                                    <Label for="role">Ticket</Label>
                                    <Input
                                        type="select"
                                        name="changeTicketStatus-ticket"
                                        value={this.state.changeTicketStatus.ticket}
                                        onChange={this.changeHandler}>
                                        {ticketOptions}
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="role">New Status</Label>
                                    <Input
                                        type="select"
                                        name="changeTicketStatus-status"
                                        value={this.state.changeTicketStatus.status}
                                        onChange={this.changeHandler}>
                                        {statusOptions}
                                    </Input>
                                </FormGroup>
                                <Button type="submit">Change Status</Button>
                            </Form>
                        </DefaultCard>
                        <DefaultCard title="Delete A Ticket">
                            <Form onSubmit={this.deleteTicket}>
                                <FormGroup>
                                    <Input
                                        type="select"
                                        name="deleteTicket-ticket"
                                        value={this.state.deleteTicket.ticket}
                                        onChange={this.changeHandler}>
                                        {ticketOptions}
                                    </Input>
                                </FormGroup>
                                <Button type="submit">Delete Ticket</Button>
                            </Form>
                        </DefaultCard>
                    </TabPane>
                    <TabPane tabId="categories">
                        <DefaultCard title="Create A Category">
                            <Form onSubmit={this.createCategory}>
                                <FormGroup>
                                    <Input
                                        type="text"
                                        name="createCategory-name"
                                        placeholder="Name Of Category"
                                        value={this.state.createCategory.name}
                                        onChange={this.changeHandler}/>
                                </FormGroup>
                                <Button type="submit">Create Category</Button>
                            </Form>
                        </DefaultCard>
                        <DefaultCard title="Edit A Category">
                            <Form onSubmit={this.editCategory}>
                                <FormGroup>
                                    <Input
                                        type="select"
                                        name="editCategory-category"
                                        value={this.state.editCategory.category}
                                        onChange={this.changeHandler}>
                                        {categoryOptions}
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Input
                                        type="text"
                                        name="editCategory-name"
                                        placeholder="New Name Of Category"
                                        value={this.state.editCategory.name}
                                        onChange={this.changeHandler}/>
                                </FormGroup>
                                <Button type="submit">Edit Category</Button>
                            </Form>
                        </DefaultCard>
                        <DefaultCard title="Delete A Category">
                            <Form onSubmit={this.deleteCategory}>
                                <FormGroup>
                                    <Input
                                        type="select"
                                        name="deleteCategory-category"
                                        value={this.state.deleteCategory.category}
                                        onChange={this.changeHandler}>
                                        {categoryOptions}
                                    </Input>
                                </FormGroup>
                                <Button type="submit">Delete Category</Button>
                            </Form>
                        </DefaultCard>
                    </TabPane>
                    <TabPane tabId="users">
                        <DefaultCard title="Change User Role">
                            <Form onSubmit={this.changeUserRole}>
                                <FormGroup>
                                    <Label for="role">User</Label>
                                    <Input
                                        type="select"
                                        name="changeUserRole-user"
                                        value={this.state.changeUserRole.user}
                                        onChange={this.changeHandler}>
                                        {userOptions}
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="role">New Role</Label>
                                    <Input
                                        type="select"
                                        name="changeUserRole-role"
                                        value={this.state.changeUserRole.role}
                                        onChange={this.changeHandler}>
                                        {roleOptions}
                                    </Input>
                                </FormGroup>
                                <Button type="submit">Change Role</Button>
                            </Form>
                        </DefaultCard>
                        <DefaultCard title="Delete A User">
                            <Form onSubmit={this.deleteUser}>
                                <FormGroup>
                                    <Input
                                        type="select"
                                        name="deleteUser-user"
                                        value={this.state.deleteUser.user}
                                        onChange={this.changeHandler}>
                                        {userOptions}
                                    </Input>
                                </FormGroup>
                                <Button type="submit">Delete User</Button>
                            </Form>
                        </DefaultCard>
                    </TabPane>
                </TabContent>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return state;
}

export default connect(mapStateToProps, {viewAllCategories, viewAllUsers, viewAllRoles, viewAllTickets})(AdminPanel)