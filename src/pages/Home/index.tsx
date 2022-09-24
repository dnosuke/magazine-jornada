import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import PrimarySearchAppBar from "../../components/PrimaryNavbar";
import ProductInHome from "../../components/ProductInHome";
import { useAuthContext } from "../../shared/contexts";
import { Product } from "../../types/product";
import { PRODUCTS } from "./mock";

function Home() {
  const [data, setData] = useState<Product[]>([
    {
      id: 0,
      title: "",
      description: "",
      quantity: 0,
      price: 0,
      picture: "",
    },
  ]);
  const { getAllProducts } = useAuthContext();

  useEffect(() => {
    getAllProducts().then((result) => {
      if (result) {
        setData(result);
      }
    });
  }, []);

  return (
    <>
      <PrimarySearchAppBar />
      <h1>Home</h1>

      <Box sx={{ display: 'flex', justifyContent:"center",
          alignItems: "center" }}>
        <Box sx={{ flexGrow: 1,  maxWidth: '80%', }} >
        <Grid
          container
          rowSpacing={2}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          direction="row"
          alignItems="center"
          >
          {PRODUCTS.map((product, index) => (
            <Grid key={index} item xs={"auto"}>
              <ProductInHome {...product} />
            </Grid>
          ))}
          {data.map((product, index) => (
            <Grid key={index} item xs={"auto"}>
              <ProductInHome {...product} />
            </Grid>
          ))}
        </Grid>
          </Box>    
      </Box>
    </>
  );
}

export default Home;
