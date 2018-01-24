$(function(){
    $(window).on('load',function(){ //监听窗体加载事件
        imgLoaction(); //图片布局
        var dataImg={'data':[
            {'src':'1.jpg','name':'范冰冰'},
            {'src':'2.jpg','name':'吴彦祖'},
            {'src':'3.jpg','name':'张三'},
            {'src':'4.jpg','name':'李四'},
            {'src':'5.jpg','name':'王五'},
            {'src':'6.jpg','name':'赵六'},
            {'src':'7.jpg','name':'王二麻'},
            {'src':'8.jpg','name':'张全蛋'},
            {'src':'9.jpg','name':'达娃'},
            {'src':'10.jpg','name':'小兵'}
        ]}; //模拟网络传输过来的JSON数据

        $(window).scroll(function(){ //监听滚动事件;
            if(scrollside()){ //满足条件加载
                $.each(dataImg.data,function(index,value){ //遍历数组集合 索引和值
                    var box=$('<div>').addClass('box').appendTo($('#container')); //jQuery动态创建div 添加class （box）
                    var content=$('<div>').addClass('content').appendTo(box); //jQuery动态创建div
                    //console.log('.img/'+$(value).attr('src'));//打印测试;
                    $('<img>').attr('src','img/'+$(value).attr('src')).appendTo(content); //jQuery动态创建img
                    $('<p>').html($(value).attr('name')).appendTo(content); //jQuery动态创建p
                });
                imgLoaction(); //再进行一次图片布局
            }
        });

    })
})

function scrollside(){ //图片滚动加载
    var box=$('.box'); //获取盒子对象
    var lastboxHeight=box.last().get(0).offsetTop+Math.floor(box.last().height()/2); //判断最后一张图片的高度加最后一张图片的高度，
    var documentHeight=$(document).height(); //获取窗体的高度
    var scrollHeight=$(window).scrollTop(); //获取滚动条滚动的距离（鼠标滚动的距离）
    return (lastboxHeight<scrollHeight+documentHeight)?true:false; //如果滚动的距里大于 则返回true
}

function imgLoaction(){ //图片布局fun
    var box=$('.box'); //获取盒子对象
    var boxWidth = box.eq(0).width(); //获取第一个盒子的宽度，因为没用过图片宽度都是一样的所以随便哪一个都可以
    var num=Math.floor($(window).width()/boxWidth); //统计一行可以显示多少个box盒子 向下取整
    var boxArr=[]; //定义数组，用来存储盒子的高度，为了获取当前最小盒子额高度
    box.each(function(index,value){ //遍历（索引和obj）
        //console.log(index +'----- '+ value); //打印测试;
        var boxHeigth = box.eq(index).height(); //获取到没用过盒子的高度；
        if(index<num){ //第一行的图片
            boxArr[index]=boxHeigth; //第一行每一个盒子的高度 存入数组
            //console.log(boxHeigth);//打印测试;
        }else{ //除了第一行
            var minboxHeigth=Math.min.apply(null,boxArr); //获取第一行最小盒子的高度 
            //Math.min.apply(null,arr)其中第一个参数null，这个是因为没有对象去调用这个方法，所以直接传递null过去。或者 Math.min(...boxArr)
            //console.log(minboxHeigth);//打印测试;
            var minboxIndex=$.inArray(minboxHeigth,boxArr); //最小盒子的索引 $.inArray( value, array [, fromIndex ] )
            //console.log(minboxIndex);//打印测试;
            //console.log(value);//打印测试;
            $(value).css({ //jquery对象 修改css
                'position':'absolute', //绝对布局
                'top':minboxHeigth, //top 为最小图片的高度
                'left':box.eq(minboxIndex).position().left //最小图片的做左边距
            });
            boxArr[minboxIndex]+=box.eq(index).height();//重新计算一列的高度 注意是+=
        }
    });
}