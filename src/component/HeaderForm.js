const renderHeaderForm = (method) => {
    switch (method.toUpperCase()) {
        case "GET": {
            return "<List>";
        }
        case "POST": {
            return (
                "<Create saveButtonProps={saveButtonProps}>\n" +
                "<Box\n" +
                "component='form'\n" +
                "sx={{ display: 'flex', flexDirection: 'column' }}\n" +
                "autoComplete='off'\n      " +
                "> "
            );
        }
        case "PUT": {
            return (
                "<Edit saveButtonProps={saveButtonProps}>\n" +
                "<Box\n" +
                "component='form'\n" +
                "sx={{ display: 'flex', flexDirection: 'column' }}\n" +
                "autoComplete='off'\n      " +
                "> "
            );
        }
        default: {
            return "<div>";
        }
    }
};

export default renderHeaderForm