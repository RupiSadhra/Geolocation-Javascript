const path = window.location.href;
const url = new URLSearchParams(path);
const parent_id = url.get("parent_item_id");
const form_id = url.get("id");
const form_path = url.get("path");
const technician_id = url.get("technician_id");
const token = document.getElementById("form_session_token").value;
const instance_url = get_instance_url();
let action_url;

//sign in form
if (form_id == 9) {
  //check status and redirect if applicable
  let check_status_url =
    instance_url +
    `?module=antevasin/unicloud/public_process&action=get_value&item=77-${technician_id}&token=${token}&field_id=1768`;
  let location = url.get("location");
  let redirect_url =
    instance_url +
    `?module=ext/public/form&id=10&parent_item_id=${parent_id}&technician_id=${technician_id}&location=${location}&path=${form_path}/77-${technician_id}`;
  let status = check_status(check_status_url, redirect_url);

  const action_url =
    instance_url +
    `?module=antevasin/unicloud/public_process&action=run&id=143&path=${form_path}/77-${technician_id}&token=${token}&form_id=${form_id}`;

  //change action url of public form
  const public_form = document.getElementById("public_form");
  public_form.action = action_url;
  let planned_time_onsite = url.get("planned_time_onsite");
  if (planned_time_onsite !== "") {
    $("#fields_1760").val(parseFloat(planned_time_onsite));
    // let arrival_time_onsite = document.querySelector("#fields_1762");
    // update_departure_time( arrival_time_onsite, parseInt( planned_time_onsite ) );
  }

  display_expected_departure_time(planned_time_onsite);

  unicloud_module_technician_activity();
  const reporting_tab = document.querySelectorAll(".form_tab_136");
  reporting_tab[0].style.display = "none";

  //code to display only associated contractor job
  show_contractor_job(parent_id);
  //hide info and reporting tab
  hide_tabs();
}

//update form
else if (form_id == 10) {
  const action_url =
    instance_url +
    `?module=antevasin/unicloud/public_process&action=run&id=145&path=${form_path}/77-${technician_id}&token=${token}&form_id=${form_id}`;
  console.log("URL: " + action_url);
  // add Sign Out button
  let location = url.get("location");
  let sign_out_action_url =
    instance_url +
    `?module=ext/public/form&id=11&parent_item_id=${parent_id}&technician_id=${technician_id}&location=${location}&path=${form_path}&token=${token}`;
  let sign_out_button_html = `<button type="button" onclick="sign_out_from_update_form( '${sign_out_action_url}' )" class="btn btn-primary">SIGN OUT</button>`;
  $(".btn-primary").after(sign_out_button_html);
  //change action url of public form
  const public_form = document.getElementById("public_form");
  public_form.action = action_url;

  //   const expected_time = url.get("expected_time");
  //   let time_on_site = url.get("time_on_site");
  // edit by spencer - two lines above are existing code which expect values to be passed as query params
  // getting current values for expected time and time on site from DB
  let time_values_action_url =
    instance_url +
    `?module=antevasin/unicloud/public_process&action=get_field_values&item=77-${technician_id}&token=${token}&form_id=${form_id}&field_ids=1760,1769`;
  update_time_values(time_values_action_url);

  //code to display only associated contractor job
  show_contractor_job(parent_id);
  //hide info and reporting tab
  hide_tabs();
}

//sign out form
else if (form_id == 11) {
  action_url =
    instance_url +
    `?module=antevasin/unicloud/public_process&action=run&id=144&path=${form_path}/77-${technician_id}&token=${token}&form_id=${form_id}`;
  console.log("URL: " + action_url);

  //change action url of public form
  const public_form = document.getElementById("public_form");
  public_form.action = action_url;

  disable_site_departure();
  departure_location();
  hide_visit_site_again();
  const reporting_tab = document.querySelectorAll(".form_tab_136");
  reporting_tab[0].style.display = "none";

  //code to display only associated contractor job
  show_contractor_job(parent_id);
  //hide info and reporting tab
  hide_tabs();
}

function update_departure_time() {
  let arrival_on_site = document.querySelector("#fields_1762");
}

function update_time_values(url) {
  $.ajax({
    url: url,
    type: "GET",
    success: function (response) {
      console.log(response);
      let time_values = JSON.parse(response);
      console.log(time_values);
      let expected_timestamp = time_values[1769];
      let expected_time = format_timestamp(expected_timestamp);
      let time_on_site = time_values[1760];
      update_expected_departure_time(
        expected_time,
        time_on_site,
        expected_timestamp
      );
    },
    error: function (error) {
      console.log(error);
    },
  });
}

function format_timestamp(seconds) {
  const dtFormat = new Intl.DateTimeFormat("en-NZ", {
    timeStyle: "medium",
    timeZone: "Pacific/Auckland",
  });

  return dtFormat.format(new Date(seconds * 1e3));
}

