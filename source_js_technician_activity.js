$.getScript("https://source.unicloud.co.nz/js/functions.js", function () {
  //helper functions
  get_instance_url();
});
//console.log('in public form');
// hide the form while we set up the form
$("#public_form").hide();

let instance_url = get_instance_url();

//get_technician_activity() arguments
const arrival_location = document.querySelector("#fields_1759");
const arrival_form = document.querySelector(".form-group-1759");
const override_location_dropdown = document.querySelector("#fields_1765");
const override_location = document.querySelector(".form-group-1766");

//disable_arrival_on_site() arguments
const arrival_on_site = document.querySelector("#fields_1762");
const actual_arrival_on_site = document.querySelector("#fields_1862");
const override_arrival_time_dropdown = document.querySelector("#fields_1850");
const override_time_reason = document.querySelector(".form-group-1851");

//display_expected_departure_time arguments
const expected_time_on_site = document.querySelector("#fields_1760");
const expected_time_on_site_parent = document.querySelector(
  "#fields_1760_rendered_value"
);

//update_expected_departure_time() arguments
const previous_expected_time_field = document.querySelector("#fields_1760");
const additional_time_field = document.querySelector("#fields_1903");
const additional_time_field_parent = document.querySelector(
  "#fields_1903_rendered_value"
);

//disable_site_departure() arguments
const departure_on_site = document.querySelector("#fields_1763");
const actual_site_departure = document.querySelector("#fields_1904");
const override_site_departure = document.querySelector("#fields_1905");
const override_site_departure_reason_form =
  document.querySelector(".form-group-1906");
const override_site_departure_reason = document.querySelector("#fields_1906");

//departure_location() arguments
const departure_location_form = document.querySelector(".form-group-1764");
const departure_location_field = document.querySelector("#fields_1764");

//hide_visit_site_again() arguments
const visit_site_dropdown = document.querySelector("#fields_1901");
const visit_site = document.querySelector(".form-group-1902");

//public form url values
const path = window.location.href;
const url = new URLSearchParams(path);
const parent_id = url.get("parent_item_id");
const form_path = url.get("path");
const technician_id = url.get("technician_id");
const token = document.getElementById("form_session_token").value;
const form_id = url.get("id");
const map_location = url.get("location");

const full_path = form_path.split("/");
const site_id = full_path[2];
//const technician_entity_path = full_path[4];
//const technician_entity = technician_entity_path.split('-')[0];
let action_url;

//loader

//sign in form
if (form_id == 9) {
  //check status and redirect if applicable
  let check_status_url =
    instance_url +
    `?module=antevasin/unicloud/public_process&action=get_value&item=77-${technician_id}&token=${token}&field_id=1768`;
  let redirect_url =
    instance_url +
    `?module=ext/public/form&id=10&parent_item_id=${parent_id}&technician_id=${technician_id}&location=${map_location}&path=${form_path}/77-${technician_id}`;
  check_status(check_status_url, redirect_url, 762, false);

  const action_url =
    instance_url +
    `?module=antevasin/unicloud/public_process&action=run&id=143&path=${form_path}/77-${technician_id}&token=${token}&form_id=${form_id}`;

  //change action url of public form
  const public_form = document.getElementById("public_form");
  public_form.action = action_url;

  let planned_time_onsite = url.get("planned_time_onsite");
  if (planned_time_onsite !== "") {
    expected_time_on_site.value = parseFloat(planned_time_onsite);
  }

  display_expected_departure_time(
    planned_time_onsite,
    expected_time_on_site,
    expected_time_on_site_parent
  );

  get_technician_activity(
    arrival_location,
    arrival_form,
    override_location_dropdown,
    override_location
  );

  disable_arrival_on_site(
    arrival_on_site,
    actual_arrival_on_site,
    override_arrival_time_dropdown,
    override_time_reason
  );

  show_contractor_job(parent_id);

  hide_tabs();
  const reporting_tab = document.querySelectorAll(".form_tab_136");
  reporting_tab[0].style.display = "none";

  display_loader();
}

