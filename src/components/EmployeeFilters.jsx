import React, { useState } from "react";

function EmployeeFilter({ onFilter }) {
  const [filters, setFilters] = useState({
    name: "",
    role: "",
    age: "",
    attendance: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filters); // passing filters to parent component
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex flex-col gap-y-4 ">
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Search by Name"
          value={filters.name}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="role"
          placeholder="Search by Role"
          value={filters.role}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="number"
          name="age"
          placeholder="Search by Age"
          value={filters.age}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="number"
          name="attendance"
          placeholder="Search by Attendance"
          value={filters.attendance}
          onChange={handleChange}
          className="p-2 border rounded"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 w-32 text-white px-3 py-1 rounded"
      >
        Apply Filters
      </button>
    </form>
  );
}

export default EmployeeFilter;
