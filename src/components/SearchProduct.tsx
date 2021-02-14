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

  let { sellers } = useSelector((state: RootState) => state.logged);
  let { order } = useSelector((state: RootState) => state.logged);
  let { authentication } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const { mapLoaded } = useSelector((state: RootState) => state.logged);

  useEffect(() => {
    sellers = [
      {
        id: "GIf2ajCzAPSQRA0juN7h3IJ5Gzi1",
        city: "Płońsk",
        email: "mialczyk64@wp.pl",
        name: "Miałczyk",
        postcode: "09-100",
        location: { lat: 52.63, lng: 20.36 },
        products: [
          {
            name: "jabłka",
            price: 50,
            capacity: 60,
          },
          {
            name: "owies",
            price: 30,
            capacity: 60,
          },
        ],
        searchedProduct: "jabłka",
        street: "Wolności 2",
      },
    ];

    setSellersArr(sellers);
  }, []);

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
        ) : dysplayDetails === false ? (
          <ListGroup>
            {sellersArr.map((seller, i) => (
              <ListGroup.Item key={i} className="search__list-item">
                {seller.products.map((product, i) => {
                  if (product.name === seller.searchedProduct) {
                    return (
                      <p key={i} className="search__list-item-paragraph">
                        nazwa: {product.name}, cena: {product.price} zł, waga
                        opakowania: {product.capacity} kg
                      </p>
                    );
                  }
                })}
                {authentication ? (
                  <Button
                    className="search__details-btn"
                    onClick={() => clickDetailsHandler(i)}
                    variant="outline-success"
                  >
                    szczegóły
                  </Button>
                ) : (
                  ""
                )}
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
                <Col className="search__details-col" md="auto">
                  imię: {sellersArr[chosenSeller].name}
                </Col>
                <Col className="search__details-col" md="auto">
                  kod pocztowy: {sellersArr[chosenSeller].postcode}
                </Col>
                <Col className="search__details-col" md="auto">
                  miasto: {sellersArr[chosenSeller].city}
                </Col>
                <Col className="search__details-col" md="auto">
                  ulica: {sellersArr[chosenSeller].street}
                </Col>
                <Col className="search__details-col" md="auto">
                  e-mail: {sellersArr[chosenSeller].email}
                </Col>
              </Row>
              <Row className="search__product-details">
                wszystkie produkty sprzedawcy o imieniu:{" "}
                {sellersArr[chosenSeller].name}
              </Row>
              {sellersArr[chosenSeller].products.map((product, i) => (
                <Row key={i} className="search__product-details">
                  <Col className="search__details-col" md="auto">
                    produkt: {product.name}
                  </Col>
                  <Col className="search__details-col" md="auto">
                    cena: {product.price} zł
                  </Col>
                  <Col className="search__details-col" md="auto">
                    waga opakowania: {product.capacity} kg
                  </Col>
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
                    <FaShoppingCart /> dodaj do koszyka
                  </Button>
                </Row>
              ))}
            </Row>
            <div className="search__map-container">
              {mapLoaded && (
                <Map
                  mapType={google.maps.MapTypeId.ROADMAP}
                  LocationLatLng={sellersArr[chosenSeller].location}
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
