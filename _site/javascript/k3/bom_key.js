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
        	'url': ip + "bomkey/load",
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
    		{"data":"id"},
    		{"data":"customer_number"},
    		{"data":"fnumber_hw"},
    		{"data":"fnumber_y"},
            {"data":"product_model"},
            {"data":"key_fnumber"},
            {"data":"product_line"},
            {"data":"key_fnumber_sel"},
            {"data":"fnumber_desc"},
            {"data":"father_weight"},
            {"data":"child_weitht"},
            {"data":"replace"},
            {"data":"create_date"},
            {"data":"create_emp"},
            {"data":"update_date"},
            {"data":"update_emp"},
            // {"data":"close_flag"},
    	]
    });

    $(document).on("dblclick","#example tbody tr",function() {//双击事件
        var Id = $(this).children('td').eq(0).text();
        var customerNumber = $(this).children('td').eq(1).text();
        var fnumberHw = $(this).children('td').eq(2).text();
        var fnumberY = $(this).children('td').eq(3).text();
        var keyFnumber = $(this).children('td').eq(5).text();
        var keyFnumberSel = $(this).children('td').eq(7).text();
        var fatherWeight = $(this).children('td').eq(9).text();
        var childWeitht = $(this).children('td').eq(10).text();
        hw(Id,customerNumber,fnumberHw,fnumberY,keyFnumber,keyFnumberSel,fatherWeight,childWeitht);
    }); 

    $(document).on("click","#updSave",function(){//保存按钮
        var id=$('#Id').val();

        var keyFnumberSel=$('#keyFnumberSel').val();  
        var fatherWeight=$('#fatherWeight').val();   
        var childWeitht=$('#childWeitht').val(); 

        var customerNumber=$("#customerNumber").val();//
        var fnumberHw=$("#fnumberHw").val();//
        var keyFnumber=$("#keyFnumber").val();// 
        var data={
          name:name,
          token:token,
          id:id,
          customerNumber:customerNumber,
          fnumberHw:fnumberHw,
          keyFnumber:keyFnumber,
          keyFnumberSel:keyFnumberSel,
          fatherWeight:fatherWeight,
          childWeitht:childWeitht,
        }
        $.ajax({
          url:ip+'bomkey/updSave',
          type:"POST",
          data:data,
          success:function(rs){
            if(0==rs){
              alert("更新成功！");
              $('#myModal').modal('hide');
              table.ajax.reload();
            }   
          }
        });
    });
});

function hw(Id,customerNumber,fnumberHw,fnumberY,keyFnumber,keyFnumberSel,fatherWeight,childWeitht){
    var select = $("#keyFnumberSel");
    if (fnumberY && ""!=fnumberY) {
        $.ajax({
            url: ip + 'bomkey/fnumberY',
            data: {
                fnumberY: fnumberY,
                fnumberHw: fnumberHw,
                keyFnumber: keyFnumber,
                name: getCookie('name'),
                token: getCookie('token'),
            },
            type: 'post',
            success: function(rs){
                select.empty();
                var option = $("<option>").text('').val('');
                select.append(option);
                for(var i=0;i<rs.data1.length;i++) {
                    var option ='<option value="'+rs.data1[i]['物料代码']+'">'+rs.data1[i]['物料代码']+'</option>';
                    select.append(option);
                }
                select.val(keyFnumberSel)//
                if(rs.data2!=null && rs.data2.length>0){
                    $("#childWeitht").val(rs.data2[0].单位用量.toString());//
                }else{
                    $("#childWeitht").val(childWeitht);//
                }
            }
        });
    }
    $("#Id").val(Id)//
    $("#customerNumber").val(customerNumber)//
    $("#fnumberHw").val(fnumberHw)//
    $("#fnumberY").val(fnumberY)//
    $("#keyFnumber").val(keyFnumber)//
  
    $("#fatherWeight").val(fatherWeight)//
    
    $('#myModal').modal('show')
}