import React, { FC, useState } from "react";
import { Alert } from "react-bootstrap";
import { AlertType } from "../store/uiData/dataTypes";

const AlertMessage: FC<AlertType> = ({ type, heading, msg }) => {
  const [show, setShow] = useState(true);

  return (
    <Alert
      className="alertMsg"
      show={show}
      variant={type}
      onClose={() => setShow(false)}
      dismissible
    >
      <Alert.Heading>{heading}</Alert.Heading>
      <p>{msg}</p>
    </Alert>
  );
};

export default AlertMessage;
