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
  updateUrl,
} from "../store/actions/loggedActions";
import { FullOrder } from "../store/uiData/dataTypes";
import SellerDetails from "../components/SellerDetails";

interface IDateProps {
  date: string;
}

const OrderDetails: FC<RouteComponentProps<IDateProps>> = (props) => {
  const { date } = props.match.params;
  const [sellerDetails, setSellerDetails] = useState(false);
  const [order, setOrder] = useState<FullOrder>();
  const [loadingBtn, setLoadingBtn] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);
  const { loading, allOrders } = useSelector(
    (state: RootState) => state.logged
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateUrl(window.location.pathname));
  }, []);

  useEffect(() => {
    dispatch(setLoading(true));
    if (user) {
      dispatch(getAllOrders(user!.id));
    }
  }, [user]);

  useEffect(() => {
    allOrders.forEach((order) => {
      if (order.date === date) {
        setOrder(order);
      }
    });
  }, [allOrders]);

  const sellerDetailsHandler = () => {
    setLoadingBtn(true);
    dispatch(
      getSellerOrderDetails(order!.merchandise[0].sellerId, () =>
        setLoadingBtn(false)
      )
    );
    setSellerDetails(true);
  };

  return (
    <div className="order-details">
      {loading ? (
        <Spinner
          className="order-details__spiner"
          animation="border"
          variant="primary"
        />
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
                      {order!.merchandise.map((product, i) => (
                        <Col key={i}>
                          <ListGroup.Item className="list-group-flush">
                            {product.productName}
                          </ListGroup.Item>
                          <ListGroup.Item className="list-group-flush">
                            {product.productPrice} zł / szt
                          </ListGroup.Item>
                          <ListGroup.Item className="list-group-flush">
                            zamówiono {product.productQuantity} szt
                          </ListGroup.Item>
                          <ListGroup.Item className="list-group-flush">
                            1 szt - {product.productCapacity} kg
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
                  {loadingBtn ? (
                    <Spinner animation="border" variant="primary" />
                  ) : (
                    "dane sprzedawcy"
                  )}
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
