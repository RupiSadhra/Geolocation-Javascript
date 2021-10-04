function get_asset_id( $contractor_id )
{
    $sql = "
	SELECT id
	FROM `app_entity_52` 
    WHERE id=(SELECT `field_964` as id 
        FROM `app_entity_56` 
        WHERE id = (SELECT `entity_56_items_id` 
                    FROM `app_related_items_56_76` 
                    WHERE `entity_76_items_id`= ". $contractor_id ."))";

    $user_query = db_query( $sql );
    
    if ( $result = db_fetch_array( $user_query ) )
    {
      echo $result['id'];
    }
}
