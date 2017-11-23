var table
var table1
var fnumber = new Array() 
jQuery.support.cors = true;
var type = "tltz"
$(function(){
	var token = getCookie('token');
    var name = getCookie('name');
    
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
			url:ip + "cancel/index",
			beforeSend:function(XMLHttpRequest){ 
              $("#myModal1").modal('show')
          	}, 
			data:function(d){
				d.name = name;
				d.token = token;
				d.starttime = $("#starttime").val();
				d.endtime = $("#endtime").val();
				d.type = type;
			},
			type: 'post',
			error: function(rs){
				error(rs)
			},
		},
		"aoColumns": [
	        { "data": "单据编号" },
	        { "data": "单据类型" },
	        { "data": "供应商名称" },
	        { "data": "源单类型" },
	        { "data": "制单" },
	        { "data": "审核" },
	        { "data": "审核日期" },
	        { "data": "日期" },
	        { "data": "货运单位" },
	        { "data": "运单号" },
	        { "data": "收货确认人" },
	        { "data": "签收回执" },
	        { "data": "送货单号" },
	        { "data": "发货时间" },
	        { "data": "客户收货时间" },
	    ]
	})
	$('#myTab a').click(function(){
		type = $(this).attr('id')
		table.ajax.reload(function(){
			$("#myModal1").modal('hide')
		})
		var title
		switch(type)
		{
			case "tltz":
				title = "退料通知"
				break;
			case "hzwg":
				title = "红字外购"
				break;
			case "wwhz":
				title = "委外红字"
				break;
			case "xchz":
				title = "虚仓红字"
				break;
		}

		$('#myModalLabel').html(title)
	})

	$(document).on("click","#example tbody tr",function() {
		if ($(this).hasClass('selected') ){
            $(this).removeClass('selected');
        } else{
            $(this).addClass('selected');
        }
	})
	$(document).on("dblclick","#example tbody tr",function() {
		
		var FBillno = $(this).children('td').eq(0).text();
		$.ajax({
			url: ip+'cancel/fbillno',
			data:{
				fbillno: FBillno,
				type: type,
			},
			type: 'post',
			success: function(rs){
				$('#example1').empty()
				$('#example2').empty()
		        var row
				var data
				if(type=="hzwg"||type=="wwhz"){
					row = '<thead>'+
								"<tr>"+
		                		"<th>行号</th>"+
		                        "<th>物料代码</th>"+
		                        "<th>物料名称</th>"+
		                        "<th>规格型号</th>"+
		            			"<th>批号</th>"+
		            			"<th>应收数量</th>"+
		            			"<th>实收数量</th>"+
		            			"<th>备注</th>"+
		            			"<th>退料仓库</th>"+
		                		"</tr>"+
		                '</thead>'
		            data = [
		                { "data": "分录ID" },
		                { "data": "物料代码" },
		                { "data": "物料名称" },
		                { "data": "规格型号" },
		                { "data": "批号" },
		                { "data": "应收数量" },
		                { "data": "实收数量" },
		                { "data": "备注" },
		                { "data": "仓库名称" },
		            ]
		            $('#example1').append(row)
		            $('#example1').DataTable({
						"data": rs.b,
				    	"bDestroy":true,
					    "paging": false,
					    "lengthChange": false,
					    "searching": false, 
					    "info": false,
					    "autoWidth": false,
					    "aoColumns":data
				    })
				    document.getElementById('example1').style.display='block'; 
				    document.getElementById('example2').style.display='none'; 
				}else{
					row = '<thead>'+
							"<tr>"+
	                		"<th>行号</th>"+
	                        "<th>物料代码</th>"+
	                        "<th>物料名称</th>"+
		                    "<th>规格型号</th>"+
	            			"<th>批号</th>"+
	            			"<th>数量</th>"+
	            			"<th>备注</th>"+
	            			"<th>退料仓库</th>"+
	                		"</tr>"+
	                	'</thead>'
	                data = [
		                { "data": "分录ID" },
		                { "data": "物料代码" },
		                { "data": "物料名称" },
		                { "data": "规格型号" },
		                { "data": "批号" },
		                { "data": "数量" },
		                { "data": "备注" },
		                { "data": "仓库名称" },
		            ]
		            $('#example2').append(row)
		            $('#example2').DataTable({
						"data": rs.b,
				    	"bDestroy":true,
					    "paging": false,
					    "lengthChange": false,
					    "searching": false, 
					    "info": false,
					    "autoWidth": false,
					    "aoColumns":data
				    })
				    document.getElementById('example1').style.display='none'; 
				    document.getElementById('example2').style.display='block'; 
				}
				if(rs.c[0]==null){
					$('#hydw_1').val('')
					$('#ydh_1').val('')
					$('#fhsj_1').val('')
					$('#shqr_1').val('')
					$('#shsj_1').val('')
					$('#qshz_1').val('')
					$('#shdh_1').val('')
				}else{
					$('#hydw_1').val(rs.c[0].hydw)
					$('#ydh_1').val(rs.c[0].ydh)
					$('#fhsj_1').val(rs.c[0].fhsj)
					$('#shqr_1').val(rs.c[0].shqr)
					$('#shsj_1').val(rs.c[0].shsj)
					$('#qshz_1').val(rs.c[0].qshz)
					$('#shdh_1').val(rs.c[0].shdh)
				}
				if (type=="tltz"){
					$('#tlyy').val(rs.a[0].退料原因)
				}else{
					$('#tlyy').val('')
				}
				$('#bh').val(rs.a[0].单据编号)
				// $('#djlx').val(rs.a[0].单据类型)
				$('#gys').val(rs.a[0].供应商名称)
				$('#ydlx').val(rs.a[0].源单类型)
				$('#zd').val(rs.a[0].制单)
				$('#rq').val(rs.a[0].日期)
				$('#sh').val(rs.a[0].审核)
				$('#shrq').val(rs.a[0].审核日期)

                $('#Modal').modal('show')				
			},
			error: function(rs){
				error(rs)
			}
		})//双击一行
	})
	$('#save').click(function(){//保存更新信息
		var hydw = $('#hydw').val();
		var ydh = $('#ydh').val();
		var fhsj = $('#fhsj').val();
		var shsj = $('#shsj').val();
		var qshz = $('#qshz').val();
		var shdh = $('#shdh').val();
		var shqr = $('#shqr').val();
		$.ajax({
			url:ip + 'cancel/new',
			type: 'post',
			data:{
				fnumber: fnumber,
				hydw: hydw,
				ydh: ydh,
				fhsj: fhsj,
				shsj: shsj,
				qshz: qshz,
				shdh: shdh,
				shqr: shqr,
			},
			success:function(rs){
				alert(rs)
				$('#myModal').modal('hide')
				table.ajax.reload(function(){
					$("#myModal1").modal('hide')
				})
			},
			error: function(rs){
				// alert(rs)
				error(rs)
				$('#myModal').modal('hide')
			},
		})
	})

})

