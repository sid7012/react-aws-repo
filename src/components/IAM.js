import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from './DataContext';
import axios from 'axios';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const IAM = () => {
    const [selections, setSelections] = useState([]);
    const { setIamData } = useData();
    const navigate = useNavigate();

    const handleSelectionChange = (id, severity, userSelection) => {
        const existingIndex = selections.findIndex(sel => sel.id === id);

        if (existingIndex !== -1) {
            const updatedSelections = [...selections];
            updatedSelections[existingIndex] = { severity, userSelection };
            setSelections(updatedSelections);
        } else {
            setSelections(prevSelections => [
                ...prevSelections,
                { severity, userSelection }
            ]);
        }
    };

    const calculateScores = () => {
        axios.post('http://65.0.127.18:8080/api/score/calculate/iam', selections)
            .then(response => {
                setIamData({ scores: response.data });
                navigate('/infra');
            })
            .catch(error => {
                console.error('Error calculating scores:', error);
            });
    };

    return (
        <Container>
            <h2 className='mb-4'>IAM Security Assessment</h2>
            <Row >
                <Row className="mb-4">
                    <Form.Group>
                        <Form.Label>What are some best practices for securing my AWS account and its resources?</Form.Label>
                        <Form.Control as="select" value={selections.bestPractices} onChange={e => handleSelectionChange('1', 'INFORMATIONAL', e.target.value)}>
                            <option value="">Select</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </Form.Control>
                    </Form.Group>
                </Row>
               
                <Row className="mb-4" >
                    <Form.Group>
                        <Form.Label>Top 10 Cloud Security Tips</Form.Label>
                        <Form.Control as="select" value={selections.cloudSecurityTips} onChange={e => handleSelectionChange('2', 'INFORMATIONAL', e.target.value)}>
                            <option value="">Select</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </Form.Control>
                    </Form.Group>
                </Row>

                <Row className="mb-4">
                    <Form.Group>
                        <Form.Label>How have you defined a multi-account strategy for centralized governance and defined security boundaries across all the different accounts in accordance with the requirements?</Form.Label>
                        <Form.Control as="select" value={selections.multiAccountStrategy} onChange={e => handleSelectionChange('4', 'MEDIUM', e.target.value)}>
                            <option value="">Select</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </Form.Control>
                    </Form.Group>
                </Row>

                <Row className="mb-4" >
                    <Form.Group>
                        <Form.Label>Have you classified AWS accounts by line of business, environment, and so on, based on your organization requirements?</Form.Label>
                        <Form.Control as="select" value={selections.accountClassification} onChange={e => handleSelectionChange('4', 'MEDIUM', e.target.value)}>
                            <option value="">Select</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </Form.Control>
                    </Form.Group>
                </Row>

                <Row className="mb-4">
                    <Form.Group>
                        <Form.Label>Have you assigned necessary permissions to AWS accounts using Organizations Service Control Policies, and have you built permission guardrails to ensure compliance across all accounts?</Form.Label>
                        <Form.Control as="select" value={selections.permissionsAssignment} onChange={e => handleSelectionChange('5', 'MEDIUM', e.target.value)}>
                            <option value="">Select</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </Form.Control>
                    </Form.Group>
                </Row>

                <Row className="mb-4">
                    <Form.Group>
                        <Form.Label>Have you implemented critical service protection to prevent changes from being made inadvertently by humans or automation?</Form.Label>
                        <Form.Control as="select" value={selections.serviceProtection} onChange={e => handleSelectionChange('6', 'MEDIUM', e.target.value)}>
                            <option value="">Select</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </Form.Control>
                    </Form.Group>
                </Row>

                <Row className="mb-4">
                    <Form.Group>
                        <Form.Label>Do you use Single Sign-On (SSO) to manage AWS Identities?</Form.Label>
                        <Form.Control as="select" value={selections.ssoUsage} onChange={e => handleSelectionChange('7', 'LOW', e.target.value)}>
                            <option value="">Select</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </Form.Control>
                    </Form.Group>
                </Row>

                <Row className="mb-4">
                    <Form.Group>
                        <Form.Label>Have you set up a Security Challenge Question for each of your accounts?</Form.Label>
                        <Form.Control as="select" value={selections.securityQuestion} onChange={e => handleSelectionChange('8', 'CRITICAL', e.target.value)}>
                            <option value="">Select</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </Form.Control>
                    </Form.Group>
                </Row>

                <Row className="mb-4" >
                    <Form.Group>
                        <Form.Label>Do you monitor and notify about AWS Account Root User Activity?</Form.Label>
                        <Form.Control  as="select" value={selections.rootUserActivityMonitoring} onChange={e => handleSelectionChange('9', 'CRITICAL', e.target.value)}>
                            <option value="">Select</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </Form.Control>
                    </Form.Group>
                </Row>
             
         
                <Col className="mb-4">
                    <Button variant="primary" onClick={calculateScores}>Next</Button>
                </Col>
            </Row>
        </Container>
    );
};

export default IAM;
