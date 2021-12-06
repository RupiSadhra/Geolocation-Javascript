let instance_url = get_instance_url();

//get_technician_activity() arguments
const arrival_location = document.querySelector("#fields_1759");
const arrival_form = document.querySelector(".form-group-1759");
const override_location = document.querySelector(".form-group-1766");
const override_location_dropdown = document.querySelector("#fields_1765");
const button_message = document.getElementById("form-error-container");


//disable_arrival_on_site() arguments
const arrival_on_site = document.querySelector("#fields_1762");
const actual_arrival_on_site = document.querySelector("#fields_1862");
const override_arrival_time_dropdown = document.querySelector("#fields_1850");
const override_time_reason = document.querySelector(".form-group-1851");
const admin_signin = document.querySelector('#fields_1907');
//alert(admin_signin);

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
const visit_site_reason = document.querySelector("#fields_1902");

//update condition rating arguments
const asset_rating = document.querySelector("#fields_1987");
const asset_rating_options = document.querySelectorAll("#fields_1987 option");
const asset_rating_form = document.querySelector(".form-group-1987");
const asset_notes = document.querySelector("#fields_2039");
const asset_image = document.querySelector("#fields_2038");

//get_asset_values_qr arguments
const asset_rating_qr = document.querySelector("#fields_973");
const asset_rating_options_qr = document.querySelectorAll("#fields_973 option");
const asset_rating_form_qr = document.querySelector(".form-group-973");
const asset_notes_qr = document.querySelector("#fields_2319");
const asset_image_qr = document.querySelector("#fields_2320");

//hide_asset_notes_image() arguments
const asset_notes_form = document.querySelector(".form-group-2039");
const asset_image_form = document.querySelector(".form-group-2038");

//hide_asset_notes_image_qrcode() arguments
const asset_notes_form_qr = document.querySelector(".form-group-2319");
const asset_image_form_qr = document.querySelector(".form-group-2320");

//accept_job_date() arguments
const job_accept_date = document.querySelector("#fields_2248");
const work_activity = document.querySelector("#fields_2236");
const site_review = document.querySelector("#fields_2235");

//decline_job_date() arguments
const job_decline_date = document.querySelector("#fields_2249");
const job_decline_reason = document.querySelector("#fields_2250");
const required_message = document.querySelector(".help-block");

//update_select_chosen() arguments
const work_activity_options = document.querySelectorAll('#fields_2216 option');

//disable_work_activity() arguments
const update_work_activity = document.querySelector("#fields_2260");

//show_related_assets_dropdown() arguments
const assets_dropdown = document.querySelector("#fields_2273");
const asset_dropdown_form = document.querySelector(".form-group-2273");

//show_all_assets_filter() arguments
const show_all_assets = document.querySelector("#fields_2311");
const show_all_assets_form = document.querySelector(".form-group-2311");

//public form url values
let site_id, contractor_id;
let path = window.location.href;
const url = new URLSearchParams(path);
const parent_id = url.get("parent_item_id");
const form_path = url.get("path");
let technician_id = url.get("technician_id");
const token = document.getElementById("form_session_token").value;
const form_id = url.get("id");
const map_location = url.get("location");
let asset_id = url.get("asset");
let user_id = url.get("user_id");
let updated_asset_id = url.get("updated_asset");
if (form_path) {
    const full_path = form_path.split("/");
    site_id = full_path[2];
    const contractor = full_path[3];
    contractor_id = contractor.split('-')[1];
}
//const technician_entity_path = full_path[4];
//const technician_entity = technician_entity_path.split('-')[0];
let action_url;
let visit_dropdown_value;
let public_form = true;
//link to site safety documents
site_safety_documents();

//refresh page on close button 
refresh_on_automate_action_close();

show_service_request_number();

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
        override_location,
        button_message
    );

    disable_arrival_on_site(
        arrival_on_site,
        actual_arrival_on_site,
        override_arrival_time_dropdown,
        override_time_reason,
        admin_signin
    );
    disable_work_activity(update_work_activity, 2216);
    update_select_chosen(work_activity_options, 2216);
    update_work_activity_tags(2216);
    sign_in_acknowledgement(button_message, 2216, work_activity, site_review);
    show_contractor_job(parent_id);
    hide_tab([128, 136]);
    display_loader();
    chosen_container_width();
    get_tech_questions();
}

//update form
else if (form_id == 10) {
    //check if signed out and redirect if applicable
    check_if_signed_out();

    const action_url =
        instance_url +
        `?module=antevasin/unicloud/public_process&action=run&id=145&path=${form_path}/77-${technician_id}&token=${token}&form_id=${form_id}`;
    //console.log("URL: " + action_url);
    // add Sign Out button
    let sign_out_action_url =
        instance_url +
        `?module=ext/public/form&id=11&parent_item_id=${parent_id}&technician_id=${technician_id}&location=${map_location}&path=${form_path}&token=${token}`;
    let sign_out_button_html = `<button type="button" style="margin-top:0.5rem;" onclick="redirect_form( '${sign_out_action_url}' )" class="btn btn-primary">Sign Out</button>`;
    $(".btn-primary").after(sign_out_button_html);
    //change action url of public form
    const public_form = document.getElementById("public_form");
    public_form.action = action_url;

    // getting current values for expected time and time on site from DB
    let time_values_action_url =
        instance_url +
        `?module=antevasin/unicloud/public_process&action=get_field_values&item=77-${technician_id}&token=${token}&form_id=${form_id}&field_ids=1760,1769`;

    update_time_values(time_values_action_url);
    hide_asset_chosen();
    if (asset_id) {
        let asset_ids = asset_id.split(',');
        if (asset_ids.length == 1) {
            get_asset_values(
                asset_rating,
                asset_rating_form,
                asset_rating_options,
                asset_notes,
                asset_image
            );
            hide_asset_notes_image(
                asset_rating,
                asset_notes_form,
                asset_image_form,
                asset_notes,
                asset_image
            );
            asset_dropdown_form.style.display = "none";
        }
        //multiple assets
        else {
            asset_dropdown_form.style.display = "block";
            show_related_assets_dropdown(asset_ids, assets_dropdown);
            get_asset_from_dropdown(assets_dropdown, asset_rating_options);
        }
    }
    //no asset
    else {
        asset_rating_form.style.display = "none";
        asset_dropdown_form.style.display = "none";
    }

    //code to display only associated contractor job
    show_contractor_job(parent_id);
    //hide info and reporting tab
    hide_tab([128]);
    display_loader();
}

//sign out form
else if (form_id == 11) {
    //check if signed out and redirect if applicable
    check_if_signed_out();

    action_url =
        instance_url +
        `?module=antevasin/unicloud/public_process&action=run&id=144&path=${form_path}/77-${technician_id}&token=${token}&form_id=${form_id}`;
    //console.log("URL: " + action_url);

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
    hide_asset_chosen();
    if (asset_id) {
        let asset_ids = asset_id.split(',');
        if (asset_ids.length == 1) {
            get_asset_values(
                asset_rating,
                asset_rating_form,
                asset_rating_options,
                asset_notes,
                asset_image
            );
            hide_asset_notes_image(
                asset_rating,
                asset_notes_form,
                asset_image_form,
                asset_notes,
                asset_image
            );
            asset_dropdown_form.style.display = "none";
        }
        //multiple assets
        else {
            asset_dropdown_form.style.display = "block";
            show_related_assets_dropdown(asset_ids, assets_dropdown);
            get_asset_from_dropdown(assets_dropdown, asset_rating_options);
        }
    }
    //no asset
    else {
        asset_rating_form.style.display = "none";
        asset_dropdown_form.style.display = "none";
    }
    //code to display only associated contractor job
    show_contractor_job(parent_id);
    //hide info and reporting tab
    hide_tab([128, 136]);

    display_loader();
}

