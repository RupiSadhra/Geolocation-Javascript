//site_field_align() arguments
const site_form = document.querySelector(".form-group-parent-item-id");
const site_label = document.querySelector(
  ".form-group-parent-item-id .control-label"
);
const site_select = document.querySelector(
  ".form-group-parent-item-id .col-md-9"
);

//public form url values
const path = window.location.href;
const url = new URLSearchParams(path);
const parent_id = url.get("parent_item_id");
const form_id = url.get("id");

display_form();

if (form_id == 5) {
  display_site_name(site_label, site_form, parent_id);
}
if (form_id == 8) {
  site_form_align(site_form, site_label, site_select);
}

function site_form_align(site_form, site_label, site_select) {
  site_label.classList.remove("col-md-3");
  site_label.classList.add("col-md-1");
  site_select.classList.remove("col-md-9");
  site_select.classList.add("col-sm-12");
  site_select.classList.add("col-md-11");
  site_form.style.cssText = ` margin: 4rem 0; `;
  site_label.style.cssText = ` text-align: left; `;
}

function display_site_name(site_label, site_form, parent_id) {
  let job;
  window.onload = function () {
    const options = document.querySelectorAll("#parent_item_id option");
    const dropdown = document.querySelectorAll(".chosen-container");

    options.forEach(function (option, index) {
      //console.log(option.value);
      if (option.value == parent_id) {
        job = option.text;
      }
    });
    dropdown[0].style.display = "none";
    site_label.style.display = "none";
    let job_index = job.lastIndexOf("/");
    job_index++;
    const job_name = job.substring(job_index);
    //console.log(job_name);

    var newEl = document.createElement("h4");
    newEl.innerHTML = job_name;
    newEl.style.marginLeft = "20px";
    site_form.append(newEl);
  };
}

function display_form() {
  const form = document.querySelector(".content-form");
  const copyright = document.querySelector(".copyright");
  setTimeout(function () {
    form.style.display = "block";
    copyright.style.display = "block";
  }, 500);
}
