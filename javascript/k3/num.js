jQuery.support.cors = true;
var table
$(function(){
	
});
function doUpload() {  //上传文件
    var formData = new FormData($( "#uploadForm" )[0]);  
    $.ajax({  
        url: ip+'return/excel' ,  
        type: 'POST',  
        data: formData,
        async: false,  
        cache: false,  
        contentType: false,  
        processData: false, 
        success: function (rs) {  
        	$('#example').empty()
            var row = '<thead>'+
                    '<tr>'+
                      '<th>物料长代码</th>'+
                      '<th>物料名称</th>'+
                      '<th>需求</th>'+
                      '<th>采购回复</th>'+
                      '<th>回复GAP</th>'+
                      '<th>'+rs.data2[6]+'可到货</th>'+
                      '<th>需求</th>'+
                      '<th>采购回复</th>'+
                      '<th>回复GAP</th>'+
                      '<th>'+rs.data2[7]+'可到货</th>'+
                      '<th>需求</th>'+
                      '<th>采购回复</th>'+
                      '<th>回复GAP</th>'+
                      '<th>'+rs.data2[8]+'可到货</th>'+
                      '<th>需求</th>'+
                      '<th>采购回复</th>'+
                      '<th>回复GAP</th>'+
                      '<th>'+rs.data2[9]+'可到货</th>'+
                      '<th>需求</th>'+
                      '<th>采购回复</th>'+
                      '<th>回复GAP</th>'+
                      '<th>'+rs.data2[10]+'可到货</th>'+
                      '<th>需求</th>'+
                      '<th>采购回复</th>'+
                      '<th>回复GAP</th>'+
                      '<th>'+rs.data2[11]+'可到货</th>'+
                      '<th>需求</th>'+
                      '<th>采购回复</th>'+
                      '<th>回复GAP</th>'+
                      '<th>'+rs.data2[12]+'可到货</th>'+
                      '<th>需求</th>'+
                      '<th>采购回复</th>'+
                      '<th>回复GAP</th>'+
                      '<th>'+rs.data2[13]+'可到货</th>'+
                      '<th>需求</th>'+
                      '<th>采购回复</th>'+
                      '<th>回复GAP</th>'+
                      '<th>'+rs.data2[14]+'可到货</th>'+
                      '<th>需求</th>'+
                      '<th>采购回复</th>'+
                      '<th>回复GAP</th>'+
                      '<th>'+rs.data2[15]+'可到货</th>'+
                      '<th>需求</th>'+
                      '<th>采购回复</th>'+
                      '<th>回复GAP</th>'+
                      '<th>'+rs.data2[16]+'可到货</th>'+
                      '<th>需求</th>'+
                      '<th>采购回复</th>'+
                      '<th>回复GAP</th>'+
                      '<th>'+rs.data2[17]+'可到货</th>'+
                      '<th>需求</th>'+
                      '<th>采购回复</th>'+
                      '<th>回复GAP</th>'+
                      '<th>'+rs.data2[18]+'可到货</th>'+
                      '<th>需求</th>'+
                      '<th>采购回复</th>'+
                      '<th>回复GAP</th>'+
                      '<th>'+rs.data2[19]+'可到货</th>'+
                      '<th>需求</th>'+
                      '<th>采购回复</th>'+
                      '<th>回复GAP</th>'+
                      '<th>'+rs.data2[20]+'可到货</th>'+
                    '</tr>'+
                  '</thead>'
            $('#example').append(row);
            table=$('#example').DataTable({
            	"data": rs.data1,
            	"bDestroy":true,
		        "paging": true,
		        "lengthChange": false,
		        "searching": true,
		        "ordering": true,
		        "dom": 'T<"clear">lfrtip',
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
            	"aoColumns":[
	                { "data": "物料长代码" },
	                { "data": "物料名称" },
	                { "data": "w1_1" },
	                { "data": "w1_2" },
	                { "data": "w1_3" },
	                { "data": "w1_4" },
	                { "data": "w2_1" },
	                { "data": "w2_2" },
	                { "data": "w2_3" },
	                { "data": "w2_4" },
	                { "data": "w3_1" },
	                { "data": "w3_2" },
	                { "data": "w3_3" },
	                { "data": "w3_4" },
	                { "data": "w4_1" },
	                { "data": "w4_2" },
	                { "data": "w4_3" },
	                { "data": "w4_4" },
	                { "data": "w5_1" },
	                { "data": "w5_2" },
	                { "data": "w5_3" },
	                { "data": "w5_4" },
	                { "data": "w6_1" },
	                { "data": "w6_2" },
	                { "data": "w6_3" },
	                { "data": "w6_4" },
	                { "data": "w7_1" },
	                { "data": "w7_2" },
	                { "data": "w7_3" },
	                { "data": "w7_4" },
	                { "data": "w8_1" },
	                { "data": "w8_2" },
	                { "data": "w8_3" },
	                { "data": "w8_4" },
	                { "data": "w9_1" },
	                { "data": "w9_2" },
	                { "data": "w9_3" },
	                { "data": "w9_4" },
	                { "data": "w10_1" },
	                { "data": "w10_2" },
	                { "data": "w10_3" },
	                { "data": "w10_4" },
	                { "data": "w11_1" },
	                { "data": "w11_2" },
	                { "data": "w11_3" },
	                { "data": "w11_4" },
	                { "data": "w12_1" },
	                { "data": "w12_2" },
	                { "data": "w12_3" },
	                { "data": "w12_4" },
	                { "data": "w13_1" },
	                { "data": "w13_2" },
	                { "data": "w13_3" },
	                { "data": "w13_4" },
	                { "data": "w14_1" },
	                { "data": "w14_2" },
	                { "data": "w14_3" },
	                { "data": "w14_4" },
	                { "data": "w15_1" },
	                { "data": "w15_2" },
	                { "data": "w15_3" },
	                { "data": "w15_4" },
	            ]
            });
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