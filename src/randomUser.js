import axios from "axios";
import { useEffect, useState } from "react";
import {Container, Row, Col, Card, CardBody, CardTitle} from 'reactstrap'
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";


function Random() {
  const [details, setDetails] = useState([])
  const fetchDetails = async () => {
    const data = await axios.get('https://randomuser.me/api/')

    console.log(data);

    const detail = data.data.results[0];
    console.log(detail);
    setDetails(detail)

  }

  useEffect(() => {
    fetchDetails()
  }, [])
  return (
      <Container fluid className="p-4 bg-primary">
        <Row>
          <Col md={4} className="mt-4">
            <Card>
              <CardBody className="text-center">
                <img src={details.picture?.large} />
                <CardTitle className="text-primary">
                  <h3 className="m-2">
                    <span className="mx-1">{details.name?.title}</span>
                    <span>{details.name?.first}</span>
                    <span>{details.name?.last}</span>
                  </h3>
                </CardTitle>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
  );
}

export default Random;
