<?php
error_reporting(E_ALL);
$dir = "./uploads/";
$date = date('YmdHis');

$input_data = file_get_contents('php://input');
if (TRUE == empty($input_data))
	echo 'empty input';
$file_data = base64_decode($input_data);
if (FALSE == $file_data)
	echo "base64 decode failed";
$tmpfname = tempnam("/tmp", "UPD");
$handle = fopen($tmpfname, 'wb');
flock($handle, LOCK_EX);
fwrite($handle, $input_data);
flock($handle, LOCK_UN);
fclose($handle);

$finfo = finfo_open(FILEINFO_MIME_TYPE);
$file_type = finfo_file($finfo, $tmpfname);
finfo_close($finfo);
$file_size = filesize($tmpfname);

    if ($file_type == 'image/png')
	$extension = '.png';
    elseif ($file_type == 'image/jpeg')
        $extension = '.jpg';
    elseif ($file_type == 'text/plain')
        $extension = '.txt';
    elseif ($file_type == 'application/msword')
        $extension = '.doc';
    elseif ($file_type == 'application/vnd.msword.document.12')
        $extension = '.docx';
    elseif ($file_type == 'application/pdf')
        $extension = '.pdf';
    else
        $extension = '.jpg';
    $destination = get_destination($dir, $date, basename($tmpfname), $extension, $file_size);
    echo $destination;
    $xx = rename($tmpfname, $destination);
    if ($xx) {
        echo $destination . ' successful ' . $file_size;
    } else {
        echo 'move uploaded file failed';
    }

function get_destination($dir, $date, $prefix, $extension, $size) {
    
    if (!is_dir($dir)) {
        mkdir($dir);
        return $dir . $prefix . $extension;
    }
    else if (!is_file($dir . $prefix . $extension) && !is_file($dir . $prefix . strtoupper($extension))) {
        return $dir . $prefix . $extension;
    }
    else if ($dh = opendir($dir)) {
        $get_postfix = array();
        $expect_postfix = 1;
        while (($file = readdir($dh)) !== FALSE) {
            if ($file != "." && $file != ".." && (strcasecmp(substr($file, -4), $extension) == 0)) {
                if (($pos = strrpos($file, "_")) !== FALSE) {
                    if (substr($file, 0, $pos) == $prefix) {
                        $postfix = substr($file, $pos+1, strlen($file)-$pos-5);
                        if (!in_array(intval($postfix))) {
                            $get_postfix[] = intval($postfix);
                        }
                    }
                }
            }
        }
        sort($get_postfix);
        foreach ($get_postfix as $v) {
            if ($expect_postfix == $v) {
                $expect_postfix = $expect_postfix + 1;
            } else {
                break;
            }
        }
        closedir($dh);
        return $dir . $prefix . "_" . $expect_postfix . $extension;
    }
}
