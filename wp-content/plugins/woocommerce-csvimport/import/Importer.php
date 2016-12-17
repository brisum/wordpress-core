<?php
/**
 * Created by PhpStorm.
 * User: allaerd
 * Date: 07/06/16
 * Time: 12:49
 */

namespace Allaerd;

class Importer
{
    protected static $_instance = null;

    public $Scheduler;

    public $fields;

    public static function instance()
    {
        if (is_null(self::$_instance)) {
            self::$_instance = new self();
        }

        return self::$_instance;
    }

    public function __construct()
    {
        $this->setup();
        $this->hooks();
        $this->filters();
    }

    public function hooks()
    {

    }

    public function setup()
    {
        $this->Scheduler = new Scheduler();
        $this->Admin = new Admin();

        $this->fields = apply_filters('allaerd_importer_fields', $this->fields);
    }

    public function main () {
        echo 'hi';
    }

}

