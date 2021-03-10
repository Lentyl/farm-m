import React, { FC, useEffect } from "react";
import SearchProducts from "../components/SearchProduct";
import { useDispatch } from "react-redux";
import { updateUrl } from "../store/actions/loggedActions";

const Products: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateUrl(window.location.pathname));
  }, []);
  return (
    <div className="products">
      <SearchProducts />
    </div>
  );
};

export default Products;
