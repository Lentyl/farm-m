import React, { FC, FormEvent, useState, useEffect } from "react";
import { Form, Button, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux"
import { businessSignup } from "../store/actions/authAction";
import { authenticationSetup } from "../store/actions/authAction";

import { setError } from "../store/actions/authAction";
import { RootState } from "../store";


const Business: FC = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [postcode, setPostcode] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [permission, setPermission] = useState(false);



  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { authentication, error } = useSelector((state: RootState) => state.auth);

  /*  {authentication}  = useSelector((state: RootState) => state.auth);

 useEffect(()={
 
 }, []) */


  useEffect(() => {
    return () => {
      if (error) {
        dispatch(setError(""));
      }
    };
  }, [error, dispatch]);


  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    dispatch(businessSignup({ name, password, email, postcode, city, street }, () => setLoading(false)))

    setName('');
    setPassword('');
    setEmail('');
    setPostcode('');
    setCity('');
    setStreet('');
    setPermission(false);


  }

  return (
    <div className="sign-up">
      { authentication ? (
        <Container className="sign-up__container" fluid>
          <h2 className='login__title'>Witamy rejestracja powiodła się.</h2>
          <Button variant="outline-success" onClick={(e) => { dispatch(authenticationSetup({ authentication })) }}>
            Zatwierdź
          </Button >

        </Container>
      )
        : (<Container className="sign-up__container" fluid>
          <Form onSubmit={submitHandler}>
            <Form.Row>
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Control required type="text" placeholder="Imie" value={name} onChange={(e) => { setName(e.currentTarget.value) }} />
                <Form.Control.Feedback>Wygląda dobrze!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Control required type="password" placeholder="hasło" value={password} onChange={(e) => { setPassword(e.currentTarget.value) }} />
                <Form.Control.Feedback>Wygląda dobrze!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                as={Col}
                md="4"
                controlId="validationCustomUsername"
              >
                <Form.Control required type="email" placeholder="e-mail" value={email} onChange={(e) => { setEmail(e.currentTarget.value) }} />
                <Form.Control.Feedback>Wygląda dobrze!</Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Label>Będzie to domyślny adres.</Form.Label>
            <Form.Row>

              <Form.Group as={Col} md="3" controlId="validationCustom05">
                <Form.Control type="text" placeholder="Kod pocztowy" required value={postcode} onChange={(e) => { setPostcode(e.currentTarget.value) }} />
                <Form.Control.Feedback type="invalid">
                  Proszę wpisać kod pocztowy
              </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationCustom03">
                <Form.Control type="text" placeholder="Miasto" required value={city} onChange={(e) => { setCity(e.currentTarget.value) }} />
                <Form.Control.Feedback type="invalid">
                  Proszę wpisać Miasto
              </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationCustom04">
                <Form.Control type="text" placeholder="Ulica / nr domu" required value={street} onChange={(e) => { setStreet(e.currentTarget.value) }} />
                <Form.Control.Feedback type="invalid">
                  Proszę wpisać ulicę
              </Form.Control.Feedback>
              </Form.Group>

            </Form.Row>
            <Form.Group>
              <Form.Check
                required
                label="Zgadzam się na warunki portalu Farm-Market"
                feedback="Musisz się zgodzić na warunki."
                onChange={() => { setPermission(!permission) }}
              />
            </Form.Group>
            <Button variant="outline-success" type="submit">
              Zatwierdź
          </Button>
          </Form>
        </Container>)}

    </div>
  );
};

export default Business;
