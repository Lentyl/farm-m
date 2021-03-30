import React, { FC, useState, useEffect } from "react";
import { Product } from "../store/uiData/dataTypes";
import { Form, Button, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import ProductAutocomplete from "../components/ProductAutocomplete";

import AlertMessage from "./AlertMessage";

interface IAddProductsProps {
  getProducts: (products: Product[]) => void;
}

const AddProducts: FC<IAddProductsProps> = ({ getProducts }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [capacity, setCapacity] = useState<number>(0);
  const [addingAlert, setAddingAlert] = useState(false);
  const [productChosen, setProductChosen] = useState(false);

  const { user } = useSelector((state: RootState) => state.auth);
  const { url } = useSelector((state: RootState) => state.logged);

  useEffect(() => {
    if (url === "/business-sign-up" || url === "/user") {
      if (user!.products) {
        setProducts(user!.products);
      }
    }
  }, []);

  const getSelectedProduct = (selectedProduct: string) => {
    setName(selectedProduct.toLowerCase());
    setProductChosen(false);
  };

  const handleAdd = (): void => {
    const newList: Product[] = [...products, { name, price, capacity }];
    if (
      name.length !== 0 &&
      capacity !== 0 &&
      !Number.isNaN(capacity) &&
      !Number.isNaN(capacity)
    ) {
      setAddingAlert(false);
      setProducts(newList);
      setName("");
      setPrice(0);
      setCapacity(0);
      setProductChosen(true);
      getProducts(newList);
      setProductChosen(true);
    } else {
      setAddingAlert(true);
    }
  };
  const handleDelet = (index: number): void => {
    const newList: Product[] = [...products];
    newList.splice(index, 1);
    setProducts(newList);
    getProducts(newList);
  };

  return (
    <div className="add_product">
      <Container className="add_product__container" fluid>
        {addingAlert && (
          <AlertMessage
            type={"danger"}
            heading={
              "Nazwa produktu i wagę opakowania nie powinny pozostać puste!"
            }
            msg={
              "Nazwa, waga i cena nie powinny być pustymi polami. Waga nie może wynosić zero. "
            }
          />
        )}
        <Form>
          <Form.Row className="add_product__add-row">
            <Form.Group
              className="add-product__input-container"
              as={Col}
              md="4"
              controlId="validationCustom01"
            >
              <Form.Label>produkt</Form.Label>
              <ProductAutocomplete
                getSelectedProduct={getSelectedProduct}
                productChosen={productChosen}
              />
              <Form.Control.Feedback>Wygląda dobrze!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              className="add-product__input-container"
              as={Col}
              md="3"
              controlId="validationCustom02"
            >
              <Form.Label>cena w zł</Form.Label>
              <input
                className="add-product__input"
                type="number"
                value={price}
                step="0.01"
                min="0"
                required
                placeholder="zł"
                onChange={(e) => setPrice(e.currentTarget.valueAsNumber)}
              />
              <Form.Control.Feedback>Wygląda dobrze!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              className="add-product__input-container"
              as={Col}
              md="3"
              controlId="validationCustomUsername"
            >
              <Form.Label>waga w kg</Form.Label>
              <br />
              <input
                className="add-product__input"
                type="number"
                value={capacity}
                min="0"
                step="1"
                required
                placeholder="kg"
                onChange={(e) => setCapacity(e.currentTarget.valueAsNumber)}
              />
              <Form.Control.Feedback>Wygląda dobrze!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              className="add-product__btn-container"
              as={Col}
              md="2"
              controlId="validationCustomUsername"
            >
              <Button
                className="add-product__btn"
                variant="outline-success"
                onClick={handleAdd}
              >
                Dodaj
              </Button>
            </Form.Group>
          </Form.Row>
        </Form>
      </Container>
      {products.map((product: Product, index: number) => (
        <Container className="add-product__list" fluid key={index}>
          <Row className="add-product__list-item" md={3}>
            <Col className="add-product__list-item-element">{product.name}</Col>
            <Col className="add-product__list-item-element">
              {Number.isNaN(product.price) ? 0 : product.price} zł
            </Col>
            <Col className="add-product__list-item-element">
              {Number.isNaN(product.capacity) ? 0 : product.capacity} kg
            </Col>
            <Col
              md={3}
              sm={2}
              xs={1}
              className="add-product__cancel-btn-container"
            >
              <Button
                variant="outline-danger"
                onClick={() => handleDelet(index)}
              >
                X
              </Button>
            </Col>
          </Row>
        </Container>
      ))}
    </div>
  );
};

export default AddProducts;
