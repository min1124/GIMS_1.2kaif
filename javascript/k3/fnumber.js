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
        "aButtons": [
          {
          "sExtends": "xls",
          "sButtonText": "导出Excel",
          }
        ],
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
    } , 
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

});
function initComplete(){ //初始化表格
	var dataPlugin1= '<div id="add" class="btn-group pull-left" role="group" aria-label="..."> '+
	                 	'<button type="button" class="btn btn-default" id="search">新增</button>'+
	                 '</div>';
	$('.clear').append(dataPlugin1);                
}