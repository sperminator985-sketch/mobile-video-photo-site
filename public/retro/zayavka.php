<?php
/*
 * Приём заявки с ретро-версии сайта.
 *
 * Форма отправляет данные сюда, этот файл передаёт их в облако,
 * оттуда письмо уходит на почту студии.
 *
 * Работает на том же домене по обычному HTTP,
 * поэтому подходит для очень старых браузеров.
 */

$target = 'https://functions.poehali.dev/2c609e31-a278-4787-9035-9753fda9bb86';
$mail   = 'daumsam@mail.ru';
$phone  = '+7 (909) 547-23-25';

header('Content-Type: text/html; charset=windows-1251');

function val($key) {
    return isset($_POST[$key]) ? trim($_POST[$key]) : '';
}

// Сами определяем, в какой кодировке пришли данные.
// Старые браузеры шлют windows-1251, современные — UTF-8.
function is_utf8($s) {
    return (bool) preg_match('//u', $s);
}

// Браузер прислал контрольное слово — по нему точно видно кодировку
function detect_source_charset() {
    $probe = isset($_POST['charset_probe']) ? $_POST['charset_probe'] : '';
    if ($probe === '') {
        return 'auto';
    }
    // "рус" в UTF-8 занимает 6 байт, в windows-1251 — 3
    if (strlen($probe) >= 5) {
        return 'utf-8';
    }
    return 'windows-1251';
}

$SRC_CHARSET = detect_source_charset();

function to_utf8($s) {
    global $SRC_CHARSET;

    if ($s === '') {
        return '';
    }

    if ($SRC_CHARSET === 'utf-8') {
        return $s;
    }

    if ($SRC_CHARSET === 'windows-1251') {
        if (function_exists('iconv')) {
            $r = @iconv('windows-1251', 'UTF-8//IGNORE', $s);
            if ($r !== false && $r !== '') {
                return $r;
            }
        }
        if (function_exists('mb_convert_encoding')) {
            return mb_convert_encoding($s, 'UTF-8', 'windows-1251');
        }
        return $s;
    }

    // Уже UTF-8 и есть русские буквы — переводить не нужно
    if (is_utf8($s)) {
        if (preg_match('/[\x{0400}-\x{04FF}]/u', $s)) {
            return $s;
        }
        // Только латиница и цифры — тоже оставляем как есть
        if (!preg_match('/[\x80-\xFF]/', $s)) {
            return $s;
        }
    }

    // Иначе считаем, что это windows-1251
    if (function_exists('iconv')) {
        $r = @iconv('windows-1251', 'UTF-8//IGNORE', $s);
        if ($r !== false && $r !== '') {
            return $r;
        }
    }
    if (function_exists('mb_convert_encoding')) {
        return mb_convert_encoding($s, 'UTF-8', 'windows-1251');
    }
    return $s;
}

function len_utf8($s) {
    if (function_exists('mb_strlen')) {
        return mb_strlen($s, 'UTF-8');
    }
    return strlen(preg_replace('/[\x80-\xBF]/', '', $s));
}

$name    = to_utf8(val('Imya'));
$tel     = to_utf8(val('Telefon'));
$data    = to_utf8(val('Data'));
$paket   = to_utf8(val('Paket'));
$soobsh  = to_utf8(val('Soobshenie'));

// Простая защита от роботов: скрытое поле должно быть пустым
$trap = val('Adres2');

$digits = preg_replace('/[^0-9]/', '', $tel);

$ok    = false;
$error = '';

