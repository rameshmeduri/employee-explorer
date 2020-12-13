import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link, useLocation, useParams } from 'react-router-dom';
import { getUrl, getPromiseArr } from '../utils';

const EmpOverview = () => {
  const { empObj } = useLocation();
  const { empName } = useParams();
  const isMountedRef = useRef(false);
  const [list, setList] = useState(null);

  const getIndirect = (promiseArr, directSubordinates) => {
    let tempArr = directSubordinates;
    axios
      .all(promiseArr)
      .then(
        axios.spread((...resArr) => {
          resArr.forEach((obj) => {
            let arr = obj.data[1]['direct-subordinates'];
            tempArr = tempArr.concat(arr);
          });
          isMountedRef.current = true; // re rendering stops here
          setList(tempArr);
        })
      )
      .catch((errors) => {
        console.log(errors);
      });
  };

  const getDirect = () => {
    const url = getUrl(empName);
    axios
      .get(url)
      .then((res) => {
        const directSubordinates = res.data[1]['direct-subordinates'];
        const promiseArr = getPromiseArr(directSubordinates);
        getIndirect(promiseArr, directSubordinates);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (isMountedRef.current === false) {
      if (empObj && empObj.directSubordinates) {
        const { directSubordinates } = empObj;
        const promiseArr = getPromiseArr(directSubordinates);
        getIndirect(promiseArr, directSubordinates);
      } else {
        getDirect();
      }
    }

    return () => {
      isMountedRef.current = false;
    };
  }, [empObj, empName, isMountedRef]);

  return (
    <div className="mt-5">
      <div className="row align-items-start">
        <div className="col-1">
          <Link to="/">Back</Link>
        </div>
        <div className="col-11">
          <h2 className="text-center">Employee Overview</h2>
        </div>
      </div>
      <h3 className="mt-5">
        Subordinates of employee{' '}
        <span className="badge badge-secondary">{empName}</span> :{' '}
      </h3>
      {list && list.length ? (
        <ul className="list-group mt-5 mb-5">
          {list.map((item, index) => (
            <li key={index} className="list-group-item">
              {item}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default EmpOverview;
