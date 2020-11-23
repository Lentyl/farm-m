import React, { FC, useState } from 'react'
import NumericInput from "react-numeric-input";
import { Product } from '../store/uiData/dataTypes'
import { Form, Button, Col, Container, Row } from "react-bootstrap";

type FormElement = React.FormEvent<HTMLFormElement>;

interface IAddProductsProps {
    getProducts: (products: Product[]) => void
}



const AddProducts: FC<IAddProductsProps> = ({ getProducts }) => {

    const [products, setProducts] = useState<Product[]>([]);
    const [name, setName] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const [capacity, setCapacity] = useState<number>(0);



    const handleConfirm = (): void => {
        const newList: Product[] = [...products, { name, price, capacity }]
        setProducts(newList);
        setName('');
        setPrice(0);
        setCapacity(0);

        getProducts(newList);


    }
    const handleDelet = (index: number): void => {
        const newList: Product[] = [...products];
        newList.splice(index, 1);
        setProducts(newList);

    }


    const submitHandler = (e: FormElement) => {

    }

    const reset = () => {

    }





    return (
        <div className='add_product'>
            <Container fluid>
                <Form onSubmit={submitHandler}>
                    <Form.Row>
                        <Form.Group className='add-product__input-container' as={Col} md="4" controlId="validationCustom01">
                            <Form.Label>produkt</Form.Label>
                            <Form.Control className="add-product__imput" required type="text" placeholder="produkt" value={name} onChange={(e) => { setName(e.currentTarget.value) }} />
                            <Form.Control.Feedback>Wygląda dobrze!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className='add-product__input-container' as={Col} md="3" controlId="validationCustom02">
                            <Form.Label>cena w zł</Form.Label>
                            <input className="add-product__imput" type='number' value={price} step="0.01" required placeholder='zł' onFocus={reset} onInput={(e) => setPrice(e.currentTarget.valueAsNumber)} />
                            <Form.Control.Feedback>Wygląda dobrze!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group
                            className='add-product__input-container'
                            as={Col} md="3" controlId="validationCustomUsername"
                        >
                            <Form.Label>waga w kg</Form.Label>
                            <br />
                            <input className="add-product__imput" type='number' value={capacity} step="1" required placeholder="kg" onFocus={reset} onInput={(e) => setCapacity(e.currentTarget.valueAsNumber)} />
                            <Form.Control.Feedback>Wygląda dobrze!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group
                            className='add-product__btn-container'
                            as={Col} md="2" controlId="validationCustomUsername"
                        >
                            <Button className='add-product__btn' variant="outline-success" onClick={handleConfirm} >
                                Dodaj
                            </Button >
                        </Form.Group>
                    </Form.Row>
                </Form>
            </Container>
            {products.map((product: Product, index: number) => (
                <Container className='add-product__list' fluid key={index}>
                    <Row className='add-product__list-item' md={3}>
                        <Col md={3} sm={3}>{product.name}</Col>
                        <Col md={3} sm={2}>{product.price} zł</Col>
                        <Col md={3} sm={2}>{product.capacity} kg</Col>
                        <Col md={3} sm={2} xs={1} className='add-product__cancel-btn-container'>
                            <Button variant='outline-danger' onClick={() => handleDelet(index)}>X</Button>
                        </Col>
                    </Row>
                </Container>
            ))}
        </div >
    )
}

export default AddProducts
