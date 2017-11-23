jQuery.support.cors = true;
var table;
$(function() {
	var name = getCookie("name");
	var token = getCookie("token");

	table = $("#example").DataTable({
		"bDestroy":true,
    	"paging": true,
    	"lengthChange": false,
    	"ordering": true,
    	"info": true,
    	"autoWidth": false,
        "searching": true,
    	initComplete:initComplete,
    	"dom": 'T<"clear">lfrtip',
    	"tableTools": {
        	"sSwfPath": "../../plugins/datatables/extensions/TableTools/swf/copy_csv_xls_pdf.swf",
        	"aButtons": [{
          		"sExtends": "xls",
          		"sButtonText": "导出Excel",
          	}],
    	}, 
    	"ajax":{
        	'url': ip + "delayordericmo/load",
            'type': "post",
        	"data":function(data){
          		data.token = token;
          		data.name = name;
          	},
            "error" : function(rs) {
                if(rs.status==401){
                    alert("请先登录")
                }else if(rs.status==402){
                    alert("您没有该权限")
                }else if(rs.status==500){
                    alert('网络故障，请刷新重试')
                }
            }
        },
    	"oLanguage":language,
    	"aoColumns":[
            {"data":"Id"},
    		{"data":"fBillNo"},
    		{"data":"Maker"},
    		{"data":"Fdate"},
    		{"data":"flag"},
    	]
    });

    $(document).on('click','#add',function(){//单击新增按钮，弹出模态窗口
        $('#myModal').modal('show');
    });

    $(document).on('click','#save',function(){//保存按钮
        var fBillNo = $('#fBillNo').val();
        if(fBillNo && ""!=fBillNo){
            var data1 = {
                name:name,
                token:token,
                fBillNo:fBillNo,
            };
            $.ajax({
                'url': ip + "delayordericmo/load",
                'type': "post",
                'data': data1,
                "error" : function(rs) {
                    if(rs.status==401){
                        alert("请先登录")
                    }else if(rs.status==402){
                        alert("您没有该权限")
                    }else if(rs.status==500){
                        alert('网络故障，请刷新重试')
                    }
                },
                'success': function(rs){
                    if(rs.data!=null && rs.data.length>0 && rs.data[0]!=null){
                        alert("该物料代码已存在，请核实！");
                    }else{
                        $.ajax({
                            'url': ip + "delayordericmo/save",
                            'type': "post",
                            'data': data1,
                            'success': function(rs){
                                $('#myModal').modal('hide');
                                alert(rs);
                                table.ajax.reload();
                            }
                        });
                    }
                }
            });
        }else{
            alert("物料代码不能为空！");
        }
    });

    $('#example tbody').on('click','tr',function(){//单击选中某行
        $('.selected').toggleClass('selected');
        $(this).toggleClass('selected');
    });

    $(document).on("click","#upd",function() {//修改
        var td = $(".selected").children('td');
        if (td.length==0){
            alert('请选择一行');
        }else{
            Id = td.eq(0).text();
            fBillNo = td.eq(1).text();
            var data = {
                token: token,
                name: name,
            }
            $.ajax({  
                'url': ip+'delayordericmo/load?fBillNo='+fBillNo,   
                'type': 'post',
                'data': data,
                "error" : function(rs) {
                    if(rs.status==401){
                        alert("请先登录")
                    }else if(rs.status==402){
                        alert("您没有该权限")
                    }
                },
                'success': function(rs){
                    $('#fBillNo1').val(rs.data[0].fBillNo);
                    if(false==rs.data[0].flag){
                        $('#flag1').val(0);
                    }
                    if(true==rs.data[0].flag){
                        $('#flag1').val(1);
                    }
                    $('#Id1').val(rs.data[0].Id);
                    $('#myModal1').modal('show');
                },
            }); 
        }
    });

    $(document).on('click','#updsave',function(){//保存按钮
        var id = $('#Id1').val();
        var flag = $('#flag1').val();
        var data1 = {
            name:name,
            token:token,
            id:id,
            flag:flag,
        };
        $.ajax({
            'url': ip + "delayordericmo/updsave",
            'type': "post",
            'data': data1,
            'success': function(rs){
                $('#myModal1').modal('hide');
                alert(rs);
                table.ajax.reload();
            }
        });
    });

});

function initComplete(){
    var dataPlugin1='<div class="btn-group pull-left" role="group" aria-label="...">'+
                        '<button type="button" class="btn btn-default" id="add">新增</button>'+
                        '<button type="button" class="btn btn-default" id="upd">修改</button>'+
                    '</div>'
    $('.clear').append(dataPlugin1);
}