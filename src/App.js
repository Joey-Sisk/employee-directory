import React from "react";
import Container from "./components/Container";
import employees from "./employees.json";
import Jumbotron from "./components/Jumbotron";
import Table from "./components/Table";

function App() {
  return (
    <Container>
      <Jumbotron />
      <Table data={employees} />
    </Container>
  );
}

export default App;
