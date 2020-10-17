import React, { FC, FormEvent, useState } from "react";
import { Form, Button, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/actions/authAction';
import { RootState } from "../store";


const Login: FC = () => {

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { authentication } = useSelector((state: RootState) => state.auth);


  const submitHandler = (e: FormEvent): void => {
    e.preventDefault();
    dispatch(login({ password, email }));
    setPassword('');
    setEmail('');
  }

  return <div className="login">
    {authentication ? (<Container className="login__container" fluid><h2 className='login__title'>Witamy jesteś zalogowany.</h2></Container>)
      :
      (<Container className="login__container" fluid>
        <Form onSubmit={submitHandler}>
          <Form.Row>
            <Form.Group as={Col} md="6" controlId="validationCustom02">
              <Form.Control required type="password" placeholder="hasło" value={password} onChange={(e) => { setPassword(e.currentTarget.value) }} />
              <Form.Control.Feedback>Wygląda dobrze!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustom02">
              <Form.Control required type="email" placeholder="e-mail" value={email} onChange={(e) => { setEmail(e.currentTarget.value) }} />
              <Form.Control.Feedback>Wygląda dobrze!</Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Button variant="outline-success" type="submit">
            Zatwierdź
          </Button>
        </Form>
      </Container>)}

  </div>;
};

export default Login;
