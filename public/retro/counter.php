<?php
/*
 * Счётчик посетителей для ретро-версии сайта.
 *
 * Отдаёт картинку-табло с числом посещений.
 * Лежит на том же домене и работает по обычному HTTP,
 * поэтому старые браузеры видят её без проблем.
 *
 * Число берётся из облака. Если облако недоступно —
 * отдаётся последняя сохранённая картинка.
 */

$source   = 'https://functions.poehali.dev/83dde32c-9f08-457a-b13c-c87ce2fb125f';
$cache    = __DIR__ . '/img/cnt_fallback.gif';
$lifetime = 60;

header('Content-Type: image/gif');
header('Cache-Control: no-cache, no-store, must-revalidate');
header('Pragma: no-cache');
header('Expires: 0');

$data = false;

$fresh = file_exists($cache) && (time() - filemtime($cache) < $lifetime);

if (!$fresh) {
    if (function_exists('curl_init')) {
        $ch = curl_init($source);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 4);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 3);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        $result = curl_exec($ch);
        $code   = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($result !== false && $code == 200 && strlen($result) > 20) {
            $data = $result;
        }
    }

    if ($data === false && ini_get('allow_url_fopen')) {
        $ctx = stream_context_create(array(
            'http' => array('timeout' => 4),
            'ssl'  => array('verify_peer' => false, 'verify_peer_name' => false),
        ));
        $result = @file_get_contents($source, false, $ctx);
        if ($result !== false && strlen($result) > 20) {
            $data = $result;
        }
    }

    if ($data !== false) {
        @file_put_contents($cache, $data);
    }
}

if ($data === false && file_exists($cache)) {
    $data = file_get_contents($cache);
}

if ($data === false) {
    $data = base64_decode('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7');
}

header('Content-Length: ' . strlen($data));
echo $data;
