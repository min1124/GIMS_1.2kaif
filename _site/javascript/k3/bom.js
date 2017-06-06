jQuery.support.cors = true;
$(function () {
    var token = getCookie('token');
    var name = getCookie('name');
    $('#search').on('click',function(){
      // alert(document.cookie);
      var a=document.getElementById("code").value;
     if(document.getElementById("box").checked==true){
      var checkbox=0
     }else{
      var checkbox=1
     }
       
      //var url1='http://192.168.7.82:3001/bom/bomc';
      //var url='http://192.168.7.82:3001/bom/bomp';
      var data1 = {
        sql: a,
        token: token,
        name: name,
      };
      var data = {
        sql: a,
        checkbox:checkbox,
        token: token,
        name: name,
      };
      var table=$('#example').DataTable({
        "bDestroy":true,
        "paging": false,
        "lengthChange": false,
        "searching": false,
        "ordering": true,
        "info": false,
        "autoWidth": false,
        "dom": 'T<"clear">lfrtip',
        "tableTools": {
            "sSwfPath":  "../../plugins/datatables/extensions/TableTools/swf/copy_csv_xls_pdf.swf",
            "aButtons": [
              {
              "sExtends": "xls",
              "sButtonText": "导出Excel",
              }
            ],
        },
        'ajax': {  
          'url': ip + '/bom/bomp',  
          'data': data,  
          'type': 'POST',
          "error" : function(rs) {
            if(rs.status==401){
              alert("请先登录")
            }else if(rs.status==402){
              alert("您没有该权限")
            }
          }  
        }, 
        "fnInitComplete": function() {
            var total = 0;
            var table = document .getElementById ("example")
            var a = table.rows.length
            for (var i=1 ; i<a ; i++){
              total+=parseFloat(table.rows[i].cells[2].innerHTML)
            }
            document .getElementById ("total").value=total
            },
        "aoColumns": [
          { "data": "物料代码" },
          { "data": "仓库" },
          { "data": "数量" },
        ],
        "oLanguage": { //国际化
                "sLengthMenu": "每页显示 _MENU_ 条记录" , 
                "sZeroRecords": "抱歉， 没有找到" , 
                "sInfo": "从 _START_ 到 _END_ /共 _TOTAL_ 条数据", 
                "sInfoEmpty": "没有数据" , 
                "sInfoFiltered": "(从 _MAX_ 条数据中检索)" , 
                "oPaginate": { 
                      "sFirst": "首页" , 
                      "sPrevious": "前一页" , 
                      "sNext": "后一页" , 
                      "sLast": "尾页"  
               }, 
                "sZeroRecords": "没有检索到数据" , 
                "sProcessing": "<img src='./loading.gif' />" 
          }, 
        // "columnDefs": [{
        //         "targets": 3,//编辑
        //         "data": null,
        //         "defaultContent": "<button id='editrow' class='btn btn-primary' type='button'><i class='fa fa-edit'></i></button>"
        // },{
        //         "targets": 4,//删除
        //         "data": null,
        //         "defaultContent": "<button id='delrow' class='btn btn-primary' type='button'><i class='fa fa-trash-o'></i></button>"
        // },
        // ]
      });
      
      $('#example1').DataTable({
        "bDestroy":true,
        "resetPaging": true,
        "lengthChange": false,
        "searching": false,
        "ordering": true,
        "info": true,
        "autoWidth": false,
        "dom": 'T<"clear">lfrtip',
        "tableTools": {
            "sSwfPath":  "../../plugins/datatables/extensions/TableTools/swf/copy_csv_xls_pdf.swf",
            "aButtons": [
              {
              "sExtends": "xls",
              "sButtonText": "导出Excel",
              }
            ],
        },
        'ajax': {  
          'url': ip + '/bom/bomc',  
          'data': data1,  
          'type': 'POST',
          "error" : function(rs) {
            // alert(status)
          }
        },  
        "oLanguage": { //国际化
                "sLengthMenu": "每页显示 _MENU_ 条记录" , 
                "sZeroRecords": "抱歉， 没有找到" , 
                "sInfo": "从 _START_ 到 _END_ /共 _TOTAL_ 条数据", 
                "sInfoEmpty": "没有数据" , 
                "sInfoFiltered": "(从 _MAX_ 条数据中检索)" , 
                "oPaginate": { 
                      "sFirst": "首页" , 
                      "sPrevious": "前一页" , 
                      "sNext": "后一页" , 
                      "sLast": "尾页"  
               }, 
                "sZeroRecords": "没有检索到数据" , 
                "sProcessing": "<img src='./loading.gif' />" 
          }, 
        "aoColumns": [
          // { "data": "BOM内码" },
          // { "data": "子料内码" },
          // { "data": "子料编号" },
          { "data": "物料代码" },
          { "data": "物料名称" },
          { "data": "物料型号" },
          { "data": "单位用量" },
          { "data": "物料属性" },
          { "data": "即时库存" },
          { "data": "备注" },
        ]

        });
    // table.fnInitComplete(){
    //   var valueTd=document .getElementById ("example").rows [0].cells[0];
    //   alert(valueTd.innerHTML) ;
    // }  
    
	});
});
