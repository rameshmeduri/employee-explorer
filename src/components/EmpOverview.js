import { useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { getUrl } from '../utils';

const EmpOverview = () => {
  const [subordinateArr, setSubordinateArr] = useState(null);
  const { data } = useLocation();
  const { empName, directSubordinates } = data;

  const promiseArr = directSubordinates.map((name) => {
    let url = getUrl(name);
    let promise = axios.get(url);
    return promise;
  });

  let tempArr = directSubordinates;

  axios
    .all(promiseArr)
    .then(
      axios.spread((...resArr) => {
        resArr.forEach((obj) => {
          let arr = obj.data[1]['direct-subordinates'];
          tempArr = tempArr.concat(arr);
        });
        setSubordinateArr(tempArr);
      })
    )
    .catch((errors) => {
      console.error(errors);
    });

  return (
    <div className="mt-5">
      <div className="row align-items-start">
        <div className="col-1"><Link to="/">Back</Link></div>
        <div className="col-11"><h2 className="text-center">Employee Overview</h2></div>
      </div>
      <h3 className="mt-5">Subordinates of employee <span class="badge badge-secondary">{empName}</span> : </h3>
      {subordinateArr && subordinateArr.length ? (
        <ul className="list-group mt-5 mb-5">
          {subordinateArr.map((item, index) => (
            <li key={index} className="list-group-item">{item}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default EmpOverview;
