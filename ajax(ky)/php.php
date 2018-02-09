<?php
 $a=array('name'=>'wxh','age'=>'21','email'=>'wxh16144@qq.com');
 $a=json_encode($a); //数组转换为json数据
 echo isset($_GET['callback'])?$_GET['callback'].'('.$a.')':$a; //输出值

