import React from "react";

export default function ImpressionProduct(props) {
  const { image, title } = props;
  return (
    <article className="impression">
      <img src={image} alt={title} />
      <h3>{title}</h3>
    </article>
  );
}