//update form
else if (form_id == 10) {
  //check if signed out and redirect if applicable
  check_if_signed_out();

  const action_url =
    instance_url +
    `?module=antevasin/unicloud/public_process&action=run&id=145&path=${form_path}/77-${technician_id}&token=${token}&form_id=${form_id}`;
  console.log("URL: " + action_url);
  // add Sign Out button
  let sign_out_action_url =
    instance_url +
    `?module=ext/public/form&id=11&parent_item_id=${parent_id}&technician_id=${technician_id}&location=${map_location}&path=${form_path}&token=${token}`;
  let sign_out_button_html = `<button type="button" onclick="sign_out_from_update_form( '${sign_out_action_url}' )" class="btn btn-primary">Sign Out</button>`;
  $(".btn-primary").after(sign_out_button_html);
  //change action url of public form
  const public_form = document.getElementById("public_form");
  public_form.action = action_url;

  // getting current values for expected time and time on site from DB
  let time_values_action_url =
    instance_url +
    `?module=antevasin/unicloud/public_process&action=get_field_values&item=77-${technician_id}&token=${token}&form_id=${form_id}&field_ids=1760,1769`;

  update_time_values(time_values_action_url);

  //code to display only associated contractor job
  show_contractor_job(parent_id);
  //hide info and reporting tab
  hide_tabs();
  display_loader();
}

//sign out form
else if (form_id == 11) {
  //check if signed out and redirect if applicable
  check_if_signed_out();

  action_url =
    instance_url +
    `?module=antevasin/unicloud/public_process&action=run&id=144&path=${form_path}/77-${technician_id}&token=${token}&form_id=${form_id}`;
  console.log("URL: " + action_url);

  //change action url of public form
  const public_form = document.getElementById("public_form");
  public_form.action = action_url;

  disable_site_departure(
    departure_on_site,
    actual_site_departure,
    override_site_departure,
    override_site_departure_reason_form,
    override_site_departure_reason
  );
  departure_location(departure_location_form, departure_location_field);
  hide_visit_site_again(visit_site_dropdown, visit_site);

  //code to display only associated contractor job
  show_contractor_job(parent_id);
  //hide info and reporting tab
  hide_tabs();
  const reporting_tab = document.querySelectorAll(".form_tab_136");
  reporting_tab[0].style.display = "none";
  display_loader();
}

function update_departure_time() {
  let arrival_on_site = document.querySelector("#fields_1762");
}
// finish up by showing the form again
$("#public_form").show();

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
        expected_timestamp,
        previous_expected_time_field,
        additional_time_field,
        additional_time_field_parent
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

function check_status(url, redirect_url, status, state) {
  console.log(url);
  console.log(redirect_url);
  $.ajax({
    url: url,
    type: "GET",
    success: function (response) {
      console.log(response);
      if (state) {
        if (response == status) {
          window.location.href = redirect_url;
        }
      } else {
        if (response != status) {
          window.location.href = redirect_url;
        }
      }
    },
    error: function (error) {
      console.log(error);
    },
  });
}

function check_if_signed_out() {
  //check status and redirect if applicable
  let check_status_url =
    instance_url +
    `?module=antevasin/unicloud/public_process&action=get_value&item=77-${technician_id}&token=${token}&field_id=1768`;
  let redirect_url =
    instance_url +
    `?module=ext/public/form&action=success&id=11&token=${token}`;
  check_status(check_status_url, redirect_url, 764, true);
}

function sign_out_from_update_form(sign_out_url) {
  console.log("sign out on update form " + sign_out_url);
  window.location.href = sign_out_url;
}

function hide_tabs() {
  const info_tab = document.querySelectorAll(".form_tab_128");
  info_tab[0].style.display = "none";
}

