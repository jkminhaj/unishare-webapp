import MetaData from "../config/MetaData";

const Cover_Generator = () => {
  return (
    <div className="w-full h-screen">
      <MetaData title="UU Cover Generator" icon="https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/33/e7/c7/33e7c78b-26d4-5562-4073-d68669fbe887/AppIcon-85-220-0-5-0-0-2x-0-0.png/1200x630bb.png" />
      <iframe
        src="/cover.html"
        className="w-full h-screen border-none"
      />
    </div>
  );
};

export default Cover_Generator;