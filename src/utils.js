const getUrl = (empName) => {
  return `http://api.additivasia.io/api/v1/assignment/employees/${empName}`;
};

export { getUrl };
