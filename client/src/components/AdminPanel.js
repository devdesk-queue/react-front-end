import React, {Component} from 'react';
import {connect} from 'react-redux';

class AdminPanel extends Component {
    render() {
        console.log(this.props)
        return (
            <div>
                <h1>Admin Panel</h1>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return state;
}

export default connect(mapStateToProps, {})(AdminPanel)