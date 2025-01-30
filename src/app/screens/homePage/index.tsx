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
import { Route, Router, Switch, useRouteMatch } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";
import ChosenProduct from "../productsPage/ChosenProduct";

/** Redux Slice & Selector */
const actionDispatch = (dispatch: Dispatch) => ({
  setPopularProducts: (data: Product[]) => dispatch(setPopularProducts(data)),
  setNewProducts: (data: Product[]) => dispatch(setNewProducts(data)),
  setTopUsers: (data: Member[]) => dispatch(setTopUsers(data)),
});

interface HomePageProps {
  onAdd: (item: CartItem) => void;
}

export default function HomePage(props: HomePageProps) {
  const {
    setPopularProducts: setPopularProducts,
    setNewProducts: setNewProducts,
    setTopUsers,
  } = actionDispatch(useDispatch());

  const { onAdd } = props;
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
      <Switch>
        <Route path={`${products.path}`}>
          <PopularProducts />
        </Route>
        <Route path={`${products.path}/:productId`}>
          <ChosenProduct onAdd={onAdd} />
        </Route>
      </Switch>
      <Switch>
        <Route path={`${products.path}`}>
          <NewProducts />
        </Route>
        <Route path={`${products.path}/:productId`}>
          <ChosenProduct onAdd={onAdd} />
        </Route>
      </Switch>

      <Advertisement />
      <ActiveUsers />
      <Events />
    </div>
  );
}
