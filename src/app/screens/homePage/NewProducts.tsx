import React from "react";
import { Box, Container, Stack } from "@mui/material";
import { CssVarsProvider } from "@mui/joy";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "../../components/divider";
import Typography from "@mui/joy/Typography";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { Product } from "../../../lib/types/product";
import { retrieveNewProducts } from "./selector";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";

/** Redux Slice & Selector */
const newProductsRetriever = createSelector(
  retrieveNewProducts,
  (newProducts) => ({
    newProducts,
  })
);

export default function NewProducts() {
  const { newProducts } = useSelector(newProductsRetriever);

  const history = useHistory();
  const choosenProductHandler = (id: string) => {
    history.push(`/products/${id}`);
  };

  console.log("newProducts:", newProducts);
  return (
    <div className={"new-products-frame"}>
      <Container>
        <Stack className={"main"}>
          <Box className={"category-title"}>Fresh Menu</Box>
          <Stack className={"cards-frame"}>
            <CssVarsProvider>
              {newProducts.length !== 0 ? (
                newProducts.map((product) => {
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  const sizeVolume =
                    product.productCollection === ProductCollection.CASUAL
                      ? product.productVolume + "l"
                      : product.productSize + "size";
                  return (
                    <Card
                      key={product._id}
                      variant="outlined"
                      className={"card"}
                      onClick={() => choosenProductHandler(product._id)}
                    >
                      <CardOverflow>
                        <div className="product-sale">{sizeVolume}</div>
                        <AspectRatio ratio="1">
                          <img src={imagePath} alt="" />
                        </AspectRatio>
                      </CardOverflow>

                      <CardOverflow variant="soft" className={"product-detail"}>
                        <Stack className="info">
                          <Stack flexDirection={"row"}>
                            <Typography className={"title"}>
                              {product.productName}
                            </Typography>
                            <Divider width="2" height="24" bg="#d9d9d9" />
                            <Typography className={"price"}>
                              ${product.productPrice}
                            </Typography>
                          </Stack>

                          <Stack>
                            <Typography className={"views"}>
                              {product.productViews}
                              <VisibilityIcon
                                sx={{ fontSize: 20, marginLeft: "5px" }}
                              />
                            </Typography>
                          </Stack>
                        </Stack>
                      </CardOverflow>
                    </Card>
                  );
                })
              ) : (
                <Box className="no-data">New products are not available!</Box>
              )}
            </CssVarsProvider>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
