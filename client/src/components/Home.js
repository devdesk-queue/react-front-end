import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Jumbotron, Button} from 'reactstrap';

export default class Home extends Component {
    componentDidMount() {
        if(localStorage.getItem('token')) {
            this.props.history.push('/view-tickets');
        }
    }
    render() {
        return (
            <div>
                <Jumbotron>
                    <p className="lead">Help is just a moment away</p>
                    <hr className="my-2"/>
                    <p>DevDesk Queue is a place Lambda students are always welcome to use for assistance.</p>
                    <p>Before we can get you some help, please register for an account!</p>
                    <p className="lead">
                        <Link to="/register"><Button>Register Here</Button></Link>
                    </p>
                </Jumbotron>
            </div>
        )
    }
}
