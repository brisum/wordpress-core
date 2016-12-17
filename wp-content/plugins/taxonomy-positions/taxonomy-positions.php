<?php
/**
 * @package Hello_Dolly
 * @version 1.6
 */
/*
Plugin Name: Taxonomy positions
Plugin URI: 
Description: change order of taxonomyes.
Author: Anisimow
Version: 1.6
Author URI: http://nasoxks.ru/
*/

defined('ABSPATH') or die("No script kiddies please!");

register_activation_hook(__FILE__, 'tp_activation');
register_deactivation_hook(__FILE__, 'tp_deactivation');

function tp_activation(){
    global $wpdb;
    $alert_position = "ALTER TABLE `{$wpdb->prefix}mf_custom_taxonomy` ADD position INT";

    $wpdb->query($alert_position);
}

function tp_deactivation(){
    global $wpdb;
    $alert_position = "ALTER TABLE `{$wpdb->prefix}mf_custom_taxonomy` DROP position";

    $wpdb->query($alert_position);   
}
// Define current version constant
define( 'CPT_VERSION', '0.8' );

// Define plugin URL constant
$CPT_URL = cpt_check_return( 'add' );

// create taxonomy position plugin settings menu
add_action('admin_menu', 'tp_plugin_menu');


function tp_plugin_menu() {
    	//create custom post type menu
	add_menu_page( __( 'Taxonomy positions', 'tp-plugin' ), __( 'Taxonomy positions', 'tp-plugin' ), 'manage_options', 'tp_main_menu', 'tp_settings' );
}

//main welcome/settings page
function tp_settings() {
    echo 'helow';
}
?>