if ($trap !== '') {
    $error = 'Заявка не принята.';
} elseif (len_utf8($name) < 2) {
    $error = 'Пожалуйста, укажите ваше имя.';
} elseif (strlen($digits) < 10) {
    $error = 'Пожалуйста, укажите телефон полностью, с кодом города или оператора.';
} else {
    $payload = json_encode(array(
        'name'    => $name,
        'phone'   => $tel,
        'date'    => $data,
        'package' => $paket,
        'message' => $soobsh,
        'source'  => 'ретро-версия',
    ));

    if (function_exists('curl_init')) {
        $ch = curl_init($target);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
        curl_setopt($ch, CURLOPT_TIMEOUT, 15);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        $res  = curl_exec($ch);
        $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        if ($code == 200) {
            $ok = true;
        }
    }

    if (!$ok && ini_get('allow_url_fopen')) {
        $ctx = stream_context_create(array(
            'http' => array(
                'method'  => 'POST',
                'header'  => "Content-Type: application/json\r\n",
                'content' => $payload,
                'timeout' => 15,
            ),
            'ssl' => array('verify_peer' => false, 'verify_peer_name' => false),
        ));
        $res = @file_get_contents($target, false, $ctx);
        if ($res !== false) {
            $ok = true;
        }
    }

    // Если облако недоступно — отправляем письмо силами хостинга
    if (!$ok && function_exists('mail')) {
        $text = "Новая заявка с ретро-версии сайта\n\n"
              . "Имя: $name\n"
              . "Телефон: $tel\n"
              . "Дата свадьбы: " . ($data !== '' ? $data : 'не указана') . "\n"
              . "Пакет: " . ($paket !== '' ? $paket : 'не выбран') . "\n"
              . "Пожелания: " . ($soobsh !== '' ? $soobsh : 'нет') . "\n";
        $headers = "MIME-Version: 1.0\r\n"
                 . "Content-Type: text/plain; charset=UTF-8\r\n"
                 . "From: site@icebergvideo.ru\r\n";
        if (@mail($mail, '=?UTF-8?B?' . base64_encode('Заявка с ретро-версии') . '?=', $text, $headers)) {
            $ok = true;
        }
    }

    if (!$ok) {
        $error = 'Не удалось отправить заявку.';
    }
}

// --- Ответ посетителю. Всё в старой вёрстке, как на остальных страницах ---

$title   = $ok ? 'Заявка отправлена' : 'Заявка не отправлена';
$heading = $ok ? 'СПАСИБО, ЗАЯВКА ПРИНЯТА' : 'ЗАЯВКА НЕ ОТПРАВЛЕНА';

if ($ok) {
    $body = '<FONT SIZE="3" COLOR="#2E416F"><B>Ваше сообщение успешно отправлено!</B></FONT><BR><BR>'
          . 'Мы получили вашу заявку и перезвоним в течение дня, '
          . 'обсудим детали и забронируем дату.<BR><BR>'
          . 'Если нужно срочно &#151; звоните: <B>' . $phone . '</B>';
} else {
    $body = $error . '<BR><BR>'
          . 'Пожалуйста, позвоните нам по телефону <B>' . $phone . '</B> '
          . 'или напишите на <A HREF="mailto:' . $mail . '">' . $mail . '</A>.';
}

// Текст ответа собран в UTF-8, страница отдаётся в windows-1251
function to_1251($s) {
    if (function_exists('iconv')) {
        $r = @iconv('UTF-8', 'windows-1251//IGNORE', $s);
        if ($r !== false) {
            return $r;
        }
    }
    if (function_exists('mb_convert_encoding')) {
        return mb_convert_encoding($s, 'windows-1251', 'UTF-8');
    }
    return $s;
}

