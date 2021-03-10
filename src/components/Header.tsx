import * as React from "react";
import { useState, useEffect } from "react";
import { Link as LinkB } from "react-router-dom";
import * as firebase from "firebase";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  Button,
  Spinner,
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
import ProductAutocomplete from "./ProductAutocomplete";

const Header: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchInputDisplay, setSearchInputDisplay] = useState(false);
  const [loading, setLoading] = useState(false);

  let { authentication } = useSelector((state: RootState) => state.auth);
  const { cartAmount, url } = useSelector((state: RootState) => state.logged);

  const dispatch = useDispatch();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      authentication = !!user;
      dispatch(authenticationSetup({ authentication }));
      dispatch(setUser(user!.uid));
    });
  }, []);

  useEffect(() => {
    if (url === "/" || url === "/products") {
      setSearchInputDisplay(true);
    } else {
      setSearchInputDisplay(false);
    }
  }, [url]);

  useEffect(() => {
    if (!authentication) setLoading(false);
  }, [authentication]);

  const logoutHandler = (): void => {
    setLoading(true);
    dispatch(signout());
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const search = searchValue.toLowerCase();
    dispatch(getProducts(search));
  };

  const getSelectedProduct = (product: string) => {
    setSearchValue(product);
  };

  return (
    <header className="header">
      <Navbar
        className="header__navbar"
        collapseOnSelect
        expand="xl"
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
                {loading && authentication ? (
                  <Spinner animation="border" variant="primary" size="sm" />
                ) : (
                  "Wyloguj się"
                )}
              </Button>
            ) : (
              <NavDropdown
                title="Logowanie/rejestracja"
                id="collasible-nav-dropdown"
              >
                <NavDropdown.Item className="header__dropdown-item">
                  <LinkB className="header__link-dropdown" to="/login">
                    Logowanie
                  </LinkB>
                </NavDropdown.Item>
                <NavDropdown.Item className="header__dropdown-item">
                  <LinkB className="header__link-dropdown" to="/sign-up">
                    Rejestracja
                  </LinkB>
                </NavDropdown.Item>
              </NavDropdown>
            )}
            <LinkB
              className={`header__link ${
                !authentication && "header__loged-link"
              }`}
              to="/products"
            >
              Kupujesz
            </LinkB>
            {authentication ? (
              <LinkB className="header__link" to="/user">
                Panel
              </LinkB>
            ) : (
              <LinkB
                className={`header__link ${
                  !authentication && "header__loged-link"
                }`}
                to="/business-sign-up"
              >
                Sprzedajesz
              </LinkB>
            )}
          </Nav>
          {searchInputDisplay && (
            <Form
              className="header__search-form"
              onSubmit={submitHandler}
              inline
            >
              <ProductAutocomplete getSelectedProduct={getSelectedProduct} />
              <Button
                className="header__search-button"
                variant="outline-success"
                type="submit"
              >
                Szukaj
              </Button>
            </Form>
          )}
          <Nav
            className={`header__cart-container ${
              searchInputDisplay && "search"
            }`}
          >
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
