import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
    Button,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import classnames from 'classnames';
import DefaultCard from './DefaultCard';

//Retrieve necessary data from API
import {viewAllCategories} from '../actions/categories/viewAll';
import {viewAllUsers} from '../actions/users/viewAll';
import {viewAllRoles} from '../actions/roles/viewAll';
import {viewAllTickets} from '../actions/tickets/viewAll';

//Actions to edit/delete stuff via the API
import {updateTicket} from '../actions/tickets/update';
import {updateUser} from '../actions/users/update'; //Unproccesable entry error - current password needed
import {deleteUser} from '../actions/users/delete'; //If user has tickets then internal server error
import {createCategory} from '../actions/categories/create';
import {updateCategory} from '../actions/categories/update'; //Unproccesable entry error
import {deleteCategory} from '../actions/categories/delete';

class AdminPanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: 'tickets',
            assignHelperToTicket: {
                ticket: '',
                helper: ''
            },
            changeTicketStatus: {
                ticket: '',
                status: ''
            },
            deleteTicket: {
                ticket: ''
            },
            createCategory: {
                name: ''
            },
            updateCategory: {
                id: '',
                name: ''
            },
            deleteCategory: {
                id: ''
            },
            changeUserRole: {
                id: '',
                role: 'student'
            },
            deleteUser: {
                id: ''
            }
        };
    }

    componentDidMount() {

        // Ensure Redux store is filled with all necessary API data for Admin Panel Set
        // default dropdown menu values after applicable response is received

        this
            .props
            .viewAllCategories()
            .then(response => {
                //Set default options for category dropdown menus
                this.setState({
                    updateCategory: {
                        ...this.state.updateCategory,
                        id: response[0].id
                    },
                    deleteCategory: {
                        id: response[0].id
                    }
                })
            });

        this
            .props
            .viewAllUsers()
            .then(response => {
                //Set default options for user dropdown menus
                this.setState({
                    assignHelperToTicket: {
                        ...this.state.updateCategory,
                        ticket: response
                            .find(user => user.role === 'helper' || user.role === 'admin')
                            .id
                    },
                    changeUserRole: {
                        ...this.state.changeUserRole,
                        id: response[0].id
                    },
                    deleteUser: {
                        id: response[0].id
                    }
                });
            });

        this
            .props
            .viewAllRoles()
            .then(response => {
                //Set default options for role dropdown menus
                this.setState({
                    changeUserRole: {
                        ...this.state.changeUserRole,
                        role: response[0].name
                    }
                });
            });

        this
            .props
            .viewAllTickets()
            .then(response => {
                //Set default options for ticket dropdown menus
                this.setState({
                    assignHelperToTicket: {
                        ...this.state.assignHelperToTicket,
                        ticket: response[0].id
                    },
                    changeTicketStatus: {
                        ...this.state.changeTicketStatus,
                        ticket: response[0].id
                    },
                    deleteTicket: {
                        ticket: response[0].id
                    }
                });
            });
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
        event.preventDefault();
        this
            .props
            .updateTicket({
                id: this.state.assignHelperToTicket.ticket,
                payload: {
                    helper_id: this.state.assignHelperToTicket.helper,
                    status: 'helping' //If ticket is being assigned to someone, then its status should probably always updated to open
                }
            });
    }

    changeTicketStatus = event => {
        event.preventDefault();

        //See if the ticket already has a helper assigned
        const applicableTicket = this
            .props
            .tickets
            .tickets
            .find(ticket => {
                return ticket
                    .id
                    .toString() === this.state.changeTicketStatus.ticket
            });

        //Default payload
        const payload = {
            status: this.state.changeTicketStatus.status
        }

        //If a helper is already assigned then add the helper_id to the payload
        if (applicableTicket.helper_id !== undefined && applicableTicket.helper_id !== null) {
            payload.helper_id = applicableTicket.helper_id
        }

        // Else the user submitting the request will be assigned as the helper as per
        // API defaults
        this
            .props
            .updateTicket({id: this.state.changeTicketStatus.ticket, payload})
    }

    deleteTicket = event => {
        event.preventDefault();
        this
            .props
            .deleteTicket(this.state.deleteTicket);
    }

    createCategory = event => {
        event.preventDefault();
        this
            .props
            .createCategory(this.state.createCategory);
    }

    updateCategory = event => {
        event.preventDefault();
        this
            .props
            .updateCategory(this.state.updateCategory);
    }

    deleteCategory = event => {
        event.preventDefault();
        this
            .props
            .deleteCategory(this.state.deleteCategory.id);
    }

    changeUserRole = event => {
        event.preventDefault();
        this
            .props
            .updateUser({
                id: this.state.changeUserRole.id,
                payload: {
                    role: this.state.changeUserRole.role
                }
            });
    }

    deleteUser = event => {
        event.preventDefault();
        this
            .props
            .deleteUser(this.state.deleteUser.id);
    }

    render() {

        const categoryOptions = this
            .props
            .categories
            .categories
            .sort()
            .map(cat => {
                return <option key={cat.id} value={cat.id}>{cat.name}</option>
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
                return <option key={role.id} value={role.name}>{role.name}</option>
            });

        const statusOptions = ['pending', 'helping', 'resolved'].map(status => {
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
                            <Form onSubmit={this.updateCategory}>
                                <FormGroup>
                                    <Input
                                        type="select"
                                        name="updateCategory-id"
                                        value={this.state.updateCategory.id}
                                        onChange={this.changeHandler}>
                                        {categoryOptions}
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Input
                                        type="text"
                                        name="updateCategory-name"
                                        placeholder="New Name Of Category"
                                        value={this.state.updateCategory.name}
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
                                        name="deleteCategory-id"
                                        value={this.state.deleteCategory.id}
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
                                        name="changeUserRole-id"
                                        value={this.state.changeUserRole.id}
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
                                        name="deleteUser-id"
                                        value={this.state.deleteUser.id}
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

const actionsUsed = {
    updateTicket,
    viewAllCategories,
    viewAllUsers,
    viewAllRoles,
    viewAllTickets,
    updateUser,
    deleteUser,
    createCategory,
    updateCategory,
    deleteCategory
}

export default connect(mapStateToProps, actionsUsed)(AdminPanel)