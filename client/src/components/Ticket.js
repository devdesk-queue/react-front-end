import React, {Component} from 'react';
import {connect} from 'react-redux';
import {update} from '../actions/tickets/update';
import {Card, CardTitle, CardText, Button} from 'reactstrap';

class Ticket extends Component {
    render() {
        const {
            created_at,
            updated_at,
            description,
            status,
            student_id,
            ticket_id,
            title,
            tried
        } = this.props.ticket;

        const date = new Date(created_at);
        const dateString = `${date.getHours()}:${date.getMinutes()}`;

        return (
            <div>
                <Card inverse color="primary" className="text-center">
                    <h2 className="display-4">{status}</h2>
                    <Card body color="white" className="text-dark">
                        <CardTitle>{title}</CardTitle>
                        <CardText>{description}</CardText>
                        <CardText>{tried}</CardText>
                        <CardText>
                            <Button outline size="sm">Checkout Ticket</Button>
                        </CardText>
                        <CardText>
                            <Button outline size="sm">Close Ticket</Button>
                        </CardText>
                        <small className="text-muted">{dateString}</small>
                    </Card>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = ({tickets}) => {
    return {tickets: tickets.tickets, error: tickets.error, loading: tickets.loading}
}

export default connect(mapStateToProps, {update})(Ticket);