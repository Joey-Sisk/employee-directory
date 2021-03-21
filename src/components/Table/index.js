import React, { useState, useEffect } from "react";
import API from "../../utils/API";

const Table = () => {

  // Simplified state variables. Just easy to manage and no need to do spread or destructure
  const [employees, setEmployees] = useState([]);
  const [currentSort, setCurrentSort] = useState("default");
  const [search, setSearch] = useState(null);

  useEffect(() => {
    //if (employees.length === 0) {
    API.getEmployees()
      .then((res) => {
        if (res.data.results.length === 0) {
          throw new Error("No results found.");
        }
        if (res.data.status === "error") {
          throw new Error(res.data.message);
        }
        
        setEmployees(res.data.results);
      }).catch((err) => console.log(err));
    //}
  }, []); // The empty array forces this to load only  once. No need to have "if employees.length === 0"

  const onSortChange = () => {
    // used to render corrent FA symbol
    let nextSort;

    if (currentSort === "down") nextSort = "up";
    else if (currentSort === "up") nextSort = "default";
    else if (currentSort === "default") nextSort = "down";

    setCurrentSort(nextSort);
  };

  const searchSpace = (event) => {
    let keyword = event.target.value;
    setSearch(keyword);
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

  return (
    employees.length > 0 ?
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
                    className={`fas fa-${sortTypes[currentSort].class
                      }`}
                  />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {employees
              .sort(sortTypes[currentSort].fn)
              .filter((data) => {
                if (search == null) return data;
                else if (
                  data.name.first
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                  data.name.last
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                  data.location.city
                    .toLowerCase()
                    .includes(search.toLowerCase())
                ) {
                  return data;
                }
              })
              .map((data) => {
                return (
                  <tr keys={data.email}>
                    <th scope="row"></th>
                    <td>{data.name.first}</td>
                    <td>{data.last}</td>
                    <td>{data.location.city}</td>
                    <td>{data.dob.age}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div> : null
  );
};

export default Table;

// search function built with the help of Florin Pop
// https://www.florin-pop.com/blog/2019/07/sort-table-data-with-react/

// search function built with the help of Bhavya Ambasta with Medium.com
// https://medium.com/crobyer/search-filter-with-react-js-88986c644ed5
