import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {viewAllTickets} from '../actions/tickets/viewAll';
import {Container, Row, Col} from 'reactstrap';
import Ticket from './Ticket';

class TicketList extends Component {

    componentDidMount = () => {
        this
            .props
            .viewAllTickets();
    }

    changeHandler = event => {
        //Handles every input field change- Updates state
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    submitHandler = event => {
        event.preventDefault();
        this
            .props
            .create(this.state);
    }

    render() {

        // const tickets = [     {         "ticket_id": 1,         "status": "resolved",
        //         "title": "problem1",         "description": "big problem",
        // "tried": "cry",         "student_id": 2,         "admin_id": 1,
        // "created_at": "2019-04-15 07:16:35",         "updated_at": "2019-04-15
        // 07:16:35",         "categories": ["Administration", "ISA"]     } ]

        this.props.tickets.sort((a, b) => a.id - b.id);

        const TicketWithRouter = withRouter(Ticket);

        const tickets = this.props.tickets.map((ticket, i) => <TicketWithRouter key={ticket.id} ticket={ticket} even={i % 2 === 0}/>);

        return (
            <Container>
                <Row>
                    <Col>
                        <h2 className="ticket-title display-4">Ticket Details</h2>
                        <div className="ticket-header">
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

const mapStateToProps = ({tickets}) => {
    return {tickets: tickets.tickets, error: tickets.error, loading: tickets.loading}
}

export default connect(mapStateToProps, {viewAllTickets})(TicketList);
