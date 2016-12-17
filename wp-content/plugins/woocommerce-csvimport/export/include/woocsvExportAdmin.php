<?php

namespace AEM\exporter;

/**
 * Created by PhpStorm.
 * User: allaerd
 * Date: 25/03/16
 * Time: 08:45
 */
class woocsvExportAdmin
{


    public function menu ()
    {
        //export sub page
        add_submenu_page( 'woocsv_import', 'Export', __('Export','woocommerce-csvimport'), 'manage_woocommerce', 'woocsv-export', array($this, 'content'));

    }

    public function content ()
    {
        global $wpdb;

        if (isset($_POST[ 'action' ]) && $_POST[ 'action' ] == 'export') {
            delete_option('woocsv_export_current');
            //$this->export();
        }

        $woocsv_export_current = get_option( 'woocsv_export_current' );

        $min = 0;
        $max = $wpdb->get_var("select count(*) from $wpdb->posts where post_type = 'product'");

        $upload_dir = wp_upload_dir();
        $files = glob( $upload_dir[ 'basedir' ] . '/woocsv_export_*' );
        rsort($files);

        include WOOCSV_PLUGIN_PATH . '/export/partials/main.php';
    }

}