function initComplete(){
	$("#myModal1").modal('hide')
	var dataPlugin1 = '<div class="btn-group pull-left" role="group" aria-label="...">'+
        '<button type="button" class="btn btn-default" id="true">确定</button>'+
        '<button type="button" class="btn btn-default" id="new-fnumber">更新信息</button>'+
        '<button type="button" class="btn btn-default" id="del-fnumber">删除信息</button>'+
        '</div>'
    var dataPlugin2 ='<div id="time" class=" pull-left dateRange" style="margin-left:20px;"> '+
        '<span>开始时间：</span><input type="date" id="starttime"> ——<span>结束时间：</span><input type="date" id="endtime">'+
        '</div>';
    $('.clear').append(dataPlugin1);
    $('.clear').append(dataPlugin2);
    $('#new-fnumber').click(function(){
    	var td = $(".selected").children('td');
    	if (td.length==0){
    		alert('请选择一行')
    	}else{
    		for(var i = 0; i < td.length/15; i++) { 
	    		fnumber[i] = td.eq(i*15+0).text()
	    	}
	    	$('#myModal').modal('show')
    	}
    })
    $('#true').click(function(){
    	table.ajax.reload(function(){
			$("#myModal1").modal('hide')
		})
    })
    $('#del-fnumber').click(function(){
    	var fbillno = new Array
    	var td = $(".selected").children('td');
    	if (td.length==0){
    		alert('请选择一行')
    	}else{
    		for(var i = 0; i < td.length/15; i++) { 
	    		// fnumber[i] = td.eq(i*18+1).text()
	    		fbillno[i] = td.eq(i*15+0).text()
	    	}
	    	
    	}
    	if(confirm("确定删除吗？")){
	    	$.ajax({
	    		url:ip + 'cancel/del',
	    		type: 'post',
	    		data:{
	    			fbillno: fbillno,
	    		},
	    		error: function(rs){
	    			error(rs)
	    		},
	    		success: function(rs){
	    			alert(rs)
	    			table.ajax.reload(function(){
						$("#myModal1").modal('hide')
					})
	    		},
	    	})
	    }
    })
}





