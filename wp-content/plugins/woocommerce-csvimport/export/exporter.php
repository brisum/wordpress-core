<?php

namespace AEM\exporter;

function woocsv_export() {
    return woocsvExport::instance();
}

// Global for backwards compatibility.
$GLOBALS['woocsv_export'] = woocsv_export();