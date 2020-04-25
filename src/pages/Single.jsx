import React, { useEffect, useState } from "react";
import Categories from "../components/Categories";
import SpecificationsTable from "../components/SpecificationsTable";

export default function Single(props) {
  const _API = "http://192.168.0.102:4000";
  const [product, setProduct] = useState({});
  const {
    match: {
      params: { id },
    },
  } = props;

  const specLabels = [
    { name: "Tên sản phẩm" },
    { brand: "Tên hãng" },
    { material: "Chất liệu" },
    { warranty: "Số tháng bảo hành" },
    { mfgDate: "Ngày sản xuất" },
    { compatibility: "Khả năng tương thích" },
  ];

  useEffect(() => {
    (async function fetchData() {
      const response = await fetch(`${_API}/shopnguyenxa?id=${id}`);
      const json = await response.json();
      const [newState] = json;
      console.log(...json);
      setProduct(newState);
    })();
  }, []);

  return (
    <main className="main">
      <div className="main__container">
        <section className="single">
          <div className="single__container">
            <div className="single__img">
              <img src={product.linkImage} alt={product.name} />
            </div>
          </div>
          <div className="single__container">
            <div className="single__col">
              <h2 className="single__heading">{product.name}</h2>
            </div>
            <div className="single__col">
              <p className="single__price">
                Giá bán: <span>{product.price}.000</span>
              </p>
            </div>
            <div className="single__col">
              <button className="btn--orange">Mua ngay</button>
              <button className="btn--primary">Thêm vào giỏ</button>
            </div>
          </div>
          <div className="single__container" style={{ flexBasis: "100%" }}>
            <SpecificationsTable
              specLabels={specLabels}
              specInformations={product}
            />
          </div>
        </section>
        <Categories />
      </div>
    </main>
  );
}
