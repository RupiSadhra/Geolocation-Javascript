window.onload = function () {
  const path = window.location.href;
  const url = new URLSearchParams(path);
  const parent_id = url.get("parent_item_id");
  const form_id = url.get("id");
  const form_path = url.get("path");
  const technician_id = url.get("technician_id");
  const token = document.getElementById("form_session_token").value;
  const instance_url = get_instance_url();

  //code to display only associated contractor job
  show_contractor_job(parent_id);

  //hide info and reporting tab
  hide_tabs();

  //sign in form
  if (form_id == 9) {
    const action_url =
      instance_url +
      `?module=antevasin/unicloud/public_process&action=run&id=143&path=${form_path}/77-${technician_id}&token=${token}&form_id=${form_id}`;

    //change action url of public form
    const public_form = document.getElementById("public_form");
    public_form.action = action_url;

    display_expected_departure_time("");
    unicloud_module_technician_activity();
    const reporting_tab = document.querySelectorAll(".form_tab_136");
    reporting_tab[0].style.display = "none";
  }

  //update form
  else if (form_id == 10) {
    const action_url =
      instance_url +
      `?module=antevasin/unicloud/public_process&action=run&id=145&path=${form_path}/77-${technician_id}&token=${token}&form_id=${form_id}`;
    console.log("URL: " + action_url);

    //change action url of public form
    const public_form = document.getElementById("public_form");
    public_form.action = action_url;

    const expected_time = url.get("expected_time");
    let time_on_site = url.get("time_on_site");
    let previous_time = time_on_site.split(" ");
    time_on_site = parseInt(previous_time[0]);
    update_expected_departure_time(expected_time, time_on_site);
  }

  //sign out form
  else if (form_id == 11) {
    const action_url =
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
  }

  function hide_tabs() {
    const info_tab = document.querySelectorAll(".form_tab_128");
    info_tab[0].style.display = "none";
  }

  function unicloud_module_technician_activity() {
    //get id of current contractor job and location coordinates

    const location = url.get("location");
    console.log(location);
    let startIndex = location.indexOf("]");
    startIndex++;
    const coordinates = location.substring(startIndex, location.indexOf("("));
    let lastIndex = coordinates.indexOf(",");
    lastIndex++;
    //alert(coordinates);
    const siteLatitude = location.substring(startIndex, location.indexOf(","));
    const siteLongitude = coordinates.substring(lastIndex);
    //alert(siteLatitude+"  "+siteLongitude);
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
        button_message.innerText =
          "Sign In disabled due to distance from site!";
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
    console.log(
      "User: " + lat1 + " ",
      lon1 + " " + "Site: " + lat2 + " ",
      lon2
    );
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
  }

  function disable_arrival_on_site() {
    let today = new Date();
    const date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
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
    let timer; // Timer identifier
    const waitTime = 500;
    const input = document.querySelector("#fields_1760");
    const input_parent = document.querySelector("#fields_1760_rendered_value");
    var newEl = document.createElement("h4");
    newEl.style.fontWeight = "600";

    newEl.innerHTML = "Expected Departure Time: " + previous_expected_time;
    input_parent.append(newEl);

    const departure_time = (hours) => {
      var expected_time = get_expected_time(hours);
      if (hours > 0 || hours != "") {
        newEl.innerHTML = "Expected Departure Time: " + expected_time;
      } else {
        newEl.innerHTML = "Expected Departure Time: " + previous_expected_time;
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

  function update_expected_departure_time(
    previous_expected_time,
    time_on_site
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
      var expected_time = get_updated_time(hours, previous_expected_time);
      if (hours > 0 || hours != "") {
        newEl.innerHTML = "Expected Departure Time: " + expected_time;
        hours = parseInt(hours);
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
    var new_date =
      date_new.getHours() +
      ":" +
      date_new.getMinutes() +
      ":" +
      date_new.getSeconds();
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

  //sign out form
  //disable site departure

  function disable_site_departure() {
    let today = new Date();
    const date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
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
    const dropdown = document.querySelector("#fields_1901");
    const visit_site = document.querySelector(".form-group-1902");
    visit_site.style.display = "none";

    dropdown.addEventListener("change", function () {
      let value = dropdown.value;

      if (value == 806) {
        visit_site.style.display = "none";
      } else {
        visit_site.style.display = "block";
        const submit_button = document.querySelector('button[type="submit"]');
        submit_button.addEventListener("click", function (e) {
          e.preventDefault();

          $.ajax({
            url: "",
            data: {},
            type: "POST",
            success: function (response) {},
            error: function (error) {},
          });
        });
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
};
