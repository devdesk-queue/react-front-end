import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {viewAllTickets} from '../actions/tickets/viewAll';
import {Container, Row, Col, ButtonGroup, Button} from 'reactstrap';
import Ticket from './Ticket';
import Loading from './Loading';

class TicketList extends Component {

    state = {
        sort: 'id',
        statusFilter: ticket => ticket,
        userFilter: ticket => ticket
    }

    componentDidMount = () => {
        this
            .props
            .viewAllTickets();
    }

    statusFilterHandler = event => {
        const eventName = event.target.name;
        const all = ticket => ticket;
        const filtered = ticket => ticket.status === eventName;

        event.target.name === 'all'
            ? this.setState({statusFilter: all})
            : this.setState({statusFilter: filtered});
    }

    userFilterHandler = event => {
        const eventName = event.target.name;
        const all = ticket => ticket;
        const filtered = ticket => ticket[eventName] === this.props.accountInfo.id;

        event.target.name === 'all'
            ? this.setState({statusFilter: all})
            : this.setState({statusFilter: filtered});
    }

    render() {

        if (this.props.tickets.length === 0) {
            return <Loading/>
        } else {

            this
                .props
                .tickets
                .sort((a, b) => a.id - b.id);

            const TicketWithRouter = withRouter(Ticket);

            const tickets = this
                .props
                .tickets
                .filter(this.state.statusFilter)
                .filter(this.state.userFilter)
                .map((ticket, i) => <TicketWithRouter key={ticket.id} ticket={ticket} even={i % 2 === 0}/>);

            return (
                <Container>
                    <Row>
                        <Col>
                            <h2 className="ticket-title display-4">Ticket Details</h2>
                            <Row className="text-center">
                                <Col sm="12" md="6">
                                    <span className="lead">Status Filters</span><br/>
                                    <ButtonGroup size="sm" className="mb-1" onClick={this.statusFilterHandler}>
                                        <Button name="all" color="warning" className="text-white">All</Button>
                                        <Button name="pending" color="warning" className="text-white">Pending</Button>
                                        <Button name="helping" color="warning" className="text-white">Helping</Button>
                                        <Button name="resolved" color="warning" className="text-white">Resolved</Button>
                                    </ButtonGroup>
                                </Col>
                                <Col sm="12" md="6">
                                    <span className="lead">User Filters</span>
                                    <br/>
                                    <ButtonGroup size="sm" className="mb-1" onClick={this.userFilterHandler}>
                                        <Button name="all" color="warning" className="text-white">All</Button>
                                        <Button name="student_id" color="warning" className="text-white">My Tickets</Button>
                                        <Button name="helper_id" color="warning" className="text-white">Tickets I'm Helping</Button>
                                    </ButtonGroup>
                                </Col>
                            </Row>

                            <div className="ticket-header" onClick={this.sortHandler}>
                                <p className="id">ID</p>
                                <p className="title">Title</p>
                                <p className="categories">Categories</p>
                                <p className="user">User</p>
                                <p className="status">Status</p>
                                <p className="created">Created</p>
                                <p className="updated">Updated</p>
                            </div>
                            {tickets}
                        </Col>
                    </Row>
                </Container>
            )
        }
    }
}

const mapStateToProps = ({tickets, account}) => {
    return {tickets: tickets.tickets, error: tickets.error, loading: tickets.loading, accountInfo: account.info}
}

export default connect(mapStateToProps, {viewAllTickets})(TicketList);
