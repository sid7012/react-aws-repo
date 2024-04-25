import React, { useState } from "react";
import { useData } from "./DataContext";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
import axios from "axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Infrastructure = () => {
  const { setInfraData } = useData();
  let navigate = useNavigate();

  // State to store user selections
  const [selections, setSelections] = useState([]);

  // Function to handle user selection changes
  // Function to handle user selection changes
  const handleSelectionChange = (id, severity, userSelection) => {
    // If selection exists, update it; otherwise, add a new selection
    const existingIndex = selections.findIndex((sel) => sel.id === id);

    if (existingIndex !== -1) {
      const updatedSelections = [...selections];
      updatedSelections[existingIndex] = { severity, userSelection };
      setSelections(updatedSelections);
    } else {
      setSelections((prevSelections) => [
        ...prevSelections,
        { severity, userSelection },
      ]);
    }
  };

  console.log(selections);
  // Function to send selections to backend for scoring
  const calculateScores = () => {
    const loadingToastId = toast.loading('Calculating...', {
        autoClose: false, // Disable autoClose
      });
      
      // Simulate some asynchronous task (e.g., fetching data)
      setTimeout(() => {
        // Close the loading toast
        toast.dismiss(loadingToastId);
      
        // Show success toast
        toast.success('Success', {
          autoClose: 2000, // Set autoClose to 2000 milliseconds (2 seconds)
          onClose: () => {
            // Redirect to next page after the success toast is closed
            navigate('/scorereport');
          }
        });
      }, 3000); // Simulate loading for 3 seconds (adjust as needed)
    axios
      .post("http://65.0.127.18:8080/api/score/calculate/infra", selections)
      .then((response) => {
        
      
        setInfraData({ scores: response.data });

       
      })
      .catch((error) => {
        console.error("Error calculating scores:", error);
      });
  };


  return (
    <>
    <Container>
      <h2 className="mb-4">Infrastructure</h2>
      <Row>
        <Row className="mb-4">
          <Form.Group>
            <Form.Label>
              Do you know you have on-demand access to all compliance related
              artifacts required by your organization from your AWS Console
            </Form.Label>
            <Form.Control
              as="select"
              value={selections.bestPractices}
              onChange={(e) =>
                handleSelectionChange("1", "INFOREMATIONAL", e.target.value)
              }
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Form.Control>
          </Form.Group>
        </Row>


        <Row className="mb-4">
          <Form.Group>
            <Form.Label>
            Where can I find AWS best practices for Security, Identity, & Compliance
            </Form.Label>
            <Form.Control
              as="select"
              value={selections.cloudSecurityTips}
              onChange={(e) =>
                handleSelectionChange('2', 'INFORMATIONAL', e.target.value)
              }
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Form.Control>
          </Form.Group>
        </Row>


        <Row className="mb-4">
          <Form.Group>
            <Form.Label>
            Where can I find security best practices for all AWS services?
            </Form.Label>
            <Form.Control
              as="select"
              value={selections.multiAccountStrategy}
              onChange={(e) =>
                handleSelectionChange('3', 'INFORMATIONAL', e.target.value)
              }
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Form.Control>
          </Form.Group>
        </Row>


        <Row className="mb-4">
          <Form.Group>
            <Form.Label>
            How frequently do you perform Vunlerability Assessment & Penetration Testing (VA/PT) and How?
            </Form.Label>
            <Form.Control
              as="select"
              value={selections.accountClassification}
              onChange={(e) =>
                handleSelectionChange('4', 'MEDIUM', e.target.value)
              }
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Form.Control>
          </Form.Group>
        </Row>


        <Row className="mb-4">
          <Form.Group>
            <Form.Label>
            Do you scan your code and review for security flaws and improving code quality?
            </Form.Label>
            <Form.Control
              as="select"
              value={selections.bestPractices}
              onChange={(e) =>
                handleSelectionChange('5', 'MEDIUM', e.target.value)
              }
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Form.Control>
          </Form.Group>
        </Row>


        <Row className="mb-4">
          <Form.Group>
            <Form.Label>
            How do you ensure that your Network Configuration is as Intended? Do you use VPC reachability analyzer to control your virtual network environment, including choosing your own IP address range, creating subnets, and configuring route tables and network gateways?
            </Form.Label>
            <Form.Control
              as="select"
              value={selections.serviceProtection}
              onChange={(e) =>
                handleSelectionChange('6', 'MEDIUM', e.target.value)
              }
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Form.Control>
          </Form.Group>
        </Row>


        <Row className="mb-4">
          <Form.Group>
            <Form.Label>
            How do you scan your environment for security vulnerabilites and risks for e.g. CVEs, Network reachability, AWS Security best practices?
            </Form.Label>
            <Form.Control
              as="select"
              value={selections.ssoUsage}
              onChange={(e) =>
                handleSelectionChange('7', 'CRITICAL', e.target.value)
              }
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Form.Control>
          </Form.Group>
        </Row>

        <Col className="mb-4">
                    <Button variant="primary" onClick={calculateScores}>calculateScores</Button>
            </Col>
      </Row>
    </Container>
     <ToastContainer />
</>
  );
};

export default Infrastructure;
