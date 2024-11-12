import React, { useEffect, useState } from "react";
import EmployeeTitle from "../components/EmployeeTitle";
import EmployeeDetail from "../components/EmployeeDetail";
import { useQuery, useMutation } from "@apollo/client";
import { GET_EMPLOYEES } from "../graphql/queries";
import { DELETE_EMPLOYEE } from "../graphql/mutations";
import EmployeeFilter from "../components/EmployeeFilters";

function EmployeeGrid() {
  const [isGridView, setIsGridView] = useState(true);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState("name");
  const [deleteEmployee] = useMutation(DELETE_EMPLOYEE, {
    refetchQueries: [
      { query: GET_EMPLOYEES, variables: { page, limit, sortBy } },
    ],
  });
  const [filters, setFilters] = useState({
    name: "",
    role: "",
    age: "",
    attendance: "",
  });

  const { loading, error, data, refetch } = useQuery(GET_EMPLOYEES, {
    variables: {
      page,
      limit,
      sortBy,
      name: filters.name,
      role: filters?.role,
      age: filters.age ? parseInt(filters.age) : undefined,
      attendance: filters.attendance ? parseInt(filters.attendance) : undefined,
    },
  });

  const totalPages = data ? Math.ceil(data.employees.totalCount / limit) : 0;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
      refetch({ page: newPage, limit, sortBy });
    }
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    refetch({ page, limit, sortBy: e.target.value });
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    console.log("data", newFilters);
    setPage(1); // resets the page when filters change
    refetch({ page: 1, limit, sortBy, ...newFilters });
  };

  const handleDelete = (id) => {
    deleteEmployee({ variables: { id: id } });
    refetch({ page, limit, sortBy });
  };

  return (
    <div className="p-5 font-serif">
      {/*Filters*/}
      <EmployeeFilter onFilter={handleFilterChange} />

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-medium">Employees</h2>
        <button
          onClick={() => setIsGridView(!isGridView)}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Toggle View
        </button>
      </div>

      {/* Sorting */}
      <div className="my-4">
        <label className="mr-4">Sort by:</label>
        <select
          value={sortBy}
          onChange={handleSortChange}
          className="p-2 w-36 border rounded"
        >
          <option value="name">Name</option>
          <option value="age">Age</option>
          <option value="role">Role</option>
        </select>
      </div>

      {/*  Details View */}
      {selectedEmployee ? (
        <EmployeeDetail
          id={selectedEmployee.id}
          onBack={() => setSelectedEmployee(null)}
        />
      ) : (
        <div
          className={`grid ${
            isGridView ? "grid-cols-3" : "grid-cols-1"
          } gap-4 mt-4`}
        >
          {data?.employees?.employees.map((emp) => (
            <EmployeeTitle
              key={emp.id}
              employee={emp}
              onClick={() => setSelectedEmployee(emp)}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Pagination  */}
      {!selectedEmployee && (
        <div className="flex justify-center items-center mt-4  ">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="px-3 py-1 bg-gray-200 rounded-l disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-3 py-1">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className="px-3 py-1 bg-gray-200 rounded-r disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default EmployeeGrid;
