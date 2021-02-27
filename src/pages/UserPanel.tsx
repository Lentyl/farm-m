import React, { FC, useEffect, useState } from "react";
import { Link as LinkB } from "react-router-dom";
import {
  Spinner,
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  Button,
} from "react-bootstrap";
import { Product } from "../store/uiData/dataTypes";
import { BsPencil } from "react-icons/bs";
import { GiPencilBrush } from "react-icons/gi";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  getAllOrders,
  setLoading,
  updateUser,
} from "../store/actions/loggedActions";
import AddProducts from "../components/AddProducts";

import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

const UserPanel: FC = () => {
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [editUserDetails, setEditUserDetails] = useState(false);
  const [nameSurname, setNameSurname] = useState("");
  const [streetAndNumber, setStreetAndNumber] = useState("");
  const [postcode, setPostcode] = useState("");
  const [town, setTown] = useState("");
  const [email, setEmail] = useState("");

  const { allOrders } = useSelector((state: RootState) => state.logged);
  const { user } = useSelector((state: RootState) => state.auth);
  const { loading } = useSelector((state: RootState) => state.logged);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
  }, []);

  useEffect(() => {
    if (user) dispatch(getAllOrders(user!.id));
  }, [user]);

  const handleEditDetails = () => {
    setEditUserDetails(!editUserDetails);

    if (user) {
      setNameSurname(user.name);
      setEmail(user.email);

      if (user.postcode) {
        setPostcode(user.postcode);
      }

      if (user.street) {
        setStreetAndNumber(user.street);
      }

      if (user.city) {
        setTown(user.city);
      }
    }
  };

  const getProducts = (products: Product[]): void => {
    console.log("user Panel", products);
    setNewProducts(products);
  };

  const handleConfirmDetails = (): void => {
    dispatch(setLoading(true));
    geocodeByAddress("gdańsk").then((results) => {
      getLatLng(results[0]).then((latLng) => {
        const locationLatLng = { lat: latLng.lat, lng: latLng.lng };

        const updateUserDetails = {
          name: nameSurname,
          email: email,
          id: user!.id,
          businessStatus: user!.businessStatus,
          location: locationLatLng,
          postcode: postcode,
          city: town,
          street: streetAndNumber,
          products: newProducts,
        };

        dispatch(updateUser(updateUserDetails));
      });
    });
  };

  return (
    <div className="userPanel">
      {loading ? (
        <Spinner animation="border" variant="primary" />
      ) : allOrders.length === 0 ? (
        <Container className="userPanel__container">
          <h2>{user?.name} nie masz żadnych zamówień.</h2>
        </Container>
      ) : (
        <Container className="userPanel__container">
          <Row>
            <h2>{user?.name} twoje wszystkie zamówienia</h2>
          </Row>
          <Row className="userPanel__list-container">
            {allOrders.map((order, i) => (
              <Card className="userPanel__order-card" key={i}>
                <Row>
                  <Card.Body>
                    <Card.Title
                      className={
                        order.orderStatus === "realizowane"
                          ? "userPanel__order-title-implemented"
                          : "userPanel__order-title-completed"
                      }
                    >
                      zamówienie {++i} {`(${order.orderStatus})`}
                    </Card.Title>
                  </Card.Body>
                </Row>
                <Row>
                  <Col>
                    <ListGroup>
                      <ListGroup.Item className="list-group-flush">
                        łączna kwota: {order.totalValue} zł
                      </ListGroup.Item>
                      <ListGroup.Item className="list-group-flush">
                        data: {order.date.slice(1).replace("t", ":")}
                      </ListGroup.Item>
                    </ListGroup>
                  </Col>
                </Row>
                <Card.Body>
                  <LinkB to={`/order-details/${order.date.replace(" t ", "")}`}>
                    Szczegóły zamówienia
                  </LinkB>
                </Card.Body>
              </Card>
            ))}
          </Row>
        </Container>
      )}
      {user?.businessStatus === "business" && (
        <Container className="userPanel__container">
          {editUserDetails ? (
            <GiPencilBrush
              className="userPanel__pencil-icon"
              onClick={handleEditDetails}
              style={{ color: "rgb(202, 0, 0)" }}
            />
          ) : (
            <BsPencil
              className="userPanel__pencil-icon"
              onClick={handleEditDetails}
            />
          )}
          {editUserDetails ? (
            <div className="userPanel__edit-container">
              <Row className="userPanel__contact-details-wrapper">
                <Col className="userPanel__contact-details-column no-border ">
                  <h6>imie i nazwisko</h6>
                  <input
                    className="userPanel__contact-details-input"
                    type="text"
                    value={nameSurname}
                    onChange={(e) => {
                      setNameSurname(e.currentTarget.value);
                    }}
                  />
                </Col>
                <Col className="userPanel__contact-details-column no-border">
                  <h6>kod pocztowy</h6>
                  <input
                    className="userPanel__contact-details-input"
                    type="text"
                    value={postcode}
                    onChange={(e) => {
                      setPostcode(e.currentTarget.value);
                    }}
                  />
                </Col>
                <Col className="userPanel__contact-details-column no-border">
                  <h6>miejscowość</h6>
                  <input
                    className="userPanel__contact-details-input"
                    type="text"
                    value={town}
                    onChange={(e) => {
                      setTown(e.currentTarget.value);
                    }}
                  />
                </Col>
                <Col className="userPanel__contact-details-column no-border">
                  <h6>ulica</h6>
                  <input
                    className="userPanel__contact-details-input"
                    type="text"
                    value={streetAndNumber}
                    onChange={(e) => {
                      setStreetAndNumber(e.currentTarget.value);
                    }}
                  />
                </Col>
                <Col className="userPanel__contact-details-column no-border">
                  <h6>e-mail</h6>
                  <input
                    className="userPanel__contact-details-input"
                    type="text"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.currentTarget.value);
                    }}
                  />
                </Col>
                <Button
                  className="userPanel__contact-details-column-btn"
                  variant="outline-success"
                  onClick={handleConfirmDetails}
                >
                  {loading ? (
                    <Spinner animation="border" variant="primary" />
                  ) : (
                    "zatwierdź"
                  )}
                </Button>
              </Row>
              <AddProducts getProducts={getProducts} />
            </div>
          ) : (
            <div>
              <Row className="userPanel__contact-details-wrapper">
                <Col className="userPanel__contact-details-column">
                  <h6>imie</h6>
                  {user!.name}
                </Col>
                <Col className="userPanel__contact-details-column">
                  <h6>kod pocztowy</h6>
                  {user!.postcode}
                </Col>
                <Col className="userPanel__contact-details-column">
                  <h6>miejscowość</h6>
                  {user!.city}
                </Col>
                <Col className="userPanel__contact-details-column">
                  <h6>ulica</h6>
                  {user!.street}
                </Col>
                <Col className="userPanel__contact-details-column">
                  <h6>e-mail</h6>
                  {user!.email}
                </Col>
              </Row>
              <h4>Twoje Produkty</h4>
              {user.products!.map((product) => (
                <Row className="userPanel__product-details">
                  <Col>{product.name}: </Col>
                  <Col>{product.price} zł/szt</Col>
                  <Col>1 szt - {product.capacity} kg</Col>
                </Row>
              ))}
            </div>
          )}
        </Container>
      )}
    </div>
  );
};

export default UserPanel;
