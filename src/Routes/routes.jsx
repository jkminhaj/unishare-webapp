import { createHashRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home/Home";
import Course_Details from "../Pages/Course_Details/Course_Details";
import Course_Metarial_Details from "../Pages/Course_Metarial_Details/Course_Metarial_Details";
import UploadMaterialTest from "../components/Test/UploadMaterialTest";
import Login from "../Pages/Auth/Login";
import Protected_Route from "../Protected/Protected_Route";

export const router = createHashRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element:<Protected_Route><Home /></Protected_Route> 
      },
      {
        path: "/course/:id",
        element: <Protected_Route><Course_Details /></Protected_Route>
      },
      {
        path: "/assignmentDetails/:id",
        element: <Protected_Route><Course_Metarial_Details /></Protected_Route>
      },
      {
        path: "/noteDetails/:id",
        element: <Protected_Route><Course_Metarial_Details /></Protected_Route>
      },
      {
        path: "/labDetails/:id",
        element: <Protected_Route><Course_Metarial_Details /></Protected_Route>
      },
      {
        path : "/upload",
        element:<UploadMaterialTest/>
      }
    ]
  },
  {
    path:"/login",
    element: <Login/>
  }

]);