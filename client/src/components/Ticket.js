import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, CardTitle, CardText, Button} from 'reactstrap';
import DefaultCard from './DefaultCard';

class Ticket extends Component {
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

        const even = this.props.even;
        const created = new Date(created_at).toLocaleString().split(',')
            .map((dt,index) => <span key={index}>{dt}<br /></span>);
        const updated = new Date(updated_at).toLocaleString().split(',')
            .map((dt,index) => <span key={index}>{dt}<br /></span>);
        const cats = categories.map(cat => <span key={cat.id}><small>{cat.name}</small><br /></span>);

        return (
            <div className={`ticket ${even ? 'even' : 'odd'}`}>
                <p className="id">{ticket_id}</p>
                <p className="title">{title}</p>
                <p className="categories">{cats}</p>
                <p className="user">{student.username}</p>
                <p className={`status ${status.toLowerCase()}`}><span>{status}</span></p>
                <small className="created">{created}</small>
                <small className="updated">{updated}</small>
            </div>
        );

        // return (
        //     <DefaultCard title={status}>
        //         <CardTitle>{title}</CardTitle>
        //         <CardText>{description}</CardText>
        //         <CardText>{tried}</CardText>
        //         <CardText>
        //             <Button size="sm">Checkout Ticket</Button>
        //         </CardText>
        //         <CardText>
        //             <Button size="sm">Close Ticket</Button>
        //         </CardText>
        //         <small className="text-muted">{dateString}</small>
        //     </DefaultCard>
        // )
    }
}

const mapStateToProps = ({tickets}) => {
    return {tickets: tickets.tickets, error: tickets.error, loading: tickets.loading}
}

export default connect(mapStateToProps)(Ticket);
