import { Outlet } from "react-router-dom";
import Navbar from "./components/Shared/NavBar/Navbar";
import Footer from "./components/Shared/Footer/Footer";
const App = () => {
  return (
    <div className="bg-[#1d2733] text-white min-h-screen flex flex-col">
      <Navbar />
      <section className="w-11/12 md:w-10/12 pt-[4.3rem] mx-auto flex-1">
        <Outlet />
      </section>
      <Footer />
    </div>
  );
};

export default App;