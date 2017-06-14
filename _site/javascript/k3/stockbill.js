var name
var token
var table
$(function(){
	token = getCookie('token');
    name = getCookie('name');
	table = $('#example').DataTable({
		"Destroy":true,
		"paging": true,
		"lengthChange": false,
		"searching": true,
		"ordering": true,
		"info": true,
		"autoWidth": false,
		"dom": 'T<"clear">lfrtip',
		'initComplete': initComplete,
		"oLanguage": language, 
		"tableTools": {
			"sSwfPath": "../../plugins/datatables/extensions/TableTools/swf/copy_csv_xls_pdf.swf",
			"aButtons": [
				{
					"sExtends": "xls",
					"sButtonText": "导出Excel",
				}
			],
		},
		'ajax':{
			url:ip + "cancel/stockbill",
			'data': function ( d ){
				d.name = name;
				d.token = token;
				d.time = $('#selecttime').val();
			},
			type: 'post',
			error: function(rs){
				error(rs)
			},
		},
		"aoColumnDefs":[
			{ 
				"aTargets" :　[0],
            	"mRender" : function(data, type, row){
            		if (-0.01<(Number(row.入库单价)- Number(row.订单单价))&&(Number(row.入库单价)- Number(row.订单单价))<0.01){
            			return '否'
            		} else{
            			return '是'
            		}
            	}
            },
            {
            	"aTargets" :　[1],
            	"mRender" : function(data, type, row){
            		var result = (Number(row.入库单价)- Number(row.订单单价))/Number(row.入库单价)
            		return parseFloat(result.toFixed(6))+'%'
            	}
            },
		],
		"aoColumns": [
	        { },
	        { },
	        { "data": "单据类型" },
	        { "data": "入库日期" },
	        { "data": "单据编号" },
	        { "data": "订单编号" },
	        { "data": "物料代码" },
	        { "data": "物料名称" },
	        { "data": "入库单价" },
	        { "data": "订单单价" },
	    ]
	})
})

function initComplete(){
	var dataPlugin1 = '<div class="btn-group pull-left" role="group" aria-label="...">'+
        '<button type="button" class="btn btn-default" id="true">确定</button>'+
        '</div>'
    var dataPlugin2 ='<div id="time" class=" pull-left dateRange" style="margin-left:200px;"> '+
        '<span>开始时间：</span><input type="month" id="selecttime">'+
        '</div>';
    $('.clear').append(dataPlugin1);
    $('.clear').append(dataPlugin2);
    $('#true').click(function(){
    	table.ajax.reload();
    })
}


