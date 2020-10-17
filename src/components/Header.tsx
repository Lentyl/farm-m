import * as React from "react";
import { useState, useEffect } from "react";
import * as firebase from "firebase";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux"
import { signout, authenticationSetup } from '../store/actions/authAction';
import { FaShoppingCart } from "react-icons/fa";
import { GiCarrot } from "react-icons/gi";

const Header: React.FC = () => {
  const [cartItemCounter, setCartItemCounter] = useState(2);

  let { authentication } = useSelector((state: RootState) => state.auth);
  const { user } = useSelector((state: RootState) => state.auth);
  console.log(user);

  const dispatch = useDispatch();


  const logoutHandler = (): void => {
    dispatch(signout());
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      authentication = !!user;
      dispatch(authenticationSetup({ authentication }))
    });

  }, [])



  return (
    <header className="header">
      <Navbar
        className="header__navbar"
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
      >
        <Navbar.Brand className="header__logo" href="/">
          <GiCarrot className="header__logo-icon" />
          <div className="header__logo-inscription">Farm-Market</div>
        </Navbar.Brand>
        <Navbar.Toggle
          className="header__nav-button"
          aria-controls="responsive-navbar-nav"
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            {authentication ? (<Button variant="outline-danger" size='sm' onClick={logoutHandler}>
              Wyloguj się</Button>) : (<NavDropdown
                title="Logowanie/rejestracja"
                id="collasible-nav-dropdown"
              >
                <NavDropdown.Item href="login">Logowanie</NavDropdown.Item>
                <NavDropdown.Item href="sign-up">Rejestracja</NavDropdown.Item>
              </NavDropdown>)}
            <Nav.Link href="products">Oferta</Nav.Link>
            {authentication ? (<Nav.Link href="user">Panel</Nav.Link>) : (<Nav.Link href="business-sign-up">Sprzedajesz</Nav.Link>)}
          </Nav>

          <Nav className="header__cart-container">
            <Nav.Link className="header__cart-link" href="cart">
              <FaShoppingCart className="header__cart-icon" />
              <div className="header__cart-item-counter">{cartItemCounter}</div>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>

        <Form className="header__search-form" inline>
          <FormControl
            className="mr-sm-3 header_search-input"
            size="sm"
            type="text"
            placeholder="Search"
          />
          <Button className="header__search-button" variant="outline-success">
            Szukaj
          </Button>
        </Form>
      </Navbar>
    </header>
  );
};

export default Header;