function check_status(url, redirect_url) {
  console.log(url);
  console.log(redirect_url);
  $.ajax({
    url: url,
    type: "GET",
    success: function (response) {
      console.log(response);
      if (response == 763) {
        // alert (redirect_url);
        window.location.href = redirect_url;
      }
    },
    error: function (error) {
      console.log(error);
    },
  });
}

function sign_out_from_update_form(sign_out_url) {
  console.log("sign out on update form " + sign_out_url);
  window.location.href = sign_out_url;
}

function hide_tabs() {
  const info_tab = document.querySelectorAll(".form_tab_128");
  info_tab[0].style.display = "none";
}

function unicloud_module_technician_activity() {
  let siteLatitude, siteLongitude, location;
  const url = `https://projects.unicloud.co.nz/fmdemo-dev/index.php?module=antevasin/unicloud/public_process&action=get_field_values&item=34-6887&token=${token}&field_ids=401,1552,1910`;
  // ajax call to get coordinates

  $.ajax({
    url: url,
    type: "GET",
    success: function (response) {
      let data = JSON.parse(response);
      console.log(response);
      if (data[1910]) {
        location = data[1552];
        const coordinates = location.split(",");
        siteLatitude = coordinates[0];
        siteLongitude = coordinates[1];
        alert("google " + siteLatitude + "  " + siteLongitude);
      } else {
        location = data[401];
        let startIndexLat = location.indexOf("]");
        startIndexLat++;

        let startIndexLong = location.indexOf(",");
        startIndexLong++;

        let lastIndexLong =
          location.indexOf("(") == -1
            ? location.lastIndexOf("[")
            : location.indexOf("(");

        //alert(coordinates);
        siteLatitude = location.substring(startIndexLat, location.indexOf(","));
        siteLongitude = location.substring(startIndexLong, lastIndexLong);
        alert("pin " + siteLatitude + "  " + siteLongitude);
      }
    },
    error: function (error) {
      console.log(error);
    },
  });

  const button = document.querySelector('button[type="submit"]');
  const button_message = document.getElementById("form-error-container");
  const sign_in = document.querySelector('button[type="submit"]');
  const arrival_location = document.querySelector("#fields_1759");
  const arrival_form = document.querySelector(".form-group-1759");
  arrival_form.style.display = "none";

  if (navigator.geolocation) {
    //console.log('Geolocation is supported!');

    window.navigator.geolocation.watchPosition(
      (position) => {
        //alert("lat..."+position.coords.latitude+" long..."+position.coords.longitude);
        let userLatitude = position.coords.latitude;
        let userLongitude = position.coords.longitude;
        //console.log("long: " + long + "lat: "+lat);
        let distance = find_distance(
          userLatitude,
          userLongitude,
          siteLatitude,
          siteLongitude
        );
        console.log("distance: " + distance);
        let arrivalLocation =
          "[map]" + userLatitude + "," + userLongitude + "[/map]";
        arrival_location.value = arrivalLocation;

        if (distance > 1) {
          // console.log("You need to be only 1km away from the site");
          console.log("button disable");
          button.disabled = true;
          button_message.innerText =
            "Sign In disabled due to distance from site!";
        } else {
          button.disabled = false;
          button_message.innerText = "";
        }
      },
      (error) => {
        console.log(error.message);
      }
    );
  } else {
    console.log("Geolocation is not supported for this Browser/OS.");
  }

  // end of window onload function

  //hides or shows the geolocation override reason textarea
  const dropdown = document.querySelector("#fields_1765");
  const override_location = document.querySelector(".form-group-1766");
  override_location.style.display = "none";

  dropdown.addEventListener("change", function () {
    let value = dropdown.value;

    if (value == 760) {
      override_location.style.display = "none";
      button.disabled = true;
      button_message.innerText = "Sign In disabled due to distance from site!";
    } else {
      override_location.style.display = "block";
      button.disabled = false;
      button_message.innerText = "";
    }
  });

  //display current time/date and disable
  disable_arrival_on_site();
}

