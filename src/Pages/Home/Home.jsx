import { Link } from "react-router-dom";
import AllCourses from "../../components/Home/AllCourses";

const Home = () => {
    return (
        <div className="relative">
            <AllCourses/>
            <div>
                <Link to="/upload" className="border p-5 rounded-xl absolute hover:text-white transition-all hover:bg-blue-300">Upload Test</Link>
            </div>
        </div>
    );
};

export default Home;