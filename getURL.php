<?php
/**
 * Created by PhpStorm.
 * User: ShiRuixin
 * Date: 2018/6/7
 * Time: 23:18
 */
error_reporting(0);
$url = $_GET['url'];
echo <<<AUDIO
   
        <source src="{$url}" type="audio/mpeg">
  
AUDIO;

?>