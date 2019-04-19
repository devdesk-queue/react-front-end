import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {viewAllTickets} from '../actions/tickets/viewAll';
import {Container, Row, Col} from 'reactstrap';
import Ticket from './Ticket';
import Loading from './Loading';

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
                .map((ticket, i) => <TicketWithRouter key={ticket.id} ticket={ticket} even={i % 2 === 0}/>);

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
}

const mapStateToProps = ({tickets}) => {
    return {tickets: tickets.tickets, error: tickets.error, loading: tickets.loading}
}

export default connect(mapStateToProps, {viewAllTickets})(TicketList);
