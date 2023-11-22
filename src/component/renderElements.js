import { Input } from "./renderInput.js";
import {EmptySelect, Select} from "./renderSelect.js";
import { InputDatePicker } from "./renderDatePicker.js";
import { CheckBox } from "./renderChackBox.js";

export const renderInputFields = (value, key) => {
  if (value?.format === "iri-reference" || (value?.type === "array" && value.items?.format==="iri-reference")) {
    return `${Select(key,value?.type==='array'?true:false)}`;
  }else if (value?.type === "array" && value.items?.format!=="iri-reference") {
    return `${EmptySelect(key,true)}`;
  }
  else if (value?.format === "date-time") {
    return `${InputDatePicker(key)}`;
  } else if (value?.type === "string" || value?.type?.[0] === "string") {
    return `${Input(key)}`;
  } else if (value?.type === "boolean") {
    return `${CheckBox(key)}`;
  } else {
    return `${Input(key)}`;
  }
};
