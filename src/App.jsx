// src/App.js
import React from "react";
import Header from "./components/Header";
import AddEmployeeForm from "./components/AddEmployeeForm";
import EmployeeGrid from "./pages/EmployeeGrid";
import LoginPage from "./pages/LoginPage";
import { onError } from "@apollo/client/link/error";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { setContext } from "@apollo/client/link/context";
import { getToken } from "./utils/auth";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
} from "@apollo/client";
import { removeToken } from "./utils/auth";

const httpLink = createHttpLink({
  uri: "https://ultrashipbackend.onrender.com/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = getToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message }) => {
      console.log("GraphQL Error:", message);
      if (message === "TokenExpired") {
        removeToken();
        window.location.href = "/login";
      }
    });
  }

  if (networkError) {
    console.log("Network Error:", networkError);
    if (networkError.statusCode === 401) {
      removeToken();
      window.location.href = "/login";
    }
  }
});

const client = new ApolloClient({
  link: from([errorLink, authLink.concat(httpLink)]),
  cache: new InMemoryCache(),
});

// PrivateRoute component to check for token
const PrivateRoute = ({ children }) => {
  const token = getToken();
  console.log("token", token);
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Header />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <EmployeeGrid />
              </PrivateRoute>
            }
          />
          <Route
            path="/add-employee"
            element={
              <PrivateRoute>
                <AddEmployeeForm />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
      {/* <AddEmployeeForm /> */}
    </ApolloProvider>
  );
}

export default App;