//accept job form
else if (form_id == 14) {
    let default_chosen_ids;
    check_status_assigned_declined();

    action_url =
        instance_url +
        `?module=antevasin/unicloud/public_process&action=run&id=157&path=${form_path}/77-${technician_id}&token=${token}&form_id=${form_id}`;
    //console.log("URL: " + action_url);

    //change action url of public form
    const public_form = document.getElementById("public_form");
    public_form.action = action_url;

    //decline job button
    let decline_job_action_url =
        instance_url +
        `?module=ext/public/form&id=15&parent_item_id=${parent_id}&technician_id=${technician_id}&path=${form_path}&token=${token}`;
    let decline_job_button_html = `<button style="background-color:#d32f2f; margin-top:0.5rem; border-color:#d32f2f;" type="button" onclick="redirect_form( '${decline_job_action_url}' )" class="btn btn-primary">Decline Job</button>`;
    $(".btn-primary").after(decline_job_button_html);

    show_contractor_job(parent_id);
    hide_tab([128, 136]);

    accept_job_date(2216, job_accept_date, work_activity, site_review);
    disable_work_activity(update_work_activity, 2216);
    update_select_chosen(work_activity_options, 2216);
    update_work_activity_tags(2216);
    display_loader();
    chosen_container_width();
}

//decline job form
else if (form_id == 15) {
    check_status_assigned_declined();
    action_url =
        instance_url +
        `?module=antevasin/unicloud/public_process&action=run&id=158&path=${form_path}/77-${technician_id}&token=${token}&form_id=${form_id}`;
    //console.log("URL: " + action_url);

    //change action url of public form
    const public_form = document.getElementById("public_form");
    public_form.action = action_url;
    show_contractor_job(parent_id);
    hide_tab([128, 136]);
    decline_job_date(job_decline_date, job_decline_reason, required_message);
    display_loader();
}

//update asset form
else if (form_id == 16) {
    //check_status_assigned_declined();
    action_url =
        instance_url +
        `?module=antevasin/unicloud/public_process&action=run&id=162&path=${form_path}/77-${technician_id}&token=${token}&form_id=${form_id}`;
    //console.log("URL: " + action_url);

    //change action url of public form
    const public_form = document.getElementById("public_form");
    // public_form.action = action_url;
    show_contractor_job(parent_id);
    hide_tab([128]);
    display_loader();
    hide_asset_chosen();

    //let contractor_job = check_contractor_job_open();

    let check_status_url = instance_url +
        `?module=antevasin/unicloud/public_process&action=get_field_values&item=76-${contractor_id}&token=${token}&field_ids=1713`;
    $.ajax({
        url: check_status_url,
        type: "GET",
        success: function(response) {
            let data = JSON.parse(response);
            //console.log(data);
            if (data[1713] == 432 || data[1713] == 434) {
                if (asset_id) {
                    let asset_ids = asset_id.split(',');
                    if (asset_ids.length == 1) {
                        get_asset_values(
                            asset_rating,
                            asset_rating_form,
                            asset_rating_options,
                            asset_notes,
                            asset_image,
                            'public_form_16',
                        );
                        hide_asset_notes_image(
                            asset_rating,
                            asset_notes_form,
                            asset_image_form,
                            asset_notes,
                            asset_image
                        );
                        asset_dropdown_form.style.display = "none";
                        show_all_assets_form.style.display = "none";
                    }
                    //multiple assets
                    else {
                        asset_dropdown_form.style.display = "block";
                        show_related_assets_dropdown(asset_ids, assets_dropdown);
                        get_asset_from_dropdown(assets_dropdown, asset_rating_options, 'public_form_16');
                        show_all_assets_filter(asset_ids, assets_dropdown);
                    }
                }
                //no asset
                else {
                    asset_rating_form.style.display = "none";
                    asset_dropdown_form.style.display = "none";
                    show_all_assets_form.style.display = "none";
                    $('.tab-content').append('<p style="font-size:1.5rem; margin:2rem 0; color:#333333;">No asset found</p>');
                    $("button[type='submit']").prop('disabled', true);
                }

            } else {
                //contractor job declined or completed
                asset_rating_form.style.display = "none";
                asset_dropdown_form.style.display = "none";
                $('.tab-content').append('<p style="font-size:1.5rem; margin:2rem 0; color:#333333;">Contractor Job has been closed.</p>');
                $("button[type='submit']").prop('disabled', true);
            }
        },
        error: function(error) {
            console.log(error);
        },
    });

}

// update asset condition from through QR code
else if (form_id == 17) {
    action_url =
        instance_url +
        `?module=antevasin/unicloud/public_process&action=run&id=164&path=${form_path}&token=${token}&form_id=${form_id}`;
    //console.log("URL: " + action_url);

    //change action url of public form
    const public_form = document.getElementById("public_form");
    public_form.action = action_url;

    hide_tab([75]);
    display_loader();
    show_contractor_job(parent_id);
    hide_asset_chosen_qr();

    get_asset_values_qrcode(
        asset_rating_qr,
        asset_rating_form_qr,
        asset_rating_options_qr,
        asset_notes_qr,
        asset_image_qr,
        user_id
    );
    hide_asset_notes_image(
        asset_rating_qr,
        asset_notes_form_qr,
        asset_image_form_qr,
        asset_notes_qr,
        asset_image_qr
    );
}



function update_departure_time() {
    let arrival_on_site = document.querySelector("#fields_1762");
}

