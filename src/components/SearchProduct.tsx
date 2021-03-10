import React, { FC, useEffect, useState } from "react";
import { Container, ListGroup, Button, Row, Col } from "react-bootstrap";
import { SellersArr, Order } from "../store/uiData/dataTypes";
import { RootState } from "../store";
import { FaShoppingCart } from "react-icons/fa";
import Map from "../components/Map";
import { loadMapApi } from "../mapUtils/googleMapUtils";

import { useDispatch, useSelector } from "react-redux";
import { setOrder } from "../store/actions/loggedActions";

const SearchProduct: FC = () => {
  const [sellersArr, setSellersArr] = useState<SellersArr>([]);
  const [dysplayDetails, setDysplayDetails] = useState(false);
  const [chosenSeller, setChosenSeller] = useState(0);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  const { sellersProducts } = useSelector((state: RootState) => state.logged);
  let { order } = useSelector((state: RootState) => state.logged);
  let { authentication } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const { mapLoaded } = useSelector((state: RootState) => state.logged);

  useEffect(() => {
    setSellersArr(sellersProducts);
  }, [sellersProducts]);

  const clickBackwardsHandler = (): void => {
    setDysplayDetails(false);
  };

  const clickDetailsHandler = (i: number): void => {
    setDysplayDetails(true);
    setChosenSeller(i);
  };

  const clickAddToCartHandler = (
    productName: string,
    productPrice: number,
    productCapacity: number,
    sellerId: string
  ): void => {
    const productQuantity: number = 1;
    dispatch(
      setOrder({
        productName,
        productPrice,
        productQuantity,
        productCapacity,
        sellerId,
      })
    );
  };

  return (
    <div className="search">
      <Container className="search__container" fluid>
        {sellersArr.length < 1 ? (
          <h2 className="search__title">
            Wyszukaj okazje!! Pamiętaj aby używać liczby pojedynczej (cebula,
            truskawka, marchewka).
          </h2>
        ) : !dysplayDetails ? (
          <ListGroup className="search__list">
            {sellersArr.map((seller, i) => (
              <ListGroup.Item key={i} className="search__list-item">
                <div className="search__list-item-element-container">
                  {seller.products.map((product, i) => {
                    console.log(seller.searchedProduct, product.name);
                    if (product.name === seller.searchedProduct) {
                      return (
                        <div key={i} className="search__list-item-paragraph">
                          <p className="search__list-item-paragraph-element">
                            nazwa: {product.name},
                          </p>
                          <p className="search__list-item-paragraph-element">
                            cena: {product.price} zł,
                          </p>
                          <p className="search__list-item-paragraph-element">
                            waga: 1szt - {product.capacity} kg
                          </p>
                        </div>
                      );
                    }
                  })}
                </div>
                <div className="search__list-item-element-container">
                  {authentication && (
                    <Button
                      className="search__details-btn"
                      onClick={() => clickDetailsHandler(i)}
                      variant="outline-success"
                    >
                      szczegóły
                    </Button>
                  )}
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <div className="search__details-container">
            <Button
              className="search__backwards-btn"
              onClick={clickBackwardsHandler}
              variant="outline-success"
            >
              wstecz
            </Button>
            <Row className="search__details">
              <Row className="search__seller-details">
                <Col className="search__details-col" sm="auto">
                  imię: {sellersArr[chosenSeller].name}
                </Col>
                <Col className="search__details-col" sm="auto">
                  kod pocztowy: {sellersArr[chosenSeller].postcode}
                </Col>
                <Col className="search__details-col" sm="auto">
                  miasto: {sellersArr[chosenSeller].city}
                </Col>
                <Col className="search__details-col" sm="auto">
                  ulica: {sellersArr[chosenSeller].street}
                </Col>
                <Col className="search__details-col" sm="auto">
                  e-mail: {sellersArr[chosenSeller].email}
                </Col>
              </Row>
              <Row className="search__product-details">
                <Col className="search__product-details-paragraph">
                  wszystkie produkty sprzedawcy o imieniu:{" "}
                  {sellersArr[chosenSeller].name}
                </Col>
              </Row>
              {sellersArr[chosenSeller].products.map((product, i) => (
                <Row key={i} className="search__product-details">
                  <Col className="search__details-col" sm="auto">
                    produkt: {product.name}
                  </Col>
                  <Col className="search__details-col" sm="auto">
                    cena: {product.price} zł
                  </Col>
                  <Col className="search__details-col" sm="auto">
                    waga opakowania: {product.capacity} kg
                  </Col>
                  <Col className="search__details-col" sm="auto">
                    <Button
                      className="search__add-item-btn"
                      onClick={() => {
                        clickAddToCartHandler(
                          product.name,
                          product.price,
                          product.capacity,
                          sellersArr[chosenSeller].id
                        );
                      }}
                      variant="outline-success"
                    >
                      <FaShoppingCart /> dodaj
                    </Button>
                  </Col>
                </Row>
              ))}
            </Row>
            <div className="search__map-container">
              {mapLoaded && (
                <Map
                  mapType={google.maps.MapTypeId.ROADMAP}
                  locationLatLng={sellersArr[chosenSeller].location}
                />
              )}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default SearchProduct;
