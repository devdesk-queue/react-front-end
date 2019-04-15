import React from 'react';
import axios from 'axios';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

export const axiosWithAuth = _ => {
    return axios.create({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        }
    });
}

const PrivateRouteComponent = ({
    component: Component,
    error,
    ...rest
}) => Component => {
    return (
        <Route
            {...rest}
            render={props => {
            if (localStorage.getItem('token') && !error) {
                return <Component {...props}/>
            } else {
                return <Redirect to="/"/>
            }
        }}/>
    )
}

const mapStateToProps = ({error}) => ({error});

export const PrivateRoute = connect(mapStateToProps, {})(PrivateRouteComponent);