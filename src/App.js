import React from "react";
import Container from "./components/Container";
// import employees from "./employees.json";
import API from "./utils/API";
import Jumbotron from "./components/Jumbotron";
import Table from "./components/Table";

function App() {
  return (
    <Container>
      <Jumbotron />
      <Table data={API} />
    </Container>
  );
}

export default App;
