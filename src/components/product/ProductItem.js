import React from "react";
import classes from "./ProductItem.module.css";
export const ProductItem = (props) => {
  return (
    <li className={classes.item}>
      <h2>{props.title}</h2>
      <img src={props.img} alt={`نصویر یک ${props.title}`} />
      <span
        dangerouslySetInnerHTML={{ __html: props.about }}
        className={classes.about}
      ></span>
      <span className={classes.price}>{props.price}</span>
    </li>
  );
};
