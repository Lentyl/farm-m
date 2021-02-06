import React, {
  FC,
  FormEvent,
  useState,
  useEffect,
  lazy,
  Suspense,
} from "react";
import { Form, Button, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { businessSignup } from "../store/actions/authAction";
import { loadMapApi } from "../mapUtils/googleMapUtils";

import { setError } from "../store/actions/authAction";
import { RootState } from "../store";
import AddProducts from "../components/AddProducts";
import { Product, LocationLatLng } from "../store/uiData/dataTypes";

import Map from "../components/Map";

const Business: FC = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [postcode, setPostcode] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [permission, setPermission] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [locationLatLng, setlocationLatLng] = useState<LocationLatLng>();

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { authentication, error } = useSelector(
    (state: RootState) => state.auth
  );
  const { mapLoaded } = useSelector((state: RootState) => state.logged);

  useEffect(() => {
    return () => {
      if (error) {
        dispatch(setError(""));
      }
    };
  }, [error, dispatch]);

  const submitHandler = (e: FormEvent): void => {
    e.preventDefault();
    dispatch(
      businessSignup(
        { name, password, email, postcode, city, street, products },
        () => setLoading(false)
      )
    );
    setName("");
    setPassword("");
    setEmail("");
    setPostcode("");
    setCity("");
    setStreet("");
    setPermission(false);
  };

  const getMapAddress = (
    street: string,
    town: string,
    postecode: string,
    locationLatLng?: LocationLatLng
  ): void => {
    // console.log('locationLatLng', locationLatLng);
    if (street || town || postcode) {
      setPostcode(postecode);
      setCity(town);
      setStreet(street);
    }

    setlocationLatLng(locationLatLng);
  };

  const getProducts = (products: Product[]): void => {
    setProducts(products);
  };

  return (
    <div className="sign-up">
      {authentication ? (
        <Container className="sign-up__container" fluid>
          <h2 className="login__title">Witamy rejestracja powiodła się.</h2>
        </Container>
      ) : (
        <Container className="sign-up__container" fluid>
          {mapLoaded && (
            <Map
              mapType={google.maps.MapTypeId.ROADMAP}
              mapTypeControl={true}
              getMapAddress={getMapAddress}
            />
          )}
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
            </Form.Row>
            <Form.Label>Będzie to domyślny adres.</Form.Label>
            <Form.Row>
              <Form.Group as={Col} md="3" controlId="validationCustom05">
                <Form.Control
                  type="text"
                  placeholder="Kod pocztowy"
                  required
                  value={postcode}
                  onChange={(e) => {
                    setPostcode(e.currentTarget.value);
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  Proszę wpisać kod pocztowy
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationCustom03">
                <Form.Control
                  type="text"
                  placeholder="Miasto"
                  required
                  value={city}
                  onChange={(e) => {
                    setCity(e.currentTarget.value);
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  Proszę wpisać Miasto
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationCustom04">
                <Form.Control
                  type="text"
                  placeholder="Ulica / nr domu"
                  required
                  value={street}
                  onChange={(e) => {
                    setStreet(e.currentTarget.value);
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  Proszę wpisać ulicę
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row className="sign-up__business-form-row">
              <Col md={10}>
                <Form.Check
                  required
                  label="Zgadzam się na warunki portalu Farm-Market"
                  feedback="Musisz się zgodzić na warunki."
                  onChange={() => {
                    setPermission(!permission);
                  }}
                />
              </Col>
              <Col md={2}>
                <Button
                  className="sign-up__business-btn"
                  variant="outline-success"
                  type="submit"
                >
                  Zatwierdź
                </Button>
              </Col>
            </Form.Row>
            <AddProducts getProducts={getProducts} />
          </Form>
        </Container>
      )}
    </div>
  );
};

export default Business;
