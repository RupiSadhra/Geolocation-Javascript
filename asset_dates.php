$id= [id];
$value = $rating_value = $next_service_due = $assessment_history = $condition_value = $date_added = $last_assessment_date = $last_assessment_field = '';
//last assessment date
$sql = "
	SELECT MAX(`date_added`) as date
    FROM `app_entity_88` 
    WHERE `parent_item_id`=". $id;

$user_query = db_query( $sql );
if ( $result = db_fetch_array( $user_query ) ){
  $assessment_history =  $result['date'];
}
if($assessment_history){
  echo "has condition assessment history";
  $sql ="UPDATE `app_entity_52` SET `field_2019`={$value}, `field_2042`={$value} WHERE id={$id}";
  $user_query = db_query( $sql );
  
}
else{
  echo " no condition assessment history";
  $sql = "SELECT `field_2019` as last_assessment_date FROM `app_entity_52` WHERE id=".$id;
  $user_query = db_query( $sql );
  if ( $result = db_fetch_array( $user_query ) ){
    $last_assessment_date =  $result['last_assessment_date'];
  }
  if($last_assessment_date){
    echo " has last assessment date";
    $sql ="UPDATE `app_entity_52` SET `field_2019`={$last_assessment_date}, `field_2042`={$last_assessment_date} WHERE id={$id}";
    $user_query = db_query( $sql );
   echo "<script type='text/javascript'> $('.form-group-2019 td').text(".$last_assessment_date.") </script>";
  }
  else{
  echo " no last assessment date";
  $sql = "SELECT `date_added` as date_added,`field_973` as condition_value FROM `app_entity_52` WHERE id=".$id;
  $user_query = db_query( $sql );
  if ( $result = db_fetch_array( $user_query ) ){
    $condition_value =  $result['condition_value'];
    $date_added =  $result['date_added'];
  }
  if($condition_value){
    echo " has condition value and using date_added";
    $sql ="UPDATE `app_entity_52` SET `field_2019`={$date_added}, `field_2042`={$date_added} WHERE id={$id}";
    $user_query = db_query( $sql );
   
  }
}
}

//next service due
$sql = "
    SELECT MAX(`field_1520`) as date
    FROM `app_entity_56` as job
    INNER JOIN `app_entity_56_values` as job_values
    ON job.id = job_values.items_id
    where job_values.fields_id = 964 and job_values.value = ".$id;
$user_query = db_query( $sql );
if ( $result = db_fetch_array( $user_query ) ) {
  $next_service_due =  $result['date'];
}
if( $next_service_due ) {
  $sql ="UPDATE `app_entity_52` SET `field_1985`={$next_service_due} WHERE id={$id}";
  $user_query = db_query( $sql );
} 


//condition rating value
$rating = [973];
$sql = "
	SELECT `field_2003` as rating_value
    FROM `app_entity_86` 
    WHERE `field_2002`=".$rating;

$user_query = db_query( $sql );
if ( $result = db_fetch_array( $user_query ) ) {
  $rating_value =  $result['rating_value'];
}
if( $rating_value ) {
  $sql ="UPDATE `app_entity_52` SET `field_2020`={$rating_value} WHERE id={$id}";
  $user_query = db_query( $sql );
} 


if( $assessment_history ){ 
  $last_assessment_field = $assessment_history;
}
else if( $last_assessment_date ){ 
  $last_assessment_field = $last_assessment_date;
}
else { 
$last_assessment_field = $date_added;
}
//$('.form-group-2019 td').val(".$date."); 

$date = date('d/m/Y' ,$last_assessment_field); 

echo "<br>Last assessment: ".$date;
echo "<script type='text/javascript'>
function today_date_time(timestamp) {
    let today=new Date(); 
    if(timestamp){
     today = new Date(timestamp*1000);
    }
    const date =
        today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
    let minutes = today.getMinutes();
    //alert(minutes);
    
    const time = today.getHours() + ':' + minutes;
    const dateTime = date;
    return dateTime;
}
	let x = today_date_time(".$last_assessment_date.") ;
	document.querySelector('.form-group-2019 td').innerText=x;
 
</script>";