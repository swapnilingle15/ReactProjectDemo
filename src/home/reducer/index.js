/** Actions */
const CLEAR_EMPLOYEE_LIST = "CLEAR_EMPLOYEE_LIST";
const SET_EMPLOYEE_LIST = "SET_EMPLOYEE_LIST";
const SET_ACCESS_TOKEN = "SET_ACCESS_TOKEN";

/** Reducer */
export const employeeData = (state = {}, { type, payload }) => {
  switch (type) {
    case CLEAR_EMPLOYEE_LIST:
      return state;
    case SET_EMPLOYEE_LIST: {
      const { Data } = payload;
      return Data;
    }
    default:
      return state;
  }
};

export const accessToken = (state = "", { type, payload }) => {
  switch (type) {
    case SET_ACCESS_TOKEN: {
      const { accesstoken } = payload;
      return accesstoken;
    }
    default:
      return state;
  }
};

/** Action creators */
export const clearEmployeeList = () => ({
  type: CLEAR_EMPLOYEE_LIST
});

export const setEmployeeList = Data => ({
  type: SET_EMPLOYEE_LIST,
  payload: { Data }
});

export const setAccessToken = accesstoken => ({
  type: SET_ACCESS_TOKEN,
  payload: { accesstoken }
});
