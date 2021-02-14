import React, { FC, useEffect, useState } from "react";
import {
  Container,
  Card,
  ListGroup,
  Row,
  Col,
  Spinner,
  Button,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { RouteComponentProps } from "react-router-dom";
import {
  getAllOrders,
  setLoading,
  getSellerOrderDetails,
} from "../store/actions/loggedActions";
import { FullOrder } from "../store/uiData/dataTypes";
import SellerDetails from "../components/SellerDetails";

interface DateProps {
  date: string;
}

const OrderDetails: FC<RouteComponentProps<DateProps>> = (props) => {
  const { date } = props.match.params;

  const [sellerDetails, setSellerDetails] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const [order, setOrder] = useState<FullOrder>();
  const { loading } = useSelector((state: RootState) => state.logged);

  const { allOrders } = useSelector((state: RootState) => state.logged);

  useEffect(() => {
    dispatch(setLoading(true));
  }, []);

  useEffect(() => {
    if (user) dispatch(getAllOrders(user!.id));
  }, [user]);

  useEffect(() => {
    const order = allOrders.map((order) => {
      const orderDate = order.date.replace(" t ", "");
      if (orderDate === date) {
        return order;
      }
    });
    setOrder(order[0]);
  }, [allOrders]);

  const sellerDetailsHandler = () => {
    dispatch(getSellerOrderDetails(order!.merchandise[0].sellerId));
    setSellerDetails(true);
  };

  return (
    <div className="order-details">
      {loading ? (
        <Spinner animation="border" variant="primary" />
      ) : order ? (
        <Container>
          <Card className="order-details__card">
            <Card.Body>
              <Row>
                <Col>
                  <ListGroup className="order-details__card-container">
                    <ListGroup.Item className="list-group-flush">
                      łączna kwota: {order!.totalValue} zł
                    </ListGroup.Item>
                    <ListGroup.Item className="list-group-flush">
                      status zamówienia: {order!.orderStatus}
                    </ListGroup.Item>
                    <Row className="order-details__merchandise">
                      {order!.merchandise.map((product) => (
                        <Col>
                          <ListGroup.Item className="list-group-flush">
                            {product.productName}
                          </ListGroup.Item>
                          <ListGroup.Item className="list-group-flush">
                            {product.productPrice} zł.
                          </ListGroup.Item>
                          <ListGroup.Item className="list-group-flush">
                            {product.productQuantity} szt.
                          </ListGroup.Item>
                          <ListGroup.Item className="list-group-flush">
                            {product.productCapacity} kg.
                          </ListGroup.Item>
                        </Col>
                      ))}
                    </Row>
                  </ListGroup>
                </Col>
              </Row>
              <Row className="order-details__card-btn-container">
                <Button
                  className="order-details__card-btn"
                  variant="outline-success"
                  size="sm"
                  onClick={sellerDetailsHandler}
                >
                  dane sprzedawcy
                </Button>
              </Row>
            </Card.Body>
            <Card.Footer className="order-details__card-footer">
              data zamówienia: {order.date}
            </Card.Footer>
          </Card>

          {sellerDetails && <SellerDetails />}
        </Container>
      ) : (
        ""
      )}
    </div>
  );
};

export default OrderDetails;
