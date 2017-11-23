jQuery.support.cors = true;
var table;
$(function () {
  var token = getCookie('token');
  var name = getCookie('name');
  $.ajax({  //获得部门
    'url': ip+'retrieve/de',   
    'type': 'post',
    'data': {
      token: token,
      name: name,
    },
    'error':function(rs){
      alert('网络故障，请刷新重试')
    },
    'success': function(rs){
      var select = $("#bmbz");
      var option = $("<option>").text('').val('');
      select.append(option);          
      for(var i=0;i<rs.data.length;i++) {
        var option = $("<option>").text(rs.data[i].FName).val(rs.data[i].FItemID);
        select.append(option);
      }
    }
  });

  document.getElementById('rq').valueAsDate = new Date();

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
        // "bBomInc": true,
        // "sCharSet": "gb2312"
        }
      ],
    },
    'ajax':{
      url:ip+"retrieve/index",
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
        d.starttime = $('#starttime').val();
        d.endtime = $('#endtime').val();
        d.djzt = $('#djzt').val();
        d.bfbmcx = $('#bfbmcx').val();
        d.clyjcx = $('#clyjcx').val();
      } 
    },
    'searching':true,
    initComplete:initComplete,
    "dom": 'T<"clear">lfrtip',
    "oLanguage":language, 
    "aoColumns": [
      { "data": "单据编号" },
      { "data": "制造单号" },
      { "data": "产品代码" },
      { "data": "产品名称" },
      { "data": "制造单数量" },
      { "data": "批号" },
      { "data": "不合格物料代码" },
      { "data": "不合格物料名称" },
      { "data": "不合格数量" },
      { "data": "不合格现象" },
      { "data": "部门" },
      { "data": "制单人" },
      { "data": "日期" },
      { "data": "部门负责人" },
      { "data": "部门审核时间" },
      { "data": "ME负责人" },
      { "data": "ME审核时间" },
      { "data": "品质负责人" },
      { "data": "品质审核时间" },        
      { "data": "处理意见" },
      { "data": "生管负责人" },
      { "data": "生管审核时间" },
      { "data": "生产场地" },
      { "data": "状态" },
    ],
  });

  $(document).on("click","#add",function(){//增加按钮显示新增模态框
    $('#myModal').modal('show')  
  });

  $(document).on("change","#bmbz",function(){//部门下拉选项
    var Dept=''
    switch($('#bmbz option:selected').text()){
      case "模块生产一部":
          Dept = "MK";
          break;
      case "模块生产二部":
          Dept = "MK";
          break;
      case "模块生产部":
          Dept = "MK";
          break;
      case "器件生产部":
          Dept = "QJ";
          break;
      case "TO生产部":
          Dept = "TO";
          break;
      case "TO生产部(发光)":
          Dept = "TO";
          break;
      case "ME车间":
          Dept = "ME";
          break;
      case "研发车间(正源)":
          Dept = "YF";
          break;
      case "生产管理部":
          Dept = "SG";
          break;
      case "管芯生产部":
          Dept = "GX";
          break;
      case "管芯技术部":
          Dept = "GJ";
          break;
      case "开发工程部":
          Dept = "KF";
          break;
      case "公共研发部":
          Dept = "GY";
          break;
      case "高速产品线":
          Dept = "GS";
          break;
      case "数通产品线":
          Dept = "ST";
          break;
      case "SFP产品线":
          Dept = "SF";
          break;
      case "PON产品线":
          Dept = "PO";
          break;
      case "成都研发部":
          Dept = "CY";
          break;
    }
    if (Dept==""){
      $("#djbh").val("")
    }else{
      var date = new Date();
      var year=(date.getYear()-100).toString();
      var month = date.getMonth() + 1 ;
      month=(month<10?"0"+month:month).toString();
      $.ajax({  
        'url': ip+'retrieve/dept',
        'data':{
          token: token,
          name: name,
          deptYearMonth:Dept+year+month,
          dept:Dept,
        } ,  
        'type': 'post',
        'success': function(rs){
          if(""!=rs){
            var a=rs.substring(0,4)
            var b=parseInt(rs.substring(4))+1
            bstring = "";
            if (a==(year+month)){
              switch(b.toString().length){
                case 1:
                bstring = "000"+b.toString();
                break;
                case 2:
                bstring = "00"+b.toString();
                break;
                case 3:
                bstring = "0"+b.toString();
                break;
                case 4:
                bstring = b.toString();
                break;
              }
              $("#djbh").val(Dept+a+bstring);
            }else{
              $("#djbh").val(Dept+year+month+"0000");
            }
          }else{
            $("#djbh").val(Dept+year+month+"0000");
          }                           
        }
      });
    }      
  });

  $(document).on("change","#zzdh",function(){ //单据信息获取
    var data={
      name:name,
      token:token,
      sql:$(this).val(),
    }
    $.ajax({
      url:ip+'retrieve/zzd',
      type:"POST",
      data:data,
      success:function(rs){
        if (rs.data[0]!=null){
          $("#cpdm").val(rs.data[0].产品代码)
          $("#cpmc").val(rs.data[0].产品名称)
          $("#zzsl").val(rs.data[0].制造数量)
        }else{
          $("#cpdm").val("")
          $("#cpmc").val("")
          $("#zzsl").val("")
        }
      }
    });
  });    

  $(document).on("change","#bhgfnumber",function(){ //物料代码带出物料名称
    var data={
      name:name,
      token:token,
      sql:$(this).val(),
    }
    $.ajax({
      url:ip+'retrieve/cpdm',
      type:"POST",
      data:data,
      success:function(rs){
        if (rs.data!=null && rs.data[0]!=null){
          $("#bhgfname").val(rs.data[0].产品名称)
        }else{
          $("#bhgfname").val("")
        }
      }
    });
  });

  $(document).on("click","#save",function(){//保存按钮
    if(confirm("确定保存吗？")){
      var bmbz=$('#bmbz').val();
      var djbh=$('#djbh').val();
      var rq=$('#rq').val();
      var zzdh=$('#zzdh').val();
      var cpdm=$('#cpdm').val();
      var cpmc=$('#cpmc').val();
      var zzsl=$('#zzsl').val();
      var ph=$('#ph').val();
      var bhgfnumber=$('#bhgfnumber').val();
      var bhgfname=$('#bhgfname').val();
      var bhgsl=$('#bhgsl').val();
      var bhgxx=$('#bhgxx').val();
      var data={
        name:name,
        token:token,
        bmbz:bmbz,
        djbh:djbh,
        rq:rq,
        zzdh:zzdh,
        cpdm:cpdm,
        cpmc:cpmc,
        zzsl:zzsl,
        ph:ph,
        bhgfnumber:bhgfnumber,
        bhgfname:bhgfname,
        bhgsl:bhgsl,
        bhgxx:bhgxx,
      }
      $.ajax({
        url:ip+'retrieve/rejection',
        type:"POST",
        data:data,
        success:function(rs){
          alert(rs);
          if("保存成功"==rs){
            $('#myModal').modal('hide');
            $('#bmbz').val('');
            $('#djbh').val('');
            $('#rq').val('');
            $('#zzdh').val('');
            $('#cpdm').val('');
            $('#cpmc').val('');
            $('#zzsl').val('');
            $('#ph').val('');
            $('#bhgfnumber').val('');
            $('#bhgfname').val('');
            $('#bhgsl').val('');
            $('#bhgxx').val('');
            table.ajax.reload();
          }   
        }
      });
    }
  });

  $('#example tbody').on('click', 'tr', function (){//选中某行
    $('.selected').toggleClass('selected');
    $(this).toggleClass('selected');
  });
  
  $(document).on("click","#delete",function(){//删除按钮
    var djbh=$(".selected").children('td').eq(0).text();
    if (djbh==""){
      alert("请先选择一行!")
    }else{
      if(confirm("确定删除吗？")){
        $.ajax({  
          'url': ip+"retrieve/delete",   
          'type': 'post',
          'success':function(rs){
            alert(rs)
            table.ajax.reload();
          },
          'error':function(rs){
            if(rs.status==401){
              alert("请先登录")
            }else if(rs.status==402){
              alert("您没有该权限")
            }else if(rs.status==500){
              alert('网络故障，请刷新重试')
            }
          },
          'data': {
            name:name,
            token:token,
            djbh:djbh,
          },
        });
      }
    } 
  });

  $(document).on("dblclick","#example tbody tr",function() {//双击事件
    var a=$(this).children('td').eq(0).text();
    var data = {
      token: token,
      name: name,
    }
    $.ajax({  
      'url': ip+'retrieve/t_Rejection?sql='+a,   
      'type': 'post',
      'data': data,
      "error" : function(rs) {
        if(rs.status==401){
          alert("请先登录")
        }else if(rs.status==402){
          alert("您没有该权限")
        }
      } ,
      'success': function(rs){
        $('#bmbz1').val(rs.data[0].部门);
        $('#djbh1').val(rs.data[0].单据编号);
        $('#rq1').val(rs.data[0].日期);
        $('#zzdh1').val(rs.data[0].制造单号);
        $('#cpdm1').val(rs.data[0].产品代码);
        $('#cpmc1').val(rs.data[0].产品名称);
        $('#zzsl1').val(rs.data[0].制造单数量);
        $('#ph1').val(rs.data[0].批号);
        $('#bhgfnumber1').val(rs.data[0].不合格物料代码);
        $('#bhgfname1').val(rs.data[0].不合格物料名称);
        $('#bhgsl1').val(rs.data[0].不合格物料名称);
        $('#bhgxx1').val(rs.data[0].不合格现象);

        $('#sqr1').val(rs.data[0].制单人);
        $('#sqsj1').val(rs.data[0].日期);
        $('#fzr1').val(rs.data[0].部门负责人);
        $('#fzrsj1').val(rs.data[0].部门审核时间);
        $('#mer1').val(rs.data[0].ME负责人);
        $('#mesj1').val(rs.data[0].ME审核时间);
        if("待ME负责人审核"==rs.data[0].状态){
          $('#me1').attr("disabled",false);
        }else{
          $('#me1').attr("disabled",true);
        }
        $('#me1').val($.trim(rs.data[0].处理意见));
        $('#pzr1').val(rs.data[0].品质负责人);
        $('#pzsj1').val(rs.data[0].品质审核时间);
        $('#sgr1').val(rs.data[0].生管负责人);
        $('#sgsj1').val(rs.data[0].生管审核时间);
        if("待生管负责人审核"==rs.data[0].状态){
          $('#sg1').attr("disabled",false);
        }else{
          $('#sg1').attr("disabled",true);
        }
        $('#sg1').val(rs.data[0].生产场地);

        $('#status1').val(rs.data[0].状态);
        $('#myModal1').modal('show')
      }
    });
  });

  $(document).on("click","#sh1",function(){//审核按钮--库存
    if(confirm("确定通过吗？")){
      var status=$('#status1').val();
      if (status=="待部门负责人审核"){
        var data={
          name:name,
          token:token,
          type:"bm",
          djbh:$('#djbh1').val(),
          dept:$('#bmbz1').val(),
        }
        reject(data);
      }else if(status=="待ME负责人审核"){
        var me1 = $('#me1').val();
        if(""!=me1 && me1 != null){
          var data={
            name:name,
            token:token,
            type:"me",
            note:me1,
            djbh:$('#djbh1').val(),
            dept:$('#bmbz1').val(),
          }
          reject(data);
        }else{
          alert("请填写处理意见");
        }
      }else if(status=="待品质负责人审核"){
        var data={
          name:name,
          token:token,
          type:"pz",
          note:$('#pz1').val(),
          djbh:$('#djbh1').val(),
          dept:$('#bmbz1').val(),
        }
        reject(data);
      }else if(status=="待生管负责人审核"){
        me1 = $('#me1').val();
        sg1 = $('#sg1').val();
        if("退货"==me1 && (""==sg1 || sg1 == null)){
          alert("处理意见为《退货》，需填写生产场地（供应商或生产部门名称）！");
        }else{
          var data={
            name:name,
            token:token,
            type:"sg",
            note:$('#sg1').val(),
            djbh:$('#djbh1').val(),
            dept:$('#bmbz1').val(),
          }
          reject(data);
        }
      }else if(status=="已审核完成"){
        alert("已审核完成，不能再次审核！");
      }else if(status==99) {
        alert("已终止，不能审核！");
      }
    }
  });

  $(document).on("click","#gbKc",function(){//终止按钮--库存
    if(confirm("确定终止吗？")){
      var status=$('#statusKc').val();
      if (status==0){
        alert("您没有终止权限！");
      }else if(status==1){
        var data={
          name:name,
          token:token,
          type:"me",
          djbh:$('#djbhKc').val(),
          dept:$('#bmbzKc').val(),
        }
        gb(data)
      }else if(status==2){
        var data={
          name:name,
          token:token,
          type:"pz",
          djbh:$('#djbhKc').val(),
          dept:$('#bmbzKc').val(),
        }
        gb(data)
      }else if(status==3){
        var data={
          name:name,
          token:token,
          type:"sg",
          djbh:$('#djbhKc').val(),
          dept:$('#bmbzKc').val(),
        }
        gb(data)
      }else if(status==4){
        var data={
          name:name,
          token:token,
          type:"cw",
          fin:$('#bfjeKc').val(),
          djbh:$('#djbhKc').val(),
          dept:$('#bmbzKc').val(),
        }
        gb(data)
      }else if(status==5){
        var data={
          name:name,
          token:token,
          type:"fgfz",
          djbh:$('#djbhKc').val(),
          dept:$('#bmbzKc').val(),
        }
        gb(data)
      }else if(status==6){
        var data={
          name:name,
          token:token,
          type:"ck",
          djbh:$('#djbhKc').val(),
          dept:$('#bmbzKc').val(),
        }
        gb(data)
      }else if(status==7){
        alert("已审核完成，不能再次审核！");
      }else if(status==99) {
        alert("已终止，不能审核！");
      }
    }
  });

  $(document).on("click","#sgPlsh",function(){//生管负责人批量审核按钮
    var data={
      name:name,
      token:token,
    }
    $.ajax({
      url:ip+'retrieve/sgPlshQx',
      type:"POST",
      data:data,
      error:function(rs){
        if(rs.status==401){
          alert("请先登录")
        }else if(rs.status==402){
          alert("您没有该权限")
        }else if(rs.status==500){
          alert('网络故障，请刷新重试')
        }
      },
      success:function(rs){
        if("0"==rs){
          var fbillno = getFBillNo();
          if (fbillno==""){
            alert("请先筛选")
          }else{
            var dataS={
              name:name,
              token:token,
              status:"待生管负责人审核",
              fbillno:fbillno,
            }
            $.ajax({
              url:ip+'retrieve/plshSjJy',
              type:"POST",
              data:dataS,
              error:function(rs){
                if(rs.status==401){
                  alert("请先登录")
                }else if(rs.status==402){
                  alert("您没有该权限")
                }else if(rs.status==500){
                  alert('网络故障，请刷新重试')
                }
              },
              success:function(rs){
                if(0==rs){
                  alert("包含<单据状态>不为<待生管负责人审核>或<处理意见>为<退货>的单据，请重新筛选！");
                }else{
                  $('#myModal3').modal('show')
                } 
              }
            });   
          }  
        }
      }
    });
  });

  $(document).on("click","#sgPlshqr",function(){//生管批量审核确认按钮
    var sgyj=$('#sgyj').val();
    var fbillno=getFBillNo();
    var data={
      name:name,
      token:token,
      sgyj:sgyj,
      fbillno:fbillno,
    }
    sgPlsh(data);
  });
});

