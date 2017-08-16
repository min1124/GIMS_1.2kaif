jQuery.support.cors = true;
var table;
$(function() {
	var name = getCookie("name");
	var token = getCookie("token");

	// table = $("#example").DataTable({
	// 	"bDestroy":true,
 //    	"paging": false,
 //    	"lengthChange": false,
 //    	"ordering": true,
 //    	"info": true,
 //    	"autoWidth": false,
 //        "searching": true,
 //        // "columnDefs": [{
 //        //     "visible": false,
 //        //     "targets": -1
 //        // }],
 //    	initComplete:initComplete,
 //    	"dom": 'T<"clear">lfrtip',
 //    	"tableTools": {
 //        	"sSwfPath": "../../plugins/datatables/extensions/TableTools/swf/copy_csv_xls_pdf.swf",
 //        	"aButtons": [{
 //                "sExtends": "xls",
 //          		"sButtonText": "导出Excel",
 //          	}],
 //    	}, 
 //    	"oLanguage":language,
 //    });

    $('#example tbody').on('click','tr',function(){//单击选中某行
        $('.selected').toggleClass('selected');
        $(this).toggleClass('selected');
    });

    $(document).on('click','#addBtn',function(){//增行
        var id = $('.selected').children('td').eq(0).text();
        if(id == ""){
            alert("请先选择一行!");
        }else{
            var row1 = $('.selected');  
            var row2 = row1.clone();  
            $(row2.children()[0]).html(parseInt(id)+1);
            var rowNode = table.row.add(row2).draw().node();  
            row1.after(rowNode);  
            row1.toggleClass('selected');
        }
    });
    $('.addBtn').click(function (){ //添加行按钮
        var row='<tr>'+
                  '<th><button class="delBtn"><i class="fa fa-fw fa-minus"></i></button></th>'+
                  '<th><input type="text" id="ckdh" style="width: 100%"></th>'+
                  '<th><input type="text" id="hth" disabled="disabled" style="width: 100%"></th>'+
                  '<th><input type="text" id="hh" disabled="disabled" style="width: 100%;"></th>'+
                  '<th><input type="text" id="wldm" disabled="disabled" style="width: 100%;"></th>'+
                  '<th><input type="text" id="wlms" disabled="disabled" style="width: 100%;"></th>'+
                  '<th><input type="text" id="xh" style="width: 48%;">/<input type="text" id="xs" style="width: 48%;"></th>'+
                  '<th><input type="text" id="mxsl" style="width: 100%;"></th>'+
                  '<th><input type="text" id="zsl" style="width: 100%;"></th>'+
                  '<th><input type="text" id="bz" disabled="disabled" style="width: 100%;"></th>'+
                  '<th><input type="text" id="cpph" disabled="disabled" style="width: 100%;"></th>'+
                '</tr>';
        $('#example').append(row);
    });

    $(document).on("click",".delBtn",function(){//删除行按钮
        var ths = $(this).parent().parent().children('th');

        var hj = 0;
        if($('#hj').val()){
            hj = $('#hj').val()
        }

        var zsl = 0;
        if(ths.eq(8).children('input').val()){
            zsl = ths.eq(8).children('input').val();
        }

        hj = parseInt(hj) - parseInt(zsl);
        $('#hj').val(hj);//合计
        $(this).parent().parent().remove();
        makeZXS();
    });

    $('#delete').click(function (){//删除行
        var id = $('.selected').children('td').eq(0).text();
        if(id == ""){
            alert("请先选择一行!");
        }else{
            var row1 = $('.selected');  
            row1.remove();  
            row1.toggleClass('selected');
        }
    });

    $(document).on("change","#ckdh",function(){//填写出库单号，带出合同号，行号，物料号，物料描述，总数量，备注
        var ths = $(this).parent().parent().children('th')
        var ckdh = ths.eq(1).children('input').val();

        var hj = 0;
        if($('#hj').val()){
            hj = $('#hj').val()
        }

        var zsl = 0;
        if(ths.eq(8).children('input').val()){
            zsl = ths.eq(8).children('input').val();
        }

        if(""==ckdh){
            alert("请填写出库单号！");
            ths.eq(2).children('input').val('')//合同号
            ths.eq(3).children('input').val('')//行号
            ths.eq(4).children('input').val('')//物料号
            ths.eq(5).children('input').val('')//物料描述
            ths.eq(8).children('input').val('')//总数量
            ths.eq(9).children('input').val('')//备注
                
            hj = parseInt(hj) - parseInt(zsl);
            $('#hj').val(hj);//合计
        }else{
            $.ajax({
                'url': ip+'deliveryorder/ckdhChange',   
                'type': 'post',
                'data': {
                    token: token,
                    name: name,
                    ckdh: ckdh,
                },
                'error':function(rs){
                    alert('网络故障，请刷新重试')
                },
                'success': function(rs){
                    if (rs.data[0]!=null){
                        ths.eq(2).children('input').val(rs.data[0].合同号)//合同号
                        ths.eq(3).children('input').val(rs.data[0].行号)//行号
                        ths.eq(4).children('input').val(rs.data[0].物料号)//物料号
                        ths.eq(5).children('input').val(rs.data[0].物料描述)//物料描述
                        ths.eq(8).children('input').val(rs.data[0].总数量)//总数量
                        ths.eq(9).children('input').val(rs.data[0].备注)//备注

                        hj = parseInt(hj) - parseInt(zsl) + parseInt(rs.data[0].总数量);
                        $('#hj').val(hj);//合计
                    }else{
                        ths.eq(2).children('input').val('')//合同号
                        ths.eq(3).children('input').val('')//行号
                        ths.eq(4).children('input').val('')//物料号
                        ths.eq(5).children('input').val('')//物料描述
                        ths.eq(8).children('input').val('')//总数量
                        ths.eq(9).children('input').val('')//备注
                            
                        hj = parseInt(hj) - parseInt(zsl);
                        $('#hj').val(hj);//合计
                    } 
                }
            });
        }
    });

    $(document).on("change","#xh",function(){//箱号：xh/xs
        makeZXS();
    });

    $(document).on("change","#xs",function(){//箱号：xh/xs
        makeZXS();
    });

    $(document).on('click','#excel',function(){//单击Excel导出按钮
        var inputTbody = new Array()
        var inputTfoot = new Array()
        // 获取table对象
        var table1 = document.getElementById('example');
        // 获取 table 内的全部 tbody
        var tbodys = table1.getElementsByTagName('tbody');
        if(tbodys && tbodys.length>0){
            var tbody = tbodys[0];
            // 获取 tbody 内的全部 input
            var textinputsTbody = tbody.getElementsByTagName('input');
            for(var i = 0; i < textinputsTbody.length; i++) {
                inputTbody[i]=textinputsTbody[i].value;
            }

            // 获取 table 内的全部 tbody
            var tfoots = table1.getElementsByTagName('tfoot');
            var tfoot = tfoots[0];
            // 获取 tbody 内的全部 input
            var textinputsTfoot = tfoot.getElementsByTagName('input');
            for(var i = 0; i < textinputsTfoot.length; i++) {
                inputTfoot[i]=textinputsTfoot[i].value;
            }
            $.ajax({
                'url': ip+'deliveryorder/index',   
                'type': 'post',
                'data': {
                  token: token,
                  name: name,
                  inputsTbody: inputTbody,
                  inputsTfoot: inputTfoot,
                },
                'error':function(rs){
                  alert('网络故障，请刷新重试')
                },
                'success': function(rs){
                    window.open(ip+rs, "_self"); 
                    //window.location.href = ip+rs;
                    alert("下载成功！");
                }
            });
        }else{
            alert("请至少填写一条交货记录！");
        }
    });
});

function initComplete(){
    var dataPlugin1='<div class="btn-group pull-left" role="group" aria-label="...">'+
                        '<button type="button" class="btn btn-default" id="addBtn">增行</button>'+
                        '<button type="button" class="btn btn-default" id="delete">删除</button>'+
                        '<button type="button" class="btn btn-default" id="excel">Excel导出</button>'+
                    '</div>'
    $('.clear').append(dataPlugin1);
}
function makeZXS(){
    var zxs = 0;
    $("input[id='xh']").each(function(index,xh){
        var xhVal = $(xh).val();
        var xsVal = $(xh).parent().find("input[id='xs']").val();
        if(""!=xsVal && "0"!=xsVal){
            if(""!=xhVal && "0"!=xhVal){
                zxs += parseFloat(xhVal)/parseFloat(xsVal);
            }
        }
    });
    $('#zxs').val(zxs);//总箱数
}