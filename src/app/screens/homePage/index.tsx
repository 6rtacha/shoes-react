import React, { useEffect } from "react";
import Statistics from "./Statistics";
import PopularProducts from "./PopularProducts";
import NewProducts from "./NewProducts";
import Advertisement from "./Advertisement";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";
import "../../../css/home.css";

import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setNewProducts, setPopularProducts, setTopUsers } from "./slice";
import { Product } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import MemberService from "../../services/MemberService";
import { Member } from "../../../lib/types/member";
import { Route, Switch, useRouteMatch } from "react-router-dom";

/** Redux Slice & Selector */
const actionDispatch = (dispatch: Dispatch) => ({
  setPopularProducts: (data: Product[]) => dispatch(setPopularProducts(data)),
  setNewProducts: (data: Product[]) => dispatch(setNewProducts(data)),
  setTopUsers: (data: Member[]) => dispatch(setTopUsers(data)),
});

export default function HomePage() {
  const {
    setPopularProducts: setPopularProducts,
    setNewProducts: setNewProducts,
    setTopUsers,
  } = actionDispatch(useDispatch());
  const products = useRouteMatch();

  useEffect(() => {
    // // Backend server data request => Data
    const product = new ProductService();
    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "productViews",
        productCollection: ProductCollection.CASUAL,
      })
      .then((data) => {
        setPopularProducts(data);
      })
      .catch((err) => console.log(err));

    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "createdAt",
        productCollection: ProductCollection.CASUAL,
      })
      .then((data) => {
        setNewProducts(data);
      })
      .catch((err) => console.log(err));

    const member = new MemberService();
    member
      .getTopUsers()
      .then((data) => setTopUsers(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={"homepage"}>
      <Statistics />
      <PopularProducts />
      <NewProducts />
      <Advertisement />
      <ActiveUsers />
      <Events />
    </div>
  );
}
