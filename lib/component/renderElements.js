"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderInputFields = void 0;
const renderInput_1 = require("./renderInput");
const renderSelect_1 = require("./renderSelect");
const renderDatePicker_1 = require("./renderDatePicker");
const renderChackBox_1 = require("./renderChackBox");
const renderInputFields = (value, key) => {
    if (value?.format === "iri-reference" || (value?.type === "array" && value.items?.format === "iri-reference")) {
        return `${(0, renderSelect_1.Select)(key, value?.type === 'array' ? true : false)}`;
    }
    else if (value?.type === "array" && value.items?.format !== "iri-reference") {
        return `${(0, renderSelect_1.EmptySelect)(key, true)}`;
    }
    else if (value?.format === "date-time") {
        return `${(0, renderDatePicker_1.InputDatePicker)(key)}`;
    }
    else if (value?.type === "string" || value?.type?.[0] === "string") {
        return `${(0, renderInput_1.Input)(key)}`;
    }
    else if (value?.type === "boolean") {
        return `${(0, renderChackBox_1.CheckBox)(key)}`;
    }
    else {
        return `${(0, renderInput_1.Input)(key)}`;
    }
};
exports.renderInputFields = renderInputFields;
