$(function(){
    $('#box ol li').mouseover(function(event){
        var index=$(this).index(); //获取当前的索引号
        $('#box ul li').eq(index).fadeIn().siblings().hide();
        $(this).addClass('courrent').siblings().removeClass('courrent');
        });
});