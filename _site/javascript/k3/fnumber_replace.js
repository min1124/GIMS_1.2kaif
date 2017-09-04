jQuery.support.cors = true;
var table;
$(function () {
  var token = getCookie('token');
  var name = getCookie('name');

  table=$('#example').DataTable({
    "bDestroy":true,
    'bSort':false,
    "scrollX": true,
    "paging": true,
    "lengthChange": false,
    "searching": false,
    "ordering": true,
    "info": true,
    "autoWidth": false,
    "tableTools": {
      "sSwfPath": "../../plugins/datatables/extensions/TableTools/swf/copy_csv_xls_pdf.swf",
      "aButtons": [
        {
          "sExtends": "xls",
          "sButtonText": "导出Excel",
        }
      ],
    },
    'ajax':{
      'type': 'post',
      url:ip+"replace/index",
      "error" : function(rs) {
        if(rs.status==401){
          alert("请先登录")
        }else if(rs.status==402){
          alert("您没有该权限")
        }else if(rs.status==500){
          alert('网络故障，请刷新重试')
        }
      } , 
      "data": function ( d ) {
        d.token=token;
        d.name=name;
        d.zldm = $('#zldm').val();
        d.tdldm = $('#tdldm').val();
      }
    },
    'searching':true,
    initComplete:initComplete,
    "dom": 'T<"clear">lfrtip',
    "oLanguage":language,   
    "aoColumns": [
      { "data": "ZfNumber" },
      { "data": "ZfName" },
      // { "data": "ZfModel" },
      { "data": "FBillNo" },
      { "data": "TfNumber" },
      { "data": "TfName" },
      // { "data": "TfModel" },
      { "data": "FQty" },
      { "data": "FBOMNumber" },
      { "data": "bomFNumber" },
      { "data": "sfqd" },
      { "data": "sfhy" },
      { "data": "FVersion" },
    ]
  });
});

function initComplete(){ //初始化表格
  var dataPlugin1 = '<div id="dataPlugin1" class="btn-group pull-left" role="group" aria-label="..." style="width: 75%;">'+
                      '<table id="exampleQuery" class="table table-bordered " style="table-layout:fixed;">'+
                        '<thead>'+
                          '<tr>'+
                            '<th style="width: 20%;">主料代码：</th>'+
                            '<th style="width: 20%;">替代料代码：</th>'+
                            '<th style="width: 20%;"></th>'+
                          '</tr>'+
                          '<tr>'+
                            '<th>'+
                              '<input type="text" id="zldm" style="width: 100%">'+
                            '</th>'+
                            '<th>'+
                              '<input type="text" id="tdldm" style="width: 100%">'+
                            '</th>'+
                            '<th>'+
                              '<button type="button" class="btn btn-default" id="query">查询</button>'+
                              '<button type="button" class="btn btn-default" id="clear">清空</button>'+
                            '</th>'+
                          '</tr>'+
                        '</thead>'+
                      '</table>'+
                    '</div>'
  $('.clear').append(dataPlugin1); 
  $('#query').css("margin-left","20px");
  $('#clear').css("margin-left","20px");

  $(document).on("change","#zldm",function(){//主料代码
    table.ajax.reload();
  });

  $(document).on("change","#tdldm",function(){//替代料代码
    table.ajax.reload();
  });

  $('#query').click(function(){
    table.ajax.reload();
  });

  $('#clear').click(function(){
    $('#zldm').val('');
    $('#tdldm').val('');
    table.ajax.reload();
  });
}