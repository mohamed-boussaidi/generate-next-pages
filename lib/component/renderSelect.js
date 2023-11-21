"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmptySelect = exports.Select = void 0;
const Select = (name, multiple) => {
    const options = multiple ? name : name + 's';
    return ('        <FormControl fullWidth margin="normal">\n' +
        '          <InputLabel id="demo-simple-select-label">' +
        name +
        "</InputLabel>\n" +
        "          <Controller\n" +
        "            control={control} \n" +
        '            name="' + name + '"\n' +
        '            rules={{ required: "This field is required" }}\n' +
        "            render={({ field }) => (\n" +
        "              <Select\n" +
        '                labelId="level-label"\n' +
        "                {...field}\n" +
        "                multiple={" + multiple + "}\n" +
        "                input={<OutlinedInput label='" +
        name +
        "' />}\n" +
        "              >\n" +
        "                {" + options + ".map((item, index) => (\n" +
        "                  <MenuItem value={item.value}>{item.label}</MenuItem>\n" +
        "                ))}\n" +
        "              </Select>\n" +
        "            )}\n" +
        "          />\n" +
        "        </FormControl>");
};
exports.Select = Select;
const EmptySelect = (name, multiple) => {
    return ('        <FormControl fullWidth margin="normal">\n' +
        '          <InputLabel id="demo-simple-select-label">' +
        name +
        "</InputLabel>\n" +
        "          <Controller\n" +
        "            control={control} \n" +
        '            name="' + name + '"\n' +
        '            rules={{ required: "This field is required" }}\n' +
        "            render={({ field }) => (\n" +
        "              <Select\n" +
        '                labelId="level-label"\n' +
        "                {...field}\n" +
        "                multiple={" + multiple + "}\n" +
        "                input={<OutlinedInput label='" +
        name +
        "' />}\n" +
        "              >\n" +
        "                {[].map((item, index) => (\n" +
        "                  <MenuItem value={item.value}>{item.label}</MenuItem>\n" +
        "                ))}\n" +
        "              </Select>\n" +
        "            )}\n" +
        "          />\n" +
        "        </FormControl>");
};
exports.EmptySelect = EmptySelect;
