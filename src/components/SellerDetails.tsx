import React, { FC } from "react";
import { Card, ListGroup, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Map from "../components/Map";

const SellerDetails: FC = () => {
  const { mapLoaded } = useSelector((state: RootState) => state.logged);
  const { sellersDetails } = useSelector((state: RootState) => state.logged);

  return (
    <div className="order-details">
      {sellersDetails[0] && (
        <Card className="order-details__card">
          <div className="search__map-container">
            {mapLoaded && (
              <Map
                mapType={google.maps.MapTypeId.ROADMAP}
                locationLatLng={sellersDetails[0].location}
                startAddress={true}
              />
            )}
          </div>
          <Card.Body>
            <Row>
              <Col>
                <ListGroup className="order-details__card-container">
                  <ListGroup.Item className="list-group-flush">
                    imię: {sellersDetails[0].name}
                  </ListGroup.Item>
                  <ListGroup.Item className="list-group-flush">
                    e-mail: {sellersDetails[0].email}
                  </ListGroup.Item>
                  <ListGroup.Item className="list-group-flush">
                    kod pocztowy: {sellersDetails[0].postcode}
                  </ListGroup.Item>
                  <ListGroup.Item className="list-group-flush">
                    miejscowość: {sellersDetails[0].city}
                  </ListGroup.Item>
                  <ListGroup.Item className="list-group-flush">
                    ulica/nr domu: {sellersDetails[0].street}
                  </ListGroup.Item>
                  <Row className="order-details__merchandise"></Row>
                </ListGroup>
              </Col>
            </Row>
            <Row className="order-details__card-btn-container"></Row>
          </Card.Body>
          <Card.Footer className="order-details__card-footer">
            Możesz skontaktować się ze sprzedającym, przez pocztę elektroniczną.
          </Card.Footer>
        </Card>
      )}
    </div>
  );
};

export default SellerDetails;
