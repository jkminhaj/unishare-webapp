import { createHashRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home/Home";
import Course_Details from "../Pages/Course_Details/Course_Details";
import Course_Metarial_Details from "../Pages/Course_Metarial_Details/Course_Metarial_Details";
import UploadMaterialTest from "../components/Test/UploadMaterialTest";
import Login from "../Pages/Auth/Login";
import Protected_Route from "../Protected/Protected_Route";
import Question_Bank_Home from "../Pages/Question_Bank/Question_Bank_Home";
import Question_Bank_Details from "../Pages/Question_Bank/Question_Bank_Details";
import Cover_Generator from "../tools/Cover_Generator";
import Register from "../Pages/Auth/Register";

export const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Protected_Route><Home /></Protected_Route>
      },
      {
        path: "/questionBank",
        element: <Protected_Route><Question_Bank_Home /></Protected_Route>
      },
      {
        path: "/questionBank/:id",
        element: <Protected_Route><Question_Bank_Details /></Protected_Route>
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
        path: "/upload",
        element: <UploadMaterialTest />
      }
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path:"/register",
    element:<Register/>
  },
  {
    path: "/cover-generator",
    element: <Cover_Generator />
  },

]);