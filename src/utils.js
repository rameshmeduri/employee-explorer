import axios from 'axios';

const getUrl = (empName) => {
  return `http://api.additivasia.io/api/v1/assignment/employees/${empName}`;
};

const getPromiseArr = (arr) => {
  const promiseArr = arr.map((name) => {
    let url = getUrl(name);
    let promise = axios.get(url);
    return promise;
  });
  return promiseArr;
};

export { getUrl, getPromiseArr };
