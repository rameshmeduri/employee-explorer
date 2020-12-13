import { useState } from 'react';
import axios from 'axios';
import EmpDetails from './EmpDetails';
import { getUrl } from '../utils';

const EmpSearch = () => {
  const [empName, setEmpName] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  let empObj;
  if (result) {
    empObj = {
      empName,
      title: result[0],
      directSubordinates: result[1]['direct-subordinates']
    };
  }

  const onChange = (e) => setEmpName(e.target.value);

  const onClick = (e) => {
    if (empName) {
      const url = getUrl(empName);
      setResult(null);
      axios
        .get(url)
        .then((res) => setResult(res.data))
        .catch((err) => setError(err));
    }
  };

  return (
    <div className="mt-5">
      <h2 className="text-center m-5">Employee Explorer</h2>
      <div className="row justify-content-md-center align-items-start">
        <div className="form-group mx-sm-3">
          <input
            type="text"
            className="form-control"
            placeholder="employee name"
            onChange={onChange}
            value={empName}
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={onClick}>
          Search
        </button>
      </div>

      {error ? <h1>Sever Error</h1> : null}

      {empObj ? <EmpDetails data={empObj} /> : null}
    </div>
  );
};

export default EmpSearch;