function update_time_values(url) {
    $.ajax({
        url: url,
        type: "GET",
        success: function(response) {
            //console.log(response);
            let time_values = JSON.parse(response);
            //console.log(time_values);
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
        error: function(error) {
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
    //console.log(url);
    //console.log(redirect_url);
    $.ajax({
        url: url,
        type: "GET",
        success: function(response) {
            //console.log(response);
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
        error: function(error) {
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

function check_status_assigned_declined() {
    let redirect_url;
    let check_status_url =
        instance_url +
        `?module=antevasin/unicloud/public_process&action=get_field_values&item=77-${technician_id}&token=${token}&field_ids=1768,1772`;

    $.ajax({
        url: check_status_url,
        type: "GET",
        success: function(response) {
            let data = JSON.parse(response);

            if (data[1768] == 762) {
                redirect_url = instance_url +
                    `?module=ext/public/form&id=9&parent_item_id=${parent_id}&technician_id=${technician_id}&path=${form_path}&planned_time_onsite=${data[1772]}&token=${token}`;
                window.location.href = redirect_url;
            } else if (data[1768] == 891) {
                window.location.href = instance_url;
            }
        },
        error: function(error) {
            console.log(error);
        },
    });
}

function check_contractor_job_open() {

}

// function sign_out_from_update_form(sign_out_url) {
//     //console.log("sign out on update form " + sign_out_url);
//     window.location.href = sign_out_url;
// }

function redirect_form(url) {
    window.location.href = url;
}


function get_technician_activity(
    arrival_location,
    arrival_form,
    override_location_dropdown,
    override_location,
    button_message
) {
    let siteLatitude, siteLongitude, location;

    const url = `${instance_url}?module=antevasin/unicloud/public_process&action=get_field_values&item=${site_id}&token=${token}&field_ids=401,1552,1910`;
    // ajax call to get coordinates

    $.ajax({
        url: url,
        type: "GET",
        success: function(response) {
            let data = JSON.parse(response);
            //console.log(response);
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
                    location.indexOf("(") == -1 ?
                    location.lastIndexOf("[") :
                    location.indexOf("(");

                //alert(coordinates);
                siteLatitude = location.substring(startIndexLat, location.indexOf(","));
                siteLongitude = location.substring(startIndexLong, lastIndexLong);
                //alert("pin " + siteLatitude + "  " + siteLongitude);
            }

            //get directions google map
            //alert('call directions');
            get_directions_google_map(siteLatitude, siteLongitude);
        },
        error: function(error) {
            console.log(error);
        },
    });

    const button = document.querySelector('button[type="submit"]');

    button.disabled = true;
    button_message.innerText = `Set 'Know your location' to allow to Sign In!`;
    arrival_form.style.display = "none";
    //hides or shows the geolocation override reason textarea
    override_location.style.display = "none";

    if (navigator.geolocation) {
        //console.log('Geolocation is supported!');

        let watch_id = window.navigator.geolocation.watchPosition(
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

                override_location_dropdown.addEventListener("change", function() {
                    $.getScript('https://source.unicloud.co.nz/js/tech_questions.js', function() {
                        let disable_sign_in_button = enable_tech_activity_sign_in();
                        console.log("disable sign in button: " + disable_sign_in_button);

                        if (!disable_sign_in_button) {
                            button_message.innerText = "";
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
                                navigator.geolocation.clearWatch(watch_id);
                            }
                        } else {
                            button_message.innerText = "You have to answer all questions before signing in!";
                            override_location_dropdown.value = 760;
                            override_location.style.display = "none";
                        }
                    });
                });
            },
            (error) => {
                console.log("Geolocation error: " + error.message);
                button.disabled = true;
                button_message.innerHTML = `Turn on the location <a target="_blank" href="https://www.unicloud.co.nz/Manuals/Users/Location-Settings.html">(click here for instructions)</a> and refresh the page to Sign In!`;

                override_location_dropdown.addEventListener("change", function() {
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

function get_directions_google_map(siteLatitude, siteLongitude) {
    //alert(siteLatitude+' '+siteLongitude);
    //make a get directions button
    const get_directions = document.createElement("a");
    get_directions.classList.add("btn");
    get_directions.classList.add("btn-success");
    get_directions.innerText = "Get Directions";
    get_directions.target = "_blank";
    get_directions.style.marginTop = "0.5rem";
    document.querySelector(".modal-footer").append(get_directions);

    get_directions.addEventListener("click", function() {
        // console.log('location click');
        if (
            /* if we're on iOS, open in Apple Maps */
            navigator.platform.indexOf("iPhone") != -1 ||
            navigator.platform.indexOf("iPad") != -1 ||
            navigator.platform.indexOf("iPod") != -1
        )
            window.open(
                `maps://maps.google.com/maps?daddr=${siteLatitude},${siteLongitude}&amp;ll=`
            );
        /* else use Google */
        else
            window.open(
                `https://maps.google.com/maps?daddr=${siteLatitude},${siteLongitude}&amp;ll=`
            );
    });
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
    window.onload = function() {
        let job;
        const options = document.querySelectorAll("#parent_item_id option");
        const dropdown = document.querySelectorAll(".chosen-container");
        //const form=document.querySelectorAll('.form-group-parent-item-id .col-md-9');
        const label = document.querySelectorAll(
            ".form-group-parent-item-id .col-md-3"
        );
        const form = document.querySelectorAll(".form-group-parent-item-id");
        let index = 1;
        options.forEach(function(option) {
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
        //console.log(job_name);

        var newEl = document.createElement("h4");
        newEl.innerHTML = job_name;
        newEl.style.cssText = `
            margin-left:20px;
            text-transform:capitalize;
        `;
        form[0].append(newEl);
    };
}

function disable_arrival_on_site(
    arrival_on_site,
    actual_arrival_on_site,
    override_arrival_time_dropdown,
    override_time_reason,
    admin_signin,
    signin_action_button
) {
    const dateTime = today_date_time();

    //sets default value for arrival on site
    arrival_on_site.value = dateTime;

    //actual arrival on site reporting tab
    actual_arrival_on_site.value = dateTime;

    if (!signin_action_button) {
        //admin_signin.value = 810;
        //override_location_dropdown.value = 761;
    } else admin_signin.value = 811;
    arrival_on_site.readOnly = true;

    //hides the calendar button
    const dateset = document.querySelectorAll(".date-set");
    dateset[0].style.display = "none";
    dateset[0].disabled = true;

    //hides or shows the arrival on site textarea
    override_time_reason.style.display = "none";
    $(override_time_reason).find(".required").removeClass("required");

    override_arrival_time_dropdown.addEventListener("change", function() {
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

    arrival_on_site.addEventListener("focus", function() {
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
    const dateTime = today_date_time();

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
    override_site_departure_reason.required = false;
    $('.form-group-1906').hide();

    override_site_departure.addEventListener("change", function() {
        var value = override_site_departure.value;

        if (value == 808) {
            override_site_departure_reason_form.style.display = "none";
            $('.form-group-1906').hide();
            dateset[0].style.display = "none";
            departure_on_site.readOnly = true;
            dateset[0].disabled = true;
            departure_on_site.value = dateTime;
            override_site_departure_reason.required = false;
        } else {
            override_site_departure_reason_form.style.display = "block";
            $('.form-group-1906').show();
            dateset[0].style.display = "block";
            departure_on_site.readOnly = false;
            dateset[0].disabled = false;
            override_site_departure_reason.required = true;
        }
    });

    departure_on_site.addEventListener("focus", function() {
        document.querySelector(".datetimepicker").style.display = "none";
    });
}

function departure_location(departure_location_form, departure_location_field) {
    //hide departue location
    departure_location_form.style.display = "none";

    //capture departure location
    window.onload = function() {
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
    console.log('in hide_visit_site_again ');
    //automate action sign out
    if (!technician_id) {
        action_url = document.querySelector("#process").action;
        technician_id = get_technician_id();
        //alert(technician_id);
        //if (technician_id === 0) return; // in UI so exit public form code
    }

    visit_site.style.display = "none";
    visit_site_reason.required = false;
    $('.form-group-1902').hide();
    //visit_site_reason.classList.remove('required');
    //visit_site_reason.value = "";


    visit_site_dropdown.addEventListener("change", function() {
        visit_dropdown_value = visit_site_dropdown.value;
        console.log('visit site dropdown changed');

        if (visit_dropdown_value == 807) {
            visit_site.style.display = "block";
            visit_site_reason.required = true;
            $('.form-group-1902').show();
            //visit_site_reason.classList.add('required');

            const submit_button = document.querySelector('button[type="submit"]');
            submit_button.addEventListener("click", function(e) {
                console.log('submit button clicked');
                e.preventDefault();
                let clear_fields =
                    "1759,1760,1762,1763,1764,1765,1766,1769,1771,1772,1773,1838,1850,1901,1903,1906,1907";
                let reason_to_visit_site_again = $("#fields_1902 :selected").val();
                let set_fields = `1768=762,1902=${reason_to_visit_site_again}`;
                let copy_record_url =
                    instance_url +
                    `?module=antevasin/unicloud/public_process&action=copy&token=${token}&item=77-${technician_id}&clear_fields=${clear_fields}&set_fields=${set_fields}`;
                console.log(copy_record_url);
                let asset_condition_check = check_asset_condition_selected();
                if (asset_condition_check) {
                    $.ajax({
                        url: copy_record_url,
                        type: "GET",
                        success: function(response) {
                            let response_obj = JSON.parse(response);
                            if (response_obj.hasOwnProperty("success")) {
                                console.log('success');
                                if (public_form) {
                                    console.log("public form submit");
                                    submit_button.style.display = "none";
                                    $('.primary-modal-action-loading').css('visibility', 'visible');
                                    $("#public_form").submit();
                                } else {
                                    console.log("process submit");
                                    submit_button.style.display = "none";
                                    $('.primary-modal-action-loading').css('visibility', 'visible');
                                    $("#process").submit();
                                }
                                //console.log('visit submit');
                            } else if (response_obj.hasOwnProperty("error")) {
                                console.log(response_obj.error);
                            }
                        },
                        error: function(error) {
                            console.log(error);
                        },
                    });
                } else {
                    button_message = "Asset Notes field is required!";
                }
            });
        } else {
            visit_site.style.display = "none";
            visit_site_reason.required = false;
            $('.form-group-1902').hide();
            //visit_site_reason.value = "";
            // visit_site_reason.classList.remove('required');
        }
    });
}

function check_asset_condition_selected() {
    let asset_condition = asset_rating.value;
    if (asset_condition != "") {
        let notes = asset_notes.value;
        let image = asset_image.value;

        if (notes) {
            return true;
        } else {
            return false;
        }
    }
    return true;
}

function display_loader() {
    const loader = document.createElement("div");
    const form = document.querySelector(".content-form");
    const copyright = document.querySelector(".copyright");
    copyright.style.display = "none";
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

    setTimeout(function() {
        loader.style.display = "none";
        form.style.display = "block";
        copyright.style.display = "block";
    }, 1000);
}

function hide_asset_chosen() {
    //alert();
    asset_rating.style.display = "block";
    window.addEventListener("load", function() {
        const asset_rating_chosen = document.querySelector("#fields_1987_chosen");
        asset_rating.style.display = "block";
        asset_rating_chosen.style.display = "none";
    });
    const note = document.createElement("div");
    note.classList.add('asset-info');
    note.innerText = `* Please only update the Asset Condition Assessment if it differs from above`;
    note.style.cssText = `
          padding-left:2rem;
          margin-top:5rem;
          `;
    asset_rating_form.append(note);
}

function hide_asset_chosen_qr() {
    asset_rating_qr.style.display = "block";
    window.addEventListener("load", function() {
        const asset_rating_chosen = document.querySelector("#fields_973_chosen");
        asset_rating_qr.style.display = "block";
        asset_rating_chosen.style.display = "none";
    });
}

function update_asset_condition_note(asset_rating_form) {

}

function get_asset_name(asset_rating_options, asset_rating_form, asset_id_action_button, mutiple_asset_id = false) {
    if (asset_id_action_button) {
        asset_id = asset_id_action_button;
    } else if (mutiple_asset_id) {
        asset_id = mutiple_asset_id;
    }
    //alert(asset_id);
    let current_rating;
    let asset_url = `${instance_url}?module=antevasin/unicloud/public_process&action=get_field_values&item=52-${asset_id}&token=${token}&field_ids=762,896,973`;
    //console.log('asset '+asset_url);

    $.ajax({
        url: asset_url,
        type: "GET",
        success: function(response) {
            //console.log(response);
            let data = JSON.parse(response);
            let asset_name = `${data[762]} ${data[896]}`;
            let current_rating_value = data[973];
            const asset = document.createElement("h5");
            asset.innerText = asset_name;
            asset.classList.add('asset-info');
            asset.style.cssText = `
                    text-align:left;
                    padding:1.5rem 0;
                    margin-left:1.5rem;
                    text-transform:uppercase;
                    font-weight: 600;
                  `;
            console.dir(asset);
            asset_rating_form.prepend(asset);

            $('.form-group-1987').prepend(asset);
            asset_rating_options.forEach(function(asset) {
                if (asset.value == current_rating_value) current_rating = asset.text;
            });

            //console.log(current_rating);
            const rating = document.createElement("h5");
            if (current_rating) {
                rating.innerText = `Current Asset Condition Assessment : ${current_rating}`;
            } else {
                rating.innerText = `Current Asset Condition Assessment : `;
            }

            rating.classList.add('asset-info');
            rating.style.cssText = `
                    text-align:left;
                    padding:0;
                    text-transform:uppercase;
                  `;
            asset.append(rating);


        },
        error: function(error) {
            console.log(response);
        },
    });
}


function get_asset_values_qrcode(
    asset_rating_qr,
    asset_rating_form_qr,
    asset_rating_options_qr,
    asset_notes_qr,
    asset_image_qr,
    user_id
) {
    let form = document.querySelector("form#public_form");
    const asset_rating_chosen = document.querySelector("#fields_973_chosen");
    const signout_form = document.querySelector("form#process");
    get_asset_name(asset_rating_options_qr, asset_rating_form_qr);

    const button = document.querySelector('button[type="submit"]');

    asset_rating_qr.style.display = "block";
    console.log("user id:" + user_id);
    button.addEventListener("click", function(e) {
        e.preventDefault();

        let rating = asset_rating_qr.value;
        if (rating !== "") {
            console.log("rating: " + rating + "  asset id:" + asset_id);
            const rating_value_url = `${instance_url}?module=antevasin/unicloud/public_process&action=get_condition_rating_value&rating=${rating}&asset_id=${asset_id}&token=${token}`;
            $.ajax({
                url: rating_value_url,
                type: "GET",
                success: function(response) {
                    //console.log(data);

                    let rating_value = response;

                    const today = new Date();
                    let ms = Date.parse(today);
                    const assessment_date = parseInt(ms / 1000);
                    console.log(rating + "   " + rating_value + "   " + assessment_date);

                    const notes = asset_notes_qr.value;
                    const image = asset_image_qr.value;

                    if (notes) {
                        console.log("notes   " + notes + "Image " + image);
                        update_asset_insert_history(
                            rating,
                            rating_value,
                            assessment_date,
                            user_id,
                            notes,
                            image,
                            false,
                            false,
                            form,
                            asset_image_qr,
                            true
                        );
                        button.style.display = "none";
                        // document.querySelector('.primary-modal-action-loading').style.visibility="visible";
                        $('.primary-modal-action-loading').css('visibility', 'visible');
                        button_message.innerText = "";
                    } else {
                        button_message.innerText = "Asset Notes field is required!";
                    }
                },
                error: function(error) {},
            });
        } else {
            if (visit_dropdown_value != 807) {
                console.log("asset submit via public form");
                button.style.display = "none";
                $('.primary-modal-action-loading').css('visibility', 'visible');
                form.submit();
            }
        }
    });

};

function get_asset_values(
    asset_rating,
    asset_rating_form,
    asset_rating_options,
    asset_notes,
    asset_image,
    update_asset_public_form,
    asset_id_action_button,
    multiple_asset_id,

) {
    let form = document.querySelector("form#public_form");
    const asset_rating_chosen = document.querySelector("#fields_1987_chosen");
    const signout_form = document.querySelector("form#process");

    if (asset_id_action_button) {
        asset_id = asset_id_action_button;
        asset_rating_chosen.style.display = "none";
        asset_rating.style.display = "block";
        let action = signout_form.action;
        let action_array = action.split("&");
        let path = action_array[3].split("/");
        //console.log(path);
        let technician_path = path[4].split("-");
        technician_id = technician_path[1];
        //alert(technician_id);
        public_form = false;
        form = document.querySelector("form#process");
    } else if (multiple_asset_id) {
        asset_id = multiple_asset_id;
    }

    get_asset_name(asset_rating_options, asset_rating_form, asset_id_action_button, multiple_asset_id);

    const button = document.querySelector('button[type="submit"]');

    asset_rating.style.display = "block";

    let url = `${instance_url}?module=antevasin/unicloud/public_process&action=get_field_values&item=77-${technician_id}&token=${token}&field_ids=1758`;
    //console.log('asset '+asset_url);
    $.ajax({
        url: url,
        type: "GET",
        success: function(response) {
            let data = JSON.parse(response);
            let user_id = data[1758];
            //console.log("user id:"+user_id);
            button.addEventListener("click", function(e) {
                e.preventDefault();

                let rating = asset_rating.value;
                if (rating !== "") {
                    console.log("rating: " + rating + "  asset id:" + asset_id);
                    const rating_value_url = `${instance_url}?module=antevasin/unicloud/public_process&action=get_condition_rating_value&rating=${rating}&asset_id=${asset_id}&token=${token}`;
                    $.ajax({
                        url: rating_value_url,
                        type: "GET",
                        success: function(response) {
                            //console.log(data);

                            let rating_value = response;

                            const today = new Date();
                            let ms = Date.parse(today);
                            const assessment_date = parseInt(ms / 1000);
                            console.log(rating + "   " + rating_value + "   " + assessment_date);

                            const notes = asset_notes.value;
                            const image = asset_image.value;

                            if (notes) {
                                console.log("notes   " +notes+"Image " +image);
                                update_asset_insert_history(
                                    rating,
                                    rating_value,
                                    assessment_date,
                                    user_id,
                                    notes,
                                    image,
                                    asset_id_action_button,
                                    update_asset_public_form,
                                    form,
                                    asset_image,
                                    false
                                );
                                button.style.display = "none";
                                button_message.innerText = "";
                                // document.querySelector('.primary-modal-action-loading').style.visibility="visible";
                                $('.primary-modal-action-loading').css('visibility', 'visible');

                            } else {
                                button_message.innerText = "Asset Notes field is required!";
                            }
                        },
                        error: function(error) {},
                    });
                } else {
                    if (visit_dropdown_value != 807) {
                        console.log("asset submit via public form");
                        button_message.innerText = "";
                        button.style.display = "none";
                        $('.primary-modal-action-loading').css('visibility', 'visible');
                        form.submit();
                    }
                }
            });
        },
        error: function(error) {
            console.log(response);
        },
    });
}

function update_asset_insert_history(
    rating,
    rating_value,
    assessment_date,
    user_id,
    notes,
    image,
    asset_id_action_button,
    update_asset_public_form,
    form,
    asset_image,
    asset_image_qr
) {
    const button = document.querySelector('button[type="submit"]');
    let update_form = $("#public_form")[0];
    if (asset_id_action_button) {
        asset_id = asset_id_action_button;
        update_form = $("#process")[0];
    }
    let publicForm;
    let update_insert_url = `${instance_url}?module=antevasin/unicloud/public_process&action=update_asset_insert_history&asset_id=${asset_id}&user_id=${user_id}&rating=${rating}&rating_value=${rating_value}&date=${assessment_date}&notes=${notes}&token=${token}`;

    $.ajax({
        url: update_insert_url,
        type: "GET",
        success: function(response) {
            const history_id = response;
            const full_path = form_path.split("/");
            const history_path = `${full_path[0]}/${full_path[1]}/${full_path[2]}`;
            asset_image.id = "fields_2031";
            asset_image.setAttribute("name", "fields[2031]");

            let history_image_url = `${instance_url}?module=items/processes&action=run&id=155&path=${history_path}/52-${asset_id}/88-${history_id}&token=${token}&redirect_to=items_info`;
            //console.log(history_image_url);
            var formData = new FormData(update_form);

            $.ajax({
                url: history_image_url,
                type: "POST",
                data: formData,
                processData: false,
                contentType: false,
                cache: false,
                success: function(response) {
                    console.log(response);
                    if (asset_image_qr) {
                        asset_image.id = "fields_2320";
                        asset_image.setAttribute("name", "fields[2320]");
                    } else {
                        asset_image.id = "fields_2038";
                        asset_image.setAttribute("name", "fields[2038]");
                    }

                    if (visit_dropdown_value != 807) {
                        console.log("asset submit");

                        let updated_asset = sessionStorage.getItem('updated_asset');
                        if (updated_asset) {
                            updated_asset = `${updated_asset},${asset_id}`;
                            sessionStorage.setItem('updated_asset', updated_asset);
                        } else sessionStorage.setItem('updated_asset', asset_id);

                        if (update_asset_public_form) window.location.href = path;
                        else form.submit();

                    }
                },
                error: function(error) {
                    console.log(response);
                },
            });
        },
        error: function(error) {
            console.log(response);
        },
    });
}

function hide_asset_notes_image(
    asset_rating,
    asset_notes_form,
    asset_image_form,
    asset_notes,
    asset_image
) {
    asset_notes.required = false;
    asset_image.required = false;
    asset_notes_form.style.display = "none";
    asset_image_form.style.display = "none";
    $('.form-group-2038').hide();
    asset_rating.addEventListener("change", function() {
        var value = asset_rating.value;
        if (value == "") {
            asset_notes_form.style.display = "none";
            asset_image_form.style.display = "none";
            $('.form-group-2038').hide();
            asset_notes.required = false;
            asset_image.required = false;
        } else {
            asset_notes_form.style.display = "block";
            asset_image_form.style.display = "block";
            $('.form-group-2038').show();
            asset_notes.required = true;
            asset_image.required = true;
        }
    });
}


function get_asset_from_dropdown(assets_dropdown, asset_rating_options, update_asset_public_form, signout_update_action_button, update_asset_action_button) {
    assets_dropdown.addEventListener("change", function() {
        let asset_id = assets_dropdown.value;
        if (asset_id !== 'Select Asset') {
            asset_id = parseInt(asset_id);
            if (document.querySelector('.asset-info')) {
                //alert();
                document.querySelector('.asset-info').style.display = "none";
                $('.asset-info').hide();
            }
            if (signout_update_action_button) {
                get_asset_values(
                    asset_rating,
                    asset_rating_form,
                    asset_rating_options,
                    asset_notes,
                    asset_image,
                    update_asset_public_form,
                    asset_id,
                    false
                );
            } 
            else if (update_asset_action_button) {
                get_asset_values(
                    asset_rating,
                    asset_rating_form,
                    asset_rating_options,
                    asset_notes,
                    asset_image,
                    update_asset_public_form,
                    asset_id,
                    true
                );
            }
            else {
                get_asset_values(
                    asset_rating,
                    asset_rating_form,
                    asset_rating_options,
                    asset_notes,
                    asset_image,
                    update_asset_public_form,
                    false,
                    asset_id,
                );
            }

        } else {
            if (document.querySelector('.asset-info')) {
                document.querySelector('.asset-info').style.display = "none";
            }
        }
    });
}


function show_related_assets_dropdown(asset_ids, assets_dropdown, show_all) {
    let updated_asset = sessionStorage.getItem('updated_asset');
    let updated_asset_ids;
    if (updated_asset) updated_asset_ids = updated_asset.split(',');
    // console.log(updated_asset_ids);

    let url = instance_url +
        `?module=antevasin/unicloud/public_process&action=get_related_assets&asset_ids=${asset_ids}&token=${token}`;
    $.ajax({
        url: url,
        type: "GET",
        success: function(response) {
            let data = JSON.parse(response);
            //console.log(data);
            let option = new Option('Select Asset');
            assets_dropdown.add(option);

            if (!show_all) {
                if (updated_asset) {
                    updated_asset_ids.forEach(function(updated_asset_id) {
                        data.forEach(function(asset, index) {
                            if (updated_asset_id == asset['id']) {
                                data.splice(index, 1);
                                //console.log(data);
                            }
                        })
                    })
                }
            }

            data.forEach(function(asset) {
                let option = new Option(asset['name'], asset['id']);
                assets_dropdown.add(option);
            });

            //update_asset_dropdown(updated_asset_id);
        },
        error: function(error) {
            console.log(error);
        },
    });
}

function show_all_assets_filter(asset_ids, assets_dropdown) {
    show_all_assets.addEventListener('click', function() {
        let assets_dropdown_options = document.querySelectorAll('#fields_2273 option');
        assets_dropdown_options.forEach(option => option.remove());
        if (show_all_assets.checked) show_related_assets_dropdown(asset_ids, assets_dropdown, true);
        else show_related_assets_dropdown(asset_ids, assets_dropdown, false);
    })
}

function accept_job_check(work_activity, site_review, button) {
    let flag = 0;
    button.disabled = true;
    work_activity.addEventListener('click', function() {
        if (work_activity.checked) flag++;
        else flag--;
        if (flag >= 2) button.disabled = false;
        else button.disabled = true;
    });
    site_review.addEventListener('click', function() {
        if (site_review.checked) flag++;
        else flag--;
        if (flag >= 2) button.disabled = false;
        else button.disabled = true;
    })
}

function accept_job_date(field_id, job_accept_date, work_activity, site_review, action_button) {
    let form;
    const button = document.querySelector("button[type='submit']");
    accept_job_check(work_activity, site_review, button);
    if (action_button) form = document.querySelector("#process");
    else form = document.querySelector("#public_form");
    button.addEventListener('click', function(e) {
        e.preventDefault();
        if (work_activity.checked && site_review.checked) {
            job_accept_date.value = today_date_time();
            $(`#fields_${field_id}`).prop('disabled', false).trigger("chosen:updated");
            button.style.display = "none";
            $('.primary-modal-action-loading').css('visibility', 'visible');
            form.submit();
        }
    })
}

function get_tech_activity_answers() {
    let answers = {};
    let questions = $('.tech-answer:checked');
    $.each(questions, function(index, field) {
        let question_id = $(field).data('answer');
        let question = $('#question_' + question_id).val();
        let answer = $(field).val();
        let additional_info = $('#answer_additional_' + question_id).val();
        answers[question_id] = { "question": question, "answer": answer, "info": additional_info };
    });
    return JSON.stringify(answers);
}


function sign_in_acknowledgement(button_message, field_id, work_activity, site_review, action_button) {
    let form;
    const button = document.querySelector("button[type='submit']");
    if (action_button) { form = document.querySelector("#process"); } else form = document.querySelector("#public_form");
    button.addEventListener('click', function(e) {
        e.preventDefault();
        form.reportValidity();
        $.getScript('https://source.unicloud.co.nz/js/tech_questions.js', function() {
            let disable_sign_in_button = enable_tech_activity_sign_in();
            //console.log("disable sign in button: " + disable_sign_in_button);

            if (!disable_sign_in_button) {
                if (work_activity.checked && site_review.checked) {
                    $(`#fields_${field_id}`).prop('disabled', false).trigger("chosen:updated");
                    // let answers = get_tech_activity_answers();
                    if (!technician_id) {
                        technician_id = get_technician_id();
                        if (technician_id === 0) return; // in UI so exit public form code
                    }
                    let url = instance_url +
                        `?module=antevasin/facilities/public_process&action=post_tech_activity_answers&parent_item_id=${technician_id}&token=${token}`;
                    $.ajax({
                        url: url,
                        type: "POST",
                        data: { answers: get_tech_activity_answers() },
                        success: function(response) {
                            console.log(response);
                            let sign_in_check = ckeck_sign_in_required_fields();
                            if (sign_in_check) {
                                button_message.innerText = '';
                                button.style.display = "none";
                                $('.primary-modal-action-loading').css('visibility', 'visible');
                                form.submit();
                            } else {
                                button_message.innerText = 'Expected Time On Site is required!';
                            }
                        },
                        error: function(error) {
                            console.log(error);
                        },
                    });


                } else {
                    button_message.innerText = 'You have to review the site hazards and work activity before signing in!'
                }
            } else {
                button_message.innerText = 'You have to answer all the questions before signing in!'
            }
        });
    })
}

function ckeck_sign_in_required_fields() {
    let expected_time = expected_time_on_site.value;
    //alert(expected_time);
    if (expected_time == "") return false;
    return true;
}

function decline_job_date(job_decline_date, job_decline_reason, required_message, action_button) {
    required_message.style.display = "none";
    const button = document.querySelector("button[type='submit']");
    if (action_button) form = document.querySelector("#process");
    else form = document.querySelector("#public_form");
    button.addEventListener('click', function(e) {
        e.preventDefault();
        job_decline_date.value = today_date_time();
        if (job_decline_reason.value !== '') form.submit();
        else required_message.style.display = "inline";
        button.style.display = "none";
        $('.primary-modal-action-loading').css('visibility', 'visible');
        form.submit();
    })
}

function disable_work_activity(update_work_activity, field_id) {
    $(`#fields_${field_id}`).prop('disabled', true).trigger("chosen:updated");
    if (update_work_activity) {
        update_work_activity.addEventListener('change', function() {
            if (update_work_activity.checked) {
                $(`#fields_${field_id}`).prop('disabled', false).trigger("chosen:updated");
            } else {
                $(`#fields_${field_id}`).chosen().val(default_chosen_ids);
                $(`#fields_${field_id}`).trigger('chosen:updated');
                if (default_chosen_ids != null) work_activity_tags(default_chosen_ids, field_id);
                else {
                    default_chosen_ids = [0];
                    work_activity_tags(default_chosen_ids, field_id);
                }
                $(`#fields_${field_id}`).prop('disabled', true).trigger("chosen:updated");
            }
        });
    }
}

function update_select_chosen(work_activity_options, field_id) {
    let url, contractor_id;
    url = instance_url +
        `?module=antevasin/unicloud/public_process&action=get_field_values&item=77-${technician_id}&token=${token}&field_ids=2216`;

    if (!technician_id) {
        technician_id = get_technician_id();
        //alert(technician_id);
        if (technician_id === 0) {
            contractor_id = get_contractor_id();

            url = instance_url +
                `?module=antevasin/unicloud/public_process&action=get_field_values&item=76-${contractor_id}&token=${token}&field_ids=2255`;
            console.log(url);
        } else {
            url = instance_url +
                `?module=antevasin/unicloud/public_process&action=get_field_values&item=77-${technician_id}&token=${token}&field_ids=2216`;
        }
        // in UI so exit public form code
    }
    //alert(url);

    $.ajax({
        url: url,
        type: "GET",
        success: function(response) {
            let data = JSON.parse(response);
            //console.log(data);
            let work_activity_list;
            if (data[2255]) {
                work_activity_list = data[2255];
            } else if (data[2216]) {
                work_activity_list = data[2216];
            } else {
                work_activity_list = '';
            }
            //console.log(work_activity_list);
            let work_activity_ids = work_activity_list.split(',');
            //console.log(work_activity_ids);

            work_activity_ids.forEach(function(id) {
                work_activity_options.forEach(function(option) {

                    if (id == option.value) {
                        option.setAttribute('selected', true);
                    }
                });
            });


            $(`#fields_${field_id}`).trigger('chosen:updated');
            get_default_tags(field_id);
        },
        error: function(error) {
            console.log(error);
        },
    });
}

function get_default_tags(field_id) {
    let ids = $(`#fields_${field_id}`).chosen().val();
    //alert(ids);
    default_chosen_ids = ids;
    if (ids != null) work_activity_tags(ids, field_id);
}

function update_work_activity_tags(field_id) {
    $(`#fields_${field_id}`).chosen().change(function(event) {
        if (event.target == this) {
            ids = ($(this).val());

            $(`#fields_${field_id}`).trigger('chosen:updated');
            work_activity_tags(ids, field_id);
        }
    });
}


function work_activity_tags(ids, field_id) {
    const chosen_container = document.querySelector(`.form-group-${field_id} .col-md-9`);
    if (document.querySelector('.work-activity-tags') || ids == null) {
        document.querySelector('.work-activity-tags').remove();
    }
    let chosen_ids = ids.toString();
    //console.log(chosen_ids);
    let url = `${instance_url}?module=antevasin/unicloud/public_process&action=get_work_activity_tags&chosen_ids=${chosen_ids}&token=${token}`;
    console.log(url);
    $.ajax({
        url: url,
        type: "GET",
        success: function(response) {
            //console.log(response);
            let tags = JSON.parse(response);
            //console.log(tags);

            let div = document.createElement('div');
            div.style.cssText = `
                    display:flex;
                    flex-wrap:wrap;
                `;
            div.setAttribute('class', 'work-activity-tags');
            tags.forEach(function(tag_title) {
                let span = document.createElement('span');
                span.innerText = tag_title;
                span.style.cssText = `
                    padding:0.5rem 1rem;
                    margin:1rem 1rem 0 0;
                    background-color:#d32f2f;
                    color:white;
                    border-radius:5px;
                `;
                div.append(span);
                chosen_container.append(div);
            })
        },
        error: function(error) {
            console.log(error);
        },
    });
}

function refresh_on_automate_action_close() {
    const form = document.querySelector('form#process');
    const close_button = document.querySelector('.btn-close');
    const close_icon = document.querySelector('.close');
    if (form) {
        close_button.addEventListener('click', function() {
            location.reload();
        });
        close_icon.addEventListener('click', function() {
            location.reload();
        });
    }
}

function chosen_container_width() {
    window.addEventListener("load", function() {
        const chosen_container = document.querySelector("#fields_2216_chosen");
        chosen_container.style.width = "100%";
    });
}

function site_safety_documents() {
    const modal_footer = document.querySelector('.modal-footer');
    const button = document.querySelector('button[type="submit"]');
    let path;
    if (form_path) {
        path = form_path.split('/');
    } else {
        path = get_path();
        //console.log(path);
    }
    let documents_path = `${path[0]}/${path[1]}/${path[2]}/85`;
    // alert(documents_path);
    let site_safety_documents_path = `${instance_url}?module=items/items&path=${documents_path}`;
    const link = document.createElement('a');
    link.innerText = 'Site Safety Documents';
    link.setAttribute('href', site_safety_documents_path);
    link.setAttribute('class', 'btn');
    link.setAttribute('target', '_blank');
    link.style.cssText = `
        background-color:#197278;
        color:white;
        margin-top:0.5rem;
    `;
    modal_footer.append(link);
    button.style.cssText = `
        margin-top:0.5rem;
        text-transform:capitalize;
    `;
    button_message.style.cssText = `
        color:#d32f2f;
        font-size:1.5rem;
        font-weight:500;
    `;
}

function get_asset_id() {
    const signout_form = document.querySelector("form#process");
    let token = document.getElementById("form_session_token").value;
    let action = signout_form.action;
    let action_array = action.split("&");
    let path = action_array[3].split("/");
    //console.log(path);
    let contractor_path = path[3].split("-");
    let contractor_id = contractor_path[1];
    //alert(contractor_id);
    let url = `index.php?module=antevasin/unicloud/unicloud&action=get_asset_id&contractor_id=${contractor_id}&token=${token}`;
    $.ajax({
        url: url,
        type: "GET",
        success: function(response) {
            let asset_id = response;
            //alert("Asset "+asset_id);
            if (asset_id) {
                let asset_ids = asset_id.split(',');
                if (asset_ids.length == 1) {
                    get_asset_values(
                        asset_rating,
                        asset_rating_form,
                        asset_rating_options,
                        asset_notes,
                        asset_image,
                        false,
                        asset_id
                    );
                    hide_asset_notes_image(
                        asset_rating,
                        asset_notes_form,
                        asset_image_form,
                        asset_notes,
                        asset_image
                    );
                    asset_dropdown_form.style.display = "none";
                }
                //multiple assets
                else {
                    asset_dropdown_form.style.display = "block";
                    show_related_assets_dropdown(asset_ids, assets_dropdown);
                    get_asset_from_dropdown(assets_dropdown, asset_rating_options, false, true);
                }
            }
            //no asset
            else {
                asset_rating_form.style.display = "none";
                asset_dropdown_form.style.display = "none";
                signout_action_button();
            }
        },
        error: function(error) {
            console.log(response);
        },
    });
}

function update_asset_action_button() {
    //alert();
    const asset_rating_chosen = document.querySelector("#fields_1987_chosen");
    asset_rating.style.display = "block";
    asset_rating_chosen.style.display = "none";
    let contractor_id = get_contractor_id();
    let token = document.getElementById("form_session_token").value;
    let check_status_url = instance_url +
        `?module=antevasin/unicloud/public_process&action=get_field_values&item=76-${contractor_id}&token=${token}&field_ids=1713`;
    $.ajax({
        url: check_status_url,
        type: "GET",
        success: function(response) {
            let data = JSON.parse(response);
            //console.log(data);
            if (data[1713] == 432 || data[1713] == 434) {
                let url = `index.php?module=antevasin/unicloud/unicloud&action=get_asset_id&contractor_id=${contractor_id}&token=${token}`;
                $.ajax({
                    url: url,
                    type: "GET",
                    success: function(response) {
                        let asset_id = response;
                        //alert("Asset "+asset_id);
                        if (asset_id) {
                            let asset_ids = asset_id.split(',');
                            if (asset_ids.length == 1) {
                                get_asset_values(
                                    asset_rating,
                                    asset_rating_form,
                                    asset_rating_options,
                                    asset_notes,
                                    asset_image,
                                    'public_form_16',
                                    asset_id
                                );
                                hide_asset_notes_image(
                                    asset_rating,
                                    asset_notes_form,
                                    asset_image_form,
                                    asset_notes,
                                    asset_image
                                );
                                asset_dropdown_form.style.display = "none";
                                show_all_assets_form.style.display = "none";
                                $('.form-group-2311').hide();
                            }
                            //multiple assets
                            else {
                                asset_dropdown_form.style.display = "block";
                                show_related_assets_dropdown(asset_ids, assets_dropdown);
                                get_asset_from_dropdown(assets_dropdown, asset_rating_options, 'public_form_16', true);
                                show_all_assets_filter(asset_ids, assets_dropdown);
                            }
                        }
                        //no asset
                        else {
                            asset_rating_form.style.display = "none";
                            asset_dropdown_form.style.display = "none";
                            show_all_assets_form.style.display = "none";
                            $('.form-group-2311').hide();
                            $('.form-group-1987').hide();
                             $('.form-group-2038').hide();
                            $('.tab-content').append('<p style="font-size:1.5rem; margin:2rem 0; color:#333333;">No asset found</p>');
                            $("button[type='submit']").prop('disabled', true);
                        }
                    },
                    error: function(error) {
                        console.log(response);
                    },
                });


            } else {
                //contractor job declined or completed
                asset_rating_form.style.display = "none";
                asset_dropdown_form.style.display = "none";
                $('.tab-content').append('<p style="font-size:1.5rem; margin:2rem 0; color:#333333;">Contractor Job has been closed.</p>');
                $("button[type='submit']").prop('disabled', true);
            }
        },
        error: function(error) {
            console.log(error);
        },
    });

}

function signout_action_button() {
    const button = document.querySelector("button[type='submit']");
    const form = document.querySelector("#process");
    button.addEventListener('click', function(e) {
        button.style.display = "none";
        $('.primary-modal-action-loading').css('visibility', 'visible');
        form.submit();
    })
}

function get_technician_id() {
    let path = get_path();
    // console.log(path);
    if (path[4]) {
        let technician_path = path[4].split("-");
        technician_id = technician_path[1];
        return technician_id;
    } else {
        // if in UI then return 0 
        return 0;
    }

}

function get_contractor_id() {
    let path = get_path();
    if (path[3]) {
        let contractor_path = path[3].split("-");
        let contractor_id = contractor_path[1];
        return contractor_id;
    } else {
        return 0;
    }
}

function get_path() {
    const form = document.querySelector('form#process');
    let action = form.action;
    let action_array = action.split("&");
    let full_path = action_array[3];
    //alert(full_path);

    if (full_path.includes('path')) {
        let path_array = full_path.split('=');
        let path = path_array[1].split('/');
        //alert(path);
        return path;
    } else {
        const form = document.querySelector('#form_action_url');
        let value = form.value;
        let action_array = value.split("&");
        let full_path = action_array[3];
        let path_array = full_path.split('=');
        let path = path_array[1].split('/');
        //alert(path);
        return path;
    }

}

function get_tech_questions(action_button) {
    let questions_parent;
    if (action_button) questions_parent = document.querySelector('.modal-body');
    else questions_parent = document.querySelector('.tab-content');
    let url = instance_url +
        `?module=antevasin/facilities/public_process&action=get_tech_activity_questions&token=${token}`;
    $.ajax({
        url: url,
        type: "GET",
        success: function(response) {
            // console.log(response);
            const questions = document.createElement('div');
            questions.innerHTML = response;
            questions_parent.append(questions);
            $.getScript('https://source.unicloud.co.nz/js/tech_questions.js', function() {
                setup_questions();
            });
        },
        error: function(error) {
            console.log(error);
        },
    });
}

function check_contractor_onsite_due_date() {
    const button = document.querySelector("button[type='submit']");
    const form = document.querySelector("#process");
    const completion_due = document.querySelector('#fields_1717');
    const onsite_due = document.querySelector('#fields_1716');
    const message = document.querySelector('#form-error-container');
    const contractor = document.querySelector('#fields_1714');
    const description = document.querySelector('#fields_1718');
    const service_type = document.querySelector('#fields_1740_chosen');

    completion_due.value = "", onsite_due.value = "";

    button.addEventListener('click', function(e) {
        e.preventDefault();
        //alert(completion_due.value+" "+onsite_due.value); 
        if (onsite_due.value > completion_due.value) {
            message.innerText = 'Onsite Due Date can\'t be greater than Completion Due Date!';
        } else {
            message.innerText = '';
            let service_type = $(`#fields_1740`).chosen().val();
            if (service_type && onsite_due.value && completion_due.value && contractor.value && description.value) {
                //alert('submit');
                button.style.display = "none";
                $('.primary-modal-action-loading').css('visibility', 'visible');
                form.submit();
            } else {
                message.innerText = '*Fill all the required fields!';
            }

        }
    })

}

function show_service_request_number() {
    if (!contractor_id) {
        contractor_id = get_contractor_id();
    }
    // console.log("Contractor_id: "+contractor_id);
    let url =
        instance_url +
        `?module=antevasin/unicloud/public_process&action=get_service_request_number&contractor_id=${contractor_id}&token=${token}`;

    $.ajax({
        url: url,
        type: "GET",
        success: function(response) {
            //console.log(response);
            if (response) {
                let form = document.querySelectorAll(".form-group-parent-item-id");
                console.dir(form);
                if (form.length == 0) {
                    console.log("in ui");
                    form = document.querySelectorAll(".modal-title");
                }
                const request_number = document.createElement('h5');
                request_number.innerHTML = "Service Request Number : " + response;
                request_number.style.cssText = `
                        margin-left:20px;
                        text-transform:capitalize;
                    `;
                form[0].append(request_number);
            }
        },
        error: function(error) {
            console.log(error);
        },
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

function today_date_time() {
    const today = new Date();
    const date =
        today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
    let minutes = today.getMinutes();
    //alert(minutes);
    if (minutes == 1 || minutes == 2 || minutes == 3 || minutes == 3 || minutes == 4 || minutes == 5 || minutes == 6 || minutes == 7 || minutes == 8 || minutes == 9 || minutes == 0) {
        minutes = `0${minutes}`;
    }
    const time = today.getHours() + ":" + minutes;
    const dateTime = date + " " + time;
    return dateTime;
}

function hide_tab(tabs) {
    tabs.forEach(function(tab) {
        document.querySelector(`.form_tab_${tab}`).style.display = "none";
    });
}