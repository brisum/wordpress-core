<?php

require_once('wp-load.php');

$autoload = require(dirname(__FILE__) . '/vendor/autoload.php');

$objectManagerFactory = new Brisum\Lib\ObjectManager\ObjectManagerFactory();
$objectManager = $objectManagerFactory->create();
$sharedInstances = [
    'Composer\Autoloader' => $autoload
];
$objectManager = $objectManagerFactory->create($sharedInstances);

\Brisum\Lib\ObjectManager\ObjectManager::setInstance($objectManager);
$objectManager->get('Brisum\Lib\Http\Session');
$objectManager->get('Brisum\Lib\Http\Request\Post');
$objectManager->get('Brisum\Lib\Http\Request\Get');

/** @var \Brisum\Lib\Context\Context $context */
$context = $objectManager->get('Brisum\Lib\Context\Context');
$context->set('const/cms', 'wordpress');
$context->set('const/lang', 'ru');
$context->set('const/bp', realpath(__DIR__));
