var table
var token 
var name 
jQuery.support.cors = true;
$(function(){
	token = getCookie('token');
	name = getCookie('name');
	table = $('#example').DataTable({
	    "paging": true,
	    "lengthChange": false,
	    "searching": true,
	    "info": true,
	    "autoWidth": false,
		// "oLanguage": language,
		'initComplete': initComplete, 
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
        ajax:{
        	'url': ip + 'change/show',
        	beforeSend:function(XMLHttpRequest){ 
	            $("#myModal").modal('show')
	        }, 
        	'data': function(d){
        		d.name= name;
				d.token= token;
				d.starttime= $('#starttime').val();
				d.endtime= $('#endtime').val();
        	},
        	'type': 'post',
        	'error': function(rs){
        		error(rs)
        		$("#myModal").modal('hide')
        	}
        },
         "aoColumns": [
        { "data": "单据编号" },
        { "data": "制单日期" },
        { "data": "制单人" },
        { "data": "审核人" },
        { "data": "审核日期" },
        { "data": "ME审核人" },
        { "data": "ME审核时间" },
        { "data": "品质审核人" },
        { "data": "品质审核时间" },
        { "data": "生产任务单号" },
        { "data": "产品代码" },
        { "data": "产品名称" },
        { "data": "生产单位" },
        { "data": "生产数量" },              
        { "data": "生产投料单号" },
        { "data": "生产投料行号" },
        { "data": "变更标志" },
        { "data": "变更原因" },
        { "data": "物料代码" },
        { "data": "物料名称" },
        { "data": "单位用量" },
        { "data": "单位" },
        { "data": "标准用量" },
        { "data": "损耗率" },
        { "data": "损耗数量" },
        { "data": "应该数量" },
        { "data": "计划投料数量" },
        { "data": "计划发料日期" },
        { "data": "仓库" },
        { "data": "批号" },
        { "data": "变更人" },
        { "data": "变更日期" },
        { "data": "备注" },
      ]
	})
    $("#review_1").click(function(){//任务变更单工程师审核
    	var billno = $("#example1 tbody").children('tr').eq(0).children('td').eq(1).text().split('.')[0];
	    if($('#me_2').val()==""){
	      	if(confirm("确定审核通过吗？")){
	        	change("me",token,name,billno)
	      	}
	    }else{
	      	alert("已经审核通过")
	    }
	});
	$("#pzreview_1").click(function(){//任务变更单品质工程师审核
		var billno = $("#example1 tbody").children('tr').eq(0).children('td').eq(1).text().split('.')[0];
	    if($('#me_2').val()==""){
	      	alert("还未进行工程师审核")
	    }else{
	      	if($('#pz_2').val()==""){
	        	if(confirm("确定审核通过吗？")){
	          		change("pz",token,name,billno)
	        	}
	      	}else{
	        	alert("已经审核通过")
	      	}
	    }
	});
	$(document).on("dblclick","#example tbody tr",function() {//任务变更单双击
		var fbillno = $(this).children('td').eq(0).text();
		$.ajax({
			url: ip +'change/header1',
			type: 'post',
			data:{
			fbillno: fbillno,
			name: name,
			token: token,
			},
			error: function(XMLHttpRequest, textStatus, errorThrown){
				alert(XMLHttpRequest +" , "+ textStatus + " , " + errorThrown);
			},
			success: function(rs){
				$('#djbh').val(rs[0].单据编号)
				$('#zdrq').val(rs[0].制单日期)
		        $('#zdr_1').val(rs[0].制单人)
		        $('#me_2').val(rs[0].ME审核人)
		        $('#pz_2').val(rs[0].品质审核人)
		        $('#me_1').val(rs[0].ME审核时间)
		        $('#pz_1').val(rs[0].品质审核时间)
		        $('#shr').val(rs[0].审核人)
				$('#example1').DataTable({
					  "destroy": true,
					  "paging": true,
				      "lengthChange": false,
				      "searching": false,
				      "info": true,
				      "autoWidth": false,
				      "oLanguage": language, 
				      "ajax":{
				      	url: ip + 'change/body1',
				      	type: 'post',
				      	data: {
				      		fbillno: fbillno,
				      		name: name,
							token: token,
				      	},
				      	error: function(XMLHttpRequest, textStatus, errorThrown){
				      		$("#myModal").modal('hide') 
							alert(XMLHttpRequest +" , "+ textStatus + " , " + errorThrown);
						},
				      },
				      "aoColumns": [
				        { "data": "生产任务单号" },
				        { "data": "产品代码" },
				        { "data": "产品名称" },
				        { "data": "生产单位" },
				        { "data": "生产数量" },
				        { "data": "生产投料单号" },
				        { "data": "生产投料行号" },
				        { "data": "变更标志" },
				        { "data": "变更原因" },
				        { "data": "物料代码" },
				        { "data": "物料名称" },
				        { "data": "单位用量" },
				        { "data": "单位" },
				        { "data": "标准用量" },              
				        { "data": "损耗率" },
				        { "data": "损耗数量" },
				        { "data": "应该数量" },
				        { "data": "计划投料数量" },
				        { "data": "计划发料日期" },
				        { "data": "仓库" },
				        { "data": "批号" },
				        { "data": "变更人" },
				        { "data": "变更日期" },
				        { "data": "备注" },
				      ]
				})
				$('#Modal').modal('show')
			}    
		});
		
	});
	function initComplete(){
		$("#myModal").modal('hide') 
		var dataPlugin1='<div class="btn-group pull-left" role="group" aria-label="...">'+
		    '<button type="button" class="btn btn-default" id="true">确定</button>'+
		    '</div>'
		var dataPlugin2 ='<div id="time" class=" pull-left dateRange"> '+
                  '<span>开始时间：</span><input type="date" id="starttime"> ——<span>结束时间：</span><input type="date" id="endtime">'+
                  '</div>' 
        console.log(1)
        $('.clear').append(dataPlugin1);
    	$('.clear').append(dataPlugin2); 
    	$('#time').css("margin-left","200px"); 
    	$('#true').click(function(){
    		if($('#starttime').val()==''){
    			alert('请选择开始时间')
    		}else if ($('#endtime').val()==''){
    			alert('请选择结束时间')
    		}else {
    			table.ajax.reload();
    			$("#myModal").modal('hide') 
    		}
  		});
	}

	function change(type,token,name,billno)
	{
	  	$.ajax({  
		    'url': ip + 'change/review1',   
		    'type': 'post',
		    'data': {
	      		type: type,
	      		fbillno: $('#djbh').val(),
	      		name: name,
	      		token: token,
	      		billno:billno,
	    	},
		    'success': function(rs){
		      	$('#Modal').modal('hide')
		      	
		      	alert(rs)
		    },
	    	"error" : function(rs) {
	      		if(rs.status==401){
	        		alert("请先登录")
	      		}else if(rs.status==402){
	        		alert("您没有该权限")
	      		}
	      		$('#Modal').modal('hide')
	    	} 
	  	});
	}
})









