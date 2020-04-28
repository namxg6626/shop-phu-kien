import React, { useEffect, useState, useContext } from "react";
import Categories from "../components/Categories";
import SpecificationsTable from "../components/SpecificationsTable";
import { UserContext } from "../UserContext";

export default function Single(props) {
  const _API = "http://localhost:4000";
  const [product, setProduct] = useState({});

  const userContext = useContext(UserContext);
  const { addProductById } = userContext;

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
      const { mfgDate } = newState;
      const regex = /([\d]+)-([\d]+)-([\d]+)/;
      // convert datetime mysql to dd/mm/yyyy
      newState.mfgDate = regex.exec(mfgDate).slice(1).reverse().join("/");
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
            <div className="single__row">
              <h2 className="single__heading">{product.name}</h2>
            </div>
            <div className="single__row">
              <p className="single__price">
                Giá bán: <span>{product.price}.000</span>
              </p>
            </div>
            <div className="single__row">
              <button className="btn--orange">Mua ngay</button>
              <button
                className="btn--primary"
                onClick={addProductById.bind(undefined, product)}
              >
                Thêm vào giỏ
              </button>
            </div>
            <div className="single__row">
              <ul className="single__list">
                <li>Bán hàng online toàn quốc</li>
                <li>Giá cạnh tranh nhất thị trường</li>
                <li>
                  Miễn phí giao hàng (bán kính 20Km) cho đơn hàng trị giá lớn
                  hơn 300.000đ
                </li>
                <li>Giao hành trước trả tiền sau (COD)</li>
              </ul>
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
