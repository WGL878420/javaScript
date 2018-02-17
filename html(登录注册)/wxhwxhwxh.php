<?php
$bool=(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH'])=='xmlhttprequest'); //判断是否为ajax请求
if($bool){
    //sleep(3); //暂停3秒后执行,方便前端查看异步和同步区别
    $data=array('aaaaa','bbbbbb','cccccc','wxhwxh'); //模拟数据查询到的id
    for($i=0;$i<sizeof($data);$i++){  //for循环遍历数组
        if( isset($_REQUEST['user']) && $data[$i]==$_REQUEST['user']){  //获取请求过来的参数遍历数组判断有没有重复项
            exit('存在');  //如果检查到一个重复就直接输出存在，并退出不执行下面的循环
        }
    }
echo '不存在'; //如果上面遍历结束后还没有重复，输出id不存在
}else{
    echo '请用GET,或POST请求这个页面'; //提醒用户
    header("Refresh:3;url=test.html"); //不是ajax请求跳转到静态页test.html
}
