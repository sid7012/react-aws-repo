import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "./DataContext";
import { Container, Form, Row, Col, Button } from "react-bootstrap";


const Index = () => {
  const { setUserData } = useData();
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [formData, setFormData] = useState({
    selectedCountry: "",
    selectedCity: "",
    typeOfBusiness: "",
    numberOfLocations: 0,
    numberOfUsers: 0,
    infraPerSite: "",
    firewallsOrNetworkDevices: "",
    securityStandards: "",
    securityServicesOrTools: "",
    pastSecurityEvents: "",
  });

  // Fetch countries from backend on component mount
  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = () => {
    fetch("http://65.0.127.18:8080/api/countries")
      .then((response) => response.json())
      .then((data) => setCountries(data))
      .catch((error) => console.error("Error fetching countries:", error));
  };

  const fetchCities = (countryName) => {
    fetch(`http://65.0.127.18:8080/api/cities/${countryName}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch cities");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched cities:", data);
        setCities(data);
      })
      .catch((error) => console.error("Error fetching cities:", error));
  };

  const handleCountryChange = (e) => {
    const selectedCountryId = e.target.value;
    const selectedCountryName = e.target.options[e.target.selectedIndex].text;
    setSelectedCountry({ id: selectedCountryId, name: selectedCountryName });
    if (selectedCountryId) {
      fetchCities(selectedCountryId);
    } else {
      setCities([]); // Clear cities if no country selected
    }
  };

  const handleCityChange = (e) => {
    const selectedCityName = e.target.value; // Get selected city name
    setSelectedCity(selectedCityName);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create form data object
    const formData = {
      selectedCountry: selectedCountry.name,
      selectedCity: selectedCity,
      typeOfBusiness: e.target.elements.typeOfBusiness.value,
      numberOfLocations: parseInt(e.target.elements.location.value),
      numberOfUsers: parseInt(e.target.elements.user.value),
      infraPerSite: e.target.elements.infraPerSite.value,
      firewallsOrNetworkDevices:
        e.target.elements.firewallsOrNetworkDevices.value,
      securityStandards: e.target.elements.securityStandards.value,
      securityServicesOrTools: e.target.elements.securityServicesOrTools.value,
      pastSecurityEvents: e.target.elements.pastSecurityEvents.value,
      // Add other form fields as needed
    };

    console.log("Form data to be submitted:", formData);

    // Submit form data
    fetch("http://65.0.127.18:8080/submitForm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to submit form");
        }
        return response.json();
      })
      .then((data) => {
        // Store response data in scores state
        setUserData(data);
        console.log(data + "My Data");
        console.log("Form submitted successfully");
        resetForm();
        navigate("/iam");
      })
      .catch((error) => console.error("Error submitting form:", error));
  };

  const resetForm = () => {
    setFormData({
      selectedCountry: "",
      selectedCity: "",
      typeOfBusiness: "",
      numberOfLocations: 0,
      numberOfUsers: 0,
      infraPerSite: "",
      firewallsOrNetworkDevices: "",
      securityStandards: "",
      securityServicesOrTools: "",
      pastSecurityEvents: "",
    });
    setSelectedCountry("");
    setSelectedCity("");
  };

  return (
    <Container fluid>
      <h2>Form Data</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col>
            <Form.Group>
              <Form.Label>Type of Business?</Form.Label>
              <Form.Control
                type="text"
                name="typeOfBusiness"
                value={formData.typeOfBusiness}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    typeOfBusiness: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>How many locations?</Form.Label>
              <Form.Control
                as="select"
                name="location"
                value={formData.numberOfLocations}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    numberOfLocations: parseInt(e.target.value),
                  })
                }
              >
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group>
              <Form.Label>Select Country: </Form.Label>
              <Form.Control
                as="select"
                value={selectedCountry.id}
                onChange={handleCountryChange}
              >
                <option value="">Select</option>
                {countries.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Select City:</Form.Label>
              <Form.Control
                as="select"
                value={selectedCity}
                onChange={handleCityChange}
              >
                <option value="">Select</option>
                {cities && Array.isArray(cities) ? (
                  cities.map((city) => (
                    <option key={city.id} value={city.name}>
                      {city.name}
                    </option>
                  ))
                ) : (
                  <option value="">No cities found</option>
                )}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Label>How many users?</Form.Label>
            <Form.Control
              as="select"
              name="user"
              value={formData.numberOfUsers}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  numberOfUsers: parseInt(e.target.value),
                })
              }
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </Form.Control>
            <Form.Group></Form.Group>
          </Col>

          <Col>
            <Form.Group>
              <Form.Label>
                What infra per site (onsite servers or cloud)?
              </Form.Label>
              <Form.Control
                type="text"
                name="infraPerSite"
                value={formData.infraPerSite}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    infraPerSite: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group>
              <Form.Label>Any firewalls or network devices?</Form.Label>
              <Form.Control
                type="text"
                name="firewallsOrNetworkDevices"
                value={formData.firewallsOrNetworkDevices}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    firewallsOrNetworkDevices: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>
                What compliance or security standards are applicable or adhered
                to?
              </Form.Label>
              <Form.Control
                type="text"
                name="securityStandards"
                value={formData.securityStandards}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    securityStandards: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group>
              <Form.Label>
                What are various security services or tools deployed currently?
              </Form.Label>
              <Form.Control
                type="text"
                name="securityServicesOrTools"
                value={formData.securityServicesOrTools}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    securityServicesOrTools: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>
                Has the security event occurred in the past?{" "}
              </Form.Label>
              <Form.Control
                type="text"
                name="pastSecurityEvents"
                value={formData.pastSecurityEvents}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    pastSecurityEvents: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Additional form fields go here */}

        <Button type="submit">Next</Button>
      </Form>
    </Container>
  );
};

export default Index;
