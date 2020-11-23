import React, { FC, useEffect, useState } from 'react'
import { Container, ListGroup, Button, Row, Col } from "react-bootstrap";
import { SellersArr, Order } from '../store/uiData/dataTypes';
import { RootState } from "../store";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux"

const SearchProduct: FC = () => {
    const [sellersArr, setSellersArr] = useState<SellersArr>([]);
    const [dysplayDetails, setDysplayDetails] = useState(false);
    const [chosenSeller, setChosenSeller] = useState(0)
    const [order, setOrder] = useState<Order[]>([])

    let { sellers } = useSelector((state: RootState) => state.logged);
    let { authentication } = useSelector((state: RootState) => state.auth);

    useEffect(() => {

        sellers = [{
            id: '10QWwJHeqBSXFwVQV1cx3Kmk4Mk2',
            city: "Płońsk",
            email: "mialczyk64@wp.pl",
            name: "Miałczyk",
            postcode: "09-100",
            products: [{
                name: "jabłka",
                price: 50,
                capacity: 60,
            },
            {
                name: "owies",
                price: 30,
                capacity: 60,
            }
            ],
            searchedProduct: "jabłka",
            street: "Wolności 2",
        },]
        console.log(sellers);
        setSellersArr(sellers);
    }, [])

    const clickBackwardsHandler = (): void => {
        setDysplayDetails(false);
    }

    const clickDetailsHandler = (i: number): void => {
        setDysplayDetails(true);
        setChosenSeller(i)
    }

    const clickAddToCartHandler = (sellerId: string, productName: string, productPrice: number): void => {

        const orderUser: Order[] = [{ sellerId, productName, productPrice }, ...order]
        setOrder(orderUser)
    }

    return (
        <div className='search'>
            <Container className="search__container" fluid>
                {sellersArr.length < 1 ? <h2 className='search__title'>Wyszukaj okazje!! Pamiętaj aby używać liczby pojedynczej (cebula, truskawka, marchewka).</h2>
                    : dysplayDetails === false ? <ListGroup  >
                        {sellersArr.map((seller, i) => (
                            < ListGroup.Item key={i} className='search__list-item'>
                                {
                                    seller.products.map(product => {
                                        if (product.name === seller.searchedProduct) {

                                            return (

                                                <p>nazwa: {product.name},  cena: {product.price} zł, waga opakowania: {product.capacity} kg</p>

                                            )
                                        }
                                    })
                                }
                                {authentication ? <Button className="search__details-btn" onClick={() => clickDetailsHandler(i)} variant="outline-success">
                                    szczegóły
                                </Button> : ''}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                        : <div className="search__details-container">
                            <Button className="search__backwards-btn" onClick={clickBackwardsHandler} variant="outline-success">
                                wstecz
                             </Button>
                            <Row className="search__details" >
                                <Row className="search__seller-details">
                                    <Col className='search__details-col' md='auto'>imię: {sellersArr[chosenSeller].name}</Col>
                                    <Col className='search__details-col' md='auto'>kod pocztowy: {sellersArr[chosenSeller].postcode}</Col>
                                    <Col className='search__details-col' md='auto'>miasto: {sellersArr[chosenSeller].city}</Col>
                                    <Col className='search__details-col' md='auto'>ulica: {sellersArr[chosenSeller].street}</Col>
                                    <Col className='search__details-col' md='auto'>e-mail: {sellersArr[chosenSeller].email}</Col>
                                </Row>
                                <Row className="search__product-details">wszystkie produkty sprzedawcy o imieniu: {sellersArr[chosenSeller].name}</Row>
                                {sellersArr[chosenSeller].products.map(product => (
                                    <Row className="search__product-details" >
                                        <Col className='search__details-col' md='auto'>produkt: {product.name}</Col>
                                        <Col className='search__details-col' md='auto'>cena: {product.price} zł</Col>
                                        <Col className='search__details-col' md='auto'>waga opakowania: {product.capacity} kg</Col>
                                        <Button className="search__add-item-btn" onClick={() => { clickAddToCartHandler(sellersArr[chosenSeller].id, product.name, product.price) }} variant="outline-success">
                                            <FaShoppingCart />  dodaj do koszyka
                                        </Button>
                                    </Row>
                                ))}

                            </Row>
                        </div>
                }
            </Container>

        </div>
    )
}

export default SearchProduct
