var table
jQuery.support.cors = true;
$(function () {
var token = getCookie('token');
var name = getCookie('name');
table=$('#example').DataTable({
    "bDestroy":true,
    "paging": true,
    "lengthChange": false,
    "searching": false,
    "oLanguage": language,
    "ordering": true,
    "info": true,
    "autoWidth": false,
    initComplete:initComplete,
    // "dom": "<'row'<'col-sm-6'l<'#mytoolbox1'>><'col-sm-6'f<'#mytoolbox2'>r>"+
    //        "t"+
    //        "<'foot'<'col-sm-6'i><'col-sm-6'p>>", 
    "dom": 'T<"clear">lfrtip',
    "tableTools": {
        "sSwfPath": "../../plugins/datatables/extensions/TableTools/swf/copy_csv_xls_pdf.swf",
        "aButtons": [
          {
          "sExtends": "xls",
          "sButtonText": "导出Excel",
          // "bBomInc": true,
          // "sCharSet": "gb2312"
          }
        ],
    }, 
    'ajax': {
      'url':ip+"bom/hj",
      'data': function ( d ) {
        d.token = token;
        d.name = name;
        d.sql = $('#code').val();
      } ,
      error:function(rs){
        error(rs)
      },
      'type': 'POST' 
    } , 
    "aoColumns": [
      { "data": "FNumber" },
      { "data": "FName" },
      // { "data": "FModel" },
      { "data": "F_112" },
    ]

    });
});
function initComplete(){ //初始化表格
	var dataPlugin1='<div class="btn-group" role="group" aria-label="...">'+
	'<button type="button" class="btn btn-info" id="search">查询</button>'+
	'</div>'
	var dataPlugin2 ='<div id="time" class="pull-right dateRange"> '+
	                '<span >请输入物料代码:</span><input type="text" id="code"  style="float: right;">'+
	                '</div>';
	$('.clear').append(dataPlugin1);                
	$('.clear').append(dataPlugin2);


	$('#search').click(function(){
	  table.ajax.reload();
	});
}