var timeimg; // 图片定时器
$(function(){  //窗体加载完成后执行
    
    mouse();

    time();

    after();

});


function mouse() {  //鼠标经过小滑块  显示对应的图片
    $('#box ol li').mouseover(function (event) {
        var index = $(this).index(); //获取当前的索引号
        mod($('#box ul li').eq(index),$(this));
    });
}

function time() {
    var index=-1;
    $('ol li').each(function(k,value){  //遍历当前循环到第几张图片
        if($(value).attr('class')=='courrent'){ //判断如果图片的calss是否为courrent
            index=k; //添加索引
            return false; //结束遍历
        }
    });

    timeimg=setInterval(function () {
        index++
        if(index>=$('#box ul li').length){index=0};
        mod($('#box ul li').eq(index),$('#box ol li').eq(index));
    },1000);
}

function after(){  //鼠标停留在在上面 停止 移开继续
    $('#box').mouseover(function(){
        clearInterval(timeimg);
    });
    
    $('#box').mouseout(function(){
        time();
    });
}

function mod(a,b){   //修改项目
   a.fadeIn().siblings().hide();
   b.addClass('courrent').siblings().removeClass('courrent');
}