function find_distance(lat1, lon1, lat2, lon2) {
  console.log("User: " + lat1 + " ", lon1 + " " + "Site: " + lat2 + " ", lon2);
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

function show_contractor_job(parent_id) {
  window.onload = function () {
    let job;
    const options = document.querySelectorAll("#parent_item_id option");
    const dropdown = document.querySelectorAll(".chosen-container");
    //const form=document.querySelectorAll('.form-group-parent-item-id .col-md-9');
    const label = document.querySelectorAll(
      ".form-group-parent-item-id .col-md-3"
    );
    const form = document.querySelectorAll(".form-group-parent-item-id");
    let index = 1;
    options.forEach(function (option) {
      //console.log(option.value);
      if (option.value == parent_id) {
        job = option.text;
      }
      index++;
    });
    dropdown[0].style.display = "none";
    label[0].style.display = "none";
    let job_index = job.lastIndexOf("/");
    job_index++;
    const job_name = job.substring(job_index);
    console.log(job_name);

    var newEl = document.createElement("h4");
    newEl.innerHTML = job_name;
    newEl.style.marginLeft = "20px";
    form[0].append(newEl);
  };
}

function disable_arrival_on_site() {
  let today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date + " " + time;

  //sets default value for arrival on site
  const arrival_on_site = document.querySelector("#fields_1762");
  arrival_on_site.value = dateTime;

  //actual arrival on site reporting tab
  const actual_arrival_on_site = document.querySelector("#fields_1862");
  actual_arrival_on_site.value = dateTime;

  arrival_on_site.readOnly = true;

  //hides the calendar button
  const dateset = document.querySelectorAll(".date-set");
  dateset[0].style.display = "none";
  dateset[0].disabled = true;

  //hides or shows the arrival on site textarea
  const dropdown = document.querySelector("#fields_1850");
  var value;
  $(".form-group-1851").css("display", "none");

  dropdown.addEventListener("change", function () {
    value = dropdown.value;

    if (value == 785) {
      $(".form-group-1851").css("display", "none");
      dateset[0].style.display = "none";
      arrival_on_site.readOnly = true;
      dateset[0].disabled = true;
      arrival_on_site.value = dateTime;
    } else {
      $(".form-group-1851").css("display", "block");
      dateset[0].style.display = "block";
      arrival_on_site.readOnly = false;
      dateset[0].disabled = false;
    }
  });
  arrival_on_site.addEventListener("focus", function () {
    document.querySelector(".datetimepicker").style.display = "none";
  });
}

function display_expected_departure_time(previous_expected_time) {
  if (previous_expected_time) {
    let planned_time = previous_expected_time.split(" ");
    previous_expected_time = planned_time[0];
  }

  let timer; // Timer identifier
  const waitTime = 500;
  const input = document.querySelector("#fields_1760");
  const input_parent = document.querySelector("#fields_1760_rendered_value");
  var newEl = document.createElement("h4");
  newEl.style.fontWeight = "600";

  const departure_time = (hours) => {
    var expected_time = get_expected_time(hours);
    if (hours > 0 || hours != "") {
      newEl.innerHTML = "Expected Departure Time: " + expected_time;
    } else {
      newEl.innerHTML = "Expected Departure Time: " + previous_expected_time;
    }
  };

  //newEl.innerHTML = "Expected Departure Time: " + previous_expected_time;
  input_parent.append(newEl);
  departure_time(previous_expected_time);

  // Listen for `keyup` event
  input.addEventListener("keyup", (e) => {
    const time = e.currentTarget.value;
    clearTimeout(timer);

    // Wait for X ms and then process the request
    timer = setTimeout(() => {
      departure_time(time);
    }, waitTime);
  });
}

function update_expected_departure_time(
  previous_expected_time,
  time_on_site,
  expected_timestamp
) {
  let timer; // Timer identifier
  const waitTime = 500;

  const previous_time = document.querySelector("#fields_1760");
  previous_time.value = time_on_site;
  previous_time.readOnly = true;

  const input = document.querySelector("#fields_1903");
  const input_parent = document.querySelector("#fields_1903_rendered_value");
  var newEl = document.createElement("h4");
  newEl.style.fontWeight = "600";

  newEl.innerHTML = "Expected Departure Time: " + previous_expected_time;
  input_parent.append(newEl);

  const departure_time = (hours) => {
    //var expected_time = get_updated_time(hours, previous_expected_time);
    var expected_time = get_updated_time_timestamp(hours, expected_timestamp);

    if (hours > 0 || hours != "") {
      newEl.innerHTML = "Expected Departure Time: " + expected_time;
      hours = parseFloat(hours);
      time_on_site = parseFloat(time_on_site);
      previous_time.value = hours + time_on_site;
    } else {
      newEl.innerHTML = "Expected Departure Time: " + previous_expected_time;
      previous_time.value = time_on_site;
    }
  };

  // Listen for `keyup` event
  input.addEventListener("keyup", (e) => {
    const time = e.currentTarget.value;
    clearTimeout(timer);

    // Wait for X ms and then process the request
    timer = setTimeout(() => {
      departure_time(time);
    }, waitTime);
  });
}

function get_expected_time(hours) {
  let today = new Date();
  let ms = today.getTime();
  ms += hours * 3600 * 1000;
  var date_new = new Date(ms);
  var new_date = date_new.getHours() + ":" + date_new.getMinutes();
  // ":" +
  // date_new.getSeconds();
  return new_date;
}

function get_updated_time(hours, previous_expected_time) {
  let date_time = previous_expected_time.split(" ");
  let time = date_time[0];
  let date = date_time[1];
  let date_new = date.split("/");
  date = `${date_new[2]}-${date_new[1]}-${date_new[0]}`;
  date = `${date} ${date_time[0]}`;
  let ms = Date.parse(date);
  ms += hours * 3600 * 1000;
  date_new = new Date(ms);
  let new_date = date_new.getHours() + ":" + date_new.getMinutes();
  return new_date;
}

function get_updated_time_timestamp(hours, expected_timestamp) {
  let ms = expected_timestamp * 1000;
  ms += hours * 3600 * 1000;
  date_new = new Date(ms);
  //alert(date_new);
  let new_date = date_new.getHours() + ":" + date_new.getMinutes();
  return new_date;
}

//sign out form
//disable site departure

function disable_site_departure() {
  let today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date + " " + time;

  //sets default value for site departure
  const departure_on_site = document.querySelector("#fields_1763");
  departure_on_site.value = dateTime;
  departure_on_site.readOnly = true;

  //actual site departure reporting tab
  const actual_site_departure = document.querySelector("#fields_1904");
  actual_site_departure.value = dateTime;

  //hides the calendar button
  const dateset = document.querySelectorAll(".date-set");
  dateset[0].style.display = "none";
  // dateset[0].disabled = true;

  //hides or shows the arrival on site textarea
  const dropdown = document.querySelector("#fields_1905");
  var value;
  $(".form-group-1906").css("display", "none");

  dropdown.addEventListener("change", function () {
    value = dropdown.value;

    if (value == 808) {
      $(".form-group-1906").css("display", "none");
      dateset[0].style.display = "none";
      departure_on_site.readOnly = true;
      dateset[0].disabled = true;
      departure_on_site.value = dateTime;
    } else {
      $(".form-group-1906").css("display", "block");
      dateset[0].style.display = "block";
      departure_on_site.readOnly = false;
      dateset[0].disabled = false;
      $("#fields_1906").attr("required", "");
    }
  });
  departure_on_site.addEventListener("focus", function () {
    document.querySelector(".datetimepicker").style.display = "none";
  });
}

function departure_location() {
  //hide departue location
  let departure_location_form = document.querySelector(".form-group-1764");
  let departure_location = document.querySelector("#fields_1764");
  departure_location_form.style.display = "none";

  //capture departure location

  window.onload = function () {
    if (navigator.geolocation) {
      //console.log('Geolocation is supported!');

      window.navigator.geolocation.watchPosition(
        (position) => {
          //alert("lat..."+position.coords.latitude+" long..."+position.coords.longitude);
          let userLatitude = position.coords.latitude;
          let userLongitude = position.coords.longitude;
          //console.log("long: " + long + "lat: "+lat);

          let departureLocation =
            "[map]" + userLatitude + "," + userLongitude + "[/map]";
          departure_location.value = departureLocation;
        },
        (error) => {
          console.log(error.message);
        }
      );
    } else {
      console.log("Geolocation is not supported for this Browser/OS.");
    }
  };
}

function hide_visit_site_again() {
  //automate action sign out
  if (!technician_id) {
    action_url = document.querySelector("#process").action;
    //alert(action_url);
  }
  const dropdown = document.querySelector("#fields_1901");
  const visit_site = document.querySelector(".form-group-1902");
  visit_site.style.display = "none";

  dropdown.addEventListener("change", function () {
    let value = dropdown.value;

    if (value == 807) {
      visit_site.style.display = "block";

      const submit_button = document.querySelector('button[type="submit"]');
      submit_button.addEventListener("click", function (e) {
        e.preventDefault();
        let clear_fields =
          "1759,1760,1762,1763,1764,1765,1766,1769,1771,1772,1773,1838,1850,1901,1903,1906,1907";
        let set_fields = "1768=762";
        let copy_record_url =
          instance_url +
          `?module=antevasin/unicloud/public_process&action=copy&token=${token}&item=77-${technician_id}&clear_fields=${clear_fields}&set_fields=${set_fields}`;
        $.ajax({
          url: copy_record_url,
          type: "GET",
          success: function (response) {
            let response_obj = JSON.parse(response);
            if (response_obj.hasOwnProperty("success")) {
              // console.log( 'success' );
              $("#public_form").submit();
            } else if (response_obj.hasOwnProperty("error")) {
              console.log(response_obj.error);
            }
          },
          error: function (error) {
            console.log(error);
          },
        });
      });
    } else {
      visit_site.style.display = "none";
    }
  });
}

function get_instance_url() {
  return (
    window.location.protocol +
    "//" +
    window.location.host +
    window.location.pathname
  );
}
