
jQuery.support.cors = true;
var table;
$(function() {
    var name = getCookie("name");
    var token = getCookie("token");
    //var input=new Array();
            // 获取仓库选择table对象
            // var table1 = document.getElementById('exampleQuery');
            // if("" != table1 && table1 != null){
            //   alert(11111111);
            //   // 获取exampleQuery内的全部 input
            //   var textinputs = table1.getElementsByTagName('input');
            //   for(var i = 0; i < textinputs.length; i++) {
            //     if (textinputs[i].checked == true) {
            //       input[i]=textinputs[i].value;
            //       alert(textinputs[i].value);
            //     }
            //   }
            // }
    table = $("#example").DataTable({
        "bDestroy":true,
        "paging": true,
        "scrollX": true,
        "lengthChange": false,
        "order": [[ 2, "desc" ],[ 3, "desc" ]],
        "dom": 'RT<"clear">lfrtip',
        "colReorder": true,
        "info": true,
        "autoWidth": false,
        "searching": true,
        //initComplete:initComplete,
        "tableTools": {
            "sSwfPath": "../../plugins/datatables/extensions/TableTools/swf/copy_csv_xls_pdf.swf",
            "aButtons": [{
                "sExtends": "xls",
                "sButtonText": "导出Excel",
            }],
        }, 
        "ajax":{
            'url': ip + "seoutstock/load",
            "data":function(data){
              data.token = token;
              data.name = name;
              //data.inputs = input;
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
            {"data":"fbillno"},
            {"data":"FName"},
            {"data":"FDate"},
            {"data":"FTime"},
            {"data":"FFetchDate"},
            {"data":"FReceiveDate"},
            {"data":"f102"},
            {"data":"ghdw"},
            {"data":"fNumber"},
            {"data":"FNameCP"},
            {"data":"FQty"},
            {"data":"FCommitQty"},
            {"data":"fqtySum"},
            {"data":"FNote"},
            {"data":"FMapNumber"},
            {"data":"FMapName"},
            {"data":"FName_ChS"},
            {"data":"dept"},
            {"data":"orderType"},
            {"data":"custOrderNo"},
            {"data":"custRowNo"},
            {"data":"area"},
            {"data":"custAddress"},
            {"data":"custAddress1"},
            {"data":"deliverDate"},
            {"data":"FCheckerID"},
            {"data":"FClosed"},
            {"data":"noticType"},
        ]
    });

    // $.ajax({  //获取仓库列表
    //     'url': ip+'seoutstock/getCk',   
    //     'type': 'post',
    //     'data': {
    //       token: token,
    //       name: name,
    //     },
    //     'error':function(rs){
    //       alert('网络故障，请刷新重试')
    //     },
    //     'success': function(rs){
    //       var tableQuery = $("#exampleQuery");
    //       var tHead = tableQuery.children('thead');
    //       var tr;
    //       var row = rs.ckData.length/5;
    //       for(var i=0;i<rs.ckData.length;i++) {
    //         if(0==i%5){
    //           tr = document.createElement("tr");  
    //           tHead.append(tr);
    //         }
    //         if("1.03"==rs.ckData[i].ckNumber){
    //             var td = document.createElement("td");
    //             tr.append(td);
    //             var label = document.createElement("label");
    //             td.append(label);
    //             label.setAttribute("class", "checkbox-inline");
    //             var input = document.createElement("input");
    //             label.append(input);
    //             input.setAttribute("type","checkbox");
    //             input.setAttribute("checked","checked");
    //             input.setAttribute("value",rs.ckData[i].ckNumber);
    //             label.append(rs.ckData[i].ckNumber+" "+rs.ckData[i].ckName);                
    //         }else{
    //             var td = document.createElement("td");
    //             tr.append(td);
    //             var label = document.createElement("label");
    //             td.append(label);
    //             label.setAttribute("class", "checkbox-inline");
    //             var input = document.createElement("input");
    //             label.append(input);
    //             input.setAttribute("type","checkbox");
    //             input.setAttribute("value",rs.ckData[i].ckNumber);
    //             label.append(rs.ckData[i].ckNumber+" "+rs.ckData[i].ckName);                
    //         }
    //       }
    //     }
    // });
});

function initComplete(){
  var dataPlugin2='<div class="panel panel-default pull-left" style="width:70%;">'+
                    '<div class="panel-heading">'+
                      '<h4 class="panel-title">'+
                        '<a data-toggle="collapse" data-parent="#accordion" href="#collapseOne">'+
                          '<span>点击选择仓库（默认为1.03库）</span>'+
                        '</a>'+
                      '</h4>'+
                      '<button type="button" class="btn btn-default" id="ckQuery">查询</button>'+
                    '</div>'+
                    '<div id="collapseOne" class="panel-collapse collapse">'+//加in代表默认展开
                      '<div id="ck" class="panel-body form-group">'+
                        '<table id="exampleQuery" class="table table-bordered " style="table-layout:fixed;">'+
                          '<thead>'+
                          '</thead>'+
                        '</table>'+
                      '</div>'+
                    '</div>'+
                  '</div>';
  $('.clear').append(dataPlugin2);
}