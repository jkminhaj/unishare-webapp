import AllCourses from "../../components/Home/AllCourses";
import MetaData from "../../config/MetaData";

const Home = () => {
    return (
        <div className="relative">
            <div>
                <MetaData title="Unishare • Home"/>
                <AllCourses />
            </div>
        </div>
    );
};

export default Home;