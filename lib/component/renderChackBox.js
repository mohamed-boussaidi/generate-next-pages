"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckBox = void 0;
const CheckBox = (name) => {
    return '        <FormControlLabel\n' +
        '            control={<Controller\n' +
        '                control={control}\n' +
        '                name="' + name + '"\n' +
        '                render={({ field }) => (\n' +
        '                    <Checkbox  {...field} />\n' +
        '                )}\n' +
        '            />}\n' +
        '            label="' + name + '"/>';
};
exports.CheckBox = CheckBox;
