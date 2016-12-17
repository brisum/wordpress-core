<?php

use Brisum\Lib\ObjectManager\ObjectManager;

$autoload = require(dirname(__FILE__).'/vendor/autoload.php');

global $wpdb;
$config = include dirname(__FILE__) . '/config/di.php';
$sharedInstances = [
	'Composer\Autoloader' => $autoload,
	'wpdb' => $wpdb
];
$objectManager = new ObjectManager($config, $sharedInstances);
\Brisum\Lib\ObjectManager\ObjectManager::setInstance($objectManager);

\Brisum\Lib\ObjectManager\ObjectManager::setInstance($objectManager);
$objectManager->get('Brisum\Lib\Http\Session');
$objectManager->get('Brisum\Lib\Http\Request\Post');
$objectManager->get('Brisum\Lib\Http\Request\Get');

/** @var \Brisum\Lib\Context\Context $context */
$context = $objectManager->get('Brisum\Lib\Context\Context');
$context->set('const/cms', 'wordpress');
$context->set('const/lang', 'ru');
$context->set('const/bp', dirname(__FILE__));