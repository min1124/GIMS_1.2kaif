jQuery.support.cors = true;
var table;
$(function() {
	var name = getCookie("name");
	var token = getCookie("token");

	table = $("#example").DataTable({
		"bDestroy":true,
    	"paging": false,
    	"lengthChange": false,
    	//"searching": false,
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
        	'url': ip + "zxhub/load",
        	"data":function(data){
          		data.token = token;
          		data.name = name;
                data.cwcxsel = $('#cwcxsel').val();
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
    		{"data":"id"},
    		{"data":"model"},
    		{"data":"fnumber"},
    		{"data":"address"},
    	]
    });

    $(document).on("change","#cwcxsel",function(){//仓位下拉选项
      table.ajax.reload();
    });

    $(document).on('click','#delete',function(){
        var id = $('.selected').children('td').eq(0).text();
        if(id == ""){
            alert("请先选择一行!");
        }else{
            if(confirm("确定删除吗？")){
                $.ajax({
                    'url' : ip + "zxhub/delete",
                    'type' : 'post',                    
                    'success' : function(rs){
                        alert(rs);
                        table.ajax.reload();
                    },
                    'data' : {
                        token : token,
                        name : name,
                        id : id,
                    },
                });
            }
        }
    });

    $('#example tbody').on('click','tr',function(){//单击选中某行
        $('.selected').toggleClass('selected');
        $(this).toggleClass('selected');
    });


    $(document).on('click','#add',function(){//单击新增按钮，弹出模态窗口
        $('#myModal').modal('show');
    });


    $(document).on('click','#save',function(){//保存按钮
        if(confirm("确定保存么？")){

            var xh = $('#xh').val();
            var khdm = $('#khdm').val();
            var cw = $('#cw').val();

            var data = {
                name:name,
                token:token,
                xh:xh,
                khdm:khdm,
                cw:cw,
            };
            $.ajax({
                'url': ip + "zxhub/save",
                'type': "post",
                'data': data,
                'success': function(rs){
                    $('#myModal').modal('hide');
                    alert(rs);
                    table.ajax.reload();
                }
            });
        }
    });
});

function initComplete(){
    var dataPlugin1='<div class="btn-group pull-left" role="group" aria-label="...">'+
        '<button type="button" class="btn btn-default" id="add">新增</button>'+
        '<button type="button" class="btn btn-default" id="delete">删除</button>'+
        '</div>'
    var dataPlugin2 = '<div id="cwcx" class=" pull-left dateRange"> '+
                        '<span>仓位：</span>'+
                        '<select id="cwcxsel" name="cwcxsel" class="form-control" style="display:inline;width: 140px;height: 100%">'+
                          '<option selected="selected" value="all">全部</option>'+
                          '<option value="VMI">VMI</option>'+
                          '<option value="BHUB">BHUB</option>'+
                          '<option value="B">B</option>'+
                        '</select>'+
                      '</div>';
    $('.clear').append(dataPlugin1);
    $('.clear').append(dataPlugin2);
    $('#cwcx').css("margin-left","400px"); 
}