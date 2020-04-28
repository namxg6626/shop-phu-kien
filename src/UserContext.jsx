import React, { useState } from "react";

export const UserContext = React.createContext();

export function UserProvider(props) {
  const [cart, setCart] = useState({
    idSet: [],
    productsList: [],
  });

  const addProductById = (product) => {
    if (cart.idSet.includes(product.id)) {
      const msg =
        "Sản phẩm đã có trong giỏ hàng\nHãy thay đổi số lượng ở trong giỏ hàng";
      alert(msg);
    } else {
      product.quantity = 1;

      setCart({
        idSet: [...cart.idSet, product.id],
        productsList: [...cart.productsList, product],
      });
    }
  };

  const changeQuantity = (id, number) => {
    for (let product of cart.productsList)
      if (product.id === id) {
        if (product.quantity <= 1 && number === -1) return;

        product.quantity += number;

        const newProductsList = cart.productsList.map((inCartProduct) => {
          if (id === inCartProduct.id) return product;
          return inCartProduct;
        });

        setCart({
          idSet: cart.idSet,
          productsList: newProductsList,
        });

        return;
      }
  };

  const deleteItem = (id) => {
    const newProductsList = cart.productsList.filter((inCartProduct) => {
      if (inCartProduct.id !== id) return inCartProduct;
    });

    const newIdSet = cart.idSet.filter((x) => {
      if (x !== id) return x;
    });

    setCart({
      idSet: newIdSet,
      productsList: newProductsList,
    });
  };

  return (
    <UserContext.Provider
      value={{ cart, addProductById, changeQuantity, deleteItem }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
