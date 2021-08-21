
function unicloud_module_technician_activity()
{
    
          //get id of current contractor job and location coordinates
          const path=window.location.href;
          const url=new URLSearchParams(path);
          const parent_id=url.get('parent_item_id');
          const location=url.get('location');
          //console.log(parent_id);
          let startIndex=location.indexOf(']');
          startIndex++;
          const coordinates=location.substring(startIndex, location.indexOf('(')); 
          let lastIndex=coordinates.indexOf(',');
          lastIndex++;
          //alert(coordinates);
          const siteLatitude=coordinates.substring(0, coordinates.indexOf(','));
          const siteLongitude=coordinates.substring(lastIndex);
          //alert(siteLatitude+"  "+siteLongitude);
          const button = document. querySelector('button[type="submit"]');
          const button_message = document.getElementById('form-error-container'); 
           
           
          //code to display only associated contractor job
          show_contractor_job(parent_id); 
        
        
         
          window.onload = function() {
          if (navigator.geolocation) {
          //console.log('Geolocation is supported!');
      
            window.navigator.geolocation.watchPosition(
              (position) => {
                //alert("lat..."+position.coords.latitude+" long..."+position.coords.longitude);
                let userLatitude=position.coords.latitude;
                let userLongitude=position.coords.longitude;
                //console.log("long: " + long + "lat: "+lat);
                let distance=find_distance(userLatitude,userLongitude,siteLatitude,siteLongitude);
                console.log("distance: "+distance);
                
                    if(distance>1000)
                    {
                       // console.log("You need to be only 1km away from the site");
                       console.log("button disable");
                       button. disabled = true;
                       button_message.innerText="Sign In disabled due to distance from site!";
                    }
                    
                    else
                    {
                         button. disabled = false;
                         button_message.innerText="";
                    }
                },
                (error) => {
                    console.log(error.message);
                });
                       
                }
            else {
                  console.log('Geolocation is not supported for this Browser/OS.');
                }
            };
            // end of window onload function

    
      //hides or shows the geolocation override reason textarea
    	const dropdown=document.querySelector('#fields_1765');
    	var value;
        $(".form-group-1766").css("display","none");
    	
    	dropdown.addEventListener('change',function(){
            value = dropdown.value;
          
            if(value==760)
            {
              $(".form-group-1766").css("display","none");
               button. disabled = true;
               button_message.innerText="Sign In disabled due to distance from site!";
            }
            else
            {
              $(".form-group-1766").css("display","block");
                button. disabled = false;
                button_message.innerText="";
                
            }
        });
      
    
       
       
  
          //display current time/date and disable
          disable_arrival_on_site();
        
         
        //display expected departure time
        display_expected_departure_time();
}

function find_distance(lat1,lon1,lat2,lon2)
{
    console.log("User: "+lat1 +" ",lon1+" "+"Site: "+lat2 +" ",lon2);
     var R = 6371; // Radius of the earth in km
      var dLat = deg2rad(lat2-lat1);  // deg2rad below
      var dLon = deg2rad(lon2-lon1); 
      var a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2)
        ; 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c; // Distance in km
      return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

function show_contractor_job(parent_id)
{
       let job; 
       const options=document.querySelectorAll('#parent_item_id option');
        const dropdown=document.getElementById('parent_item_id_chosen');
        //const form=document.querySelectorAll('.form-group-parent-item-id .col-md-9');
        const label=document.querySelectorAll('.form-group-parent-item-id .col-md-3');
        const form=document.querySelectorAll('.form-group-parent-item-id');
          let index=1;
          options.forEach(function(option){
            if(option.value==parent_id)
            {
              
              job=option.text;
            }
            index++;
          });
           dropdown.style.display = "none";
            label[0].style.display = "none";
           let job_index=job.lastIndexOf('/');
           job_index++;
           const job_name=job.substring(job_index);
           console.log(job_name);
           
           var newEl = document.createElement("h4");
            newEl.innerHTML = job_name;
           newEl.style.marginLeft="20px";
            form[0].append(newEl);
}

function disable_arrival_on_site()
{
      const today = new Date();
          const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
          const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
          const dateTime = date+' '+time;
          
          const arrival_on_site=document.querySelector('#fields_1762');
          arrival_on_site.value=dateTime;
          arrival_on_site.disabled = true;
          document.querySelector('.date-set').disabled = true;
          //$( '#fields_1762' ).prop( 'readonly', true )siblings( '.input-group-btn' ).remove();
          //$("#fields_1762").prop("disabled","disabled");
}

function display_expected_departure_time()
{
    console.log('departure');

}