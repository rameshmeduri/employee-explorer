import { Link } from 'react-router-dom';

const EmpDetails = ({ empObj }) => {
  const { empName, title, directSubordinates } = empObj;
  const pathname = `/overview/${empName}`;
  return (
    <table className="mt-5 table table-sm table-striped table-bordered table-hover">
      <thead>
        <tr>
          <th scope="col">Employee Name</th>
          <th scope="col">Title</th>
          <th scope="col">Direct Subordinates</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <Link to={{ pathname, empObj }}>{empName}</Link>
          </td>
          <td>{title}</td>
          <td>{directSubordinates.length}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default EmpDetails;
