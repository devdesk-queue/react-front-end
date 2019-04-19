import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button} from 'reactstrap';

import DefaultCard from './DefaultCard';
import {viewOneTicket} from '../actions/tickets/viewOne';
import {updateTicket} from '../actions/tickets/update';

class SingleTicket extends Component {
    componentDidMount() {
        this
            .props
            .viewOneTicket(this.props.match.params.id);
    }
    checkOutTicket = event => {
        event.preventDefault();

        // Update the ticket in the database The current user will be automatically
        // assigned to the ticket
        this
            .props
            .updateTicket({
                id: this.props.ticket.id,
                payload: {
                    status: 'helping'
                }
            });
    }
    resolveTicket = event => {
        event.preventDefault();

        //See if the ticket already has a helper assigned
        const applicableTicket = this.props.ticket;

        //Default payload
        const payload = {
            status: 'resolved'
        }

        // If a helper is already assigned then add the helper_id to the payload Else
        // the user submitting the request will be assigned as the helper as per API
        // defaults
        if (applicableTicket.helper_id !== undefined && applicableTicket.helper_id !== null) {
            payload.helper_id = applicableTicket.helper_id
        }

        //Update the ticket in the database
        this
            .props
            .updateTicket({id: applicableTicket.id, payload});
    }
    render() {

        if (this.props.ticket.status !== undefined && this.props.currentUser.role !== undefined) {

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

            const categoryDivs = categories.map(cat => {
                return (
                    <div key={cat.id}>
                        {cat.name}
                    </div>
                )
            });

            const created = new Date(created_at)
                .toLocaleString()
                .split(',')
                .map((dt, index) => <span key={index}>{dt}</span>);

            const updated = new Date(updated_at)
                .toLocaleString()
                .split(',')
                .map((dt, index) => <span key={index}>{dt}</span>);

            const checkoutTicketButton = this.props.currentUser.role === 'admin' || this.props.currentUser.role === 'helper'
                ? <Button onClick={this.checkOutTicket} className="m-1">Check Out Ticket</Button>
                : null;

            const closeTicketButton = this.props.currentUser.role === 'admin' || this.props.currentUser.role === 'helper' || this.props.currentUser.id === student.id
                ? <Button onClick={this.resolveTicket} className="m-1">Close Ticket</Button>
                : null;

            return (
                <div>
                    <DefaultCard title={status}>
                        <div className="single-ticket">
                            <div className="group">
                                <h4 className="display-4 subtitle">categories</h4>
                                {categoryDivs}
                            </div>
                            
                            <div className="group">
                                <h4 className="display-4 subtitle">problem</h4>
                                {title}
                            </div>

                            <div className="group">
                                <h4 className="display-4 subtitle">description</h4>
                                {description}
                            </div>

                            <div className="group">
                                <h4 className="display-4 subtitle">tried</h4>
                                {tried}
                            </div>
                        </div>

                        <div className="mt-5">
                            {checkoutTicketButton}
                            {closeTicketButton}
                        </div>
                        <small className="text-muted">{`Created by ${student.username} at `}{created}</small>
                        {this.props.ticket.helper && <small className="text-muted">{`Helped by ${this.props.ticket.helper.username} on or before `}{updated}</small>}
                        {this.props.ticket.status === 'resolved' && <small className="text-muted">{`Resolved on or before`}{updated}</small>}
                    </DefaultCard>
                </div>
            )
        } else 
            return <div></div>
    }
}

const mapStateToProps = ({tickets, account}) => {
    return {ticket: tickets.ticket, error: tickets.error, loading: tickets.loading, currentUser: account.info}
}

export default connect(mapStateToProps, {viewOneTicket, updateTicket})(SingleTicket);