import { getEmployees } from ".";
import { clearEmployeeList, setEmployeeList, setAccessToken } from "../reducer";
import { editEntityErrors, clearEntityErrors } from "../reducer/errors";

export const createLoginAndContinue = (data, callback) => dispatch => {
  dispatch(clearEntityErrors());
  let errors = validateData(data);
  if (Object.keys(errors).length > 0) {
    dispatch(editEntityErrors(errors));
  } else {
    dispatch(setAccessToken("success"));
    callback("success");
  }
};

const validateData = data => {
  let errors = {};
  if (data.email.trim().toLowerCase() !== "admin") {
    errors.email = "Enter valid Email/Username.";
  } else if (data.password !== "admin") {
    errors.password = "Enter valid Password.";
  }

  return errors;
};

export const getEmployeesList = access_token => dispatch => {
  dispatch(clearEmployeeList());
  getEmployees().then(res => {
    const { data = [] } = res;
    let dispatchData = [];
    data.forEach(item =>
      dispatchData.push({
        id: item.id.toString(),
        name: item.employee_name,
        salary: item.employee_salary,
        age: item.employee_age
      })
    );

    dispatch(setEmployeeList(dispatchData));
  });
};
