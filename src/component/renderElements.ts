import { Input } from "./renderInput";
import {EmptySelect, Select} from "./renderSelect";
import { InputDatePicker } from "./renderDatePicker";
import { IValueField } from "../interfaces";
import { CheckBox } from "./renderChackBox";

export const renderInputFields = (value: IValueField, key: string) => {
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
