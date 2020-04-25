import React from "react";
import "./Categories.scss";

export default function Categories(props) {
  return (
    <section className="categories">
      <h2 className="main__heading">Categories</h2>
      <div className="categories__item">
        <span>Tất cả dòng máy</span>
      </div>
      <div className="categories__item">
        <span>iPhone</span>
      </div>
      <div className="categories__item">
        <span>Samsung</span>
      </div>
      <div className="categories__item">
        <span>Oppo</span>
      </div>
      <div className="categories__item">
        <span>Xiaomi</span>
      </div>
      <div className="categories__item">
        <span>Ốp Lưng</span>
      </div>
      <div className="categories__item">
        <span>Tai Nghe</span>
      </div>
    </section>
  );
}
