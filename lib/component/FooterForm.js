"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const renderFooterForm = (method) => {
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
exports.default = renderFooterForm;
