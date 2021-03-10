import React, { FC, useState, FormEvent, useEffect } from "react";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { sendPasswordResetEmail } from "../store/actions/authAction";
import { RootState } from "../store";

const ForgotPassword: FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await dispatch(sendPasswordResetEmail(email));
    setLoading(false);
    setEmail("");
  };

  return (
    <div className="forgot-password">
      <Container className="forgot-password__container">
        <h2 className="forgot-password__header">Reset password</h2>
        <Form
          className="forgot-password__form-container"
          onSubmit={submitHandler}
        >
          <Form.Control
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            placeholder="email address"
          />
          <Button
            className="forgot-password__btn"
            variant="outline-success"
            size="sm"
            type="submit"
          >
            {loading ? (
              <Spinner animation="border" variant="primary" size="sm" />
            ) : (
              "Zatwierdź hasło"
            )}
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default ForgotPassword;
