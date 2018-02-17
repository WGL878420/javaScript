$(function(){
   
    //登录--输入用户名失去焦点检查用户名是否合法
    $('#log_name').blur(function(){
        log_inputname($(this));
    });

    //登录--输入密码失去焦点检查密码是否合法
    $('#log_pwd').blur(function(){
        log_inputpwd($(this));
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
        add_inputname($(this)); //一个参数异步
    });
    
    //注册-绑定输入密码事件
    $('#add_pwd').on('input',function(){
        add_inputpwd($(this));
    });
    
    //注册-绑定输入第二遍密码是否一样
    $('#add_pwds').on('input',function(){
        add_inputpwds($('#add_pwd'),$(this));
    });

    //注册-点击注册按钮开始注册
    $('#add_btn').on('click',function(){
        var name= $('#add_name') //获取用户输入的name
        var pwd= $('#add_pwd') //获取用户输入的密码
        var pwds= $('#add_pwds')//获取用户输入的第二次密
        if(add_inputpwds(pwd,pwds) && add_inputpwd(pwd)){
            add_inputname(name,'null');
            if(ajaxflag){
                alert('全部验证通过，可以提交注册了');//通过所有验证 可以进行数据提交注册

                    //这里添加你的ajax吧用户输入的数据提交到你的数据库进行提交

                remove_add_input();//清空注册用户输入的内容
            }
        }
    });

    //登录-用户点击登录按钮
    $('#log_btn').on('click',function(){
        var objname=$('#log_name'); //获取用户输入的用户名
        var objpwd=$('#log_pwd'); //获取用户输入的密码
        if( log_inputname(objname) && log_inputpwd(objpwd)){
            alert('全部验证通过，可以提交登录了');//通过所有验证 可以进行数据提交登录

                //这里添加你的ajax判断用户输入的用户和和密码是否可用登录

            remove_log_input();//清空登录用户输入的内容
        }
    })

});

var ajaxflag=false; //用来判断用户名是否存在

//清空登录用户输入的数据
function remove_log_input(){
    $('#log_name').val('');
    $('#log_pwd').val(''); 
}

//清空注册用户的输入框
 function  remove_add_input(){
    ajaxflag=false;
    $('#add_name').val(''); //获取用户输入的name
    pwd= $('#add_pwd').val(''); //获取用户输入的密码
    pwds= $('#add_pwds').val('');
}


//同步或者异步判断用户名是否存在
function add_inputname(obj,bool){ //如果是一个参数是异步，如果两个值是同步
    if(obj.val().length==0){ //如果用户清空了输入内容，提示用户用户名格式
        tip(obj,'name'); //给出默认提示
        return false;
    }
    if(checkname(obj.val())){ //用户输入的用户名格式正确 再进行判断用户名是否存在
    addP(obj);//删除p标签提示
        $.ajax({
            async:!arguments[1], //一个参数异步 两个参数是同步
            url:'http://localhost:8080/wxhwxhwxh.php',  //自己写一个用户提交过来的用户名判断是否存在
            type:'post', //请求方式
            data:{"user": obj.val() }, //请求过去的参数
            dataType:'text',  //返回类型
            beforeSend:function(){
                $('#add_btn').attr('disabled',true); //禁用用户按钮，防止重复提交
            }, //请求前函数 
            success:function(data){  //请求成功后
                $('#add_btn').attr('disabled',false); //解除按钮禁用
                if(data=='存在'){
                    addP($('#add_name'),'error','该用户名已经被注册！换一个试试！！');  //给用户提示
                    ajaxflag=false;  //用户名存在 不可以用
                }else{
                    addP($('#add_name'),'success','这个用户名可以使用！赶快注册吧！！'); //给用户提示
                    ajaxflag=true;  //用户名不存在可以用
                }
            }
        })
    }else{
        addP(obj,'error','用户名格式不对');  //显示你对用户的提示
    }    
}

//注册--告诉用户第一次密码错误信息
function add_inputpwd(obj){
    if(obj.val().length==0){ //如果用户清空了输入内容，提示用户密码格式
        tip(obj,'pwd');
        return false;
    }
    if(!checkpwd(obj.val())){
        addP(obj,'error','密码格式不对');
        return false;
    }
    addP(obj);
    return true;
}

//注册--告诉用户第二次密码错误信息
function add_inputpwds(pwd,pwds){
    if(pwds.val().length==0){ //如果用户清空了输入内容，提示用户第二次密码
        tip(pwds,'pwds');
        return false;
    }
    if(pwd.val().length==0){
        addP(pwds,'error','请先输入上面的密码');
        return false;  //结束函数
    }
    if(pwds.val()!=pwd.val()){
        addP(pwds,'error','两次输入的密码不一致');
        return false; //结束函数
    }
    addP(pwds);
    return true;
}

//登录--告诉用户错误信息(用户名)
function log_inputname(obj){
    if(obj.val().length==0){ //如果用户没有输入用户名
        addP(obj);  //删除标签
        return false; 
    }
    if(!checkname(obj.val())){ //检查用户输入的用户名是否合法
        addP(obj,'error','用户名不合法'); //添加不合法提示
        return false;
    }
    addP(obj); //如果用户输入了用户名，并且合法
    return true;
};

//登录--告诉用户错误信息(密码)
function log_inputpwd(obj){
    if(obj.val().length==0){ //如果用户没有输入密码
        addP(obj);  //删除标签
        return false; 
    }
    if(!checkpwd(obj.val())){ //检查用户输入的密码是否合法
        addP(obj,'error','密码不合法'); //添加不合法提示
        return false;
    }
    addP(obj); //如果用户输入了密码，并且合法
    return true;
};

//告诉用户名填写格式
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
};

//检查用户名是否合法
function checkname(name){
    if (arguments.length==1){
        //(字母开头，允许5-10字节，允许字母数字下划线)
        var flag=/^[a-zA-Z][a-zA-Z0-9_]{4,9}$/;//正则表达式
        return flag.test(name);
    }
};

//检查密码是否合法
function checkpwd(pwd){
    if (arguments.length==1){
        //以字母开头，长度在6~16之间，只能包含字符、数字和下划线
        var flag=/^[a-zA-Z]\w{5,15}$/;//正则表达式
        return flag.test(pwd);
    }
};

//添加提示信息
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
};