function reject(data){
  $.ajax({
    url:ip+'retrieve/sh',
    data:data,
    type:'post',
    error:function(rs){
      if(rs.status==401){
        alert("请先登录")
      }else if(rs.status==402){
        alert("您没有该权限")
      }else if(rs.status==500){
        alert('网络故障，请刷新重试')
      }
    },
    success:function(rs){
      alert(rs)
      $('#myModal1').modal('hide')
      table.ajax.reload();
    }
  });
}

function gb(data){
  $.ajax({
    url:ip+'retrieve/gb',
    data:data,
    type:'post',
    error:function(rs){
      if(rs.status==401){
        alert("请先登录")
      }else if(rs.status==402){
        alert("您没有该权限")
      }else if(rs.status==500){
        alert('网络故障，请刷新重试')
      }
    },
    success:function(rs){
      alert(rs)
      $('#myModalKc').modal('hide')
      table.ajax.reload();
    }
  });
}

function getFBillNo(){//获取table中所有的单据编号
  var total = "";
  var datas = $('#example').DataTable().data();
  datas.each(function (data,index) { 
    if(data['单据编号'] && ""!=data['单据编号']){
      total+=",'"+data['单据编号']+"'";
    }
  });
  return total.substring(1);
}

function sgPlsh(data){
  if(confirm("确定审核吗？")){
    $.ajax({
      url:ip+"retrieve/sgPlsh",
      type:'post',
      data:data,
      error:function(rs){
        if(rs.status==401){
          alert("请先登录")
        }else if(rs.status==402){
          alert("您没有该权限")
        }else{
          alert("审核失败！")
        }
      },
      success:function(rs){
        alert(rs);
        $('#sgyj').val('');
        $('#myModal3').modal('hide')
        table.ajax.reload();
      }
    });
  }
}

