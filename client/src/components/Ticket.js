import React, {Component} from 'react';
import {connect} from 'react-redux';
import {update} from '../actions/tickets/update';

class Ticket extends Component {
    state = {
        ticket: {}
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.tickets.tickets >= 1) {
            this.setState({
                ticket: this
                    .props
                    .tickets
                    .tickets
                    .find(t => t.ticket_id === this.props.match.params.id)
            });
        }
    }

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
        } = this.state.ticket;

        return (
            <div>
                <h1>{title}</h1>
                <span>{created_at}</span>
                <br/>
                <span>{updated_at}</span>
                <br/>
                <span>{description}</span>
                <br/>
                <span>{status}</span>
                <br/>
                <span>{student_id}</span>
                <br/>
                <span>{ticket_id}</span>
                <br/>
                <span>{tried}</span>
                <br/>
            </div>
        )
    }
}

const mapStateToProps = ({tickets}) => {
    return {tickets: tickets.tickets, error: tickets.error, loading: tickets.loading}
}

export default connect(mapStateToProps, {update})(Ticket);