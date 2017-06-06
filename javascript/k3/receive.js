jQuery.support.cors = true;
var table1
$(function(){  
  var token = getCookie('token');
  var name = getCookie('name');
  $.ajax({  //获得货运单位
      'url': ip+'receive/hydw',   
      'type': 'post',
      'data': {
        name:name,
        token:token,
      },
      "error" : function(rs) {
          if(rs.status==401){
            alert("请先登录")
          }else if(rs.status==402){
            alert("您没有该权限")
          }
        },  
      'success': function(rs){
        var select = $("#hydw");
        for(var i=0;i<rs.data.length;i++) {
          var option = $("<option>").text(rs.data[i].FName).val(rs.data[i].FinterID);
          select.append(option);
        }
      }
  });
  $('.addBtn').click(function (){ //添加行按钮
    var row='<tr>'+
              '<th><select style="width: 100%;" class="form-control">'+
                      '<option value=""></option>'+
                      '<option value="and">and</option>'+
                      '<option value="or">or</option>'+
                    '</select></th>'+
              '<th><select style="width: 100%;" class="form-control" id="a">'+
                      '<option value="K3出货日期">K3出货日期</option>'+
                      '<option value="出库单号">出库单号</option>'+
                      '<option value="对应代码">对应代码</option>'+
                      '<option value="对应名称">对应名称</option>'+
                      '<option value="制单人">制单人</option>'+
                      '<option value="要求到货时间">要求到货时间</option>'+
                      '<option value="客户订单编号">客户订单编号</option>'+
                      '<option value="收货确认人">收货确认人</option>'+
                      '<option value="客户收货时间">客户收货时间</option>'+
                      '<option value="送货单号">送货单号</option>'+
                      '<option value="发货时间">发货时间</option>'+
                      '<option value="订单类型">订单类型</option>'+
                      '<option value="签收回执">签收回执</option>'+
                      '<option value="货运单号">货运单号</option>'+
                      '<option value="货运单位">货运单位</option>'+
                      '<option value="客户发货地址">客户发货地址</option>'+
                    '</select></th>'+
              '<th><select style="width: 100%;" class="form-control">'+
                      '<option value="=">=</option>'+
                      '<option value="<"><</option>'+
                      '<option value="<="><=</option>'+
                      '<option value=">">></option>'+
                      '<option value=">=">>=</option>'+
                      '<option value="like">like</option>'+
                    '</select></th>'+
              '<th><input type="text" style="width: 100%;" class="form-control"></th>'+
              '<th><button class="delBtn"><i class="fa fa-fw fa-minus"></i></button></th>'+
            '</tr>';
    $('#example1').append(row);
  });
  $(document).on("click",".delBtn",function(){//删除行按钮
    $(this).parent().parent().remove();
  });
  $('#search').click(function (){//查询按钮
    var table = document.getElementById('example1');
      // 获取 table 内的全部 input
    var sql1=""
    // var sql2=""
    var textselects = table.getElementsByTagName('select');
    var textinputs = table.getElementsByTagName('input');
    textselects[0].value=""
    for(var i = 0; i < textinputs.length; i++) {
      // sql1=sql1+textinputs[i].value;
      sql1 =sql1+textselects[0+i*3].value+" "+textselects[1+i*3].value+" "+textselects[2+i*3].value+" '"+textinputs[i].value+"' "
    }
    table1=$('#example').DataTable({
      "bDestroy":true,
      "paging": false,
      "lengthChange": false,
      "searching": false,
      "ordering": true,
      "info": true,
      "autoWidth": false,
      "scrollX": true,
      initComplete: function() {
        var total = 0.0;
        var table = document .getElementById ("example")
        var a = table.rows.length
        for (var i=1 ; i<a ; i++){
          total+=parseFloat(table.rows[i].cells[18].innerHTML)
        }
        document .getElementById ("total").value=total.toFixed(2)
        // alert(total.toFixed(2))
      }, 
      "oLanguage": language, 
      // "scrollX": true,
      'ajax': {
        'url':ip+"receive/search",
        'data': function ( d ) {
          d.token = token;
          d.name = name;
          d.sql = sql1;
        } ,
        'type': 'POST' 
      } , 
      "aoColumns": [
        { "data": "K3出货日期" },
        { "data": "产品代码" },
        { "data": "产品名称" },
        { "data": "出库单号" },
        { "data": "制单人" },
        { "data": "实发数量" },
        { "data": "客户发货地址" },
        { "data": "客户订单编号" },
        { "data": "对应代码" },
        { "data": "要求到货时间" },
        { "data": "订单类型" },
        { "data": "签收回执" },
        { "data": "收货确认人" },
        { "data": "客户收货时间" },
        { "data": "货运单位" },
        { "data": "货运单号" },
        { "data": "发货时间" },
        { "data": "送货单号" },
        { "data": "销售金额" },
      ]

    }); 
  });
  $('.plgx1').click(function(){//送货单号维护
    var fbillno=getno();
    var shdh = $('#shdh').val();
    if (fbillno==""){
      alert("请先筛选")
    }else if(shdh==""){
      alert("请填写完整信息")
    }else{
      var data={
        name:name,
        token:token,
        type:"1",
        shdh:shdh,
        fbillno:fbillno,
      }
      plgx(data)
    }
  });
  $('.plgx2').click(function(){//货运单位维护
    var fbillno = getno();
    var hydw = $('#hydw').val();
    var fhsj = $('#fhsj').val();
    var hydh = $('#hydh').val();
    if (fbillno==""){
      alert("请先筛选")
    }else if(hydw==""||fhsj==""||hydh==""){
      alert("请填写完整信息")
    }else{
      var data={
        name:name,
        token:token,
        type:"2",
        hydw:hydw,
        hydh:hydh,
        fhsj:fhsj,
        fbillno:fbillno,
      }
      plgx(data)
    }
  });
  $('.plgx3').click(function(){//收货确认维护
    var fbillno=getno();
    var shqrr=$('#shqrr').val();
    var shsj=$('#shsj').val();
    if (fbillno==""){
      alert("请先筛选")
    }else if(shqrr==""||shsj==""){
      alert("请填写完整信息")
    }else{
      var data={
        name:name,
        token:token,
        type:"3",
        shqrr:shqrr,
        shsj:shsj,
        fbillno:fbillno,
      }
      plgx(data)
    }
  });
  $('.plgx4').click(function(){//签收回执维护
    var fbillno=getno();
    var qshz=$('#qshz').val();
    if (fbillno==""){
      alert("请先筛选")
    }else if(qshz==""){
      alert("请填写完整信息")
    }else{
      var data={
        name:name,
        token:token,
        type:"4",
        qshz:qshz,
        fbillno:fbillno,
      }
      plgx(data)
    }
  });
}); 
function plgx(data){
  if(confirm("确定更新吗？")){
    $.ajax({
      url:ip+"receive/plgx",
      type:'post',
      data:data,
      error:function(rs){
        if(rs.status==401){
          alert("请先登录")
        }else if(rs.status==402){
          alert("您没有该权限")
        }else{
          alert("更新失败！")
        }
      },
      success:function(rs){
        if(rs=="0"){
          alert("更新成功！")
          table1.ajax.reload();
        }else{
          alert("更新失败！")
        }
      }
    });
  }
}
function getno(){
  var total = "";
  var table = document .getElementById ("example")
  var a = table.rows.length
  for (var i=1 ; i<a ; i++){
    total+=",'"+table.rows[i].cells[3].innerHTML+"'"
  }
  return total.substring(1);
}