function get_technician_activity(
  arrival_location,
  arrival_form,
  override_location_dropdown,
  override_location
) {
  let siteLatitude, siteLongitude, location;

  const url = `https://projects.unicloud.co.nz/fmdemo-dev/index.php?module=antevasin/unicloud/public_process&action=get_field_values&item=${site_id}&token=${token}&field_ids=401,1552,1910`;
  // ajax call to get coordinates

  $.ajax({
    url: url,
    type: "GET",
    success: function (response) {
      let data = JSON.parse(response);
      console.log(response);
      if (data[1910] == "true") {
        location = data[1552];
        const coordinates = location.split(",");
        siteLatitude = coordinates[0];
        siteLongitude = coordinates[1];
        //alert("google " + siteLatitude + "  " + siteLongitude);
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
        //alert("pin " + siteLatitude + "  " + siteLongitude);
      }
    },
    error: function (error) {
      console.log(error);
    },
  });

  const button = document.querySelector('button[type="submit"]');
  const button_message = document.getElementById("form-error-container");
  button.disabled = true;
  button_message.innerText = `Set 'Know your location' to allow to Sign In!`;
  arrival_form.style.display = "none";
  //hides or shows the geolocation override reason textarea
  override_location.style.display = "none";

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
          //console.log("button disable");
          button.disabled = true;
          button_message.innerText =
            "Sign In disabled due to distance from site!";
        } else {
          button.disabled = false;
          button_message.innerText = "";
        }

        override_location_dropdown.addEventListener("change", function () {
          let value = override_location_dropdown.value;

          if (value == 760 && distance > 1) {
            override_location.style.display = "none";
            button.disabled = true;
            button_message.innerText =
              "Sign In disabled due to distance from site!";
          } else if (value == 760 && distance < 1) {
            override_location.style.display = "none";
          } else {
            override_location.style.display = "block";
            button.disabled = false;
            button_message.innerText = "";
          }
        });
      },
      (error) => {
        console.log("Geolocation error: " + error.message);
        button.disabled = true;
        button_message.innerHTML = `Turn on the location <a target="_blank" href="https://www.unicloud.co.nz/Manuals/Users/Location-Settings.html">(click here for instructions)</a> and refresh the page to Sign In!`;

        override_location_dropdown.addEventListener("change", function () {
          override_location.style.display = "none";
          button.disabled = true;
          button_message.innerHTML = `Turn on the location <a target="_blank" href="https://www.unicloud.co.nz/Manuals/Users/Location-Settings.html">(click here for instructions)</a> and refresh the page to Sign In!`;
        });

        button_message.style.cssText = `
              margin: 1rem auto;
              font-size: 1.5rem;
              text-align:center; `;
      }
    );
  } else {
    console.log("Geolocation is not supported for this Browser/OS.");
  } // end of window onload function
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

function disable_arrival_on_site(
  arrival_on_site,
  actual_arrival_on_site,
  override_arrival_time_dropdown,
  override_time_reason
) {
  let today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const time = today.getHours() + ":" + today.getMinutes();
  const dateTime = date + " " + time;

  //sets default value for arrival on site
  arrival_on_site.value = dateTime;

  //actual arrival on site reporting tab
  actual_arrival_on_site.value = dateTime;

  arrival_on_site.readOnly = true;

  //hides the calendar button
  const dateset = document.querySelectorAll(".date-set");
  dateset[0].style.display = "none";
  dateset[0].disabled = true;

  //hides or shows the arrival on site textarea
  override_time_reason.style.display = "none";
  $(override_time_reason).find(".required").removeClass("required");

  override_arrival_time_dropdown.addEventListener("change", function () {
    var value = override_arrival_time_dropdown.value;

    if (value == 785) {
      override_time_reason.style.display = "none";
      dateset[0].style.display = "none";
      arrival_on_site.readOnly = true;
      dateset[0].disabled = true;
      arrival_on_site.value = dateTime;
    } else {
      override_time_reason.style.display = "block";
      dateset[0].style.display = "block";
      arrival_on_site.readOnly = false;
      dateset[0].disabled = false;
    }
  });

  arrival_on_site.addEventListener("focus", function () {
    document.querySelector(".datetimepicker").style.display = "none";
  });
}

