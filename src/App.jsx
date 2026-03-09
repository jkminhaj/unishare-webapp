import { Outlet } from "react-router-dom";
import Navbar from "./components/Shared/NavBar/Navbar";
const App = () => {
  return (
    <div className="bg-[#1d2733] text-white min-h-screen">
      <nav>
        <Navbar />
      </nav>
      <section className="w-11/12 md:w-10/12 pt-[4.3rem] mx-auto">
        <Outlet />
      </section>
    </div>
  );
};

export default App;