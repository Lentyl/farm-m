import React, { FC, FormEvent, useEffect, useState } from "react";
import { Form, Button, Col, Container, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/actions/authAction";
import { setLoading } from "../store/actions/loggedActions";
import { RootState } from "../store";

const Login: FC = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const { authentication } = useSelector((state: RootState) => state.auth);
  //const { loading } = useSelector((state: RootState) => state.logged);

  const submitHandler = (e: FormEvent): void => {
    e.preventDefault();
    setLoading(true);
    dispatch(login({ email, password }));
    setPassword("");
    setEmail("");
  };

  useEffect(() => {
    if (authentication) {
      setLoading(false);
    }
  }, [authentication]);

  return (
    <div className="login">
      {authentication ? (
        <Container className="login__container" fluid>
          <h2 className="login__title">Witamy jesteś zalogowany.</h2>
        </Container>
      ) : (
        <Container className="login__container" fluid>
          <Form onSubmit={submitHandler}>
            <Form.Row>
              <Form.Group as={Col} md="6" controlId="validationCustom02">
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
              <Form.Group as={Col} md="6" controlId="validationCustom02">
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
            <Button
              className="login__btn"
              variant="outline-success"
              type="submit"
            >
              {loading && !authentication ? (
                <Spinner animation="border" variant="primary" size="sm" />
              ) : (
                "Zatwierdź"
              )}
            </Button>
          </Form>
        </Container>
      )}
    </div>
  );
};

export default Login;
