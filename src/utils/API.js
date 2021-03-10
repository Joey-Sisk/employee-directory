import axios from "axios";
// const amountResults = "5";

export default {
  getEmployees: function () {
    return axios.get("https://randomuser.me/api/?results=5&nat=us");
  },
};

