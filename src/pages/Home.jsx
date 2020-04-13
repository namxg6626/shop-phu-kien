import React from "react";
import Banner from "../components/Banner";
import ImpresstionProduct from "../components/ImpressionProduct";
import impressionImage from "../assets/impression/impression_product.jpg";

export default function Home() {
  const impressions = [
    {
      image: impressionImage,
      title: "Lorem ipsum dolor sit amet consectetur, adipisicing elit",
    },
    {
      image: impressionImage,
      title: "Lorem ipsum dolor sit amet consectetur, adipisicing elit",
    },
    {
      image: impressionImage,
      title: "Lorem ipsum dolor sit amet consectetur, adipisicing elit",
    },
  ];

  return (
    <div className="home">
      <Banner />
      {/* impression product */}
      <div className="home__container">
        {impressions.map((impression, id) => (
          <ImpresstionProduct
            key={id}
            title={impression.title}
            image={impression.image}
          />
        ))}
      </div>
      <div className="home__container"></div>
    </div>
  );
}
