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
        "scrollX": true,
    	"dom": 'T<"clear">lfrtip',
    	"tableTools": {
        	"sSwfPath": "../../plugins/datatables/extensions/TableTools/swf/copy_csv_xls_pdf.swf",
        	"aButtons": [{
          		"sExtends": "xls",
          		"sButtonText": "导出Excel",
          	}],
    	}, 
    	"ajax":{
        	'url': ip + "fnumberfoundation/load",
            'type': 'post',
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
    		{"data":"供应商物料编码"},
    		{"data":"供应商产品型号"},
    		{"data":"供应商物料描述"},
    		{"data":"物料小类"},
            {"data":"客户代码"},
            {"data":"客户物料编码"},
            {"data":"客户产品型号"},
            {"data":"单位"},
            {"data":"ITEM类别"},
            {"data":"良率%"},
            {"data":"货期（天）"},
            {"data":"生命周期状态"},
    	]
    });
});