<?php

if (!isset($_GET['_component_'])) {
    die();
}

$component = ltrim($_GET['_component_'], '/');
$pieces = explode('/', $component);
$script = realpath(__DIR__ . DIRECTORY_SEPARATOR . '..') . str_replace('/', DIRECTORY_SEPARATOR, '/vendor/brisum/component');

foreach ($pieces as $piece) {
    if (file_exists($script . DIRECTORY_SEPARATOR . $piece)) {
        $script .= DIRECTORY_SEPARATOR . $piece;
        continue;
    }

    $piece = ucfirst($piece);
    if (file_exists($script . DIRECTORY_SEPARATOR . $piece)) {
        $script .= DIRECTORY_SEPARATOR . $piece;
        continue;
    }

    die("Can't find component.");
}

if (!is_file($script)) {
    die("Can't find component.");
}
require($script);
