jQuery.support.cors = true;
var table;
var a_1 = 0//第一周需求及时率 
var a_2 = 0//第一周采购及时率
var b_1 = 0//第二周需求及时率 
var b_2 = 0//第二周采购及时率
var c_1 = 0//第三周需求及时率 
var c_2 = 0//第三周采购及时率
var d_1 = 0//第四周需求及时率 
var d_2 = 0//第四周采购及时率
var excel_id //记录页面所属
$(function(){
	var token = getCookie('token');
	var name = getCookie('name');
	index()
	$('#select_time').change(function(){
		var id = $("#select_time").val();
		$('#example').empty();
		index(id);
	})
	$(document).on("click","#delete",function(){
    	if(confirm("确定删除吗？")){
    		$.ajax({
    			url: ip + 'arrival/delete',
    			type: 'post',
    			data:{
    				id: excel_id,
    				name:name,
    				token:token,
    			},
    			success: function(rs){
    				alert(rs)
    				$('#example').empty();
    				index()
    			},
    			error: function(rs){
    				error(rs)
    			}
    		})
    	}
	})
})

function index(id){
	var token = getCookie('token');
	var name = getCookie('name');
	$.ajax({
		url: ip + 'arrival/index',
		type: 'POST',
		data:{
			name: name,
			token: token,
			id: id,
		},
		success: function(rs){
			excel_id = rs.id
			var row1 = '<thead>'+
                    '<tr>'+
                      '<th>物料长代码</th>'+
                      '<th>物料名称</th>'+
                      '<th>PMC</th>'+
                      '<th>Buyer</th>'+
                      '<th>分类</th>'+
                      '<th>'+rs.date2+'</th>'+
                      '<th>实际到货满足MRP情况</th>'+
                      '<th>采购承诺与实际到货是否一致</th>'+
                      '<th>'+rs.date3+'</th>'+
                      '<th>实际到货满足MRP情况</th>'+
                      '<th>采购承诺与实际到货是否一致</th>'+
                      '<th>'+rs.date4+'</th>'+
                      '<th>实际到货满足MRP情况</th>'+
                      '<th>采购承诺与实际到货是否一致</th>'+
                      '<th>'+rs.date5+'</th>'+
                      '<th>实际到货满足MRP情况</th>'+
                      '<th>采购承诺与实际到货是否一致</th>'+
                      '<th>'+rs.date6+'</th>'+
                      '<th>实际到货满足MRP情况</th>'+
                      '<th>采购承诺与实际到货是否一致</th>'+
                      '<th>'+rs.date7+'</th>'+
                      '<th>实际到货满足MRP情况</th>'+
                      '<th>采购承诺与实际到货是否一致</th>'+
                      '<th>'+rs.date8+'</th>'+
                      '<th>实际到货满足MRP情况</th>'+
                      '<th>采购承诺与实际到货是否一致</th>'+
                    '</tr>'+
                  '</thead>'
            $('#example').append(row1)
            table = $('#example').DataTable({
            	"bDestroy":true,
			    "paging": true,
			    "lengthChange": false,
			    "iDisplayLength":9,
			    "searching": true,
			    "oLanguage": language, 
			    // "ordering": true,
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
			    "info": true,
			    "autoWidth": false,
			    initComplete:initComplete,
            })
            $.ajax({
			      'url': ip+'arrival/info',
			      'error':function(rs){
			      	$("#myModal").modal('hide') 
			      	alert(rs)
			      },
			      'data': {
			      	rs : rs,
			      	name: name,
			      	token: token,
			      } ,
			      beforeSend:function(XMLHttpRequest){ 
			            $("#myModal").modal('show')
			        },  
			      'type': 'post' ,
			      success:function(rs){
			      	a_1 = 0//第一周需求及时率 
					a_2 = 0//第一周采购及时率
					b_1 = 0//第二周需求及时率 
					b_2 = 0//第二周采购及时率
					c_1 = 0//第三周需求及时率 
					c_2 = 0//第三周采购及时率
					d_1 = 0//第四周需求及时率 
					d_2 = 0//第四周采购及时率
			      	$("#myModal").modal('hide') 
			      	for(i=0;i<rs.length;i++){
			      		var num1_1 = Number(rs[i].week1_1)
			      		var num2_1 = Number(rs[i].week1_2)
			      		var num3_1 = Number(rs[i].week1_3)
			      		var num1_2 = num1_1 + Number(rs[i].week2_1)
			      		var num2_2 = num2_1 + Number(rs[i].week2_2)
			      		var num3_2 = num3_1 + Number(rs[i].week2_3)
			      		var num1_3 = num1_2 + Number(rs[i].week3_1)
			      		var num2_3 = num2_2 + Number(rs[i].week3_2)
			      		var num3_3 = num3_2 + Number(rs[i].week3_3)
			      		var num1_4 = num1_3 + Number(rs[i].week4_1)
			      		var num2_4 = num2_3 + Number(rs[i].week4_2)
			      		var num3_4 = num3_3 + Number(rs[i].week4_3)
			      		var num1_5 = num1_4 + Number(rs[i].week5_1)
			      		var num2_5 = num2_4 + Number(rs[i].week5_2)
			      		var num3_5 = num3_4 + Number(rs[i].week5_3)
			      		var num1_6 = num1_5 + Number(rs[i].week6_1)
			      		var num2_6 = num2_5 + Number(rs[i].week6_2)
			      		var num3_6 = num3_5 + Number(rs[i].week6_3)
			      		var num1_7 = num1_6 + Number(rs[i].week7_1)
			      		var num2_7 = num2_6 + Number(rs[i].week7_2)
			      		var num3_7 = num3_6 + Number(rs[i].week7_3)
			      		table.row.add([
			      			rs[i].fnumber,
			      			rs[i].fname,
			      			rs[i].PMC,
			      			rs[i].Buyer,
			      			'需求',
			      			rs[i].week1_1,
			      			// num2_1,
			      			num(num1_1,num3_1,'1-1'),
			      			num(num2_1,num3_1,'1-2'),
			      			rs[i].week2_1,
			      			// num2_2,
			      			num(num1_2,num3_2,'2-1'),
			      			num(num2_2,num3_2,'2-2'),
			      			rs[i].week3_1,
			      			num(num1_3,num3_3,'3-1'),
			      			num(num2_3,num3_3,'3-2'),
			      			rs[i].week4_1,
			      			num(num1_4,num3_4,'4-1'),
			      			num(num2_4,num3_4,'4-2'),
			      			rs[i].week5_1,
			      			num(num1_5,num3_5,'5-1'),
			      			num(num2_5,num3_5,'5-2'),
			      			rs[i].week6_1,
			      			num(num1_6,num3_6,'6-1'),
			      			num(num2_6,num3_6,'6-2'),
			      			rs[i].week7_1,
			      			num(num1_7,num3_7,'7-1'),
			      			num(num2_7,num3_7,'7-2'),
			      		]).draw();
			      		table.row.add([
			      			rs[i].fnumber,
			      			rs[i].fname,
			      			rs[i].PMC,
			      			rs[i].Buyer,
			      			'采购回复',
			      			rs[i].week1_2,
			      			'',
			      			'',
			      			rs[i].week2_2,
			      			'',
			      			'',
			      			rs[i].week3_2,
			      			'',
			      			'',
			      			rs[i].week4_2,
			      			'',
			      			'',
			      			rs[i].week5_2,
			      			'',
			      			'',
			      			rs[i].week6_2,
			      			'',
			      			'',
			      			rs[i].week7_2,
			      			'',
			      			'',
			      		]).draw();
			      		table.row.add([
			      			rs[i].fnumber,
			      			rs[i].fname,
			      			rs[i].PMC,
			      			rs[i].Buyer,
			      			'实际到货',
			      			rs[i].week1_3,
			      			'',
			      			'',
			      			rs[i].week2_3,
			      			'',
			      			'',
			      			rs[i].week3_3,
			      			'',
			      			'',
			      			rs[i].week4_3,
			      			'',
			      			'',
			      			rs[i].week5_3,
			      			'',
			      			'',
			      			rs[i].week6_3,
			      			'',
			      			'',
			      			rs[i].week7_3,
			      			'',
			      			'',
			      		]).draw( false );
			      	} 
			      	$('#1-1').val(Percentage(a_1,rs.length))
			      	$('#1-2').val(Percentage(a_2,rs.length))
			      	$('#2-1').val(Percentage(b_1,rs.length))
			      	$('#2-2').val(Percentage(b_2,rs.length))
			      	$('#3-1').val(Percentage(c_1,rs.length))
			      	$('#3-2').val(Percentage(c_2,rs.length))
			      	$('#4-1').val(Percentage(d_1,rs.length))
			      	$('#4-2').val(Percentage(d_2,rs.length))
			      }
			}) 
			
		}
	})
}
function num(data1,data3,flag){//data1代表需求或采购回复，data3代表实际到货

	var down
	if (data1==0){
		down = 1
	}else{
		down = data1
	}
	if ((data3-data1)*1.0/down>0.1){
		return '多到货'
	}else if ((data3-data1)*1.0/down<-0.1){
		return '少到货'
	}else {
		switch(flag)
		{
		case '1-1':
		  a_1 = a_1+1 
		  break;
		case '1-2':
		  a_2 = a_2+1
		  break;
		case '2-1':
		  b_1 = b_1+1
		  break;
		case '2-2':
		  b_2 = b_2+1
		  break;
		case '3-1':
		  c_1 = c_1+1
		  break;
		case '3-2':
		  c_2 = c_2+1
		  break;
		case '4-1':
		  d_1 = d_1+1
		  break;
		case '4-2':
		  d_2 = d_2+1
		  break;
		default:
		  
		}
		return '正常'
	}
}

