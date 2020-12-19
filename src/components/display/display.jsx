import React from "react";
import "./display.scss";
import deleteIcon from "F:/workspace/HTML CSS practice/assets/delete_icon.png";
import editIcon from "F:/workspace/HTML CSS practice/assets/edit_icon.png";
import profile1 from "F:/workspace/HTML CSS practice/assets/profile1.jpg";
import profile2 from "F:/workspace/HTML CSS practice/assets/profile2.jpg";
import profile3 from "F:/workspace/HTML CSS practice/assets/profile3.jpg";
import profile4 from "F:/workspace/HTML CSS practice/assets/profile4.jpg";
import { withRouter } from "react-router-dom";
import EmployeeService from "../../services/employee-service";

const Display = (props) => {
  const employeeService = new EmployeeService();

  const update = (employeeId) => {
    props.history.push(`payroll-form/${employeeId}`);
  };

  const remove = (employeeId) => {
    employeeService
      .deleteEmployee(employeeId)
      .then((data) => {
        console.log("data after delete", data);
        props.getAllEmployee();
      })
      .catch((err) => {
        console.log("error after delete", err);
      });
  };

  return (
    <table id="display" className="display">
      <tbody>
        <tr key={-1}>
          <th>Profile Image</th>
          <th>Name</th>
          <th>Gender</th>
          <th>Department</th>
          <th>Salary</th>
          <th>Start Date</th>
          <th>Actions</th>
        </tr>
        {props.employeeArray &&
          props.employeeArray.map((element, ind) => (
            <tr key={ind}>
              <td><img className="profile" 
              src={
                element.profile ===
                "F:/workspace/HTML CSS practice/assets/profile1.jpg"
                  ? profile1
                  : element.profile ===
                    "F:/workspace/HTML CSS practice/assets/profile2.jpg"
                  ? profile2
                  : element.profile ===
                    "F:/workspace/HTML CSS practice/assets/profile3.jpg"
                  ? profile3
                  : profile4
              }
              alt=""
            />
              </td>
              <td>{element.name}</td>
              <td className="gender">{element.gender}</td>
              <td>
                {element.department &&
                  element.department.map((dept) => (
                    <div className="dept-label">{dept}</div>
                  ))}
              </td>
              <td> ₹ {element.salary}</td>
              <td>{element.startDate}</td>
              <td>
                <img
                  onClick={() => remove(element.id)}
                  src={deleteIcon}
                  alt="delete"
                />
                <img
                  onClick={() => update(element.id)}
                  src={editIcon}
                  alt="edit"
                />
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};
export default withRouter(Display);