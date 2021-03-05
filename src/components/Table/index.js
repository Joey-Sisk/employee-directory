import React, { Component } from "react";
// import "./style.css";
import Rows from "./Rows";
import employees from "../../employees.json";

const Table = () => {
  const [sortConfig, setSortConfig] = React.useState(null);
  let sortedEmployees = [...employees];

  if (sortConfig !== null) {
    sortedEmployees.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  }
  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return (
    <table className="table" idName="myTable">
      <thead>
        <tr>
          <th scope="col">#</th>
          <button type="button" onClick={() => requestSort("name")}>
            Name
          </button>
          <th scope="col">Title</th>
          <th scope="col">Location</th>
        </tr>
      </thead>
      <tbody>
        <Rows />

        {sortedEmployees.map((employee) => (
          <Rows
            // removeFriend={this.removeFriend}
            id={employee.id}
            key={employee.id}
            name={employee.name}
            // image={friend.image}
            title={employee.title}
            location={employee.location}
          />
        ))}
      </tbody>
    </table>
  );

  // return (
  //   <div className="card">
  //     <div className="img-container">
  //       <img alt={props.name} src={props.image} />
  //     </div>
  //     <div className="content">
  //       <ul>
  //         <li>
  //           <strong>Name:</strong> {props.name}
  //         </li>
  //         <li>
  //           <strong>Job Title:</strong> {props.title}
  //         </li>
  //         <li>
  //           <strong>Location:</strong> {props.location}
  //         </li>
  //       </ul>
  //     </div>
  //     <span onClick={() => props.removeFriend(props.id)} className="remove">
  //       𝘅
  //     </span>
  //   </div>
  // );
};

// https://www.smashingmagazine.com/2020/03/sortable-tables-react/

export default Table;
