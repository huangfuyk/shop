// 当前ajax封装完成之后的调用方式：
// var p1 = ajax({
//     type:"get",
//     url:"",
//     data:{
//         user:"admin",
//         pass:123
//     }
// })
// p1.then(function(res){
//     console.log(res)
// })
// p1.catch(function(res){
//     console.log(res)
// })


// ajax函数自身执行的时候不再接收成功和失败的处理函数了
// 交给ajax内部封装的promise处理


// 封装过程
function ajax(ops){
    ops.type = ops.type || "get";
    ops.data = ops.data || {};
    var str = "";
    for(var key in ops.data){
        str += `${key}=${ops.data[key]}&`;
    }
    if(ops.type=="get"){
        let t = new Date().getTime();
        ops.url = ops.url + "?" + str + "__qft="+ t;
    }
    var xhr = new XMLHttpRequest();
    xhr.open(ops.type, ops.url);
    if(ops.type == "get"){
        xhr.send();
    }else{
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xhr.send(ops.data);
    }
    return new Promise(function(resolve,reject){
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4 && xhr.status === 200){
                resolve(xhr.responseText);
            }else if(xhr.readyState === 4 && xhr.status !== 200){
                reject("请求失败，原因为：" + xhr.status);
            }
        }
    })
}