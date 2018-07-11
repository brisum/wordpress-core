<?php
/**
 * Основные параметры WordPress.
 *
 * Скрипт для создания wp-config.php использует этот файл в процессе
 * установки. Необязательно использовать веб-интерфейс, можно
 * скопировать файл в "wp-config.php" и заполнить значения вручную.
 *
 * Этот файл содержит следующие параметры:
 *
 * * Настройки MySQL
 * * Секретные ключи
 * * Префикс таблиц базы данных
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

define('WP_CACHE', true);

if ('upakovka.com.ua'  != $_SERVER['SERVER_NAME']) {
    header("X-Robots-Tag: noindex, nofollow", true);
    define('IS_ENV_PRODUCTION', false);
} else {
    define('IS_ENV_PRODUCTION', true);
}

require_once('wp-config-local.php');

!defined('DB_HOST') && define('DB_HOST', 'localhost');
!defined('DB_CHARSET') && define('DB_CHARSET', 'utf8');
!defined('DB_COLLATE') && define('DB_COLLATE', '');

/**#@+
 * Уникальные ключи и соли для аутентификации.
 *
 * Смените значение каждой константы на уникальную фразу.
 * Можно сгенерировать их с помощью {@link https://api.wordpress.org/secret-key/1.1/salt/ сервиса ключей на WordPress.org}
 * Можно изменить их, чтобы сделать существующие файлы cookies недействительными. Пользователям потребуется авторизоваться снова.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'ug~R~q>9b6=|.t6XrtC=-/nW4r[;Wk~Q)NFrbcd!c~0h[I2!STo4L1V`9AMm*y5Q');
define('SECURE_AUTH_KEY',  '0TsYmFq2)}$4WK{jrt!H(9`Ca-dRT5}zFvXko`-Am~+[:N1:-`Fm`F7*a[,|Ry32');
define('LOGGED_IN_KEY',    'STJ~`;!)H-NV_^rt|%JeO2E[R]:DNd~FOrS +68<%KjI<_ndk}@SJVv@Z)BvCS,R');
define('NONCE_KEY',        '||$;7gPz+H`]A5| rt&2lS}am.mI]im{A-;ctrkZbx@E9hIeSgF3Kn?:[{>catAy');
define('AUTH_SALT',        'e,+jAsWO~C+MKK8crtrM2;$PY0SA4x`I8bis~B5(Ur!a&oy-<?-4cs#m@&D`gH=.');
define('SECURE_AUTH_SALT', 'S8YTgqt#}WctJ/tKXn||rtP)5V LT`[lrfIfd`Df?BD;cu:f]*cB3K9H^n6A{Ovj');
define('LOGGED_IN_SALT',   '/Vf0&%gbf|^7:%$$pG@M4-Mw]%Ytr!b&|@[1;%lb.}(>*X=QG/?0Q;(_C8y-Rs 1');
define('NONCE_SALT',       '_zUpi6(>x3v}kc2Y!gg8%Q+vjnOtrbt-o-r]8S$-2togng2LL>Vp;:G#;B+EZ2pj');

/**#@-*/

/**
 * Префикс таблиц в базе данных WordPress.
 *
 * Можно установить несколько сайтов в одну базу данных, если использовать
 * разные префиксы. Пожалуйста, указывайте только цифры, буквы и знак подчеркивания.
 */
$table_prefix  = 'j8_';

/**
 * Для разработчиков: Режим отладки WordPress.
 *
 * Измените это значение на true, чтобы включить отображение уведомлений при разработке.
 * Разработчикам плагинов и тем настоятельно рекомендуется использовать WP_DEBUG
 * в своём рабочем окружении.
 *
 * Информацию о других отладочных константах можно найти в Кодексе.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
!defined('WP_DEBUG') && define('WP_DEBUG', false);

define('AUTOSAVE_INTERVAL', 300);
define('WP_POST_REVISIONS', false);
define('WP_AUTO_UPDATE_CORE', false);

/* Это всё, дальше не редактируем. Успехов! */

/** Абсолютный путь к директории WordPress. */
if ( !defined('ABSPATH') )
    define('ABSPATH', dirname(__FILE__) . '/');

$log = sprintf(ABSPATH . '/log/%s-error.log', date('Y-m-d'));
ini_set('error_log', $log);

/** Инициализирует переменные WordPress и подключает файлы. */
require_once(ABSPATH . 'wp-settings.php');