$title   = to_1251($title);
$heading = to_1251($heading);
$body    = to_1251($body);
?>
<HTML>
<HEAD>
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=windows-1251">
<TITLE><?php echo $title; ?> :: Айсберг-Видео</TITLE>
<META NAME="robots" CONTENT="noindex, nofollow">
<STYLE TYPE="text/css">
html, body { height: 100%; margin: 0; padding: 0;
  background-color: #F8E4DA; }
</STYLE>
<LINK REL="SHORTCUT ICON" HREF="favicon.ico">
<LINK REL="icon" HREF="favicon.ico" TYPE="image/x-icon">
</HEAD>

<BODY BGCOLOR="#F8E4DA" TEXT="#2B2A44" LINK="#C43D6E" VLINK="#8E3560" ALINK="#FF0000" BACKGROUND="img/bg2.gif" MARGINWIDTH="0" MARGINHEIGHT="0" TOPMARGIN="0" LEFTMARGIN="0" BOTTOMMARGIN="0">

<TABLE WIDTH="760" HEIGHT="100%" BORDER="0" CELLSPACING="0" CELLPADDING="0" ALIGN="CENTER">
<TR><TD VALIGN="TOP" HEIGHT="100%">

<TABLE WIDTH="760" BORDER="0" CELLSPACING="0" CELLPADDING="8" BGCOLOR="#2E416F">
<TR>
  <TD WIDTH="100%" ALIGN="CENTER">
    <FONT FACE="Arial,Helvetica" SIZE="6" COLOR="#FFFFFF"><B>АЙСБЕРГ-ВИДЕО</B></FONT><BR>
    <FONT FACE="Arial,Helvetica" SIZE="2" COLOR="#AACCEE">свадебная фото- и видеосъёмка &nbsp;|&nbsp; г. Томск</FONT>
  </TD>
</TR>
</TABLE>

<TABLE WIDTH="760" BORDER="0" CELLSPACING="1" CELLPADDING="4" BGCOLOR="#000000">
<TR>
  <TD ALIGN="CENTER" BGCOLOR="#F5D8CC"><FONT FACE="Arial" SIZE="2"><A HREF="index.html"><B>Главная</B></A></FONT></TD>
  <TD ALIGN="CENTER" BGCOLOR="#F5D8CC"><FONT FACE="Arial" SIZE="2"><A HREF="about.html"><B>О нас</B></A></FONT></TD>
  <TD ALIGN="CENTER" BGCOLOR="#F5D8CC"><FONT FACE="Arial" SIZE="2"><A HREF="foto.html"><B>Фотогалерея</B></A></FONT></TD>
  <TD ALIGN="CENTER" BGCOLOR="#F5D8CC"><FONT FACE="Arial" SIZE="2"><A HREF="price.html"><B>Цены</B></A></FONT></TD>
  <TD ALIGN="CENTER" BGCOLOR="#FFCC00"><FONT FACE="Arial" SIZE="2" COLOR="#000000"><B>Заказать</B></FONT></TD>
  <TD ALIGN="CENTER" BGCOLOR="#F5D8CC"><FONT FACE="Arial" SIZE="2"><A HREF="kontakt.html"><B>Контакты</B></A></FONT></TD>
</TR>
</TABLE>

<BR>
<TABLE WIDTH="760" BORDER="0" CELLSPACING="0" CELLPADDING="4">
<TR><TD BGCOLOR="#2E416F"><FONT FACE="Arial" SIZE="3" COLOR="#FFFFFF"><B>&nbsp;<?php echo $heading; ?></B></FONT></TD></TR>
</TABLE>
<BR>

<TABLE WIDTH="760" BORDER="0" CELLSPACING="0" CELLPADDING="10" BGCOLOR="#FDF1EB">
<TR><TD><FONT FACE="Arial" SIZE="2">
<?php echo $body; ?>
</FONT></TD></TR>
</TABLE>

<BR>
<TABLE WIDTH="760" BORDER="0" CELLSPACING="0" CELLPADDING="4" BGCOLOR="#FDF1EB">
<TR>
  <TD ALIGN="LEFT"><FONT FACE="Arial" SIZE="2"><A HREF="zakaz.html">&lt;&lt; Вернуться к форме</A></FONT></TD>
  <TD ALIGN="RIGHT"><FONT FACE="Arial" SIZE="2"><A HREF="index.html">На главную &gt;&gt;</A></FONT></TD>
</TR>
</TABLE>

</TD></TR>
<TR><TD VALIGN="BOTTOM" HEIGHT="1">
<TABLE WIDTH="760" BORDER="0" CELLSPACING="0" CELLPADDING="8" BGCOLOR="#2E416F">
<TR>
  <TD ALIGN="CENTER"><FONT FACE="Arial" SIZE="1" COLOR="#FFFFFF">
    <A HREF="index.html"><FONT COLOR="#FFCC00">Главная</FONT></A> |
    <A HREF="about.html"><FONT COLOR="#FFCC00">О нас</FONT></A> |
    <A HREF="foto.html"><FONT COLOR="#FFCC00">Фотогалерея</FONT></A> |
    <A HREF="price.html"><FONT COLOR="#FFCC00">Цены</FONT></A> |
    <A HREF="zakaz.html"><FONT COLOR="#FFCC00">Заказать</FONT></A> |
    <A HREF="kontakt.html"><FONT COLOR="#FFCC00">Контакты</FONT></A>
    <BR><BR>
    Copyright &copy; 2026 Siberia Art Ltd. Все права защищены.<BR>
    Тел: +7 (909) 547-23-25 &nbsp;|&nbsp; E-mail: daumsam@mail.ru
  </FONT></TD>
</TR>
</TABLE>

</TD></TR>
</TABLE>

</BODY>
</HTML>
