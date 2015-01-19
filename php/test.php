<?php
  $dir = "./uploads/";
  $extension = '.php';
  $name = 'test';
  $a = array();
//  $a[] = 1;
//  $a[] = 5;
//  $a[] = 2;
  if (in_array(2, $a)) {
     echo "ssss";
  } else { echo "dddd";}
  print_r($a);
  $expect_value = 1;
  foreach($a as $v){
    if ($v == $expect_value) {
       $expect_value = $expect_value + 1;
    } else {
       break;
    }
  }
  echo $expect_value;

?>
