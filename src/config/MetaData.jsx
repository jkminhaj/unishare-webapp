import { Helmet } from "react-helmet";
const MetaData = ({title , icon}) => {
    return (
        <Helmet>
            <meta charSet="utf-8" />
            <title>{title}</title>
            <link rel="icon" href={icon} />
        </Helmet>
    );
};

export default MetaData;