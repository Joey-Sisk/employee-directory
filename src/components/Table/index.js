import React, { useState, useEffect } from "react";
import SearchBar from "../SearchBar"; // connects to searchbar component
import API from "../../utils/API";

const Table = () => {
<<<<<<< HEAD

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
=======
  // hook variables holds data for app
  const [employees, setEmployees] = useState([]);
  const [currentSort, setCurrentSort] = useState("default");
  const [search, setSearch] = useState(null);

  useEffect(() => {
    // pull in info from random user API
    API.getEmployees()
      .then((res) => {
        if (res.data.results.length === 0) {
          throw new Error("No results found.");
        }
        if (res.data.status === "error") {
          throw new Error(res.data.message);
        }

        setEmployees(res.data.results);
      })
      .catch((err) => console.log(err));
  }, []);

  const onSortChange = () => {
    // render correct FA symbol and use right sortTypes key
>>>>>>> 147064376c28a5c398410add3af2b76bfbef8a16
    let nextSort;

    if (currentSort === "down") nextSort = "up";
    else if (currentSort === "up") nextSort = "default";
    else if (currentSort === "default") nextSort = "down";

    setCurrentSort(nextSort);
  };

  const searchSpace = (event) => {
    // keeps track of input in searchbar
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

<<<<<<< HEAD
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
=======
  console.log(employees);

  return employees.length > 0 ? ( // ternary operator checks for valid input
    <div>
      <SearchBar searchSpace={searchSpace} />

      <table className="table table-striped" id="myTable">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Location</th>
            <th scope="col">
              Age{" "}
              <button onClick={onSortChange}>
                <i className={`fas fa-${sortTypes[currentSort].class}`} />
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {employees // sorts and then searches from employees hook
            .sort(sortTypes[currentSort].fn)
            .filter((data) => {
              if (search == null) return data;
              else if (
                data.name.first.toLowerCase().includes(search.toLowerCase()) ||
                data.name.last.toLowerCase().includes(search.toLowerCase()) ||
                data.location.city
                  .toLowerCase()
                  .includes(search.toLowerCase()) ||
                data.location.state.toLowerCase().includes(search.toLowerCase())
              ) {
                return data;
              }
            })
            .map((data) => {
              return (
                <tr keys={data.email}>
                  <th scope="row">
                    <img src={data.picture.thumbnail} alt="headshot"></img>
                  </th>
                  <td>{data.name.first}</td>
                  <td>{data.name.last}</td>
                  <td>{`${data.location.city}, ${data.location.state}`}</td>
                  <td>{data.dob.age}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  ) : null;
>>>>>>> 147064376c28a5c398410add3af2b76bfbef8a16
};

export default Table;

// sort function built with the help of Florin Pop
// https://www.florin-pop.com/blog/2019/07/sort-table-data-with-react/

// search function built with the help of Bhavya Ambasta with Medium.com
// https://medium.com/crobyer/search-filter-with-react-js-88986c644ed5
