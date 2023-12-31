export const CheckBox = (name) => {
  return '        <FormControlLabel\n' +
      '            control={<Controller\n' +
      '                control={control}\n' +
      '                name="'+name+'"\n' +
      '                render={({ field }) => (\n' +
      '                    <Checkbox  {...field} />\n' +
      '                )}\n' +
      '            />}\n' +
      '            label="'+name+'"/>';
};
