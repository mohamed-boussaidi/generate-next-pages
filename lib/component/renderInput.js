"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Input = void 0;
const Input = (name) => {
    return ("<TextField \n " +
        "label='" +
        name +
        "' \n" +
        '{...register("' +
        name +
        '", {\n' +
        'required: "This field is required",\n' +
        "})}\n" +
        "helperText={errors." +
        name +
        "?.message}\n" +
        "error={!!errors." +
        name +
        "}\n" +
        "margin='normal'\n" +
        "fullWidth \n" +
        "autoFocus >\n " +
        "</TextField>\n");
};
exports.Input = Input;
