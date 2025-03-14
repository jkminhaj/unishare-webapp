const CourseCard = ({course}) => {
    const {assignments ,  courseName , labs , notes , semester , _id} = course ;
    return (
        <div>
            <div className="border my-4 rounded-lg p-5">
                <p>{courseName}</p>
            </div>
        </div>
    );
};

export default CourseCard;