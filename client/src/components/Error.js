import React from 'react';
import {Alert} from 'reactstrap';

export default function Error(props) {
    let error = null;
    if (props.error) {
        error = <Alert className="mt-3" color="danger">
            {props.error}
        </Alert>
    }
    return (
        <div>
            {error}
        </div>
    )
}