import React, { FC } from "react";
import { Route, Switch } from "react-router-dom";
import MainPage from "./MainPage";
import Login from "./Login";
import SignUp from "./SignUp";
import Business from "./Business";
import User from "./User";
import Products from "./Products";
import Cart from "./Cart";
import OrderDetails from "./OrderDetails";

const Pages: FC = () => {
  return (
    <div className="pages">
      <Switch>
        <Route path="/" exact component={MainPage} />
        <Route path="/login" exact component={Login} />
        <Route path="/sign-up" exact component={SignUp} />
        <Route path="/business-sign-up" exact component={Business} />
        <Route path="/user" exact component={User} />
        <Route path="/products" exact component={Products} />
        <Route path="/cart" exact component={Cart} />
        <Route path="/order-details/:date" exact component={OrderDetails} />
      </Switch>
    </div>
  );
};

export default Pages;
