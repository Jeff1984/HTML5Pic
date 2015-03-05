<?php
  $dir = "./uploads/";
  $date = date('YmdHis');

function get_destination($dir, $date, $prefix, $extension, $size) {
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

}

echo get_destination($dir, $date, 'blob', '.txt', 128);

?>
