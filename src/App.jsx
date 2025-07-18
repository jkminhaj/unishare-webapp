import { Outlet } from "react-router-dom";
import Navbar from "./components/Shared/NavBar/Navbar";
const App = () => {
  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen">
      <nav>
        <Navbar />
      </nav>
      <section className="w-11/12 md:w-10/12 mx-auto">
        <Outlet />
      </section>
    </div>
  );
};

export default App;