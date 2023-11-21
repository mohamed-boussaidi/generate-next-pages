const renderFooterForm = (method: string) => {
    switch (method.toUpperCase()) {
        case "GET": {
            return "<List>";
        }
        case "POST": {
            return "</Box>\n" + "</Create>";
        }
        case "PUT": {
            return "</Box>\n" + "</Edit>";
        }
        default: {
            return "<div>";
        }
    }
};
export default renderFooterForm