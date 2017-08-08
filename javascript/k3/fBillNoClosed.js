jQuery.support.cors = true;
var table;
$(function() {
	var name = getCookie("name");
	var token = getCookie("token");

	table = $("#example").DataTable({
		"bDestroy":true,
    	"paging": false,
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
        	'url': ip + "fbillnoclosed/load",
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
    		{"data":"ID"},
    		{"data":"FBillNo"},
    		{"data":"create_date"},
    	]
    });

    $(document).on('click','#add',function(){//单击新增按钮，弹出模态窗口
        $('#myModal').modal('show');
    });


    $(document).on('click','#save',function(){//保存按钮
        if(confirm("确定保存么？")){

            var djbh = $('#djbh').val();

            var data = {
                name:name,
                token:token,
                djbh:djbh,
            };
            $.ajax({
                'url': ip + "fbillnoclosed/save",
                'type': "post",
                'data': data,
                'success': function(rs){
                    $('#myModal').modal('hide');
                    alert(rs);
                    table.ajax.reload();
                    $('#djbh').val('');
                }
            });
        }
    });
});

function initComplete(){
    var dataPlugin1='<div class="btn-group pull-left" role="group" aria-label="...">'+
                        '<button type="button" class="btn btn-default" id="add">新增</button>'+
                    '</div>'
    $('.clear').append(dataPlugin1);
    $('#cwcx').css("margin-left","400px"); 
}