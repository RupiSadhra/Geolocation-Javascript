function get_updated_time_timestamp(hours, expected_timestamp) {
  let ms = expected_timestamp * 1000;
  ms += hours * 3600 * 1000;
  date_new = new Date(ms);
  //alert(date_new);
  let new_date = date_new.getHours() + ":" + date_new.getMinutes();
  return new_date;
}
