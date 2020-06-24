import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../UserContext";
import minusIcon from "../../assets/icons/minus.png";
import plusIcon from "../../assets/icons/plus.png";
import "./Cart.scss";

const Item = (props) => {
  const { name, linkImage, quantity, price, id } = props;
  const { changeQuantity, deleteItem } = useContext(UserContext);

  return (
    <article className="item">
      <div className="item__img">
        <img src={linkImage} alt="anh" />
      </div>
      <div className="item__brief">
        <div className="item__sub-brief">
          <p className="item__name">
            <Link to={`id/${id}`}>{name}</Link>
          </p>
          <div className="item__additional-info">
            cấu tạo: nhựa, năm sản xuất: 2018
          </div>
        </div>
        <div className="item__sub-brief">
          <div className="item__price">{price}.000</div>
          <div className="item__count">
            <button onClick={() => changeQuantity(id, -1)}>
              <img src={minusIcon} alt="bớt" />
            </button>
            <input type="text" name="count" value={quantity} disabled />
            <button onClick={() => changeQuantity(id, 1)}>
              <img src={plusIcon} alt="thêm" />
            </button>
          </div>
        </div>
      </div>
      <button className="item__delete-btn" onClick={() => deleteItem(id)}>
        <i className="far fa-trash-alt"></i>
      </button>
    </article>
  );
};

export default function Cart(props) {
  const { tokens, resetCart } = useContext(UserContext);
  const _API = "http://localhost:8000";
  const history = useHistory();

  const {
    cart: { productsList: items, idSet },
    refreshTokens,
    setTokens,
  } = useContext(UserContext);

  console.log(items);

  const cartAmount = items.reduce((sum, { quantity }) => {
    return (sum += quantity);
  }, 0);

  const total = items.reduce((sum, product) => {
    return (sum += product.price * product.quantity);
  }, 0);

  const syncCart = async () => {
    const makeRequest = () =>
      fetch(`${_API}/create-cart`, {
        method: "POST",
        body: JSON.stringify({
          token: tokens.token,
          refreshToken: tokens.refreshToken,
          items: items,
          total: total,
        }),
        headers: {
          "Content-type": "application/json",
        },
      });

    const json = await (await makeRequest()).json();
    console.log(json);
    if (json.message === "token expired") {
      const refreshTokenResult = await refreshTokens();
      console.log(refreshTokenResult);
      if (refreshTokenResult.message === "refresh token expired")
        history.push("/login");
      else {
        await setTokens(refreshTokenResult);
        await makeRequest();
        resetCart();
        alert("Đặt hàng thành công!");
      }
    } else {
      resetCart();
      alert("Đặt hàng thành công!");
    }
  };

  return (
    <main className="main">
      <div className="main__container">
        <section className="cart">
          <div className="cart__items">
            {items &&
              items.map((item) => {
                return <Item key={item.id} {...item} />;
              })}
          </div>
          <div className="cart__brief">
            <h3>Thông tin đơn hàng</h3>
            <table border="0" cellSpacing="0">
              <tbody>
                <tr>
                  <td>
                    <p>Số loại sản phẩm</p>
                  </td>
                  <td>{idSet.length}</td>
                </tr>
                <tr>
                  <td>
                    <p>Số sản phẩm</p>
                  </td>
                  <td>{cartAmount}</td>
                </tr>
                <tr>
                  <td>
                    <p>Tổng cộng</p>
                  </td>
                  <td>{total}K đ</td>
                </tr>
              </tbody>
            </table>
            <div className="cart__container">
              <button className="cart__btn" onClick={syncCart}>
                Đặt hàng ngay
              </button>
              {/* <button className="cart__btn--primary">Đồng bộ giỏ hàng</button> */}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
