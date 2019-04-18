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
            activeTab: 'tickets'
        };
    }

    componentDidMount() {
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
                            <Form onSubmit={this.assignHelper}>
                                <FormGroup>
                                    <Label for="role">Ticket</Label>
                                    <Input
                                        type="select"
                                        name="ticket"
                                        value={this.state.ticket}
                                        onChange={this.changeHandler}>
                                        {ticketOptions}
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="role">Helper</Label>
                                    <Input
                                        type="select"
                                        name="helper"
                                        value={this.state.helper}
                                        onChange={this.changeHandler}>
                                        {userOptions}
                                    </Input>
                                </FormGroup>
                                <Button type="submit">Assign Helper</Button>
                            </Form>
                        </DefaultCard>
                        <DefaultCard title="Change Ticket Status">
                            <Form onSubmit={this.changeStatus}>
                                <FormGroup>
                                    <Label for="role">Ticket</Label>
                                    <Input
                                        type="select"
                                        name="ticket"
                                        value={this.state.ticket}
                                        onChange={this.changeHandler}>
                                        {ticketOptions}
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="role">New Status</Label>
                                    <Input
                                        type="select"
                                        name="status"
                                        value={this.state.status}
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
                                        name="deleteTicket"
                                        value={this.state.deleteTicket}
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
                                        name="categoryCreate"
                                        placeholder="Name Of Category"
                                        value={this.state.categoryCreate}
                                        onChange={this.changeHandler}/>
                                </FormGroup>
                                <Button type="submit">Create Category</Button>
                            </Form>
                        </DefaultCard>
                        <DefaultCard title="Edit A Category">
                            <Form onSubmit={this.createCategory}>
                                <FormGroup>
                                    <Input
                                        type="select"
                                        name="category"
                                        value={this.state.category}
                                        onChange={this.changeHandler}>
                                        {categoryOptions}
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Input
                                        type="text"
                                        name="categoryEdit"
                                        placeholder="New Name Of Category"
                                        value={this.state.categoryEdit}
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
                                        name="deleteCategory"
                                        value={this.state.deleteCategory}
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
                            <Form onSubmit={this.changeRole}>
                                <FormGroup>
                                    <Label for="role">User</Label>
                                    <Input
                                        type="select"
                                        name="user"
                                        value={this.state.user}
                                        onChange={this.changeHandler}>
                                        {userOptions}
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="role">New Role</Label>
                                    <Input
                                        type="select"
                                        name="role"
                                        value={this.state.role}
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
                                        name="deleteUser"
                                        value={this.state.deleteUser}
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