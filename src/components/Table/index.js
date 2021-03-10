import React, { useState, useEffect } from "react";
import API from "../../utils/API";

const Table = () => {
  const [employeeState, setEmployeeState] = useState({
    currentSort: "default",
    search: null,
    employees: [],
  });
  // const [employees1, setEmployees1] = useState([]);

  useEffect(() => {
    if (employeeState.employees.length === 0) {
      API.getEmployees()
        .then((res) => {
          if (res.data.lendth === 0) {
            throw new Error("No results found.");
          }
          if (res.data.status === "error") {
            throw new Error(res.data.message);
          }
          // console.log(res.data.results);
          setEmployeeState({ ...employeeState, employees: res.data.results });
        })
        .catch((err) => console.log(err));
    }
  });

  console.log(employeeState.employees);

  const onSortChange = () => {
    // used to render corrent FA symbol
    const { currentSort } = setEmployeeState({ ...employeeState });
    let nextSort;

    if (currentSort === "down") nextSort = "up";
    else if (currentSort === "up") nextSort = "default";
    else if (currentSort === "default") nextSort = "down";

    setEmployeeState({ ...employeeState, currentSort: nextSort });
  };

  const searchSpace = (event) => {
    let keyword = event.target.value;
    setEmployeeState({ ...employeeState, search: keyword });
  };

  const sortTypes = {
    // sort logic, only works with numbers
    up: {
      class: "sort-up",
      fn: (a, b) => a.dob.age - b.dob.age,
    },
    down: {
      class: "sort-down",
      fn: (a, b) => b.dob.age - a.dob.age,
    },
    default: {
      class: "sort",
      fn: (a, b) => a,
    },
  };

  const { data } = employeeState.employees; // brings in employees.json
  const { currentSort } = employeeState.currentSort;

  // console.log(employeeState.currentSort);

  return (
    data > 0 && (
      <div>
        <input // this should probably be moved to its own component
          type="text"
          placeholder="Enter item to be searched"
          onChange={(e) => searchSpace(e)}
        />

        <table className="table" idName="myTable">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Location</th>
              <th scope="col">
                Age
                <button onClick={onSortChange}>
                  <i
                    className={`fas fa-${
                      sortTypes[employeeState.currentSort].class
                    }`}
                  />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {[...data]
              .sort(sortTypes[currentSort].fn)
              .filter((data) => {
                console.log(data);
                if (employeeState.search == null) return data;
                else if (
                  data.name.first
                    .toLowerCase()
                    .includes(employeeState.search.toLowerCase()) ||
                  data.name.last
                    .toLowerCase()
                    .includes(employeeState.search.toLowerCase()) ||
                  data.location.city
                    .toLowerCase()
                    .includes(employeeState.search.toLowerCase())
                ) {
                  return data;
                }
              })
              .map((data) => {
                return (
                  <tr>
                    <th scope="row">{data.id}</th>
                    <td>{data.name.first}</td>
                    <td>{data.last}</td>
                    <td>{data.location.city}</td>
                    <td>{data.dob.age}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    )
  );
};

export default Table;

// search function built with the help of Florin Pop
// https://www.florin-pop.com/blog/2019/07/sort-table-data-with-react/

// search function built with the help of Bhavya Ambasta with Medium.com
// https://medium.com/crobyer/search-filter-with-react-js-88986c644ed5
