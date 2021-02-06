import * as React from "react";
import { useState, useEffect } from "react";
import { Link as LinkB } from "react-router-dom";
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
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../store/actions/loggedActions";
import {
  signout,
  authenticationSetup,
  setUser,
} from "../store/actions/authAction";
import { FaShoppingCart } from "react-icons/fa";
import { GiCarrot } from "react-icons/gi";

const Header: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [serch, setSerch] = useState(false);

  let { authentication } = useSelector((state: RootState) => state.auth);
  const { user } = useSelector((state: RootState) => state.auth);
  const { cartAmount } = useSelector((state: RootState) => state.logged);

  const dispatch = useDispatch();

  const logoutHandler = (): void => {
    dispatch(signout());
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      authentication = !!user;
      console.log(user!.uid);
      dispatch(authenticationSetup({ authentication }));
      dispatch(setUser(user!.uid));
    });

    const path = window.location.pathname;

    if (path === "/" || path === "/products") {
      setSerch(true);
    }
  }, []);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const search = searchValue.toLowerCase();
    dispatch(getProducts(search));

    setSearchValue("");
  };

  return (
    <header className="header">
      <Navbar
        className="header__navbar"
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
      >
        <Navbar.Brand className="header__logo">
          <LinkB to="/">
            <GiCarrot className="header__logo-icon" />
          </LinkB>
          <LinkB className="header__logo-inscription" to="/">
            Farm-Market
          </LinkB>
        </Navbar.Brand>
        <Navbar.Toggle
          className="sign-up__container"
          aria-controls="responsive-navbar-nav"
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="header__log-container mr-auto">
            {authentication ? (
              <Button
                className="header__signout-btn"
                variant="outline-danger"
                size="sm"
                onClick={logoutHandler}
              >
                Wyloguj się
              </Button>
            ) : (
              <NavDropdown
                title="Logowanie/rejestracja"
                id="collasible-nav-dropdown"
              >
                <NavDropdown.Item className="header__dropdown-item">
                  <LinkB className="header__link-dropdown" to="/login">
                    Logowanie{" "}
                  </LinkB>
                </NavDropdown.Item>
                <NavDropdown.Item className="header__dropdown-item">
                  <LinkB className="header__link-dropdown" to="/sign-up">
                    Rejestracja{" "}
                  </LinkB>
                </NavDropdown.Item>
              </NavDropdown>
            )}
            <LinkB className="header__link" to="/products">
              Kupujesz
            </LinkB>
            {authentication ? (
              <LinkB className="header__link" to="/user">
                Panel
              </LinkB>
            ) : (
              <LinkB className="header__link" to="/business-sign-up">
                Sprzedajesz
              </LinkB>
            )}
          </Nav>

          {serch && (
            <Form
              className="header__search-form"
              onSubmit={submitHandler}
              inline
            >
              <FormControl
                className="mr-sm-3 header_search-input"
                size="sm"
                type="text"
                placeholder="wyszukaj produkt"
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.currentTarget.value);
                }}
              />
              <Button
                className="header__search-button"
                variant="outline-success"
                type="submit"
              >
                Szukaj
              </Button>
            </Form>
          )}

          <Nav className="header__cart-container">
            <LinkB className="header__cart-link" to="/cart">
              <FaShoppingCart className="header__cart-icon" />
              <div className="header__cart-item-counter">{cartAmount}</div>
            </LinkB>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
