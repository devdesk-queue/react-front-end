import React, {Component} from 'react';
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

        const tickets = this.props.tickets.map(ticket => <Ticket key={ticket.id} ticket={ticket}/>);

        return (
            <Container>
                <Row>
                    <Col>
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