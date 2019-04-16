import React, {Component} from 'react';
import {connect} from 'react-redux';
import {viewAll} from '../actions/tickets/viewAll';
import {Container, Row, Col, Table} from 'reactstrap';
import TicketListItem from './TicketListItem';

class TicketList extends Component {

    componentDidMount = () => {
        this
            .props
            .viewAll();
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

        // this   .props   .tickets   .tickets && this       .props       .tickets
        // .tickets

        const tickets = [
            {
                "ticket_id": 1,
                "status": "resolved",
                "title": "problem1",
                "description": "big problem",
                "tried": "cry",
                "student_id": 2,
                "admin_id": 1,
                "created_at": "2019-04-15 07:16:35",
                "updated_at": "2019-04-15 07:16:35",
                "categories": ["Administration", "ISA"]
            }
        ].map(ticket => <TicketListItem key={ticket.ticket_id} ticket={ticket}/>);

        return (
            <Container>
                <Row>
                    <Col>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Created At</th>
                                    <th>Student</th>
                                    <th>Title</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tickets}
                            </tbody>
                        </Table>
                        
                    </Col>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = ({tickets}) => {
    return {tickets: tickets.tickets, error: tickets.error, loading: tickets.loading}
}

export default connect(mapStateToProps, {viewAll})(TicketList);