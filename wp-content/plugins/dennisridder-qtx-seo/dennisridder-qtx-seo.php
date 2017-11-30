<?php
/*
Plugin Name: Dennis Ridder qTranslate-X &amp; Yoast SEO Integration
Plugin URI: http://dennisridder.com/
Description: This plugin integrates qTranslate-X multilingual support to the Yoast SEO version 3.0 plugin.
Version: 0.1
Author: Dennis Ridder
Author URI: http://dennisridder.com/
Copyright: Dennis Ridder
Text Domain: dennisridder
*/

if ( ! defined( 'ABSPATH' ) ) exit;

if ( ! class_exists('DennisRidder_qTranslateX_Yoast_SEO') ) :

class DennisRidder_qTranslateX_Yoast_SEO
{
	public function __construct()
	{
		add_action( 'admin_init', array( &$this, 'admin_init' ) );
	}

	public function admin_init()
	{
		// Only hook when Yoast SEO and qTranslateX plugins are enabled.
		if ( !defined( 'WPSEO_VERSION' ) || ! version_compare( WPSEO_VERSION, '3.0', '>=' ) ) return;
		if ( !defined( 'QTX_VERSION' ) || ! version_compare( QTX_VERSION, '3.4.6.4', '>=' ) ) return;
		
		add_action( 'admin_enqueue_scripts', array( &$this, 'add_admin_js' ) );
	}

	public function add_admin_js()
	{
		wp_enqueue_script( 'qtx-yoast-seo', plugin_dir_url( __FILE__ ) . 'dennisridder-qtx-seo.js' );
	}
}

new DennisRidder_qTranslateX_Yoast_SEO;

endif;