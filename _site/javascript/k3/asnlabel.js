jQuery.support.cors = true;
$(function(){})
function doUpload() {  
    var formData = new FormData($( "#uploadForm" )[0]);  
    $.ajax({  
        url: ip+'asnlabel/upload' ,  
        type: 'POST',  
        data: formData,
        async: false,  
        cache: false,  
        contentType: false,  
        processData: false,  
        success: function (rs) {  
			$('#example').DataTable({
				"data":rs,
		        "bDestroy":true,
		        "lengthChange": false,
		        "paging": true,
		        "searching": false,
		        "oLanguage": language,
		        "dom": 'T<"clear1">lfrtip',
		        "tableTools": {
                  "sSwfPath": "../../plugins/datatables/extensions/TableTools/swf/copy_csv_xls_pdf.swf",
                  "aButtons": [
                    {
                    "sExtends": "xls",
                    "sButtonText": "导出Excel",
                    },
                  ],
                },
                "aoColumns":[
                    { "data": "箱号" },
                    { "data": "华为料号" },
                    { "data": "物料名称" },
                    { "data": "数量" },
                ], 
			})
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