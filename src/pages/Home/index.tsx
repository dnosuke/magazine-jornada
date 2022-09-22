import { Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
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

      <Box sx={{ flexGrow: 1, m: 5 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {PRODUCTS.map((product, index) => (
            <Grid xs={4} sm={4} md={3} key={index}>
              <ProductInHome {...product} />
            </Grid>
          ))}
          {data.map((product, index) => (
            <Grid xs={4} sm={4} md={3} key={index}>
              <ProductInHome {...product} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}

export default Home;
