import { Box } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import PrimarySearchAppBar from "../../components/PrimaryNavbar";
import ProductInHome from "../../components/ProductInHome";

function Home() {
  return (
    <>
      <PrimarySearchAppBar />
      <h1>Home</h1>

      <Box sx={{ flexGrow: 1, m: 5 }} >
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {Array.from(Array(8)).map((_, index) => (
            <Grid xs={4} sm={4} md={3}  key={index}>
              <ProductInHome />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}

export default Home;
