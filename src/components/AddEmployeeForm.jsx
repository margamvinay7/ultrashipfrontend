import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_EMPLOYEE } from "../graphql/mutations";
import { GET_EMPLOYEES } from "../graphql/queries";
import { Link } from "react-router-dom";

function AddEmployeeForm() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    role: "",
    class: "",
    subjects: [],
    attendance: "",
    password: "",
  });
  const [addEmployee] = useMutation(ADD_EMPLOYEE, {
    refetchQueries: [{ query: GET_EMPLOYEES }],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    addEmployee({
      variables: {
        name: formData.name,
        age: parseInt(formData.age),
        role: formData.role,
        class: "",
        subjects: formData.subjects.split(","), // Converting comma-separated subjects to array
        attendance: parseInt(formData.attendance),
        password: formData.password,
      },
    });
  };

  return (
    <div className="fixed inset-0 font-serif bg-black bg-opacity-50 flex items-center justify-center ">
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-500 w-3/4 lg:w-1/3">
        <h1 className="text-center text-xl font-medium border-b border-purple-800 pb-2 mb-5">
          Add Employee
        </h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mb-2 p-1 border w-full outline-none"
          />
          <input
            type="number"
            placeholder="Age"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            className="mb-2 p-1 border w-full outline-none"
          />
          <input
            type="text"
            placeholder="Role"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="mb-2 p-1 border w-full outline-none"
          />
          <input
            type="text"
            placeholder="Class"
            value={formData.class}
            onChange={(e) =>
              setFormData({ ...formData, class: e.target.value })
            }
            className="mb-2 p-1 border w-full outline-none"
          />
          <input
            type="text"
            placeholder="Subjects (comma-separated)"
            value={formData.subjects}
            onChange={(e) =>
              setFormData({ ...formData, subjects: e.target.value })
            }
            className="mb-2 p-1 border w-full outline-none"
          />
          <input
            type="number"
            placeholder="Attendance"
            value={formData.attendance}
            onChange={(e) =>
              setFormData({ ...formData, attendance: e.target.value })
            }
            className="mb-2 p-1 border w-full outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="mb-2 p-1 border w-full outline-none"
          />

          <Link
            to="/"
            className="bg-gray-400 text-white px-3 py-1 rounded float-left"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="bg-blue-500 text-white px-3 py-1 rounded float-right"
          >
            Add Employee
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddEmployeeForm;
