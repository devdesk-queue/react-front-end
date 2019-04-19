import React from 'react';
import {Spinner} from 'reactstrap';

export default function Loading() {
    return (

        <div className="text-center m-5">
            <Spinner
                style={{
                width: '1rem',
                height: '1rem'
            }}
                type="grow"/>
            <Spinner
                style={{
                width: '2rem',
                height: '2rem'
            }}
                type="grow"/>
            <Spinner
                style={{
                width: '3rem',
                height: '3rem'
            }}
                type="grow"/>
            <Spinner
                style={{
                width: '2rem',
                height: '2rem'
            }}
                type="grow"/>
            <Spinner
                style={{
                width: '1rem',
                height: '1rem'
            }}
                type="grow"/><br/>
            <h1 className="display-1">BRB</h1>
        </div>

    )
}
