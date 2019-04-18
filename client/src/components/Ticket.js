import React, {Component} from 'react';
import {connect} from 'react-redux';
import {update} from '../actions/tickets/update';
import {Card, CardTitle, CardText, Button} from 'reactstrap';
import DefaultCard from './DefaultCard';

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
            <DefaultCard title={status}>
                <CardTitle>{title}</CardTitle>
                <CardText>{description}</CardText>
                <CardText>{tried}</CardText>
                <CardText>
                    <Button size="sm">Checkout Ticket</Button>
                </CardText>
                <CardText>
                    <Button size="sm">Close Ticket</Button>
                </CardText>
                <small className="text-muted">{dateString}</small>
            </DefaultCard>
        )
    }
}

const mapStateToProps = ({tickets}) => {
    return {tickets: tickets.tickets, error: tickets.error, loading: tickets.loading}
}

export default connect(mapStateToProps, {})(Ticket);