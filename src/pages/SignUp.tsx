import React, { FC, FormEvent } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../store/actions/authAction";
import { Form, Button, Spinner, Col, Container } from "react-bootstrap";
import { RootState } from "../store";
import { updateUrl } from "../store/actions/loggedActions";

const SignUp: FC = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [permission, setPermission] = useState(false);
  const [loading, setLoading] = useState(false);
  const { authentication } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateUrl(window.location.pathname));
  }, []);

  const submitHandler = (e: FormEvent): void => {
    e.preventDefault();
    setLoading(true);
    dispatch(signUp({ name, password, email }, () => setLoading(false)));
    setName("");
    setPassword("");
    setEmail("");
    setPermission(false);
  };

  return (
    <div className="sign-up">
      {authentication ? (
        <Container className="sign-up__container" fluid>
          <h2 className="login__title">Witamy rejestracja powiodła się.</h2>
        </Container>
      ) : (
        <Container className="sign-up__container" fluid>
          <Form onSubmit={submitHandler}>
            <Form.Row>
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Control
                  required
                  type="text"
                  placeholder="Imie"
                  value={name}
                  onChange={(e) => {
                    setName(e.currentTarget.value);
                  }}
                />
                <Form.Control.Feedback>Wygląda dobrze!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                <Form.Control
                  required
                  type="email"
                  placeholder="e-mail"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.currentTarget.value);
                  }}
                />
                <Form.Control.Feedback>Wygląda dobrze!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Control
                  required
                  type="password"
                  placeholder="hasło"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.currentTarget.value);
                  }}
                />
                <Form.Control.Feedback>Wygląda dobrze!</Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} sm={10}>
                <Form.Check
                  required
                  label="Zgadzam się na warunki portalu Farm-Market"
                  feedback="Musisz się zgodzić na warunki."
                  onChange={() => {
                    setPermission(!permission);
                  }}
                />
              </Form.Group>
              <Form.Group className="sign-up__button-container" as={Col} sm={2}>
                <Button
                  className="sign-up__button"
                  variant="outline-success"
                  type="submit"
                >
                  {loading && !authentication ? (
                    <Spinner animation="border" variant="primary" size="sm" />
                  ) : (
                    "Zatwierdź"
                  )}
                </Button>
              </Form.Group>
            </Form.Row>
          </Form>
        </Container>
      )}
    </div>
  );
};

export default SignUp;
