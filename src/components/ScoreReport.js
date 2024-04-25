import Table from "react-bootstrap/Table";
import { useData } from "./DataContext";
import { Container, Row, Col, Form } from "react-bootstrap";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef } from "react";

const ScoreReport = () => {
  const { iamData, infraData, userDetails } = useData();





  //To download pdf
  const pdfRef = useRef();
  const downloadPDF = () =>{
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p','mm', 'a4', true);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pdfWidth/imgWidth, pdfHeight/imgHeight);
        const imgX = (pdfWidth - imgWidth*ratio)/2;
        const imgY = 30;
        pdf.addImage(imgData,'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
        pdf.save('score_report.pdf');

    });

};
  

  console.log(iamData);
  console.log(infraData);
  console.log(userDetails);

  if (!iamData || !infraData) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <Container fluid>
      <div ref={pdfRef}>
        <h3>Security Score</h3>
        <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Category</th>
              <th>Informational</th>
              <th>Low</th>
              <th>Medium</th>
              <th>Critical</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <b>IAM</b>
              </td>
              <td>{iamData.scores.informational}</td>
              <td>{iamData.scores.low}</td>
              <td>{iamData.scores.medium}</td>
              <td>{iamData.scores.critical}</td>
            </tr>
            <tr>
              <td>
                <b>Infrastructure Protection</b>
              </td>
              <td>{infraData.scores.informational}</td>
              <td>0</td>
              <td> {infraData.scores.medium}</td>
              <td>{infraData.scores.critical}</td>
            </tr>
          </tbody>
        </Table>
        </div>

        <Container>
          <h2>Form Data</h2>
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Selected Country</Form.Label>
                <Form.Control
                  type="text"
                  value={userDetails.selectedCountry}
                  readOnly
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Selected City</Form.Label>
                <Form.Control
                  type="text"
                  value={userDetails.selectedCity}
                  readOnly
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Type of Business</Form.Label>
                <Form.Control
                  type="text"
                  value={userDetails.typeOfBusiness}
                  readOnly
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Number of Locations</Form.Label>
                <Form.Control
                  type="number"
                  value={userDetails.numberOfLocations}
                  readOnly
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Number of Users</Form.Label>
                <Form.Control
                  type="number"
                  value={userDetails.numberOfUsers}
                  readOnly
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Infra Per Site</Form.Label>
                <Form.Control
                  type="text"
                  value={userDetails.infraPerSite}
                  readOnly
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Firewalls or Network Devices</Form.Label>
                <Form.Control
                  type="text"
                  value={userDetails.firewallsOrNetworkDevices}
                  readOnly
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Security Standards</Form.Label>
                <Form.Control
                  type="text"
                  value={userDetails.securityStandards}
                  readOnly
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Security Services or Tools</Form.Label>
                <Form.Control
                  type="text"
                  value={userDetails.securityServicesOrTools}
                  readOnly
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Past Security Events</Form.Label>
                <Form.Control
                  type="text"
                  value={userDetails.pastSecurityEvents}
                  readOnly
                />
              </Form.Group>
            </Col>
          </Row>
        </Container>
      </div>

      <Row className="justify-content-center my-3"> {/* Center buttons */}
    <Col md="auto" className="mb-2"> {/* Auto width column */}
      <button className="btn btn-primary btn-block" onClick={downloadPDF}>Download report</button>
    </Col>
    <Col md="auto"> {/* Auto width column */}
      <button className="btn btn-warning btn-block" >Logout</button>
    </Col>
  </Row>
      </Container>
    </>

  );
};

export default ScoreReport;
