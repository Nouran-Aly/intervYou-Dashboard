import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Components/Authentication/Login";
import AuthLayout from "./Components/Layout/AuthLayout";
import Register from "./Components/Authentication/Register";
import Layout from "./Components/Layout/Layout";
import Dashboard from "./Components/Dashboard/Dashboard";
import Students from "./Components/Students/Students";
import CreateInterviews from "./Components/CreateInterviews/CreateInterviews";

function App() {
  let routes = createBrowserRouter([
    // {
    //   path: "",
    //   element: <AuthLayout />,
    //   children: [
    //     { path: "", element: <Login /> },
    //     { path: "login", element: <Login /> },
    //     { path: "register", element: <Register /> },
    //   ],
    // },
    {
      path: "",
      element: <Layout />,
      children: [
        { path: "", element: <Dashboard /> },
        { path: "students", element: <Students /> },
        { path: "create-interview", element: <CreateInterviews /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
    </>
  );
}

export default App;
