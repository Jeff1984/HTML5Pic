<?php
error_reporting(E_ALL);
$dir = "./uploads/";
$date = date('YmdHis');
if (isset($_FILES['myFile'])) {
  // Example:
    if ($_FILES['myFile']['type'] == 'image/png' || $_FILES['myFile']['type'] == 'image/jpeg') {
        $extension = '.jpg';
    } else if ($_FILES['myFile']['type'] == 'text/plain'){
        $extension = '.txt';
    }
    else if ($_FILES['myFile']['type'] == 'application/msword') {
        $extension = '.doc';
    }
    else if ($_FILES['myFile']['type'] == 'application/vnd.msword.document.12') {
        $extension = '.docx';
    }
    else if ($_FILES['myFile']['type'] == 'application/pdf') {
        $extension = '.pdf';
    }	
    else {
        $extension = '.jpg';
    }
    $destination = get_destination($dir, $date, $_FILES['myFile']['name'], $extension, $_FILES['myFile']['size']);
    echo $destination;
    $xx = move_uploaded_file($_FILES['myFile']['tmp_name'], $destination);
    if ($xx) {
        echo $destination . ' successful ' . $_FILES['myFile']['size'];
    } else {
        echo 'move uploaded file failed';
    }
} else {
    echo 'upload failed';
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
/**
    $subdir = substr($date, 0, 8);
    $suffix = md5($prefix . $size . mktime());
    if (!is_dir($dir)) {
        mkdir($dir);
        mkdir($dir . $subdir . '/');
    }
    else if (!is_dir($dir . $subdir . '/')) {
        mkdir($dir . $subdir . '/');
    }

    return $dir . $subdir . '/' . $prefix . '_' . $suffix . $extension;
**/
}
?>
