jQuery.support.cors = true;
var table;
$(function(){
	var token = getCookie('token');
	var name = getCookie('name');
	table = $("#example").DataTable({
		"bDestroy":true,
    	"paging": true,
    	"lengthChange": false,
    	"ordering": true,
    	"info": true,
    	"autoWidth": false,
        "searching": true,
    	"dom": 'T<"clear">lfrtip',
    	"tableTools": {
        	"sSwfPath": "../../plugins/datatables/extensions/TableTools/swf/copy_csv_xls_pdf.swf",
        	"aButtons": [{
          		"sExtends": "xls",
          		"sButtonText": "导出Excel",
          	}],
    	}, 
    	"ajax":{
        	'url': ip + "bfprice/load",
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
    		{"data":"id"},
    		{"data":"FEntryNumber"},
    		{"data":"FRejClass"},
    		{"data":"RejAmountDJ"},
    	]
    });
});
function doUpload() {//上传文件函数
    var formData = new FormData($( "#uploadForm" )[0]);  
    var token = getCookie('token');
    var name = getCookie('name');
    if("李永青"==name){
        $.ajax({  
            url: ip+'bfprice/upload' ,  
            type: 'POST',  
            data: formData,
            async: false,  
            cache: false,  
            contentType: false,  
            processData: false,  
            success: function (rs) {  
                table.ajax.reload();
                alert(rs);  
            },  
            error: function (rs) {  
                if (rs.status == 403){
                    alert("文件类型不匹配")
                }else{
                    error(rs)
                }
            }  
        });   
    }else{
        alert("您没有上传权限！");
    }   
}  

