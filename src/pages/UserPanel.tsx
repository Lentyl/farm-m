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
import { Product, LocationLatLng } from "../store/uiData/dataTypes";
import { BsPencil } from "react-icons/bs";
import { GiPencilBrush } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  getAllOrders,
  updateUser,
  updateUrl,
} from "../store/actions/loggedActions";
import AddProducts from "../components/AddProducts";
import AlertMessage from "../components/AlertMessage";

import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

const UserPanel: FC = () => {
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [editUserDetails, setEditUserDetails] = useState(false);
  const [name, setName] = useState("");
  const [streetAndNumber, setStreetAndNumber] = useState("");
  const [postcode, setPostcode] = useState("");
  const [town, setTown] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [changingAddressAlert1, setChangingAddressAlert1] = useState(false);
  const [changingAddressAlert2, setChangingAddressAlert2] = useState(false);
  const [changingDetailsAlert3, setChangingDetailsAlert3] = useState(false);
  const [alertTwoDisplayOneTime, setAlertTwoDisplayOneTime] = useState(false);
  const [emailAlertDisplayOneTime, setEmailAlertDisplayOneTime] = useState(
    false
  );

  const { allOrders } = useSelector((state: RootState) => state.logged);
  const { user } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateUrl(window.location.pathname));
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(getAllOrders(user!.id));
      setLoading(false);
    }
  }, [user]);

  const handleEditDetails = () => {
    setEditUserDetails(!editUserDetails);

    if (user) {
      setName(user.name);
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
    setNewProducts(products);
  };

  const updateDetails = (locationLatLng: LocationLatLng): void => {
    const updateUserDetails = {
      name: name === "" ? user!.name : name === user!.name ? user!.name : name,
      email:
        email === ""
          ? user!.email
          : email === user!.email
          ? user!.email
          : email,
      postcode:
        postcode === ""
          ? user!.postcode
          : postcode === user!.postcode
          ? user!.postcode
          : postcode,
      city: town === "" ? user!.city : town === user!.city ? user!.city : town,
      street:
        streetAndNumber === ""
          ? user!.street
          : streetAndNumber === user!.street
          ? user!.street
          : streetAndNumber,
      products: newProducts,
      id: user!.id,
      businessStatus: user!.businessStatus,
      location: locationLatLng,
    };

    if (user!.email !== email && !emailAlertDisplayOneTime) {
      setEmailAlertDisplayOneTime(true);
    } else if (user!.email === email && emailAlertDisplayOneTime) {
      dispatch(setLoading(true));
      dispatch(updateUser(updateUserDetails));
      setEmailAlertDisplayOneTime(false);
    } else {
      dispatch(setLoading(true));
      dispatch(updateUser(updateUserDetails, true, password));
      setEmailAlertDisplayOneTime(false);
    }
  };

  const handleConfirmDetails = (): void => {
    if (
      town !== user!.city &&
      postcode !== user!.postcode &&
      streetAndNumber !== user!.street
    ) {
      geocodeByAddress(`${town}, ${streetAndNumber}`).then((results) => {
        getLatLng(results[0]).then((latLng) => {
          const locationLatLng = { lat: latLng.lat, lng: latLng.lng };
          updateDetails(locationLatLng);
        });
      });
    } else if (
      postcode !== user!.postcode &&
      town !== user!.city &&
      streetAndNumber === user!.street
    ) {
      if (!changingAddressAlert2) {
        setChangingAddressAlert1(false);
        setChangingAddressAlert2(true);
      } else {
        setAlertTwoDisplayOneTime(true);
        geocodeByAddress(`${town}, ${streetAndNumber}`).then((results) => {
          getLatLng(results[0]).then((latLng) => {
            const locationLatLng = { lat: latLng.lat, lng: latLng.lng };
            updateDetails(locationLatLng);
          });
        });
      }
    } else if (
      town !== user!.city ||
      postcode !== user!.postcode ||
      streetAndNumber !== user!.street
    ) {
      setChangingAddressAlert1(true);
    } else if (email !== user!.email || name !== user!.name) {
      if (user!.location) {
        updateDetails(user!.location);
      }
    } else if (JSON.stringify(user!.products) !== JSON.stringify(newProducts)) {
      if (user!.location) {
        updateDetails(user!.location);
      }
    } else if (
      town === user!.city &&
      postcode === user!.postcode &&
      streetAndNumber === user!.street &&
      email === user!.email &&
      name === user!.name &&
      JSON.stringify(user!.products) === JSON.stringify(newProducts)
    ) {
      setChangingDetailsAlert3(true);
    }
  };

  return (
    <div className="userPanel">
      {loading ? (
        <Spinner animation="border" variant="primary" />
      ) : allOrders.length === 0 ? (
        <Container className="userPanel__container">
          <h2 className="userPanel__header">
            {user?.name} nie masz żadnych zamówień.
          </h2>
        </Container>
      ) : (
        <Container className="userPanel__container">
          <Row>
            <h2 className="userPanel__header">
              {user?.name} twoje wszystkie zamówienia
            </h2>
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
                        data: {order.date.replace("t", ":")}
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
              {changingAddressAlert1 && (
                <AlertMessage
                  type={"danger"}
                  heading={"Zmień wszystkie elementy adresu!"}
                  msg={
                    "Zmiana adresu powinna dodyczyć kodu pocztowego, miejscowości jak również nazwy ulicy i nr domu."
                  }
                />
              )}
              {changingAddressAlert2 && !alertTwoDisplayOneTime && (
                <AlertMessage
                  type={"danger"}
                  heading={"Czy nazwa ulicy i numer domu pozostaje bez zmian?"}
                  msg={
                    "Zatwierdź ponownie, jeżeli ulica i nr mieszkania nie powinny się zmienić"
                  }
                />
              )}
              {changingDetailsAlert3 && (
                <AlertMessage
                  type={"danger"}
                  heading={"Nie dokonano żadnych zmian!"}
                  msg={
                    "Musisz wprowadzić zmiany w danych osobowych albo towarach."
                  }
                />
              )}
              {emailAlertDisplayOneTime && (
                <AlertMessage
                  type={"danger"}
                  heading={"chcesz zmienić e-mail?"}
                  msg={"Jeżeli jesteś tego 100% pewny zatwierdź ponownie."}
                />
              )}
              <Row className="userPanel__contact-details-wrapper">
                <Col className="userPanel__contact-details-column no-border ">
                  <h6>nazwa użytkownika </h6>
                  <input
                    className="userPanel__contact-details-input"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.currentTarget.value);
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
                  <h6>ulica/nr domu</h6>
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
                  {email !== user!.email && (
                    <div className="userPanel__contact-email-password-confirmation">
                      <h6>hasło</h6>
                      <input
                        className="userPanel__contact-details-input"
                        type="password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.currentTarget.value);
                        }}
                      />
                    </div>
                  )}
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
                  <h6>nazwa użytkownika</h6>
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
                  <h6>ulica/nr domu</h6>
                  {user!.street}
                </Col>
                <Col className="userPanel__contact-details-column">
                  <h6>e-mail</h6>
                  {user!.email}
                </Col>
              </Row>
              <h4>Twoje Produkty</h4>
              {user.products!.map((product, i) => (
                <Row className="userPanel__product-details" key={i}>
                  <Col sm="3">{product.name}: </Col>
                  <Col sm="3">{product.price} zł/szt</Col>
                  <Col sm="3">1 szt - {product.capacity} kg</Col>
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
