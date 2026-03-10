import MetaData from "../config/MetaData";

const Cover_Generator = () => {
  return (
    <div className="w-full h-screen">
      <MetaData title="UU Cover Generator" />
      <iframe
        src="/cover.html"
        className="w-full h-screen border-none"
      />
    </div>
  );
};

export default Cover_Generator;