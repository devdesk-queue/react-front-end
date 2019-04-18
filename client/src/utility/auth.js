import React from 'react';
import axios from 'axios';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

export const axiosWithAuth = () => {
    const token = localStorage.getItem('token');

    return axios.create({
        headers: {
            'Content-Type': 'application/json',
            Authorization: token
        }
    });
}

const PrivateRouteComponent = ({
    component: Component,
    error,
    ...rest
}) => <Route
    {...rest}
    render={props => {
    if (localStorage.getItem('token') && !error) {
        return <Component {...props}/>
    } else {
        return <Redirect to='/'/>
    }
}}/>

const mapStateToProps = ({error}) => ({error});

export const PrivateRoute = connect(mapStateToProps, {})(PrivateRouteComponent);