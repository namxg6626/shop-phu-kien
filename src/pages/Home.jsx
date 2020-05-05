import React, { useState, useEffect } from "react";
import Banner from "../components/Banner";
import ImpressiveProduct from "../components/ImpressiveProduct";
import impressionImage from "../assets/impression/impression_product.jpg";
import Product from "../components/Product";
import Categories from "../components/Categories";
import Paginate from "../components/Paginate";

export default function Home(props) {
  const impressions = [
    {
      image: impressionImage,
      title: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      image: impressionImage,
      title: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      image: impressionImage,
      title: "Lorem ipsum dolor sit amet consectetur",
    },
  ];

  const _API = "http://localhost:8000";
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

  useEffect(() => {
    (async function fetchData() {
      const response = await fetch(`${_API}/products/page/${page}`);
      const json = await response.json();
      setProducts(json.products);
      setMaxPage(json.maxPage);
    })();
    return;
  }, [page]);

  return (
    <main className="main">
      <Banner />
      <div className="main__container">
        {impressions.map((impression, id) => (
          <ImpressiveProduct
            key={id}
            title={impression.title}
            image={impression.image}
          />
        ))}
        {/* {(function renderImpressiveProduct() {
          if (products.length === 0) return;
          const ImpressiveProducts = [];
          for (let i = 0; i < 3; i++)
            ImpressiveProducts.push(
              <ImpressiveProduct
                key={products[i].id}
                title={products[i].name}
                image={products[i].linkImage}
              />
            );
          return ImpressiveProducts;
        })()} */}
      </div>
      <div className="main__container">
        <section className="products">
          <h2 className="main__heading" style={{ flexBasis: "100%" }}>
            Deals of the day
          </h2>
          {products.map((product, index) => {
            let { linkImage, name, price, id } = product;
            return (
              <Product
                key={index}
                linkImage={linkImage}
                name={name}
                price={price}
                id={id}
              />
            );
          })}
        </section>
        <Categories />
        <Paginate maxPage={maxPage} setPage={setPage} page={page} />
      </div>
    </main>
  );
}
