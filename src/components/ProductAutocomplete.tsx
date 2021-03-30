import React, { FC, useState, useEffect } from "react";
import { productList } from "../store/uiData/lists";

interface IProductAutocompleteProps {
  getSelectedProduct: (selectedProduct: string) => void | undefined;
  productChosen?: boolean;
}

const ProductAutocomplete: FC<IProductAutocompleteProps> = ({
  getSelectedProduct,
  productChosen,
}) => {
  const [selected, setSelected] = useState(false);
  const [productName, setProductName] = useState("");
  const [mousOn, setMousOn] = useState(false);

  useEffect(() => {
    if (productChosen) {
      setProductName("");
    }
  }, [productChosen]);

  const searchedProduct = productList.map((product, i) => {
    const nameNumber = product
      .toLocaleLowerCase()
      .search(productName.toLocaleLowerCase());
    if (nameNumber === 0) {
      return (
        <li
          className="product-autocomplete__product"
          onClick={() => {
            selectedProduct(product);
          }}
          key={i}
        >
          {product}
        </li>
      );
    }
    return null;
  });

  const selectedProduct = (product: string): void => {
    setProductName(product);
    getSelectedProduct(product);
    setSelected(true);
  };

  return (
    <div className="product-autocomplete">
      <input
        className="product-autocomplete__input"
        onChange={(e) => {
          setProductName(e.currentTarget.value);
        }}
        onClick={() => {
          setSelected(false);
          getSelectedProduct("");
        }}
        onBlur={() => {
          !mousOn && setSelected(true);
        }}
        required
        autoComplete="off"
        type="text"
        placeholder="produkt"
        value={productName}
      />
      <ul
        className="product-autocomplete__list-container"
        onMouseMove={() => setMousOn(true)}
        onMouseOut={() => setMousOn(false)}
      >
        {productName.length !== 0 && !selected && searchedProduct}
      </ul>
    </div>
  );
};

export default ProductAutocomplete;
