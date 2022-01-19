$id= [id];
$value = $rating_value = $next_service_due = $assessment_history = $condition_value = $date_added = $last_assessment_date = $last_assessment_field = '';
$expected_base_life = $expected_years_remaining = $expected_replacement_date = '';
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
  //echo "has condition assessment history";
  $sql ="UPDATE `app_entity_52` SET `field_2019`={$assessment_history}, `field_2042`={$assessment_history} WHERE id={$id}";
  $user_query = db_query( $sql );
  
}
else{
  //echo ", no condition assessment history";
  $sql = "SELECT `field_2019` as last_assessment_date FROM `app_entity_52` WHERE id=".$id;
  $user_query = db_query( $sql );
  if ( $result = db_fetch_array( $user_query ) ){
    $last_assessment_date =  $result['last_assessment_date'];
  }
  if($last_assessment_date){
    //echo " has last assessment date";
    $sql ="UPDATE `app_entity_52` SET `field_2019`={$last_assessment_date}, `field_2042`={$last_assessment_date} WHERE id={$id}";
    $user_query = db_query( $sql );
  }
  else{
  //echo ", no last assessment date";
  $sql = "SELECT `date_added` as date_added,`field_973` as condition_value FROM `app_entity_52` WHERE id=".$id;
  $user_query = db_query( $sql );
  if ( $result = db_fetch_array( $user_query ) ){
    $condition_value =  $result['condition_value'];
    $date_added =  $result['date_added'];
  }
  if($condition_value){
    //echo " has condition value and using date_added".$date_added;
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
  
  //expected base life
  $sql = "SELECT `field_1098` expected_base_life FROM `app_entity_52` WHERE id=".$id;
  $user_query = db_query( $sql );
  if ( $result = db_fetch_array( $user_query ) ) {
    $expected_base_life =  $result['expected_base_life'];
  }
  if ( $expected_base_life ) {
    $expected_years_remaining =  $expected_base_life*($rating_value/100);
    //echo "<br>Expected Years Remaining: ".$expected_years_remaining;
  }

} 



if( $assessment_history ){ $last_assessment_field = $assessment_history; }
else if( $last_assessment_date ){ $last_assessment_field = $last_assessment_date;}
else { $last_assessment_field = $date_added;}
//echo "<br>".$last_assessment_field;

//expected replacement
if($expected_years_remaining && $last_assessment_field){
  $expected_replacement_date = $last_assessment_field + ($expected_years_remaining*31536000);
  $sql ="UPDATE `app_entity_52` SET `field_2021`={$expected_replacement_date} WHERE id={$id}";
  $user_query = db_query( $sql );
  //echo "<br>Expected Replacement Date: ".$expected_replacement_date;
}

?>



<script type='text/javascript'>
  	function today_date_time(timestamp) {
       today = new Date(timestamp*1000);
       const date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
       return date;
	}
	let last_assessment_date = today_date_time(<?php echo $last_assessment_field?>) ;
  	let expected_replacement_date = today_date_time(<?php echo $expected_replacement_date?>) ;
    document.querySelector('.form-group-2019 td').innerText = last_assessment_date;
    document.querySelector('.form-group-2035 td').innerText = <?php echo $expected_years_remaining?> ;
    document.querySelector('.form-group-2021 td').innerText = expected_replacement_date;
  </script>

