<?php
    header("Access-Control-Allow-Origin: *"); //这个是 服务器开放全部权限, 出于服务器安全不建议使用 这里测试我们使用  不用这个 就会涉及到跨域问题
    //sleep(3); //暂停3秒后执行,方便前端查看异步和同步区别
    $data=array('aaa','bbb','ccc','wxh'); //模拟数据查询到的id
    ////跨域实例代码
    // for($i=0;$i<sizeof($data);$i++){  //for循环遍历数组
    //     if( isset($_REQUEST['user']) && $data[$i]==$_REQUEST['user']){  //获取请求过来的参数遍历数组判断有没有重复项
    //         exit("fn1('用户名存在')");  //如果检查到一个重复就直接输出存在，并退出不执行下面的循环
    //     }
    // }
    // echo "fn1('用户不存在')"; //如果上面遍历结束后还没有重复，输出id不存在

    ////请求实例代码
    for($i=0;$i<sizeof($data);$i++){  //for循环遍历数组
        if( isset($_REQUEST['user']) && $data[$i]==$_REQUEST['user']){  //获取请求过来的参数遍历数组判断有没有重复项
            exit("存在");  //如果检查到一个重复就直接输出存在，并退出不执行下面的循环
        }
    }
    echo "不存在"; //如果上面遍历结束后还没有重复，输出id不存在