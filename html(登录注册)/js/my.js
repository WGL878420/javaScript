$(function(){
    //登录--输入用户名失去焦点检查用户名是否合法
    $('#log_name').blur(function(){
        var name=$(this).val();
        if(name.length==0){ //如果用户没有输入用户名
            addP($(this));  //删除标签
            return false; 
        }
        if(!checkname(name)){ //检查用户输入的用户名是否合法
            addP($(this),'error','用户名不合法'); //添加不合法提示
            return false;
        }
        addP($(this)); //如果用户输入了用户名，并且合法
    });

    //登录--输入密码失去焦点检查密码是否合法
    $('#log_pwd').blur(function(){
        var pwd=$(this).val();
        if(pwd.length==0){ //如果用户没有输入密码
            addP($(this));  //删除标签
            return false; 
        }
        if(!checkpwd(pwd)){ //检查用户输入的密码是否合法
            addP($(this),'error','密码不合法'); //添加不合法提示
            return false;
        }
        addP($(this)); //如果用户输入了密码，并且合法
    });

    //注册-获得焦点告诉用户用户名填写格式(执行一次)
    $('#add_name').one('focus',function(){
        tip($(this),'name');
    });

    //注册-获得焦点告诉用户密码填写格式(执行一次)
    $('#add_pwd').one('focus',function(){
        tip($(this),'pwd');
    });

    //注册-获得焦点告诉用户第二次密码填写格式(执行一次)
    $('#add_pwds').one('focus',function(){
        tip($(this),'pwds');
    });

    //注册-绑定输入用户名事件
    $('#add_name').on('input',function(){
        var name=$(this).val();//获取用户输入的用户名
        if(name.length==0){ //如果用户清空了输入内容，提示用户用户名格式
            tip($(this),'name');
            return false;
        }
        if(checkname(name)){ //用户输入的用户名格式正确 再进行判断用户名是否存在
            addP($(this));//删除p标签提示
            $.post('http://localhost:8080/wxhwxhwxh.php',{"user": name },function(data){
                if(data=="存在"){
                    addP($('#add_name'),'error','该用户名已经被注册！换一个试试！！');
                }else{
                    addP($('#add_name'),'success','这个用户名可以使用！赶快注册吧！！');
                }
            })
        }else{
            addP($(this),'error','用户名格式不对');
        }
    });
    
    //注册-绑定输入密码事件
    $('#add_pwd').on('input',function(){
        var pwd=$(this).val();//获取用户输入的密码
        if(pwd.length==0){ //如果用户清空了输入内容，提示用户密码格式
            tip($(this),'pwd');
            return false;
        }
        if(!checkpwd(pwd)){
            addP($(this),'error','密码格式不对');
            return false;
        }
        addP($(this));
    });

    //注册-绑定输入第二遍密码是否一样
    $('#add_pwds').on('input',function(){
        var pwd=$('#add_pwd').val();//获取第一次输入的密码
        var pwds=$(this).val();//获取第二次输入的密码
        if(pwds.length==0){ //如果用户清空了输入内容，提示用户第二次密码
            tip($(this),'pwds');
            return false;
        }
        if(pwd.length==0){
            addP($(this),'error','请先输入上面的密码');
            return false;  //结束函数
        }
        if(pwds!=pwd){
            addP($(this),'error','两次输入的密码不一致');
            return false; //结束函数
        }
        addP($(this));
    });

});


function tip(obj,tip){
    if(tip=='name'){
        addP(obj,'success','由字母开头、数字、下划线组成(长度5-10)');  //添加标签
    }
    if(tip=='pwd'){
        addP(obj,'success','由字母开头、数字、下划线组成(长度6-16)');  //添加标签
    }
    if(tip=='pwds'){
        addP(obj,'success','重复一边上面输入的密码');  //添加标签
    }
}

//检查用户名
function checkname(name){
    if (arguments.length==1){
        //(字母开头，允许5-10字节，允许字母数字下划线)
        var flag=/^[a-zA-Z][a-zA-Z0-9_]{4,9}$/;//正则表达式
        return flag.test(name);
    }
}
//检查密码
function checkpwd(pwd){
    if (arguments.length==1){
        //以字母开头，长度在6~16之间，只能包含字符、数字和下划线
        var flag=/^[a-zA-Z]\w{5,15}$/;//正则表达式
        return flag.test(pwd);
    }
}

//添加提示
function addP(obj,type,tip){
    if(arguments.length==1){ //判断传入的参数就一个的时候
        obj.next('.tip').remove(); //先删除该元素后面的tip标签
        obj.removeClass('bod'); //删除class
        return false; //结束函数
    }
    if(arguments.length!=3){ //判断传入的参数个数不为3个时候
        return false; //结束函数
    }
    if(typeof(obj)!='object'){ //如果第一个参数不是obj 返回false
        return false;
    }
    obj.next('.tip').remove(); //先删除该元素后面的tip标签
    type=type=='success'?type:'error'; //提示类型
    if(type=='error'){
        obj.addClass('bod')
    }else{
        obj.removeClass('bod')
    }
    $('<p>',{
        text:tip,
        class:'tip '+ type
    }).insertAfter(obj) //添加标签到位置
}