function initComplete(){ //初始化表格
  var dataPlugin1 = '<div id="dataPlugin1" class="btn-group pull-left" role="group" aria-label="..." style="width: 75%;">'+
                      '<table id="exampleQuery" class="table table-bordered " style="table-layout:fixed;">'+
                        '<thead>'+
                          '<tr>'+
                            '<th style="width: 20%;">单据状态：</th>'+
                            '<th style="width: 20%;">开始时间：</th>'+
                            '<th style="width: 20%;">结束时间：</th>'+
                            '<th style="width: 20%;">部门：</th>'+
                            '<th style="width: 20%;">处理意见：</th>'+
                          '</tr>'+
                          '<tr>'+
                            '<th>'+
                              '<select id="djzt" name="djzt" class="form-control" style="display:inline;width: 140px;height: 100%">'+
                                '<option value="all"></option>'+
                                '<optgroup label="待部门负责人审核">'+
                                  '<option value="模块生产部">模块生产部</option>'+
                                  '<option value="器件生产部">器件生产部</option>'+
                                  '<option value="TO生产部">TO生产部</option>'+
                                  '<option value="管芯生产部">管芯生产部</option>'+
                                  '<option value="生产管理部">生产管理部</option>'+
                                  '<option value="管芯技术部">管芯技术部</option>'+
                                  '<option value="开发工程部">开发工程部</option>'+
                                  '<option value="公共研发部">公共研发部</option>'+
                                  '<option value="高速产品线">高速产品线</option>'+
                                  '<option value="数通产品线">数通产品线</option>'+
                                  '<option value="SFP产品线">SFP产品线</option>'+
                                  '<option value="PON产品线">PON产品线</option>'+
                                  '<option value="成都研发部">成都研发部</option>'+
                                '</optgroup>'+
                                '<option value="待ME负责人审核">待ME负责人审核</option>'+
                                '<option value="待品质负责人审核">待品质负责人审核</option>'+
                                '<option value="待生管负责人审核">待生管负责人审核</option>'+
                                '<option value="已审核完成">已审核完成</option>'+
                              '</select>'+
                            '</th>'+
                            '<th><input type="date" id="starttime"></th>'+
                            '<th><input type="date" id="endtime"></th>'+
                            '<th>'+
                              '<select id="bfbmcx" name="bfbmcx" class="form-control" style="display:inline;width: 100px;height: 100%">'+
                                '<option value="all"></option>'+
                                '<option value="模块生产部">模块生产部</option>'+
                                '<option value="器件生产部">器件生产部</option>'+
                                '<option value="TO生产部">TO生产部</option>'+
                                '<option value="管芯生产部">管芯生产部</option>'+
                                '<option value="生产管理部">生产管理部</option>'+
                                '<option value="管芯技术部">管芯技术部</option>'+
                                '<option value="公共研发部">公共研发部</option>'+
                                '<option value="开发工程部">开发工程部</option>'+
                                '<option value="高速产品线">高速产品线</option>'+
                                '<option value="数通产品线">数通产品线</option>'+
                                '<option value="SFP产品线">SFP产品线</option>'+
                                '<option value="PON产品线">PON产品线</option>'+
                                '<option value="成都研发部">成都研发部</option>'+
                              '</select>'+
                            '</th>'+
                            '<th>'+
                              '<select id="clyjcx" name="clyjcx" class="form-control" style="display:inline;width: 100px;height: 100%">'+
                                '<option value="all"></option>'+
                                '<option value="退货">退货</option>'+
                                '<option value="other">其它</option>'+
                                '<option value="返工">&emsp;返工</option>'+
                                '<option value="报废">&emsp;报废</option>'+
                                '<option value="退库留用">&emsp;退库留用</option>'+
                              '</select>'+
                            '</th>'+
                          '</tr>'+
                          '<tr>'+
                            '<th colspan="5">'+
                              '<button type="button" class="btn btn-default" id="add">增加</button>'+
                              '<button type="button" class="btn btn-default" id="delete">删除</button>'+
                              '<button type="button" class="btn btn-default" id="sgPlsh">生管批量审核</button>'+
                            '</th>'+
                          '</tr>'+
                        '</thead>'+
                      '</table>'+
                    '</div>'
  $('.clear').append(dataPlugin1); 

  $(document).on("change","#djzt",function(){//单据状态下拉选项
    table.ajax.reload();
  });

  $(document).on("change","#starttime",function(){//开始时间下拉选项
    table.ajax.reload();
  });

  $(document).on("change","#endtime",function(){//结束时间下拉选项
    table.ajax.reload();
  });

  $(document).on("change","#bfbmcx",function(){//部门下拉选项
    table.ajax.reload();
  });

  $(document).on("change","#clyjcx",function(){//处理意见下拉选项
    table.ajax.reload();
  });
}