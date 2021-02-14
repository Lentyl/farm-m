import React, { FC, useEffect, useState } from "react";
import { Link as LinkB } from "react-router-dom";
import { Spinner, Container, Row, Col, Card, ListGroup } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { getAllOrders, setLoading } from "../store/actions/loggedActions";

const User: FC = () => {
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

  return (
    <div className="user">
      {loading ? (
        <Spinner animation="border" variant="primary" />
      ) : allOrders.length === 0 ? (
        <Container className="user__container" style={{ textAlign: "center" }}>
          <h2>Nie masz żadnych zamówień.</h2>
        </Container>
      ) : (
        <Container className="user__container" style={{ textAlign: "center" }}>
          <Row>
            <h2>Twoje wszystkie zamówienia</h2>
          </Row>
          <Row>
            {allOrders.map((order, i) => (
              <Card className="user__order-card" key={i}>
                <Row>
                  <Card.Body>
                    <Card.Title
                      className={
                        order.orderStatus === "realizowane"
                          ? "user__order-title-implemented"
                          : "user__order-title-completed"
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
    </div>
  );
};

export default User;
