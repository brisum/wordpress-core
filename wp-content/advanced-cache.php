<?php

if (WP_DEBUG_LOG) {
    $log = sprintf(ABSPATH . '/log/%s-error.log', date('Y-m-d'));
    ini_set('error_log', $log);
}
