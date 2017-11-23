jQuery.support.cors = true;
var table
$(function(){
	index();
	$('#select_time').change(function(){
		var id = $("#select_time").val();
		$('#example').empty();
		index(id);

	})
});

function doUpload() {  //上传文件
    var formData = new FormData($( "#uploadForm" )[0]);  
    $.ajax({  
        url: ip+'return/upload' ,  
        type: 'POST',  
        data: formData,
        async: false,  
        cache: false,  
        contentType: false,  
        processData: false,  
        success: function (rs) {  
            alert("上传成功");  
            index();
        },  
        error: function (rs) {  
           if (rs.status == 403){
            alert("文件类型不匹配")
           }else{
            error(rs)
           }
        }  
    });   //  //上传文件函数
} 


function initComplete(){
	var dataPlugin1='<div class="btn-group pull-left" role="group" aria-label="...">'+
	    '<button type="button" class="btn btn-default" id="true">确定</button>'+
	    '<button type="button" class="btn btn-default" id="delete">删除</button>'+
	    '</div>'
	var dataPlugin2 ='<div id="time" class=" pull-left dateRange"> '+
            '<span>开始时间：</span><input type="date" id="starttime"> ——<span>结束时间：</span><input type="date" id="endtime">'+
            '</div>';
    $('.clear').append(dataPlugin1);
    $('.clear').append(dataPlugin2); 
    $('#time').css("margin-left","200px"); 
    $('#true').click(function(){
        $.ajax({
        	url: ip + 'return/time',
        	type: 'post',
        	data: {
        		starttime: $('#starttime').val(),
        		endtime: $('#endtime').val(),
        		name: getCookie('name'),
			    token: getCookie('token'),
        	},
        	success:function(rs){
        		var select = $("#select_time");
        		$("#select_time").empty();
        		var option = $("<option>").text('').val('');
				select.append(option);
        		for(var i=0;i<rs.data.length;i++) {
					var option = $("<option>").text(rs.data[i].create_time).val(rs.data[i].id);
					select.append(option);
				}
        	},
        });
    }); //初始化函数
} 
function index(info){ //初始化页面
	$.ajax({
		url: ip + 'return/index',
		type: 'POST',
		data:{
			id: info,
			name: getCookie('name'),
			token: getCookie('token')
		},
		success: function(rs){
			var id = rs.id
			var week1 =  rs.week1
			var week2 =  rs.week2
			var week3 =  rs.week3
			var week4 =  rs.week4
			var week5 =  rs.week5
			var week6 =  rs.week6
			var week7 =  rs.week7
			var week8 =  rs.week8
			var week9 =  rs.week9
			var week10 =  rs.week10 
			var week11 =  rs.week11
			var row = '<thead>'+
                    '<tr>'+
                      '<th>物料长代码</th>'+
                      '<th>物料名称</th>'+
                      '<th>Buyer</th>'+
                      '<th>wendor</th>'+
                      '<th>'+week1+'</th>'+
                      '<th>已到货</th>'+
                      '<th>剩余可到货</th>'+
                      '<th>'+week2+'</th>'+
                      '<th>已到货</th>'+
                      '<th>剩余可到货</th>'+
                      '<th>'+week3+'</th>'+
                      '<th>已到货</th>'+
                      '<th>剩余可到货</th>'+
                      '<th>'+week4+'</th>'+
                      '<th>已到货</th>'+
                      '<th>剩余可到货</th>'+
                      '<th>'+week5+'</th>'+
                      '<th>已到货</th>'+
                      '<th>剩余可到货</th>'+
                      '<th>'+week6+'</th>'+
                      '<th>已到货</th>'+
                      '<th>剩余可到货</th>'+
                      '<th>'+week7+'</th>'+
                      '<th>已到货</th>'+
                      '<th>剩余可到货</th>'+
                      '<th>'+week8+'</th>'+
                      '<th>已到货</th>'+
                      '<th>剩余可到货</th>'+
                      '<th>'+week9+'</th>'+
                      '<th>已到货</th>'+
                      '<th>剩余可到货</th>'+
                      '<th>'+week10+'</th>'+
                      '<th>已到货</th>'+
                      '<th>剩余可到货</th>'+
                      '<th>'+week11+'</th>'+
                      '<th>已到货</th>'+
                      '<th>剩余可到货</th>'+
                    '</tr>'+
                  '</thead>'
            $('#example').append(row);
			table=$('#example').DataTable({
			    "bDestroy":true,
			    "paging": true,
			    "lengthChange": false,
			    "searching": true,
			    "ordering": true,
			    "info": true,
			    "autoWidth": false,
			    "oLanguage": language, 
			    'dom': 'T<"clear">lfrtip',
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
			    initComplete:initComplete,
			    'ajax': {
			      'url': ip+'return/info',
			      'error':function(rs){
			      	error(rs)
			      },
			      'data': {
			      	rs : rs,
			      	name: getCookie('name'),
			      	token: getCookie('token'),
			      } ,
			      'type': 'post' 
			    } , 
			    "aoColumnDefs":[
			    	{
			    		"aTargets" :　[1],
			    		"sWidth": "200px"
			    	},
			    	{
			    		"aTargets" :　[6],
			    		"fnCreatedCell": function(nTd, sData, oData, iRow, iCol){
			    			cell(nTd, sData, oData,0)
			    		}
			    	},
			    	{
			    		"aTargets" :　[9],
			    		"render": function( data, type, row ){
			    			return num( data, row ,1)
			    		},
			    		"fnCreatedCell": function(nTd, sData, oData, iRow, iCol){
			    			cell(nTd, sData, oData,1)
			    			// console.log(sData);
			    		}
			    	},{
			    		"aTargets" :　[12],
			    		"render": function( data, type, row ){
			    			return num( data, row ,2)
			    		},
			    		"fnCreatedCell": function(nTd, sData, oData, iRow, iCol){
			    			cell(nTd, sData, oData,2)
			    		}
			    	},{
			    		"aTargets" :　[15],
			    		"render": function( data, type, row ){
			    			return num( data, row ,3)
			    		},
			    		"fnCreatedCell": function(nTd, sData, oData, iRow, iCol){
			    			cell(nTd, sData, oData,3)
			    		}
			    	},{
			    		"aTargets" :　[18],
			    		"render": function( data, type, row ){
			    			return num( data, row ,4)
			    		},
			    		"fnCreatedCell": function(nTd, sData, oData, iRow, iCol){
			    			cell(nTd, sData, oData,4)
			    		}
			    	},{
			    		"aTargets" :　[21],
			    		"render": function( data, type, row ){
			    			return num( data, row ,5)
			    		},
			    		"fnCreatedCell": function(nTd, sData, oData, iRow, iCol){
			    			cell(nTd, sData, oData,5)
			    		}
			    	},{
			    		"aTargets" :　[24],
			    		"render": function( data, type, row ){
			    			return num( data, row ,6)
			    		},
			    		"fnCreatedCell": function(nTd, sData, oData, iRow, iCol){
			    			cell(nTd, sData, oData,6)
			    		}
			    	},{
			    		"aTargets" :　[27],
			    		"render": function( data, type, row ){
			    			return num( data, row ,7)
			    		},
			    		"fnCreatedCell": function(nTd, sData, oData, iRow, iCol){
			    			cell(nTd, sData, oData,7)
			    		}
			    	},{
			    		"aTargets" :　[30],
			    		"render": function( data, type, row ){
			    			return num( data, row ,8)
			    		},
			    		"fnCreatedCell": function(nTd, sData, oData, iRow, iCol){
			    			cell(nTd, sData, oData,8)
			    		}
			    	},
			    	{
			    		"aTargets" :　[33],
			    		"render": function( data, type, row ){
			    			return num( data, row ,9)
			    		},
			    		"fnCreatedCell": function(nTd, sData, oData, iRow, iCol){
			    			cell(nTd, sData, oData,9)
			    		}
			    	},{
			    		"aTargets" :　[36],
			    		"render": function( data, type, row ){
			    			return num( data, row ,10)
			    		},
			    		"fnCreatedCell": function(nTd, sData, oData, iRow, iCol){
			    			cell(nTd, sData, oData,10)
			    		}
			    	}
			    ],
			    "aoColumns": [
					{ 'data': 'fnumber' },
					{ 'data': 'fname' },
					{ 'data': 'buyer' },
					{ 'data': 'wendor' },
					{ 'data': 'week1' },
					{ 'data': 'W1' },
					{ 'data': 'num1' },
					{ 'data': 'week2' },
					{ 'data': 'W2' },
					{ 'data': 'num2'},
					{ 'data': 'week3' },
					{ 'data': 'W3' },
					{ 'data': 'num3' },
					{ 'data': 'week4' },
					{ 'data': 'W4' },
					{ 'data': 'num4' },
					{ 'data': 'week5' },
					{ 'data': 'W5' },
					{ 'data': 'num5' },
					{ 'data': 'week6' },
					{ 'data': 'W6' },
					{ 'data': 'num6' },
					{ 'data': 'week7' },
					{ 'data': 'W7' },
					{ 'data': 'num7' },
					{ 'data': 'week8' },
					{ 'data': 'W8' },
					{ 'data': 'num8' },
					{ 'data': 'week9' },
					{ 'data': 'W9' },
					{ 'data': 'num9' },
					{ 'data': 'week10' },
					{ 'data': 'W10' },
					{ 'data': 'num10' },
					{ 'data': 'week11' },
					{ 'data': 'W11' },
					{ 'data': 'num11' },
				]//初始化table
			});
		},
		error:function(rs){
			error(rs)
		}
	});
}
function cell(nTd, sData, oData, index) { //计算颜色
    if (  num(sData,oData,index) < 0 ) {
      $(nTd).css('color', 'red')
    }else{
      $(nTd).css('color', 'green')
    }
}
function num(data, row ,index){ //计算剩余可到货
	data = parseFloat(data)
	var a = new Array()
	a[1] =row.num1
	a[2] =row.num2
	a[3] =row.num3
	a[4] =row.num4
	a[5] =row.num5
	a[6] =row.num6
	a[7] =row.num7
	a[8] =row.num8
	a[9] =row.num9
	a[10] =row.num10
	for(i=1;i<=index;i++){
		data = data + parseFloat(a[i])
	}
	return data.toFixed(2)
}