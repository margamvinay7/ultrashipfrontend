import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../graphql/mutations";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { storeToken } from "../utils/auth";

function LoginPage() {
  const navigate = useNavigate(); // Initialize the navigate function
  const { login: loginContext } = useContext(AuthContext);
  const [login, { loading, error }] = useMutation(LOGIN, {
    onCompleted: (data) => {
      storeToken(data?.login?.accessToken);
      loginContext(data?.login?.accessToken);
      navigate("/"); // navigate to home page
    },
  });
  const [credentials, setCredentials] = useState({ name: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("se", credentials);
    login({ variables: credentials });
  };

  return (
    <div className="fixed inset-0 font-serif bg-black bg-opacity-50 flex items-center justify-center ">
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-500 w-3/4 lg:w-1/3">
        <h1 className="text-center text-xl font-medium border-b border-purple-800 pb-2 mb-5">
          Login
        </h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={credentials.name}
            onChange={(e) =>
              setCredentials({ ...credentials, name: e.target.value })
            }
            className="mb-2 p-1 border w-full outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            className="mb-2 p-1 border w-full outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-3 py-1 rounded float-right"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          {error && <p>Error: {error.message}</p>}
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