function doUpload() {  //上传文件
    var formData = new FormData($( "#uploadForm" )[0]);  
    formData['name'] = name
    formData['token'] = token
    console.log(formData)
    $.ajax({  
        url: ip+'arrival/upload' ,  
        type: 'POST',  
        data: formData,
        async: false,  
        cache: false,  
        contentType: false,  
        processData: false,
        beforeSend:function(XMLHttpRequest){ 
            $("#myModal").modal('show')
        },  
        success: function (rs) { 
        	$("#myModal").modal('hide') 
            alert("上传成功");  
            index();
        },  
        error: function (rs) { 
        	$("#myModal").modal('hide') 
           if (rs.status == 403){
            alert("文件类型不匹配")
           }else{
            error(rs)
           }
        }  
    });   //  //上传文件函数
} 
function initComplete(){
	$("#jsl").remove()
	var row ='<div id = "jsl">'+
				'<div class="col-xs-3">'+
					'<span>第一周需求及时率</span> <input type="text" id="1-1" readonly>'+
				'</div>'+
				'<div class="col-xs-3">'+
					'<span>第二周需求及时率</span> <input type="text" id="2-1" readonly>'+
				'</div>'+
				'<div class="col-xs-3">'+
					'<span>第三周需求及时率</span> <input type="text" id="3-1" readonly>'+
				'</div>'+
				'<div class="col-xs-3">'+
					'<span>第四周需求及时率</span> <input type="text" id="4-1" readonly>'+
				'</div>'+
				'<div class="col-xs-3">'+
					'<span>第一周采购及时率</span> <input type="text" id="1-2" readonly>'+
				'</div>'+
				'<div class="col-xs-3">'+
					'<span>第二周采购及时率</span> <input type="text" id="2-2" readonly>'+
				'</div>'+
				'<div class="col-xs-3">'+
					'<span>第三周采购及时率</span> <input type="text" id="3-2" readonly>'+
				'</div>'+
				'<div class="col-xs-3">'+
					'<span>第四周采购及时率</span> <input type="text" id="4-2" readonly>'+
				'</div>'+
			'</div>'	
	$('.col-xs-12').append(row)
	var dataPlugin1='<div class="btn-group pull-left" role="group" aria-label="...">'+
	    '<button type="button" class="btn btn-default" id="true">确定</button>'+
	    '<button type="button" class="btn btn-default" id="delete">删除</button>'+
	    '</div>'
	var dataPlugin2 ='<div id="time" class=" pull-left dateRange"> '+
            '<span>开始时间：</span><input type="date" id="starttime"> ——<span>结束时间：</span><input type="date" id="endtime">'+
            '</div>';
    $('.clear').append(dataPlugin1);
    $('.clear').append(dataPlugin2); 
    $('#time').css("margin-left","100px"); 
    $('#true').click(function(){//初始化函数
        $.ajax({
        	url: ip + 'arrival/getid',
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
    }); 
    // $('#delete').click(function(){//删除上传
    	
    	
    // })
}
function Percentage(number1, number2) { 
    return (Math.round(number1 / number2 * 10000) / 100.00 + "%");// 小数点后两位百分比
   
}