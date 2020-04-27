import React, { useContext, useState } from "react";
import minusIcon from "../../assets/icons/minus.png";
import plusIcon from "../../assets/icons/plus.png";
import { UserContext } from "../../UserContext";
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
          <p className="item__name">{name}</p>
          <div className="item__additional-info">
            cấu tạo: nhựa, năm sản xuất: 2018
          </div>
        </div>
        <div className="item__sub-brief">
          <div className="item__price">{price}.000</div>
          <div className="item__count">
            <button onClick={changeQuantity.bind(undefined, id, -1)}>
              <img src={minusIcon} alt="bớt" />
            </button>
            <input
              type="text"
              name="count"
              id="count"
              value={quantity}
              disabled
            />
            <button onClick={changeQuantity.bind(undefined, id, 1)}>
              <img src={plusIcon} alt="thêm" />
            </button>
          </div>
        </div>
      </div>
      <button
        className="item__delete-btn"
        onClick={deleteItem.bind(undefined, id)}
      >
        <i className="far fa-trash-alt"></i>
      </button>
    </article>
  );
};

export default function Cart(props) {
  const userContext = useContext(UserContext);
  const {
    cart: { productsList: items, idSet },
  } = userContext;

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
                    <p>Số sản phẩm</p>
                  </td>
                  <td>{idSet.length}</td>
                </tr>
                <tr>
                  <td>
                    <p>Tổng cộng</p>
                  </td>
                  <td>11.200.000đ</td>
                </tr>
              </tbody>
            </table>
            <div className="cart__container">
              <button className="cart__btn">Đặt hàng ngay</button>
              <button className="cart__btn--primary">Tiếp tục mua hàng</button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
