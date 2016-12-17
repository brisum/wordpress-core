<?php

if (!isset($_GET['_filename_'])) {
    die();
}

$config = include('config.php');
$filename = ltrim(str_replace('/component-manager/asset' , '', $_GET['_filename_']), '/');
$pieces = explode('/', $filename);
$destFile = __DIR__ . '/asset/' . $filename;
$destDir = dirname($destFile);

foreach ($config['path'] as $path) {
    $srcDir = realpath(__DIR__ . '/../' . $path);
    $srcFile = '';
    $isFound = true;

    $srcFile = $srcDir;
    foreach ($pieces as $piece) {
        if (file_exists($srcFile . DIRECTORY_SEPARATOR . $piece)) {
            $srcFile .= DIRECTORY_SEPARATOR . $piece;
            continue;
        }

        $piece = ucfirst(preg_replace_callback(
            '/-([a-z])/',
            function($m){return strtoupper($m[1]);},
            $piece
        ));

        if (file_exists($srcFile . DIRECTORY_SEPARATOR . $piece)) {
            $srcFile .= DIRECTORY_SEPARATOR . $piece;
            continue;
        }

        $isFound = false;
        break;
    }

    if (!$isFound || !is_file($srcFile)) {
        continue;
    }

    umask(0);
    if (!file_exists($destDir)) {
        mkdir($destDir, 0755, true);
    }
    copy($srcFile, $destFile);

    header('Location: ' . $_SERVER['REQUEST_URI']);
    die();
}

header("HTTP/1.0 404 Not Found");
header("HTTP/1.1 404 Not Found");
header("Status: 404 Not Found");
die();
