import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home/Home";
import Course_Details from "../Pages/Course_Details/Course_Details";
import Course_Metarial_Details from "../Pages/Course_Metarial_Details/Course_Metarial_Details";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/course/:id",
        element: <Course_Details />
      },
      {
        path: "/assignment/:id",
        element: <Course_Metarial_Details />
      },
      {
        path: "/note/:id",
        element: <Course_Metarial_Details />
      },
      {
        path: "/lab/:id",
        element: <Course_Metarial_Details />
      },
    ]
  },
]);