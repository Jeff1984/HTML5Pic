<?php
error_reporting(E_ALL);
$dir = "./uploads/";
$extension = ".jpg";
if (isset($_FILES['myFile'])) {
  // Example:
    $destination = get_destination($dir, $_FILES['myFile']['name'], $extension);
    $xx = move_uploaded_file($_FILES['myFile']['tmp_name'], $destination);
    if ($xx) {       
        echo $destination;
        echo 'successful';
    } else {
        echo 'move uploaded file failed';
    }
} else {
    echo 'upload failed';
}

function get_destination($dir, $prefix, $extension) {
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
?>
