export const InputDatePicker = (name) => {
  return(
      '        <FormControl fullWidth margin="normal">\n' +
      '          <Controller\n' +
      '            control={control}\n' +
      '            name="'+name+'"\n' +
      '            render={({ field }) => (\n' +
      '              <LocalizationProvider dateAdapter={AdapterDayjs}>\n' +
      '                <DatePicker {...field} />\n' +
      '              </LocalizationProvider>\n' +
      '            )}\n' +
      '          />\n' +
      '        </FormControl>'
  )
}