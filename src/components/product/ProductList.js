import React from "react";
import classes from "./ProductList.module.css";
import { ProductItem } from "./ProductItem";
export const ProductList = (props) => {
  const content =
    props.items.length > 0 ? (
      props.items.map((item) => (
        <ProductItem
          title={item.title}
          about={item.about}
          id={item.id}
          price={item.price}
          img={item.img}
        />
      ))
    ) : (
      <p>آیتمی برای نمایش وجود ندارد.</p>
    );
  return <ul className={classes["item-list"]}>{content}</ul>;
};
