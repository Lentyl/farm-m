import React, { FC, useEffect, useState } from 'react'
import { Container, ListGroup, Button, Row, Col, Form } from "react-bootstrap";
import { Order } from '../store/uiData/dataTypes'
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store";
import { RiDeleteBin5Line } from "react-icons/ri";
import {addExtraProduct, deleteProduct} from '../store/actions/loggedActions'


const Cart: FC = () => {

    const [orderArr, setOrderArr] = useState([])
    const [productTypes, setProductTypes] = useState<string[]>()
    const [orderSum, setOrderSum] = useState(0)

    let { order } = useSelector((state: RootState) => state.logged);

    const dispatch = useDispatch();


    useEffect(() => {
     setOrderSum(order.reduce((a, item) => a + item.productPrice*item.productQuantity, 0))
    }, [order])

    const setQantity = () => {

    }


    return (
        <div className='cart'>
            <Container className='cart__container' fluid>
                <Form>
                    <ListGroup className='cart__list-container'>
                        {order && order.map((order, i) => {
                            return (
                                < ListGroup.Item key={i} className='cart__list-item'>
                                    <p className="cart__item-name" >{order.productName}:</p>
                                    <p className="cart__item-price">{order.productPrice} zł </p>
                                    <p className="cart__item-quantity"> x {order.productQuantity}</p>
                                    <Button className="cart__item-add-btn" variant="light" onClick={() => {  dispatch(addExtraProduct(order.productName))}}>+</Button>
                                    
                                    <Button className="cart__item-bin-btn" variant="light" onClick={() => {  dispatch(deleteProduct(order.productName))}}><RiDeleteBin5Line className="cart__item-bin"/></Button>
                                    
                                    <Form.Group controlId="exampleForm.ControlSelect1">
                                      {/*  { <input className="add-product__imput" type='number'  value={capacity} step="1" required placeholder="szt." onFocus={reset} onInput={(e) => setQantity(e.currentTarget.valueAsNumber)} />} */}
                                    </Form.Group>
                                </ ListGroup.Item>
                            )
                        })}
                        <ListGroup.Item className='cart__list-item'>{orderSum!==0?`Łączna kwota: ${orderSum} zł`:`Dodaj produkt do koszyka.`}</ListGroup.Item>
                    </ListGroup>
                </Form>
            </Container>
        </div>
    )
}

export default Cart
