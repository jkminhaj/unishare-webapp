import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home/Home";
import Course_Details from "../Pages/Course_Details/Course_Details";
import Course_Metarial_Details from "../Pages/Course_Metarial_Details/Course_Metarial_Details";
import UploadMaterialTest from "../components/Test/UploadMaterialTest";

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
        path: "/assignmentDetails",
        element: <Course_Metarial_Details />
      },
      {
        path: "/noteDetails",
        element: <Course_Metarial_Details />
      },
      {
        path: "/labDetails",
        element: <Course_Metarial_Details />
      },
      {
        path : "/upload",
        element:<UploadMaterialTest/>
      }
      // {
      //   path: "/assignment/:id",
      //   element: <Course_Metarial_Details />
      // },
      // {
      //   path: "/note/:id",
      //   element: <Course_Metarial_Details />
      // },
      // {
      //   path: "/lab/:id",
      //   element: <Course_Metarial_Details />
      // },
    ]
  },

]);