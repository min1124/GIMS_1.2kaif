var language= { //国际化
                "sLengthMenu": "每页显示 _MENU_ 条记录" , 
                "sZeroRecords": "抱歉， 没有找到" , 
                "sInfo": "从 _START_ 到 _END_ /共 _TOTAL_ 条数据", 
                "sInfoEmpty": "没有数据" , 
                "sInfoFiltered": "(从 _MAX_ 条数据中检索)" , 
                "oPaginate": { 
                      "sFirst": "首页" , 
                      "sPrevious": "前一页" , 
                      "sNext": "后一页" , 
                      "sLast": "尾页"  
               }, 
                "sZeroRecords": "没有检索到数据" , 
                "sProcessing": "<img src='./loading.gif' />" 
}

var ip = 'http://localhost:3000/';
//var ip = 'http://192.168.7.82:3001/';
//var ip = 'http://192.168.7.82:4000/';

function getCookie(name)
{
  var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
  if(arr=document.cookie.match(reg))
    return unescape(arr[2]);
  else
    return null;
}
function error(rs){
  if(rs.status==401){
      alert("请先登录")
    }else if(rs.status==402){
      alert("您没有该权限")
    }else if (rs.status==500){
      alert("网络故障，请刷新重试")
    } //错误返回函数
}

var size = 0.9;
// set();
function set() {  
 //document.body.style.cssText = document.body.style.cssText + '; -webkit-transform: scale(' + size + ');-webkit-transform-origin: 0 0;';   
 //document.body.style.cssText = document.body.style.cssText + '; -webkit-transform: scale(' + size + '); '; 
 //$(body).css("width","120%);
document.body.style.zoom = size;
document.body.style.cssText += '; -moz-transform: scale(' + size + ');-moz-transform-origin: 0 0; ';     //
} 