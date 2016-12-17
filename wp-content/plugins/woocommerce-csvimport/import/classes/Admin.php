<?php namespace Allaerd;

/**
 * Created by PhpStorm.
 * User: allaerd
 * Date: 10/08/16
 * Time: 13:01
 */

use Allaerd;


class Admin
{
    public function __construct()
    {
        add_action('admin_menu', array($this,'menu'));
        add_action('admin_init', array ($this, 'register_importers'));
    }


    public function menu()
    {

        add_menu_page('allaerd-container', 'Importer', 'manage_woocommerce', 'allaerd-container', array ($this, 'main'), null, '58.1505323321');
        add_submenu_page('allaerd-container', 'Importer', 'Importer', 'manage_woocommerce', 'allaerd-importer', array ($this, 'import'));
    }

    public function main()
    {
        echo 'hi';
    }

    public function import()
    {
        echo 'importer';
    }

    public function register_importers()
    {
        register_importer('allaerd_import', 'Import everthing' , 'Import everything', array ($this, 'import'));
    }

}