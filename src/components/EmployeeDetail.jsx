import React, { useState, useEffect, useContext } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_EMPLOYEE } from "../graphql/queries";
import { UPDATE_EMPLOYEE } from "../graphql/mutations";
import { AuthContext } from "../context/AuthContext";

function EmployeeDetail({ id, onBack }) {
  // console.log("id here", id);
  const { loading, error, data, refetch } = useQuery(GET_EMPLOYEE, {
    variables: { id: id },
  });
  const { user } = useContext(AuthContext);

  const [updateEmployee] = useMutation(UPDATE_EMPLOYEE, {
    onCompleted: () => refetch(), // refetching the data after update
  });

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    role: "",
    class: "",
    subjects: "",
    attendance: 0,
  });

  // updating formdata when data is fetched
  useEffect(() => {
    if (data) {
      setFormData({
        name: data.employee.name || "",
        age: data.employee.age || "",
        role: data.employee.role || "",
        class: data.employee.class || "",
        subjects: data.employee.subjects?.join(", ") || "",
        attendance: data.employee.attendance || 0,
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await updateEmployee({
      variables: {
        id,
        name: formData.name,
        age: parseInt(formData.age),
        role: formData.role,
        class: formData.class,
        subjects: formData.subjects.split(",").map((s) => s.trim()),
        attendance: parseInt(formData.attendance),
      },
    });
    setEditMode(false); // after update set edit mode false
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50  flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-500 w-3/4">
        <button onClick={onBack} className="text-gray-500 float-right">
          Close
        </button>
        {editMode ? (
          <form onSubmit={handleUpdate}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="mb-2 p-1 border w-full outline-none"
            />
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Age"
              className="mb-2 p-1 border w-full outline-none"
            />
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="Role"
              className="mb-2 p-1 border w-full outline-none"
            />
            <input
              type="text"
              name="class"
              value={formData.class}
              onChange={handleChange}
              placeholder="Class"
              className="mb-2 p-1 border w-full outline-none"
            />
            <input
              type="text"
              name="subjects"
              value={formData.subjects}
              onChange={handleChange}
              placeholder="Subjects (comma-separated)"
              className="mb-2 p-1 border w-full outline-none"
            />
            <input
              type="number"
              name="attendance"
              value={formData.attendance}
              onChange={handleChange}
              placeholder="Attendance"
              className="mb-2 p-1 border w-full outline-none"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setEditMode(false)}
              className="bg-gray-300 text-black px-3 py-1 ml-2 rounded"
            >
              Cancel
            </button>
          </form>
        ) : (
          <>
            <div className="flex gap-x-2 items-center border-b border-purple-800 pb-1">
              <img
                className="w-10 h-10 rounded-full"
                src={`https://api.dicebear.com/6.x/initials/svg?seed=${data?.employee?.name}`}
              />
              <h3 className="text-xl font-medium  ">{data?.employee.name}</h3>
            </div>
            <div className="flex flex-col gap-y-2 text-gray-700 mt-2">
              <p className="flex">
                <span className="w-24">Role</span>: {data.employee.role}
              </p>
              <p className="flex">
                <span className="w-24">Age</span>: {data.employee.age}
              </p>
              <p className="flex">
                <span className="w-24">Class</span>: {data.employee.class}
              </p>
              <p className="flex">
                <span className="w-24">Subjects</span>:{" "}
                {data.employee.subjects.join(", ")}
              </p>
              <p className="flex">
                <span className="w-24">Attendance</span>:{" "}
                {data.employee.attendance}
              </p>
            </div>
            {user?.role === "admin" && (
              <button
                onClick={() => setEditMode(true)}
                className="bg-blue-500 text-white px-3 py-1 mt-4 w-20 rounded float-right"
              >
                Edit
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default EmployeeDetail;
