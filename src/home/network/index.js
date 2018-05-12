import axios from "axios";

const BASE_URL = "http://dummy.restapiexample.com/api/";

const TEST_DATA_PATH = "v1/employees";

export const getEmployees = () =>
  axios.get(BASE_URL + TEST_DATA_PATH, {
    headers: {
      "Content-Type": "application/json"
    }
  });

window.Action = {
  getEmployees
};
