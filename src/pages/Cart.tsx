import React, { FC, useEffect, useState, FormEvent } from "react";
import {
  Container,
  ListGroup,
  Button,
  Row,
  Col,
  Form,
  InputGroup,
  ButtonToolbar,
} from "react-bootstrap";
import { Order } from "../store/uiData/dataTypes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { RiDeleteBin5Line } from "react-icons/ri";
import {
  addExtraProduct,
  deleteProduct,
  makeOrder,
} from "../store/actions/loggedActions";

import { FullOrder } from "../store/uiData/dataTypes";

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

  let { order } = useSelector((state: RootState) => state.logged);
  let { user } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setNameSurname(user.name);
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
  }, []);

  useEffect(() => {
    setOrderSum(
      order.reduce((a, item) => a + item.productPrice * item.productQuantity, 0)
    );

    // setEmail(user!.email || "");
  }, [order]);

  const deliveryChangeHandler = (e: any): void => {
    setDelivery(e.target.value);
  };
  const paymentChangeHandler = (e: any): void => {
    setPayment(e.target.value);
  };

  const orderSubmitHandler = (e: FormEvent): void => {
    e.preventDefault();
    dispatch(makeOrder({ buyerId, merchandise }));
  };

  return (
    <div className="cart">
      <Container className="cart__container" fluid>
        <Form>
          <ListGroup className="cart__list-container">
            {order &&
              order.map((order, i) => {
                return (
                  <ListGroup.Item key={i} className="cart__list-item">
                    <p className="cart__item-name">{order.productName}:</p>
                    <p className="cart__item-price">{order.productPrice} zł </p>
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
                    <Form.Group controlId="exampleForm.ControlSelect1">
                      {/*  { <input className="add-product__imput" type='number'  value={capacity} step="1" required placeholder="szt." onFocus={reset} onInput={(e) => setQantity(e.currentTarget.valueAsNumber)} />} */}
                    </Form.Group>
                  </ListGroup.Item>
                );
              })}
            <ListGroup.Item className="cart__list-item">
              {orderSum !== 0
                ? `Łączna kwota: ${
                    payment === "cashOnDelivery" && delivery === "courier"
                      ? orderSum + 10 + 20
                      : payment === "cashOnDelivery"
                      ? orderSum + 10
                      : delivery === "courier"
                      ? orderSum + 20
                      : orderSum
                  } zł`
                : `Dodaj produkt do koszyka.`}
            </ListGroup.Item>
          </ListGroup>
          {orderSum !== 0 && (
            <div>
              <Col className="cart__section">
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
              </Col>
              <Col className="cart__section">
                <h3 className="cart__section-title">2. Metoda płatności</h3>
                <Form.Label className="cart__payment-option">
                  <Form.Check
                    type="radio"
                    name="paymentRadios"
                    inline
                    value="blik"
                    onChange={paymentChangeHandler}
                  />
                  Blik
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
                  Kart płatnicza online
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
                  Przelew gotówkowy
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
                  Przy odbiorze
                  <span className="cart__payment-option-span">(10 zł)</span>
                </Form.Label>
              </Col>
              <Col className="cart__section">
                <h3 className="cart__section-title">3. Dane odbiorcy</h3>
                <Form.Label>
                  imię i nazwisko
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
                <Form.Label>
                  e-mail
                  <Form.Control
                    className="cart__details-item"
                    required
                    type="email"
                    placeholder="e-mail"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.currentTarget.value);
                    }}
                  />
                </Form.Label>
                <Form.Label>
                  Telefon
                  <Form.Control
                    className="cart__details-item-last"
                    required
                    type=""
                    placeholder="Telefon"
                    value={telephone}
                    onChange={(e) => {
                      setTelephone(e.currentTarget.value);
                    }}
                  />
                </Form.Label>
              </Col>
              <Button
                className="cart__order-btn"
                variant="outline-success"
                type="submite"
                size="sm"
                onClick={orderSubmitHandler}
              >
                Zamów
              </Button>
            </div>
          )}
        </Form>
      </Container>
    </div>
  );
};

export default Cart;
