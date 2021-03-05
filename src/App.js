import React, { Component } from "react";
// import EmployeeCard from "./components/EmployeeCard";
import Wrapper from "./components/Wrapper";
import employees from "./employees.json";
import Jumbotron from "./components/Jumbotron";
import Table from "./components/Table";

class App extends Component {
  state = {
    employees,
  };

  // removeFriend = (id) => {
  //   const employees = this.state.employees.filter((friend) => friend.id !== id);
  //   this.setState({ employes });
  // };

  render() {
    return (
      <Wrapper>
        <Jumbotron />
        <Table
          id={employees.id}
          key={employees.id}
          name={employees.name}
          // image={employee.image}
          title={employees.title}
          location={employees.location}
        />

        {/* {this.state.employee.map((friend) => (
          <EmployeeCard
            removeFriend={this.removeFriend}
            id={friend.id}
            key={friend.id}
            name={friend.name}
            image={friend.image}
            title={friend.title}
            location={friend.location}
          />
        ))} */}
      </Wrapper>
    );
  }
}

export default App;
