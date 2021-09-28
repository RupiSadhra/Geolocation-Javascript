 case 'get_condition_rating_value':
        if ( isset( $_GET['rating'] ) && isset( $_GET['asset_id'] ) )
	    {
	        $sql = "
            	SELECT `field_2003` as rating_value
                FROM `app_entity_86` 
                WHERE `field_2002`=".$_GET['rating'];
            $user_query = db_query( $sql );
            if ( $result = db_fetch_array( $user_query ) ) {
              $value =  $result['rating_value'];
              echo $value;
            }
	    }
        exit();
        break; 
     case 'update_asset_insert_history':
        if ( isset( $_GET['user_id'] ) && isset( $_GET['rating'] ) && isset( $_GET['date'] ) && isset( $_GET['asset_id'] ) && isset( $_GET['rating_value'] ))
	    {
	       $sql = "INSERT INTO `app_entity_88`( `parent_item_id`,  `date_added`, `field_2028`, `field_2029`) VALUES ( {$_GET['asset_id']}, {$_GET['date']}, {$_GET['rating']}, {$_GET['user_id']} )";
	       $insert_query = db_query( $sql );
	       if($insert_query) echo 'condition rating history inserted';
	       else echo 'failed to insert condition rating history';
	       
	       $sql = "UPDATE `app_entity_52` SET `field_973`={$_GET['rating']}, `field_2042`={$_GET['date']}, `field_2020`={$_GET['rating_value']} WHERE id={$_GET['asset_id']}";
	       $update_query = db_query( $sql );
	       if($update_query) echo 'asset rating updated';
	       else echo 'failed to update asset rating';
	    }
        exit();
        break;