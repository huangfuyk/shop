var imgs = document.querySelectorAll(".lazy");
    var clientH = document.documentElement.clientHeight;

    lazyImg(imgs);

    onscroll = function(){
        lazyImg(imgs);
    }

    function lazyImg(elems){
        var arr = Array.from(elems);
        var scrollT = document.documentElement.scrollTop;
        for(var i=0;i<arr.length;i++){
            if(arr[i].offsetTop + 100 < clientH + scrollT){
                arr[i].src = arr[i].getAttribute("data-src");
                // 如果图片已经加载好了，那么就将这个元素，从数组中剔除掉
                arr.splice(i,1);
                // 因为在数组的遍历中，改变了数组的长度，为了能继续正常拿到数组的其他数据，要根据情况实际修改i的值
                i--;
            }
        }
    }