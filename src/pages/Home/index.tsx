import { Box, Button, Checkbox, Container } from "@mui/material";

function Home() {
  return (
    <>
      <div>Home</div>
      <Container>
        <Box alignItems={"center"}>
      <Button color="primary" style={{ backgroundColor: "red" }}>
        Click
      </Button>
      <Checkbox  {...Checkbox} defaultChecked color="error"  />
      </Box>
      </Container>
    </>
  );
}

export default Home;
