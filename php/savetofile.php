<?php
if (isset($_FILES['myFile'])) {
    // Example:
    $xx = move_uploaded_file($_FILES['myFile']['tmp_name'], "./uploads/" . $_FILES['myFile']['name']);
    if ($xx) {       
        echo $_FILES['myFile']['name'];
        echo 'successful';
    } else {
        echo 'move uploaded file failed';
    }
} else {
    echo 'upload failed';
}
?>
