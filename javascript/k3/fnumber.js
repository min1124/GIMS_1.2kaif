var table
jQuery.support.cors = true;
$(function () {
  var token = getCookie('token');
  var name = getCookie('name');
  table=$('#example').DataTable({
    "bDestroy":true,
    "paging": true,
    "lengthChange": false,
    "searching": true,
    "ordering": true,
    "info": true,
    "autoWidth": false,
    "scrollX": true,  
    initComplete:initComplete,
    "dom": 'T<"clear">lfrtip',
    "tableTools": {
      "sSwfPath": "../../plugins/datatables/extensions/TableTools/swf/copy_csv_xls_pdf.swf",
      "aButtons": [{
        "sExtends": "xls",
        "sButtonText": "导出Excel",
      }],
    }, 
    'ajax': {
      'url':ip+"fnumber/index",
      'data': function ( d ) {
        d.token = token;
        d.name = name;
      } ,
      error:function(rs){
        error(rs)
      },
      'type': 'POST' 
    }, 
    "oLanguage":language,
    "aoColumns": [
      { "data": "ID" },
      { "data": "customer_number" },
      { "data": "product_model" },
      { "data": "fnumber" },
      { "data": "customer_code" },
      { "data": "product_line" },
      { "data": "customer_name" },
      { "data": "product_status" },
      { "data": "shipping_or_not" },
      { "data": "update_date" },
      { "data": "F11" },
    ]
  });
  new $.fn.dataTable.FixedColumns( table, {
    leftColumns: 4,
  } );
    
	$(document).on("click","#add",function(){  //增加按钮显示新增模态框
    $('#myModal').modal('show')  
  });

  $(document).on("click","#save",function(){//保存按钮
    if(confirm("确定保存吗？")){
      var customerNumber=$('#customerNumber').val();
      var productModel=$('#productModel').val();
      var fnumber=$('#fnumber').val();
      var customerCode=$('#customerCode').val();
      var productLine=$('#productLine').val();
      var customerName=$('#customerName').val();
      var productStatus=$('#productStatus').val();
      var shippingOrNot=$('#shippingOrNot').val();
      var updateDate=$('#updateDate').val();
      var f11=$('#f11').val();
        
      var data={
        name:name,
        token:token,
        customerNumber:customerNumber,
        productModel:productModel,
        fnumber:fnumber,
        customerCode:customerCode,
        productLine:productLine,
        customerName:customerName,
        productStatus:productStatus,
        shippingOrNot:shippingOrNot,
        updateDate:updateDate,
        f11:f11,
      }
      $.ajax({
        url:ip+'fnumber/save',
        type:"POST",
        data:data,
        success:function(rs){
          alert(rs);
          if("保存成功"==rs){
            $('#myModal').modal('hide');
            table.ajax.reload();
          }   
        }
      });
    }
  });

  $('#example tbody').on('click', 'tr', function (){//选中某行
    $('.selected').toggleClass('selected');
    $(this).toggleClass('selected');
  });

  $(document).on("click","#upd",function() {//修改
    var td = $(".selected").children('td');
    if (td.length==0){
      alert('请选择一行');
    }else{
      id = td.eq(0).text();
      var data = {
        token: token,
        name: name,
      }
      $.ajax({  
        'url': ip+'fnumber/upd?sql='+id,   
        'type': 'post',
        'data': data,
        "error" : function(rs) {
          if(rs.status==401){
            alert("请先登录")
          }else if(rs.status==402){
            alert("您没有该权限")
          }
        } ,
        'success': function(rs){
          $("#ID1").val(rs.data1[0].ID)//
          $("#customerNumber1").val(rs.data1[0].customer_number)//
          $("#productModel1").val(rs.data1[0].product_model)//
          $("#fnumber1").val(rs.data1[0].fnumber)//
          $("#customerCode1").val(rs.data1[0].customer_code)//
          $("#productLine1").val(rs.data1[0].product_line)//
          $("#customerName1").val(rs.data1[0].customer_name)//
          $("#productStatus1").val(rs.data1[0].product_status)//
          $("#shippingOrNot1").val(rs.data1[0].shipping_or_not)//
          $("#updateDate1").val(rs.data1[0].update_date)//
          $("#f111").val(rs.data1[0].F11)//
        },
      }); 
      $('#myModal1').modal('show');
    }
  });
  $(document).on("click","#updSave",function(){//修改保存按钮
    if(confirm("确定保存吗？")){
      var id=$('#ID1').val();
      var productStatus=$('#productStatus1').val();
      var shippingOrNot=$('#shippingOrNot1').val();
      var updateDate=$('#updateDate1').val();
      var f11=$('#f111').val();
        
      var data={
        name:name,
        token:token,
        id:id,
        productStatus:productStatus,
        shippingOrNot:shippingOrNot,
        updateDate:updateDate,
        f11:f11,
      }
      $.ajax({
        url:ip+'fnumber/updSave',
        type:"POST",
        data:data,
        success:function(rs){
          alert(rs);
          if("保存成功"==rs){
            $('#myModal1').modal('hide');
            table.ajax.reload();
          }   
        }
      });
    }
  });
  $(document).on("click","#del",function(){//删除按钮
    var id=$(".selected").children('td').eq(0).text();
    if (id==""){
      alert("请先选择一行!")
    }else{
      if(confirm("确定删除吗？")){
        $.ajax({  
          'url': ip+"fnumber/del",   
          'type': 'post',
          'success':function(rs){
            alert(rs)
            table.ajax.reload();
          },
          'error':function(rs){
            if(rs.status==401){
              alert("请先登录")
            }else if(rs.status==402){
              alert("您没有该权限")
            }else if(rs.status==500){
              alert('网络故障，请刷新重试')
            }
          },
          'data': {
            name:name,
            token:token,
            id:id,
          },
        });
      }
    } 
  });
});
function initComplete(){ //初始化表格
	var dataPlugin1=  '<div class="btn-group pull-left" role="group" aria-label="..."> '+
	                 	  '<button type="button" class="btn btn-default" id="add">新增</button>'+
                      '<button type="button" class="btn btn-default" id="upd">修改</button>'+
                      '<button type="button" class="btn btn-default" id="del">删除</button>'+
	                  '</div>';
	$('.clear').append(dataPlugin1);                
}