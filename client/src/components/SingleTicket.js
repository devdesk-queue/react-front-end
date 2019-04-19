import React, {Component} from 'react';
import {Card, CardTitle, CardText, Button} from 'reactstrap';
import DefaultCard from './DefaultCard';

export default class SingleTicket extends Component {
    render() {
        const {
            created_at,
            updated_at,
            status,
            id: ticket_id,
            title,
            categories,
            student
        } = this.props.ticket;
        return (
            <div>
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
            </div>
        )
    }
}
