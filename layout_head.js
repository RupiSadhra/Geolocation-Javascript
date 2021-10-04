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
    success: function (response) {
      let asset_id = response;
      get_asset_values(
        asset_rating,
        asset_rating_form,
        asset_rating_options,
        asset_notes,
        asset_image,
        asset_id
      );
    },
    error: function (error) {
      console.log(response);
    },
  });
}
