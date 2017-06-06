  jQuery.support.cors = true;
  var table
  var table1
  var type
  $(function () {
  var url = ip+"icmo/index"
  var token = getCookie('token');
  var name = getCookie('name');
  var data = {
      token: token,
      name: name,
    };
  table = $('#example').DataTable({
      "bDestroy":true,
      "scrollX": true,
      "paging": true,
      "lengthChange": false,
      "searching": true,
      "ordering": true,
      "info": true,
      "autoWidth": false,
      "dom": 'T<"clear">lfrtip',
      'initComplete': initComplete,
      "oLanguage": language, 
      "tableTools": {
          "sSwfPath": "../../plugins/datatables/extensions/TableTools/swf/copy_csv_xls_pdf.swf",
          "aButtons": [
            {
            "sExtends": "xls",
            "sButtonText": "导出Excel",
            }
          ],
      },
      'ajax': {  
        'url': url,  
        "data": function ( d ) {
             d.token=token;
             d.name=name;
             d.zzdh=$('#zzdh1').val();
             d.starttime = $('#starttime').val();
             d.endtime = $('#endtime').val();
        },  
        'type': 'POST',
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
      "aoColumns": [
        { "data": "制造单号" },
        { "data": "产品代码" },
        { "data": "生产车间" },
        { "data": "制造数量" },
        { "data": "SN号" },
        { "data": "产品名称" },
        { "data": "产品要求" },
        // { "data": "产品规格" },
        { "data": "制单人" },
        { "data": "包装要求" },
        { "data": "批号" },
        { "data": "工程师" },
        { "data": "品质工程师" },
        { "data": "日期" },              
        { "data": "计划开工日期" },
        { "data": "计划完工日期" },
      ]

    });
 
  $('#myTab a').click(function(){//根据用户加载table
    type = $(this).attr('id')
    if(type=='icmo'){
      table.ajax.reload
    }else if(type=='change'){
      table1 = $('#exam').DataTable({
        "destroy": true,
        "paging": true,
        "lengthChange": false,
        "searching": true,
        "info": true,
        "autoWidth": false,
        "oLanguage": language,
        'initComplete': initComplete2, 
        "dom": 'T<"clear1">lfrtip',
            "tableTools": {
              "sSwfPath": "../../plugins/datatables/extensions/TableTools/swf/copy_csv_xls_pdf.swf",
              "aButtons": [
                {
                "sExtends": "xls",
                "sButtonText": "导出Excel",
                }
              ],
            }, 
            ajax:{
              'url': ip + 'change/show',
              beforeSend:function(XMLHttpRequest){ 
                  $("#myModal1").modal('show')
              }, 
              'data': function(d){
                d.name= name;
                d.token= token;
                d.starttime= $('#starttime1').val();
                d.endtime= $('#endtime1').val();
              },
              'type': 'post',
              'error': function(rs){
                error(rs)
                $("#myModal1").modal('hide')
              }
            },
             "aoColumns": [
            { "data": "单据编号" },
            { "data": "制单日期" },
            { "data": "制单人" },
            { "data": "审核人" },
            { "data": "审核日期" },
            { "data": "ME审核人" },
            { "data": "ME审核时间" },
            { "data": "品质审核人" },
            { "data": "品质审核时间" },
            { "data": "生产任务单号" },
            { "data": "产品代码" },
            { "data": "产品名称" },
            { "data": "生产单位" },
            { "data": "生产数量" },              
            { "data": "生产投料单号" },
            { "data": "生产投料行号" },
            { "data": "变更标志" },
            { "data": "变更原因" },
            { "data": "物料代码" },
            { "data": "物料名称" },
            { "data": "单位用量" },
            { "data": "单位" },
            { "data": "标准用量" },
            { "data": "损耗率" },
            { "data": "损耗数量" },
            { "data": "应该数量" },
            { "data": "计划投料数量" },
            { "data": "计划发料日期" },
            { "data": "仓库" },
            { "data": "批号" },
            { "data": "变更人" },
            { "data": "变更日期" },
            { "data": "备注" },
          ]
      })
      // $("#myModal1").modal('hide') 
    }else if(type=='other'){
      $('#example2').DataTable({
        "bDestroy":true,
        "paging": true,
        "lengthChange": false,
        "searching": true,
        "info": true,
        "autoWidth": false,
        "oLanguage": language, 
        // "dom": 'T<"clear1">lfrtip',
        'initComplete': initComplete1,
        // "tableTools": {
        //     "sSwfPath": "/GIMS/plugins/datatables/extensions/TableTools/swf/copy_csv_xls_pdf.swf",
        //     "aButtons": [
        //       {
        //       "sExtends": "xls",
        //       "sButtonText": "导出Excel",
        //       // "bBomInc": true,
        //       // "sCharSet": "gb2312"
        //       }
        //     ],
        // },
        'ajax': {  
          'url': ip+'change/index',  
          "data": function ( d ) {
               d.token=token;
               d.name=name;
               // d.zzdh=$('#zzdh1').val();
               // d.starttime = $('#starttime').val();
               // d.endtime = $('#endtime').val();
          },  
          'type': 'POST',
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
        "aoColumns": [
          { "data": "单据编号" },
          { "data": "制单日期" },
          { "data": "制单人" },
          { "data": "ME审核人" },
          { "data": "品质审核人" },
          { "data": "生产任务单号" },
          { "data": "物料代码" },
          { "data": "物料名称" },
          { "data": "计量单位" },
          { "data": "BOM编号" },
          { "data": "计划生产数量" },
          { "data": "生产车间" },
          { "data": "成本对象" },
          { "data": "批号" },              
          { "data": "计划开工日期" },
          { "data": "计划完工日期" },
          { "data": "完工入库上限" },
          { "data": "完工入库下限" },
          { "data": "变更原因" },
          { "data": "变更日期" },
          { "data": "备注" },
          { "data": "变更人" },
        ]

      });
    }
  })
  var i = 0;
  $(document).on("click","#example tbody tr",function() {
    // alert($("#example tr").children('td').eq(4).text())
    i++;
    setTimeout(function () {
        i = 0;
    }, 500);
    if (i > 1) {
      var a=$(this).children('td').eq(0).text();
      var url1=ip+'icmo/ppbom_entry?sql='+a;
      var url=ip+'icmo/ppbom_main?sql='+a;
      $.ajax({  
          'url': url,   
          'type': 'post',
          'data': data,
          dataType: "json", 
          'success': function(rs){
            $("#scdw").val(rs.data[0].生产车间)//生产单位赋值
            $("#xdrq").val(rs.data[0].日期)//下单日期赋值
            $("#start").val(rs.data[0].计划开工日期)//计划开工日期赋值
            $("#zzdh").val(rs.data[0].制造单号)//制造单号赋值
            $("#zzsl").val(rs.data[0].制造数量)//制造数量赋值
            $("#end").val(rs.data[0].计划完工日期)//计划完工日期赋值
            $("#cpdm").val(rs.data[0].产品代码)//产品代码赋值
            $("#cpmc").val(rs.data[0].产品名称)//产品名称赋值
            $("#sn").val(rs.data[0].SN号)//SN号赋值
            $("#cpxh").val(rs.data[0].产品规格)//产品型号赋值
            $("#ph").val(rs.data[0].批号)//批号赋值
            $("#cpyq").val(rs.data[0].产品要求)//产品要求赋值
            $("#kh").val(rs.data[0].客户)//客户赋值
            $("#bzyq").val(rs.data[0].包装要求)//包装要求赋值
            $("#zdr").val(rs.data[0].制单人)//制单人赋值
            $("#gcs").val(rs.data[0].工程师)//制单人赋值
          },
        }); 
      $('#example1').DataTable({
        "bDestroy":true,
        "paging": true,
        "lengthChange": false,
        "searching": false,
        "ordering": true,
        "info": true,
        "autoWidth": false,
        "oLanguage": language, 
        'ajax': {  
          'url': url1,  
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
        "aoColumns": [
          { "data": "物料代码" },
          { "data": "物料名称" },
          { "data": "规格型号" },
          { "data": "单位" },
          { "data": "数量" },
          { "data": "备注" },
        ]
      });
      $('#myModal').modal('show')
    }
  });
  $("#review").click(function(){//任务制造单工程师审核
    if($('#gcs').val()==""){
      if(confirm("确定审核通过吗？")){
        review("gcs",token,name)
      }
    }else{
      alert("已经审核通过")
    }
  });
  $("#pzreview").click(function(){//任务制造单品质工程师审核
    if($('#gcs').val()==""){
      alert("还未进行工程师审核")
    }else{
      if(confirm("确定审核通过吗？")){
        review("pzgcs",token,name)
      }
    } 
  });

  $(document).on("click","#review_2",function(){//任务变更单工程师审核
      var billno = $("#exam1 tbody").children('tr').eq(0).children('td').eq(1).text().split('.')[0];
      if($('#me_2').val()==""){
          if(confirm("确定审核通过吗？")){
            change("me",token,name,billno)
          }
      }else{
          alert("已经审核通过")
      }
  });
  $(document).on("click","#pzreview_2",function(){//任务变更单品质工程师审核
    var billno = $("#exam1 tbody").children('tr').eq(0).children('td').eq(1).text().split('.')[0];
      if($('#me_2').val()==""){
          alert("还未进行工程师审核")
      }else{
          if($('#pz_2').val()==""){
            if(confirm("确定审核通过吗？")){
                change("pz",token,name,billno)
            }
          }else{
            alert("已经审核通过")
          }
      }
  });

  $(document).on("dblclick","#exam tbody tr",function() {//任务变更单双击
    var fbillno = $(this).children('td').eq(0).text();
    $.ajax({
      url: ip +'change/header1',
      type: 'post',
      data:{
      fbillno: fbillno,
      name: name,
      token: token,
      },
      error: function(XMLHttpRequest, textStatus, errorThrown){
        alert(XMLHttpRequest +" , "+ textStatus + " , " + errorThrown);
      },
      success: function(rs){
        $('#djbh').val(rs[0].单据编号)
        $('#zdrq').val(rs[0].制单日期)
            $('#zdr_1').val(rs[0].制单人)
            $('#me_2').val(rs[0].ME审核人)
            $('#pz_2').val(rs[0].品质审核人)
            $('#me_1').val(rs[0].ME审核时间)
            $('#pz_1').val(rs[0].品质审核时间)
            $('#shr').val(rs[0].审核人)
        $('#exam1').DataTable({
            "destroy": true,
            "paging": true,
              "lengthChange": false,
              "searching": false,
              "info": true,
              "autoWidth": false,
              "oLanguage": language, 
              "ajax":{
                url: ip + 'change/body1',
                type: 'post',
                data: {
                  fbillno: fbillno,
                  name: name,
                  token: token,
                },
              error: function(XMLHttpRequest, textStatus, errorThrown){
                $("#myModal1").modal('hide') 
                alert(XMLHttpRequest +" , "+ textStatus + " , " + errorThrown);
              },
              },
              "aoColumns": [
                { "data": "生产任务单号" },
                { "data": "产品代码" },
                { "data": "产品名称" },
                { "data": "生产单位" },
                { "data": "生产数量" },
                { "data": "生产投料单号" },
                { "data": "生产投料行号" },
                { "data": "变更标志" },
                { "data": "变更原因" },
                { "data": "物料代码" },
                { "data": "物料名称" },
                { "data": "单位用量" },
                { "data": "单位" },
                { "data": "标准用量" },              
                { "data": "损耗率" },
                { "data": "损耗数量" },
                { "data": "应该数量" },
                { "data": "计划投料数量" },
                { "data": "计划发料日期" },
                { "data": "仓库" },
                { "data": "批号" },
                { "data": "变更人" },
                { "data": "变更日期" },
                { "data": "备注" },
              ]
        })
        $('#Modal1').modal('show')
      }    
    });
    
  });
});
function initComplete(){ //初始化表格
  var dataPlugin1='<div class="btn-group pull-left" role="group" aria-label="...">'+
  '<button type="button" class="btn btn-default" id="search" style=" margin-right: 20px ">查询</button>'+
  '<span>制造单号：</span>'+
  '<input id="zzdh1" type="text" />'+
  '</div>'
  var dataPlugin2 ='<div id="time" class=" pull-left dateRange"> '+
                  '<span>开始时间：</span><input type="date" id="starttime"> ——<span>结束时间：</span><input type="date" id="endtime">'+
                  '</div>';
  // $('#mytoolbox1').append(dataPlugin1); 
  $('.clear').append(dataPlugin1);          
  $('.clear').append(dataPlugin2);
  
  $('#time').css("margin-left","20px"); 
  $('#search').click(function(){
    table.ajax.reload();
  });
}
function review(type,token,name){
  var a=$("#zzdh").val()
  var b=$("#cpdm").val()
  var url=ip+'icmo/review'
  var data = {
    token: token,
    name: name,
    'FBillNo':a,
    'FNumber':b,
    'type':type,
  };
  $.ajax({  
    'url': url,   
    'type': 'post',
    'data': data,
    'success': function(rs){
      if(rs=="0"){
        alert('审核成功')
      }
    },
    "error" : function(rs) {
      if(rs.status==401){
        alert("请先登录")
      }else if(rs.status==402){
        alert("您没有该权限")
      }
    } 
  });//任务单审核
}
function change(type,token,name,billno){
  $.ajax({  
    'url': ip + 'change/review1',   
    'type': 'post',
    'data': {
        type: type,
        fbillno: $('#djbh').val(),
        name: name,
        token: token,
        billno:billno,
    },
    'success': function(rs){
        $('#Modal').modal('hide')
        
        alert(rs)
    },
    "error" : function(rs) {
        if(rs.status==401){
          alert("请先登录")
        }else if(rs.status==402){
          alert("您没有该权限")
        }
        $('#Modal').modal('hide')
    } 
  }); //变更单审核
}
function initComplete1(){  
  // $('#change').click(function(){
  //   $('#ToolTables_example2_0').children('div').css('height','29')
  //   $('#ToolTables_example2_0').children('div').css('width','69')
  //   $('#ToolTables_example2_0').children('div').children('embed').css('height','29')
  //   $('#ToolTables_example2_0').children('div').children('embed').css('width','69')
  // });
}
function initComplete2(){
    $("#myModal1").modal('hide') 
    var dataPlugin1='<div class="btn-group pull-left" role="group" aria-label="...">'+
        '<button type="button" class="btn btn-default" id="true1">确定</button>'+
        '</div>'
    var dataPlugin2 ='<div id="time1" class=" pull-left dateRange"> '+
                  '<span>开始时间：</span><input type="date" id="starttime1"> ——<span>结束时间：</span><input type="date" id="endtime1">'+
                  '</div>' 
    $('.clear1').append(dataPlugin1);
    $('.clear1').append(dataPlugin2); 
    $('#time1').css("margin-left","200px"); 
    $('#true1').click(function(){
      if($('#starttime1').val()==''){
        alert('请选择开始时间')
      }else if ($('#endtime1').val()==''){
        alert('请选择结束时间')
      }else {
        table1.ajax.reload();
        $("#myModal1").modal('hide') 
      }
    });

    $('#ToolTables_exam_0').children('div').css('height','29')
    $('#ToolTables_exam_0').children('div').css('width','69')
    $('#ToolTables_exam_0').children('div').children('embed').css('height','29')
    $('#ToolTables_exam_0').children('div').children('embed').css('width','69')
  }

