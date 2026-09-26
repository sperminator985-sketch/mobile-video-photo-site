<?php
/*
 * Приём заявки с ретро-версии сайта.
 *
 * Сам файл написан в UTF-8. Данные из формы приходят в windows-1251
 * (старые браузеры) или в UTF-8 (современные) — определяем автоматически.
 * Готовая страница отдаётся посетителю в windows-1251.
 */

$target = 'https://functions.poehali.dev/2c609e31-a278-4787-9035-9753fda9bb86';
$mail   = 'daumsam@mail.ru';
$phone  = '+7 (909) 547-23-25';

function val($key) {
    return isset($_POST[$key]) ? trim($_POST[$key]) : '';
}

/* Контрольное слово из формы показывает кодировку:
   "рус" в windows-1251 занимает 3 байта, в UTF-8 — 6 */
$probe = val('charset_probe');
$src_is_utf8 = (strlen($probe) >= 5);

function to_utf8($s) {
    global $src_is_utf8;

    if ($s === '' || $src_is_utf8) {
        return $s;
    }
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

$name   = to_utf8(val('Imya'));
$tel    = to_utf8(val('Telefon'));
$data   = to_utf8(val('Data'));
$paket  = to_utf8(val('Paket'));
$soobsh = to_utf8(val('Soobshenie'));

$trap   = val('Adres2');
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
    $fields = array(
        'name'    => $name,
        'phone'   => $tel,
        'date'    => $data,
        'package' => $paket,
        'message' => $soobsh,
        'source'  => 'ретро-версия',
    );

    $payload = json_encode($fields);

    // Если что-то пошло не так с кодировкой — собираем JSON вручную
    if ($payload === false || $payload === 'null') {
        $parts = array();
        foreach ($fields as $k => $v) {
            $v = str_replace(array('\\', '"', "\r", "\n"), array('\\\\', '\"', '', ' '), $v);
            $parts[] = '"' . $k . '":"' . $v . '"';
        }
        $payload = '{' . implode(',', $parts) . '}';
    }

    if (function_exists('curl_init')) {
        $ch = curl_init($target);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'Content-Type: application/json; charset=utf-8',
            'Content-Length: ' . strlen($payload),
        ));
        curl_setopt($ch, CURLOPT_TIMEOUT, 20);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 6);
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
                'header'  => "Content-Type: application/json; charset=utf-8\r\n",
                'content' => $payload,
                'timeout' => 20,
            ),
            'ssl' => array('verify_peer' => false, 'verify_peer_name' => false),
        ));
        $res = @file_get_contents($target, false, $ctx);
        if ($res !== false) {
            $ok = true;
        }
    }

    // Запасной путь: письмо силами хостинга
    if (!$ok && function_exists('mail')) {
        $text = "Новая заявка с ретро-версии сайта\n\n"
              . "Имя: $name\n"
              . "Телефон: $tel\n"
              . "Дата свадьбы: " . ($data !== '' ? $data : 'не указана') . "\n"
              . "Пакет: " . ($paket !== '' ? $paket : 'не выбран') . "\n"
              . "Пожелания: " . ($soobsh !== '' ? $soobsh : 'нет') . "\n";
        $headers = "MIME-Version: 1.0\r\n"
                 . "Content-Type: text/plain; charset=UTF-8\r\n"
                 . "Content-Transfer-Encoding: 8bit\r\n"
                 . "From: site@icebergvideo.ru\r\n";
        $subj = '=?UTF-8?B?' . base64_encode('Заявка с ретро-версии') . '?=';
        if (@mail($mail, $subj, $text, $headers)) {
            $ok = true;
        }
    }

    if (!$ok) {
        $error = 'Не удалось отправить заявку.';
    }
}

$heading = $ok ? 'СПАСИБО, ЗАЯВКА ПРИНЯТА' : 'ЗАЯВКА НЕ ОТПРАВЛЕНА';
$title   = $ok ? 'Заявка отправлена' : 'Заявка не отправлена';

if ($ok) {
    $body = '<FONT SIZE="4" COLOR="#2E416F"><B>Ваше сообщение успешно отправлено!</B></FONT><BR><BR>'
          . 'Мы получили вашу заявку и перезвоним в течение дня, '
          . 'обсудим детали и забронируем дату.<BR><BR>'
          . 'Если нужно срочно &#151; звоните: <B>' . $phone . '</B>';
} else {
    $body = '<FONT SIZE="3" COLOR="#C43D6E"><B>' . $error . '</B></FONT><BR><BR>'
          . 'Пожалуйста, позвоните нам по телефону <B>' . $phone . '</B> '
          . 'или напишите на <A HREF="mailto:' . $mail . '">' . $mail . '</A>.';
}

// Всё, что ниже, собрано в UTF-8 и переводится в windows-1251 один раз, на выходе
ob_start();
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
<?php
$html = ob_get_clean();

if (function_exists('iconv')) {
    $out = @iconv('UTF-8', 'windows-1251//TRANSLIT//IGNORE', $html);
    if ($out !== false && $out !== '') {
        $html = $out;
    }
} elseif (function_exists('mb_convert_encoding')) {
    $html = mb_convert_encoding($html, 'windows-1251', 'UTF-8');
}

header('Content-Type: text/html; charset=windows-1251');
header('Content-Length: ' . strlen($html));
echo $html;
