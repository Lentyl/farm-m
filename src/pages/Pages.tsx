import React, { FC } from "react";
import { Route, Switch } from "react-router-dom";
import MainPage from "./MainPage";
import Login from "./Login";
import SignUp from "./SignUp";
import Business from "./Business";
import UserPanel from "./UserPanel";
import Products from "./Products";
import ForgotPassword from "./ForgotPassword";
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
        <Route path="/user" exact component={UserPanel} />
        <Route path="/products" exact component={Products} />
        <Route path="/cart" exact component={Cart} />
        <Route path="/order-details/:date" exact component={OrderDetails} />
        <Route path="/forgot-password" exact component={ForgotPassword} />
      </Switch>
    </div>
  );
};

export default Pages;
