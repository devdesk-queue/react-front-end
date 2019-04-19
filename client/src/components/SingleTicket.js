import React, {Component} from 'react';
import {connect} from 'react-redux';
import {CardTitle, CardText, Button} from 'reactstrap';
import DefaultCard from './DefaultCard';
import {viewOneTicket} from '../actions/tickets/viewOne';

class SingleTicket extends Component {
    componentDidMount() {
        this
            .props
            .viewOneTicket(this.props.match.params.id);
    }
    render() {
        const {
            created_at,
            updated_at,
            status,
            description,
            tried,
            title,
            categories,
            student
        } = this.props.ticket;

        if (this.props.ticket.status !== undefined) 
            return (
                <div>
                    <DefaultCard title={status}>
                        <h4 className="display-4">categories</h4>
                        {categories.map(cat=><div key={cat.id}>{cat.name}</div>)}
                        <h4 className="display-4">problem</h4>
                        {title}
                        <h4 className="display-4">description</h4>
                        {description}
                        <h4 className="display-4">tried</h4>
                        {tried}

                        <Button className="m-1 mt-5">Checkout Ticket</Button>
                        <Button className="m-1">Close Ticket</Button>
                        <small className="text-muted">Created by {student.username} at {created_at}</small>
                        {this.props.ticket.helper && <small className="text-muted">Helped by {this.props.ticket.helper.username} on or before {updated_at}</small>}
                        {this.props.ticket.status === 'resolved' && <small className="text-muted">Resolved on or before {updated_at}</small>}
                    </DefaultCard>
                </div>
            )
        else 
            return <div></div>
    }
}

const mapStateToProps = ({tickets}) => {
    return {ticket: tickets.ticket, error: tickets.error, loading: tickets.loading}
}

export default connect(mapStateToProps, {viewOneTicket})(SingleTicket);