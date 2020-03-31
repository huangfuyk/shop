;(function($){
    "use strict";

    // $.fn.banner = function(){}
    $.fn.extend({
        banner:function(ops){
            var cont = this;
            // 1.默认参数的处理
            ops.list = ops.list === false ? false : true;
            ops.autoPlay = ops.autoPlay === false ? false : true;
            ops.delayTime = ops.delayTime || 2000;
            ops.moveTime = ops.moveTime || 200;

            class ImgMove{
                constructor(ops){
                    this.child = ops.img;
                    this.left = ops.left;
                    this.right = ops.right;
                    this.list = ops.list;
                    this.delayTime = ops.delayTime;
                    this.moveTime = ops.moveTime;
                    this.autoPlay = ops.autoPlay;

                    this.iNow = 0;
                    this.iPrev = ops.img.length-1;

                    this.addEvent();
                    // 根据参数决定是否创建list
                    if(this.list){
                        this.createList();
                    }

                    // 根据参数决定是否自动播放
                    if(this.autoPlay){
                        this.autoPlayStart();
                    }
                }
                autoPlayStart(){
                    clearInterval(t);
                    var t = setInterval(()=>{
                        this.changeIndex(1);
                    },this.delayTime);
        
                    var that = this;
                    cont.hover(function(){
                        clearInterval(t);
                    },function(){
                        clearInterval(t);
                        t = setInterval(()=>{
                            that.changeIndex(1);
                        },that.delayTime)
                    })
                }
                createList(){
                    var str = ``;
                    for(var i=0;i<this.child.length;i++){
                        // 圆点内无数字
                        str += `<span index='${i}'> </span>`;
                        // 圆点内有数字
                        // str += `<span index='${i}'>${i+1}</span>`;
                    }

                    $(`<div class='list'>${str}</div>`).appendTo(cont);

                    this.setActive();
                }
                setActive(){
                    cont.find(".list").children("span").eq(this.iNow).addClass("active").siblings().removeClass("active");
                }
                addEvent(){
                    var that = this;
                    // 判断左右按钮是否存在
                    if(
                        this.left !== undefined &&
                        this.left.length > 0 &&
                        this.right !== undefined && 
                        this.right.length > 0
                    ){
                        this.left.on("click",function(){
                            that.changeIndex(-1);
                        })
                        this.right.on("click",function(){
                            that.changeIndex(1);
                        })
                    }

                    cont.on("click",".list span",function(){
                        // console.log(this);
                        that.listChangeIndex(this);
                    })
                }
                listChangeIndex(tar){
                    if($(tar).index() > this.iNow){
                        this.listMove(1,$(tar).index());
                    }
                    if($(tar).index() < this.iNow){
                        this.listMove(-1,$(tar).index());
                    }
                    this.iNow = $(tar).index();

                    this.setActive();
                }
                listMove(direct,index){
                    this.child.eq(this.iNow).css({
                        left:0
                    }).stop().animate({
                        left:-this.child.eq(0).width() * direct
                    },this.moveTime).end().eq(index).css({
                        left:this.child.eq(0).width() * direct
                    }).stop().animate({
                        left:0
                    },this.moveTime)
                }

                changeIndex(direct){
                    if(direct == -1){
                        if(this.iNow == 0){
                            this.iNow = this.child.length-1;
                            this.iPrev = 0;
                        }else{
                            this.iNow--;
                            this.iPrev = this.iNow + 1;
                        }
                    }else{
                        if(this.iNow == this.child.length-1){
                            this.iNow = 0;
                            this.iPrev = this.child.length-1;
                        }else{
                            this.iNow++;
                            this.iPrev = this.iNow - 1;
                        }
                    }
                    this.move(direct);
                }
                move(direct){
                    this.child.eq(this.iPrev).css({
                        left:0
                    }).stop().animate({
                        left:-this.child.eq(0).width() * direct
                    },this.moveTime).end().eq(this.iNow).css({
                        left:this.child.eq(0).width() * direct
                    }).stop().animate({
                        left:0
                    },this.moveTime)

                    this.setActive();
                }
            }

            new ImgMove(ops);
            
        }
    })

})(jQuery);