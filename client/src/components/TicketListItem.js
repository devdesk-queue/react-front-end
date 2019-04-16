import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class TicketListItem extends Component {
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
        const dateString = `${date.getHours()}:${date.getMinutes()}`
        return (
            <React.Fragment>
                <tr>
                    <th scope="row">{dateString}</th>
                    <td>{student_id}</td>
                    <td><Link to={`/view-ticket/${ticket_id}`}>{title}</Link></td>
                    <td>{status}</td>
                </tr>
            </React.Fragment>
        )
    }
}
