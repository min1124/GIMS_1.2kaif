  var table
  var table1
  var table2
  var token
  var name
  var type = 'icmo'
  jQuery.support.cors = true;
  $(function () {
  var url = ip+"icmo/index"
  token = getCookie('token');
  name = getCookie('name');
  table = $('#example').DataTable({
      "Destroy":true,
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
             d.sccjSel = $('#sccjSel').val();
             d.type = type;
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
        { "data": "配料时间" },
        { "data": "制造单号" },
        { "data": "产品代码" },
        { "data": "生产车间" },
        { "data": "制造数量" },
        { "data": "SN号" },
        { "data": "产品名称" },
        { "data": "产品要求" },
        // { "data": "产品规格" },
        { "data": "制单人" },
        // { "data": "包装要求" },
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
      $('#myModalLabel').html("生产任务制造单")
      table.ajax.reload()
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
        // 'initComplete': initComplete1,
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
    }else if(type=='sub'){
      $('#myModalLabel').html("委外加工任务单")
      table2 = $('#example-sub').DataTable({
        "bDestroy":true,
        "paging": true,
        "lengthChange": false,
        "searching": true,
        "info": true,
        "autoWidth": false,
        "oLanguage": language, 
        "dom": 'T<"clear2">lfrtip',
        'initComplete': initComplete1,
        "tableTools": {
            "sSwfPath": "../../plugins/datatables/extensions/TableTools/swf/copy_csv_xls_pdf.swf",
            "aButtons": [
              {
              "sExtends": "xls",
              "sButtonText": "导出Excel",
              }
            ],
        },
        "ajax":{
          url:ip + "icmo/sub",
          type: 'post',
          data:function(d){
            d.name = name;
            d.token = token;
            d.starttime = $('#starttime2').val();
            d.endtime = $('#endtime2').val();
          },
          error: function(rs){
            error(rs)
          },
        },
        "aoColumns": [
          { "data": "委外订单号" },
          { "data": "制造数量" },
          { "data": "产品代码" },
          { "data": "产品名称" },
          { "data": "产品规格" },
          { "data": "包装要求" },
          { "data": "产品要求" },
          { "data": "SN号" },
          { "data": "编号" },
          { "data": "审核人" },
          { "data": "制单人" },
          { "data": "工程师" },
          { "data": "品质工程师" },
          { "data": "加工单位" },
          { "data": "日期" },
          { "data": "开工日期" },
          { "data": "完工日期" },
        ]
      })
    }
  })
  $(document).on("dblclick","#example tbody tr",function() {
    
      var a=$(this).children('td').eq(1).text();
      form(a)
    
  });
  $("#review").click(function(){//任务制造单/委外制造单工程师审核
    if($('#gcs').val()==""){
      if(confirm("确定审核通过吗？")){
        review("gcs",token,name)
      }
    }else{
      alert("已经审核通过")
    }
  });
  $("#pzreview").click(function(){//任务制造单/委外制造单品质工程师审核
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

  $(document).on("dblclick","#example-sub tbody tr",function(){//委外任务单双击
    var a=$(this).children('td').eq(0).text();
    form(a)
  })
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
  var dataPlugin3 = '<div id="sccjDiv" class=" pull-left dateRange"> '+
                      '<span>生产车间：</span>'+
                      '<select id="sccjSel" name="sccjSel" class="form-control" style="display:inline;width: 120px;height: 100%">'+
                        '<option value="all">全部</option>'+
                        '<option value="ME车间">ME车间</option>'+
                        '<option value="TO生产部">TO生产部</option>'+
                        '<option value="管芯生产部">管芯生产部</option>'+
                        '<option value="模块">模块生产部</option>'+
                        '<option value="器件">器件生产部</option>'+
                        '<option value="研发车间(正源)">研发车间(正源)</option>'+
                        '<option value="子系统BOB车间">子系统BOB车间</option>'+
                      '</select>'+
                    '</div>';
  // $('#mytoolbox1').append(dataPlugin1); 
  $('.clear').append(dataPlugin1);          
  $('.clear').append(dataPlugin2);
  $('.clear').append(dataPlugin3);
  
  $('#time').css("margin-left","20px"); 
  $('#sccjDiv').css("margin-left","20px");
  $('#search').click(function(){
    table.ajax.reload();
  });

  $(document).on("change","#sccjSel",function(){//单据状态下拉选项
    table.ajax.reload();
  });

}
function review(stype,token,name){//任务单审核
  var a=$("#zzdh").val()
  var b=$("#cpdm").val()
  var url=ip+'icmo/review'
  var data = {
    token: token,
    name: name,
    'FBillNo':a,
    'FNumber':b,
    'type':type,
    'stype': stype,
  };
  $.ajax({  
    'url': url,   
    'type': 'post',
    'data': data,
    'success': function(rs){
      if(rs=="0"){
        alert('审核成功')
      }else{
        alert(rs)
      }
      $('#myModal').modal('hide')
    },
    "error" : function(rs) {
      if(rs.status==401){
        alert("请先登录")
      }else if(rs.status==402){
        alert("您没有该权限")
      }
      $('#myModal').modal('hide')
    } 
  });
}
function change(type,token,name,billno){//变更单审核
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
  }); 
}
function initComplete1(){  
  var dataPlugin1='<div class="btn-group pull-left" role="group" aria-label="...">'+
      '<button type="button" class="btn btn-default" id="true2">确定</button>'+
      '</div>'
  var dataPlugin2 ='<div id="time2" class=" pull-left dateRange"> '+
                '<span>开始时间：</span><input type="date" id="starttime2"> ——<span>结束时间：</span><input type="date" id="endtime2">'+
                '</div>' 
  $('.clear2').append(dataPlugin1);
  $('.clear2').append(dataPlugin2); 
  $('#time2').css("margin-left","200px"); 
  $('#true2').click(function(){
    if($('#starttime2').val()==''){
      alert('请选择开始时间')
    }else if ($('#endtime2').val()==''){
      alert('请选择结束时间')
    }else {
      table2.ajax.reload();
    }
  });
  $('#ToolTables_example-sub_0').children('div').css('height','29')
  $('#ToolTables_example-sub_0').children('div').css('width','69')
  $('#ToolTables_example-sub_0').children('div').children('embed').css('height','29')
  $('#ToolTables_example-sub_0').children('div').children('embed').css('width','69')
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

function form(sql){//弹出model
  $("#scdw").val('')//生产单位赋值
  $("#xdrq").val('')//下单日期赋值
  $("#start").val('')//计划开工日期赋值
  $("#zzdh").val('')//制造单号赋值
  $("#zzsl").val('')//制造数量赋值
  $("#end").val('')//计划完工日期赋值
  $("#cpdm").val('')//产品代码赋值
  $("#cpmc").val('')//产品名称赋值
  $("#sn").val('')//SN号赋值
  $("#cpxh").val('')//产品型号赋值
  $("#ph").val('')//批号赋值
  $("#cpyq").val('')//产品要求赋值
  $("#kh").val('')//客户赋值
  $("#bzyq").val('')//包装要求赋值
  $("#zdr").val('')//制单人赋值
  $("#gcs").val('')//制单人赋值
  $("#pzgcs").val('')//制单人赋值-----------------

  var rowset 
  if(type=="icmo"){
    var row = "<thead>"+
                "<tr>"+
                  "<th>物料代码</th>"+
                  "<th>物料名称</th>"+
                  "<th>规格型号</th>"+
                  "<th>单位</th>"+
                  "<th>数量</th>"+
                  "<th>备注</th>"+
                "</tr>"+
              "</thead> "
    $('#example1').empty()
    $('#example1').append(row)
    rowset = [
      { "data": "物料代码" },
      { "data": "物料名称" },
      { "data": "规格型号" },
      { "data": "单位" },
      { "data": "数量" },
      { "data": "备注" },
    ]
  }else if(type=="sub"){
    var row = "<thead>"+
                "<tr>"+
                  "<th>物料代码</th>"+
                  "<th>物料名称</th>"+
                  "<th>规格型号</th>"+
                  "<th>单位</th>"+
                  "<th>数量</th>"+
                "</tr>"+
              "</thead> "
    $('#example1').empty()
    $('#example1').append(row)
    rowset = [
      { "data": "物料代码" },
      { "data": "物料名称" },
      { "data": "规格型号" },
      { "data": "单位" },
      { "data": "数量" },
    ]
  }
  $.ajax({  
      'url': ip + 'icmo/ppbom_main',   
      'type': 'post',
      'data': {
        name: name,
        token: token,
        type: type,
        sql: sql,
      },
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
        // $("#bzyq").val(rs.data[0].包装要求)//包装要求赋值
        $("#plsj").val(rs.data[0].配料时间)//配料时间赋值
        $("#zdr").val(rs.data[0].制单人)//制单人赋值
        $("#gcs").val(rs.data[0].工程师)//制单人赋值
        $("#pzgcs").val(rs.data[0].品质工程师)//制单人赋值-----------------
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
      'url': ip + 'icmo/ppbom_entry',  
      'data': {
        name: name,
        token: token,
        type: type,
        sql: sql,
      },  
      'type': 'POST',
      "error" : function(rs) {
        if(rs.status==401){
          alert("请先登录")
        }else if(rs.status==402){
          alert("您没有该权限")
        }
      }  
    }, 
    "aoColumns": rowset
  });
  $('#myModal').modal('show')
}
