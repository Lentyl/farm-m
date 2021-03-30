import React, { FC, useEffect, useState, FormEvent } from "react";
import { Container, ListGroup, Button, Spinner, Form } from "react-bootstrap";
import { Order } from "../store/uiData/dataTypes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { RiDeleteBin5Line } from "react-icons/ri";
import {
  addExtraProduct,
  deleteProduct,
  makeOrder,
  updateUrl,
} from "../store/actions/loggedActions";
import AlertMessage from "../components/AlertMessage";
import deliveryGuy from "../assets/img/deliveryGuy.png";

const Cart: FC = () => {
  const [orderSum, setOrderSum] = useState(0);
  const [payment, setPayment] = useState("");
  const [delivery, setDelivery] = useState("");
  const [nameSurname, setNameSurname] = useState("");
  const [streetAndNumber, setStreetAndNumber] = useState("");
  const [postcode, setPostcode] = useState("");
  const [town, setTown] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [buyerId, setBuyerId] = useState("");
  const [merchandise, setMerchandise] = useState<Order[]>([]);
  const [orderClick, setOrderClick] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [telephoneValid, setTelephoneValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderSent, setOrderSent] = useState(false);

  const { order } = useSelector((state: RootState) => state.logged);
  const { user } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setNameSurname(user.name);
      emailIsValid(user.email);
      setEmail(user.email);
      setBuyerId(user.id);

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
    setMerchandise(order);
    dispatch(updateUrl(window.location.pathname));
  }, []);

  useEffect(() => {
    setOrderSum(
      order.reduce((a, item) => a + item.productPrice * item.productQuantity, 0)
    );
  }, [order]);

  const emailIsValid = (emailValue: string): void => {
    if (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        emailValue
      ) &&
      emailValue.length !== 0
    ) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };

  const deliveryChangeHandler = (e: any): void => {
    setDelivery(e.target.value);
  };
  const paymentChangeHandler = (e: any): void => {
    setPayment(e.target.value);
  };

  const orderSubmitHandler = (e: FormEvent): void => {
    e.preventDefault();
    setOrderClick(true);

    if (
      delivery &&
      payment &&
      telephoneValid &&
      emailValid &&
      streetAndNumber &&
      town &&
      postcode &&
      nameSurname
    ) {
      setLoading(true);
      dispatch(
        makeOrder(
          {
            buyerId,
            date: new Date().toISOString().substring(2, 19).replace("T", ", "),
            totalValue: orderSum,
            orderStatus: "realizowane",
            merchandise,
          },
          () => setLoading(false),
          () => setOrderSent(true)
        )
      );
      setOrderClick(false);
    }
  };

  return (
    <div className={`cart ${!orderSum && !orderSent ? "background" : ""}`}>
      {orderSent ? (
        <div className="cart__delivery-container">
          <h2>zamówienie wysłane</h2>
          <img src={deliveryGuy} alt="Rysunek kuriera z paczkami" />
        </div>
      ) : (
        <Container className="cart__container" fluid>
          <Form>
            <ListGroup className="cart__list-container">
              {order &&
                order.map((order, i) => {
                  return (
                    <ListGroup.Item key={i} className="cart__list-item">
                      <p className="cart__item-name">{order.productName}:</p>
                      <p className="cart__item-price">
                        {order.productPrice} zł{" "}
                      </p>
                      <p className="cart__item-quantity">
                        x {order.productQuantity}
                      </p>
                      <Button
                        className="cart__item-add-btn"
                        variant="light"
                        onClick={() => {
                          dispatch(addExtraProduct(order.productName));
                        }}
                      >
                        +
                      </Button>
                      <Button
                        className="cart__item-bin-btn"
                        variant="light"
                        onClick={() => {
                          dispatch(deleteProduct(order.productName));
                        }}
                      >
                        <RiDeleteBin5Line className="cart__item-bin" />
                      </Button>
                    </ListGroup.Item>
                  );
                })}
              {orderSum ? (
                <ListGroup.Item className="cart__list-item empty-cart-header price">
                  Łączna kwota:{" "}
                  {payment === "cashOnDelivery" && delivery === "courier"
                    ? orderSum + 10 + 20
                    : payment === "cashOnDelivery"
                    ? orderSum + 10
                    : delivery === "courier"
                    ? orderSum + 20
                    : orderSum}{" "}
                  zł
                </ListGroup.Item>
              ) : (
                <ListGroup.Item className="cart__list-item  empty-cart-header">
                  <h3 className="cart__empty-cart-header">
                    Twój koszyk jest pusty!
                  </h3>
                </ListGroup.Item>
              )}
            </ListGroup>
            {orderSum !== 0 && (
              <div>
                {(!payment || !delivery) && orderClick === true ? (
                  <AlertMessage
                    type={"danger"}
                    heading={"Nie zaznaczyłeś wymaganego pola!"}
                    msg={
                      "Nie jest wybrana opcja dostawy lub płatności które są wymagane."
                    }
                  />
                ) : (
                  ""
                )}
                <Form.Group className="cart__section">
                  <h3 className="cart__section-title">1. Metoda dostawy</h3>
                  <Form.Check
                    value="courier"
                    name="deliveryRadios"
                    type="radio"
                    label="Kurier – InPost, UPS, FedEx, DTS lub Poczta Polska 20,00 zł"
                    onChange={deliveryChangeHandler}
                  />
                  <Form.Check
                    value="personal"
                    name="deliveryRadios"
                    type="radio"
                    label="Odbiór osobisty"
                    onChange={deliveryChangeHandler}
                  />
                </Form.Group>
                <Form.Group className="cart__section">
                  <h3 className="cart__section-title">2. Metoda płatności</h3>
                  <Form.Label className="cart__payment-option">
                    <Form.Check
                      type="radio"
                      name="paymentRadios"
                      inline
                      value="blik"
                      onChange={paymentChangeHandler}
                    />
                    blik
                    <span className="cart__payment-option-span">
                      (bezpłatnie)
                    </span>
                  </Form.Label>
                  <Form.Label className="cart__payment-option">
                    <Form.Check
                      type="radio"
                      name="paymentRadios"
                      inline
                      value="card"
                      onChange={paymentChangeHandler}
                    />
                    kart płatnicza online
                    <span className="cart__payment-option-span">
                      (bezpłatnie)
                    </span>
                  </Form.Label>
                  <Form.Label className="cart__payment-option">
                    <Form.Check
                      type="radio"
                      name="paymentRadios"
                      inline
                      value="transfer"
                      onChange={paymentChangeHandler}
                    />
                    przelew gotówkowy
                    <span className="cart__payment-option-span">
                      (bezpłatnie)
                    </span>
                  </Form.Label>
                  <Form.Label className="cart__payment-option">
                    <Form.Check
                      type="radio"
                      name="paymentRadios"
                      inline
                      value="cashOnDelivery"
                      onChange={paymentChangeHandler}
                    />
                    przy odbiorze
                    <span className="cart__payment-option-span">(10 zł)</span>
                  </Form.Label>
                </Form.Group>
                <Form.Group className="cart__section">
                  <h3 className="cart__section-title">3. Dane odbiorcy</h3>
                  {nameSurname.length === 0 && orderClick ? (
                    <AlertMessage type="danger" heading="Pole wymagane!" />
                  ) : (
                    ""
                  )}
                  <Form.Label>
                    imię i nazwisko odbiorcy
                    <Form.Control
                      className="cart__details-item"
                      required
                      type="text"
                      placeholder="Imię i nazwisko lub nazwa firmy"
                      value={nameSurname}
                      onChange={(e) => {
                        setNameSurname(e.currentTarget.value);
                      }}
                    />
                  </Form.Label>
                  {streetAndNumber.length === 0 && orderClick ? (
                    <AlertMessage type="danger" heading="Pole wymagane!" />
                  ) : (
                    ""
                  )}
                  <Form.Label>
                    ulica i numer domu
                    <Form.Control
                      className="cart__details-item"
                      required
                      type="text"
                      placeholder="Ulica i numer"
                      value={streetAndNumber}
                      onChange={(e) => {
                        setStreetAndNumber(e.currentTarget.value);
                      }}
                    />
                  </Form.Label>
                  {postcode.length === 0 && orderClick ? (
                    <AlertMessage type="danger" heading="Pole wymagane!" />
                  ) : (
                    ""
                  )}
                  <Form.Label>
                    kod pocztowy
                    <Form.Control
                      className="cart__details-item"
                      required
                      type="text"
                      placeholder="Kod pocztowy"
                      value={postcode}
                      onChange={(e) => {
                        setPostcode(e.currentTarget.value);
                      }}
                    />
                  </Form.Label>
                  {town.length === 0 && orderClick ? (
                    <AlertMessage type="danger" heading="Pole wymagane!" />
                  ) : (
                    ""
                  )}
                  <Form.Label>
                    miejscowość
                    <Form.Control
                      className="cart__details-item"
                      required
                      type="text"
                      placeholder="Miejscowość"
                      value={town}
                      onChange={(e) => {
                        setTown(e.currentTarget.value);
                      }}
                    />
                  </Form.Label>
                  {!emailValid && orderClick ? (
                    <AlertMessage
                      type="danger"
                      heading="Pole wymagane, sprawdź poprawność e-maila!"
                    />
                  ) : (
                    ""
                  )}
                  <Form.Label>
                    e-mail
                    <Form.Control
                      className="cart__details-item"
                      required
                      type="email"
                      placeholder="e-mail"
                      value={email}
                      onChange={(e) => {
                        emailIsValid(e.currentTarget.value);
                        setEmail(e.currentTarget.value);
                      }}
                    />
                  </Form.Label>
                  {!telephoneValid && orderClick ? (
                    <AlertMessage
                      type="danger"
                      heading={`Numer powinien być dziewięciocyfrowy!`}
                    />
                  ) : (
                    ""
                  )}
                  <Form.Label>
                    Telefon
                    <Form.Control
                      className="cart__details-item"
                      required
                      type=""
                      placeholder="Telefon"
                      value={telephone}
                      onChange={(e) => {
                        const isNumber = /^\d*\.?\d+$/.test(
                          e.currentTarget.value
                        );
                        if (isNumber && e.currentTarget.value.length === 9) {
                          setTelephoneValid(true);
                        } else {
                          setTelephoneValid(false);
                        }

                        setTelephone(e.currentTarget.value);
                      }}
                    />
                  </Form.Label>
                </Form.Group>
                <Button
                  className="cart__order-btn"
                  variant="outline-success"
                  type="submite"
                  size="sm"
                  onClick={orderSubmitHandler}
                >
                  {loading ? (
                    <Spinner animation="border" variant="primary" size="sm" />
                  ) : (
                    "Zamów"
                  )}
                </Button>
              </div>
            )}
          </Form>
        </Container>
      )}
    </div>
  );
};

export default Cart;
