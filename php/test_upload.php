<?php
error_reporting(E_ALL);
function log2file($data)
{
	if (TRUE == is_array($data))
		print_r($data);
	else
		echo $data;

	$file_id = fopen('./test_upload.log', 'ab');
	fwrite($file_id, var_export($data, TRUE));
	fwrite($file_id, "\n");
	fclose($file_id);
}

if (FALSE == empty($_GET))
	log2file($_GET);

$input_data = file_get_contents('php://input');
log2file($input_data);
$file_data = base64_decode($input_data);
$file_id = fopen('./uploads/test_upload', 'wb');
flock($file_id, LOCK_EX);
fwrite($file_id, $file_data);
flock($file_id, LOCK_UN);
fclose($file_id);

$fp = fopen("./uploads/test_upload", "rb");
$fstat = fstat($fp);
fclose($fp);
print_r(array_slice($fstat, 13));

$finfo = finfo_open(FILEINFO_MIME_TYPE);
echo finfo_file($finfo, './uploads/test_upload');
finfo_close($finfo);

