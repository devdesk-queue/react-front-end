import React, {Component} from 'react';

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
                    <td>{title}</td>
                    <td>{status}</td>
                </tr>
            </React.Fragment>
        )
    }
}
