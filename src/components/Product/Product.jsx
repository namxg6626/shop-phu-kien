import React from "react";
import { Link } from "react-router-dom";
import "./Product.scss";

export default function Product(props) {
  const { linkImage, name, price, id } = props;

  return (
    <article className="product">
      <div
        className="product__img"
        title={name}
        style={{ backgroundImage: `url(${linkImage})` }}
      />
      <p className="product__name">
        <Link to={`id/${id}`}>{name}</Link>
      </p>
      <p className="product__price">{price}.000đ</p>
    </article>
  );
}
