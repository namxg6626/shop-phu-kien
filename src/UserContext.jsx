import React, { useState } from "react";

export const UserContext = React.createContext();

export function UserProvider(props) {
  const _API = "http://localhost:8000";

  // initialize cart
  const saveCartToLocalStorage = (cartObj) => {
    localStorage.setItem("cart", JSON.stringify(cartObj));
  };

  const getCartFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem("cart"));
  };

  const localStorageCart = getCartFromLocalStorage() || {
    idSet: [],
    productsList: [],
  };
  const [cart, setCart] = useState(() => localStorageCart);
  const [tokens, setTokens] = useState(() => {
    return {
      token: "aaa",
      refreshToken: "aaa",
    };
  });
  // end ===================

  const refreshTokens = async () => {
    const res = await fetch(`${_API}/refresh-token`, {
      method: "POST",
      body: JSON.stringify(tokens),
      headers: {
        "Content-type": "application/json",
      },
    });

    // refresh token when the access token is expired
    const json = await res.json();
    return json;
  };

  const addItem = (product) => {
    if (cart.idSet.includes(product.id)) {
      const msg =
        "Sản phẩm đã có trong giỏ hàng\nHãy thay đổi số lượng ở trong giỏ hàng";
      alert(msg);
    } else {
      product.quantity = 1;

      const newCart = {
        idSet: [...cart.idSet, product.id],
        productsList: [...cart.productsList, product],
      };

      setCart(newCart);
      saveCartToLocalStorage(newCart);
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

        const newCart = {
          idSet: cart.idSet,
          productsList: newProductsList,
        };

        setCart(newCart);
        saveCartToLocalStorage(newCart);
        return;
      }
  };

  const deleteItem = (id) => {
    const newProductsList = cart.productsList.filter((inCartProduct) => {
      return inCartProduct.id !== id;
    });

    const newIdSet = cart.idSet.filter((x) => {
      return x !== id;
    });

    const newCart = {
      idSet: newIdSet,
      productsList: newProductsList,
    };

    setCart(newCart);
    saveCartToLocalStorage(newCart);
  };

  const resetCart = () => {
    const emptyCart = {
      idSet: [],
      productsList: [],
    };

    saveCartToLocalStorage(emptyCart);
    setCart(emptyCart);
  };

  return (
    <UserContext.Provider
      value={{
        cart,
        addItem,
        changeQuantity,
        deleteItem,
        tokens,
        setTokens,
        refreshTokens,
        resetCart,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
