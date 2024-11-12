import React, { useState } from "react";

import { TrashIcon } from "@heroicons/react/outline";

function EmployeeTitle({ employee, onClick, handleDelete }) {
  return (
    <div className="relative border p-4 rounded shadow-md hover:shadow-lg transition-shadow  border-purple-800">
      {/* Delete Icon  */}
      <button
        onClick={() => handleDelete(employee.id)}
        className="absolute top-4 right-2 text-red-500 hover:text-red-700 focus:outline-none"
        aria-label="Delete"
      >
        <TrashIcon className="h-7 w-7 text-gray-700 hover:bg-gray-300 p-1 rounded-md" />
      </button>

      {/* Employees */}
      <div onClick={onClick} className="cursor-pointer space-y-2 ">
        <div className="flex gap-x-2 items-center border-b border-purple-800 pb-1">
          <img
            className="w-10 h-10 rounded-full"
            src={`https://api.dicebear.com/6.x/initials/svg?seed=${employee?.name}`}
          />
          <h3 className="text-lg font-medium">{employee.name}</h3>
        </div>
        <h3 className="text-lg ">Age: {employee.age}</h3>
        <p className="text-gray-600">Role: {employee.role}</p>
      </div>
    </div>
  );
}

export default EmployeeTitle;