function display_expected_departure_time(
  previous_expected_time,
  expected_time_on_site,
  expected_time_on_site_parent
) {
  if (previous_expected_time) {
    let planned_time = previous_expected_time.split(" ");
    previous_expected_time = planned_time[0];
  }

  let timer; // Timer identifier
  const waitTime = 500;

  var newEl = document.createElement("h4");
  newEl.style.fontWeight = "600";

  const departure_time = (hours) => {
    var expected_time = get_expected_time(hours);
    if (hours > 0 || hours != "") {
      newEl.innerHTML = "Expected Departure Time: " + expected_time;
    } else {
      newEl.innerHTML = "Expected Departure Time: ";
    }
  };

  //newEl.innerHTML = "Expected Departure Time: " + previous_expected_time;
  expected_time_on_site_parent.append(newEl);
  departure_time(previous_expected_time);

  // Listen for `keyup` event
  expected_time_on_site.addEventListener("keyup", (e) => {
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
  expected_timestamp,
  previous_expected_time_field,
  additional_time_field,
  additional_time_field_parent
) {
  let timer; // Timer identifier
  const waitTime = 500;

  previous_expected_time_field.value = time_on_site;
  previous_expected_time_field.readOnly = true;

  var newEl = document.createElement("h4");
  newEl.style.fontWeight = "600";

  newEl.innerHTML = "Expected Departure Time: " + previous_expected_time;
  additional_time_field_parent.append(newEl);

  const departure_time = (hours) => {
    //var expected_time = get_updated_time(hours, previous_expected_time);
    var expected_time = get_updated_time_timestamp(hours, expected_timestamp);

    if (hours > 0 || hours != "") {
      newEl.innerHTML = "Expected Departure Time: " + expected_time;
      hours = parseFloat(hours);
      time_on_site = parseFloat(time_on_site);
      previous_expected_time_field.value = hours + time_on_site;
    } else {
      newEl.innerHTML = "Expected Departure Time: " + previous_expected_time;
      previous_expected_time_field.value = time_on_site;
    }
  };

  // Listen for `keyup` event
  additional_time_field.addEventListener("keyup", (e) => {
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

//disable site departure

function disable_site_departure(
  departure_on_site,
  actual_site_departure,
  override_site_departure,
  override_site_departure_reason_form,
  override_site_departure_reason
) {
  let today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date + " " + time;

  //sets default value for site departure
  departure_on_site.value = dateTime;
  departure_on_site.readOnly = true;

  //actual site departure reporting tab
  actual_site_departure.value = dateTime;

  //hides the calendar button
  const dateset = document.querySelectorAll(".date-set");
  dateset[0].style.display = "none";

  //hides or shows the arrival on site textarea
  override_site_departure_reason_form.style.display = "none";

  override_site_departure.addEventListener("change", function () {
    var value = override_site_departure.value;

    if (value == 808) {
      override_site_departure_reason_form.style.display = "none";
      dateset[0].style.display = "none";
      departure_on_site.readOnly = true;
      dateset[0].disabled = true;
      departure_on_site.value = dateTime;
    } else {
      override_site_departure_reason_form.style.display = "block";
      dateset[0].style.display = "block";
      departure_on_site.readOnly = false;
      dateset[0].disabled = false;
      override_site_departure_reason.required = "true";
    }
  });

  departure_on_site.addEventListener("focus", function () {
    document.querySelector(".datetimepicker").style.display = "none";
  });
}

function departure_location(departure_location_form, departure_location_field) {
  //hide departue location
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

function hide_visit_site_again(visit_site_dropdown, visit_site) {
  //automate action sign out
  if (!technician_id) {
    action_url = document.querySelector("#process").action;
    //alert(action_url);
  }

  visit_site.style.display = "none";

  visit_site_dropdown.addEventListener("change", function () {
    let value = visit_site_dropdown.value;

    if (value == 807) {
      visit_site.style.display = "block";

      const submit_button = document.querySelector('button[type="submit"]');
      submit_button.addEventListener("click", function (e) {
        e.preventDefault();
        let clear_fields =
          "1759,1760,1762,1763,1764,1765,1766,1769,1771,1772,1773,1838,1850,1901,1903,1906,1907";
        let reason_to_visit_site_again = $("#fields_1902 :selected").val();
        let set_fields = `1768=762,1902=${reason_to_visit_site_again}`;
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

function display_loader() {
  const loader = document.createElement("div");
  const form = document.querySelector(".content-form");
  const copyright = document.querySelector(".copyright");
  document.body.appendChild(loader);
  loader.style.cssText = `
      position : fixed;
      top : 0;
      left : 0;
      width : 100%;
      height : 100%;
      z-index : 9999;
      background : url(../images/loading.gif);
      background-position : center;
      background-size : 30px 30px;
      background-repeat : no-repeat;
    `;

  document.querySelector("body").style.cssText = `
      width:100%;
      min-height:100vh;
      display : flex;
      justify-content : center;
      align-items : center;
      flex-direction: column;
    `;

  setTimeout(function () {
    loader.style.display = "none";
    form.style.display = "block";
    copyright.style.display = "block";
  }, 1500);
}

function get_instance_url() {
  return (
    window.location.protocol +
    "//" +
    window.location.host +
    window.location.pathname
  );
}
