<?php
/*
 * Счётчик посетителей для ретро-версии сайта.
 *
 * Работает полностью на хостинге, без облака.
 * Число посещений хранится в файле data/counter.txt,
 * табло собирается из готовых картинок цифр img/cnt/0.gif ... 9.gif.
 *
 * Один и тот же посетитель засчитывается не чаще раза в 12 часов.
 * Чтобы поменять число на табло — впишите нужное число в data/counter.txt.
 */

$digits   = 5;
$repeat   = 12 * 3600;
$dataDir  = __DIR__ . '/data';
$cntFile  = $dataDir . '/counter.txt';
$seenFile = $dataDir . '/seen.txt';
$imgDir   = __DIR__ . '/img/cnt';
$fallback = __DIR__ . '/img/cnt_fallback.gif';

if (!is_dir($dataDir)) {
    @mkdir($dataDir, 0775);
}

$ip = '';
foreach (array('HTTP_X_FORWARDED_FOR', 'HTTP_X_REAL_IP', 'REMOTE_ADDR') as $key) {
    if (!empty($_SERVER[$key])) {
        $parts = explode(',', $_SERVER[$key]);
        $ip = trim($parts[0]);
        break;
    }
}
$ua = isset($_SERVER['HTTP_USER_AGENT']) ? substr($_SERVER['HTTP_USER_AGENT'], 0, 120) : '';
$visitor = md5($ip . '|' . $ua);
$now = time();

$hits = 0;
$fp = @fopen($cntFile, 'c+');
if ($fp) {
    flock($fp, LOCK_EX);
    $hits = (int) trim(stream_get_contents($fp));

    $seen = array();
    if (file_exists($seenFile)) {
        foreach (file($seenFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
            $p = explode(' ', $line);
            if (count($p) == 2 && ($now - (int) $p[1]) < $repeat) {
                $seen[$p[0]] = (int) $p[1];
            }
        }
    }

    if (!isset($seen[$visitor])) {
        $hits++;
        $seen[$visitor] = $now;

        ftruncate($fp, 0);
        rewind($fp);
        fwrite($fp, (string) $hits);
        fflush($fp);

        $out = '';
        foreach ($seen as $k => $t) {
            $out .= $k . ' ' . $t . "\n";
        }
        @file_put_contents($seenFile, $out);
    }

    flock($fp, LOCK_UN);
    fclose($fp);
}

header('Content-Type: image/gif');
header('Cache-Control: no-cache, no-store, must-revalidate');
header('Pragma: no-cache');
header('Expires: 0');

$text = substr(str_pad((string) $hits, $digits, '0', STR_PAD_LEFT), -$digits);

if (function_exists('imagecreatefromgif')) {
    $w = 16;
    $h = 24;
    $im = imagecreate($w * strlen($text), $h);
    imagecolorallocate($im, 0, 0, 0);

    for ($i = 0; $i < strlen($text); $i++) {
        $d = @imagecreatefromgif($imgDir . '/' . $text[$i] . '.gif');
        if ($d) {
            imagecopy($im, $d, $i * $w, 0, 0, 0, $w, $h);
            imagedestroy($d);
        }
    }

    imagegif($im);
    imagedestroy($im);
    exit;
}

if (file_exists($fallback)) {
    readfile($fallback);
    exit;
}

echo base64_decode('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7');
