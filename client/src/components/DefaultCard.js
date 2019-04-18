import React from 'react';
import {Row, Col, Card} from 'reactstrap';

export default function DefaultCard(props) {
    return (
        <Row>
            <Col>
                <Card inverse color="primary" className="text-center mt-3">
                    <h2 className="display-4">{props.title}</h2>
                    <Card body color="white" className="text-dark">
                        {props.children}
                    </Card>
                </Card>
            </Col>
        </Row>
    )
}