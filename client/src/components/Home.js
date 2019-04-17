import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Jumbotron, Button} from 'reactstrap';

export default class Home extends Component {
    render() {
        return (
            <div>
                <Jumbotron>
                    <h1 className="display-3">DevDesk Queue</h1>
                    <p className="lead">Help is just a moment away!</p>
                    <hr className="my-2"/>
                    <p>DevDesk Queue is the place Lambda students can go to for assistance.Before we can get you some help, please register for an account!</p>
                    <p className="lead">
                        <Link to="/register"><Button>Register Here</Button></Link>
                    </p>
                </Jumbotron>
            </div>
        )
    }
}
