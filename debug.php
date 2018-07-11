<?php

header("X-Robots-Tag: noindex,nofollow");

die();

require_once 'wp-load.php';
include_once( ABSPATH . 'wp-admin/includes/image.php' );
echo '<pre>';

if (!session_id()) {
    session_start();
}

$attachment = 149;
$fullSizePath = get_attached_file($attachment);
$oldMetadata = wp_get_attachment_metadata($attachment);

$metadata = wp_generate_attachment_metadata($attachment, $fullSizePath);
