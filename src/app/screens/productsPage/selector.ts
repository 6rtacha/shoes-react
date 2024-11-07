import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";

const selectProductsPage = (state: AppRootState) => state.productPage;

export const retrieveRestaurant = createSelector(
  selectProductsPage,
  (productsPage) => productsPage.restaurant
);

export const retrieveChosenProduct = createSelector(
  selectProductsPage,
  (productsPage) => productsPage.chosenProduct
);

export const retrieveProducts = createSelector(
  selectProductsPage,
  (productsPage) => productsPage.products
);
