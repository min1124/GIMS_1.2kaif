jQuery.support.cors = true;
var table;
$(function () {
  var token = getCookie('token');
  var name = getCookie('name');
  $.ajax({  //获得部门
    'url': ip+'rejectkc/de',   
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

  $.ajax({  //获得仓库
    'url': ip+'rejectkc/ck',   
    'type': 'post',
    'data': {
      token: token,
      name: name,
    },
    'error':function(rs){
      alert('网络故障，请刷新重试')
    },
    'success': function(rs){
      var select = $("#ck");
      var option = $("<option>").text('').val('');
      select.append(option);          
      for(var i=0;i<rs.data.length;i++) {
        var option = $("<option>").text(rs.data[i].fName).val(rs.data[i].fItemID);
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
      url:ip+"rejectkc/index",
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
        d.bfjecx = $('#bfjecx').val();
        d.bflbcx = $('#bflbcx').val();
        d.bfbmcx = $('#bfbmcx').val();
      } 
    },
    'searching':true,
    initComplete:initComplete,
    "dom": 'T<"clear">lfrtip',
    "oLanguage":language, 
    "aoColumnDefs":[
      {
        "aTargets" :　[27],//修改颜色的目标列
        //nTd是一个对象，所指的是目标单元格；
        //sData是指目标单元格中所对应的值；
        //iRow是指目标单元格在datatable中所在的行数；
        //iCol就是指目标单元格在datatable中所在的列数；
        //oData是单元格所指行的所有值的集合；
        "fnCreatedCell": function(nTd, sData, oData, iRow, iCol){
          bfjeCell(nTd, sData, oData,0)
        }
      },
    ],         
    "aoColumns": [
      { "data": "单据编号" },
      { "data": "单据类别" },
      { "data": "制单人" },
      { "data": "批号" },
      { "data": "产品代码" },
      { "data": "产品名称" },
      { "data": "数量" },
      { "data": "日期" },
      { "data": "部门" },
      { "data": "仓库" },
      { "data": "报废类型" },
      { "data": "报废类别" },
      { "data": "报废物料代码" },
      { "data": "报废物料名称" },
      { "data": "报废数量" },
      { "data": "报废原因" },
      { "data": "申请时间" },
      { "data": "报废部门负责人" },
      { "data": "部门审核时间" },        
      { "data": "ME负责人" },
      { "data": "ME审核时间" },
      { "data": "品质负责人" },
      { "data": "品质审核时间" },
      { "data": "生管负责人" },
      { "data": "生管审核时间" },
      { "data": "财务负责人" },
      { "data": "财务审核时间" },
      { "data": "报废金额" },
      { "data": "分管副总" },
      { "data": "分管副总审核时间" },
      { "data": "仓管员" },
      { "data": "仓管员审核时间" },
      { "data": "报废单状态" },
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
        'url': ip+'rejectkc/dept',
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

  $(document).on("change","#cpdm",function(){ //产品代码带出产品名称
    var data={
      name:name,
      token:token,
      sql:$(this).val(),
    }
    $.ajax({
      url:ip+'rejectkc/cpdm',
      type:"POST",
      data:data,
      success:function(rs){
        if (rs.data!=null && rs.data[0]!=null){
          $("#cpmc").val(rs.data[0].产品名称)
        }else{
          $("#cpmc").val("")
        }
      }
    });
  });

  $('.addBtn').click(function (){ //添加行按钮
    var row='<tr>'+
              '<th><input type="text" style="width: 100%;"></th>'+
              '<th><input type="text" style="width: 100%;"></th>'+
              '<th><input type="text" style="width: 100%;"></th>'+
              '<th><input type="text" style="width: 100%;"></th>'+
              '<th><button class="delBtn"><i class="fa fa-fw fa-minus"></i></button></th>'+
            '</tr>';
    $('#example1').append(row);
  });

  $(document).on("click",".delBtn",function(){//删除行按钮
    $(this).parent().parent().remove();
  });

  $(document).on("click","#save",function(){//保存按钮
    if(confirm("确定保存吗？")){
      var input=new Array()
      // 获取模态框table对象
      var table1 = document.getElementById('example1');
      // 获取 table 内的全部 input
      var textinputs = table1.getElementsByTagName('input');
      var djlx=$('#djlx').val();
      var bflx=$('#bflx').val();
      var bflb=$('#bflb').val();
      var rq=$('#rq').val();
      var djbh=$('#djbh').val();
      var bmbz=$('#bmbz').val();
      var zzdh=$('#zzdh').val();
      var cpdm=$('#cpdm').val();
      var cpmc=$('#cpmc').val();
      var zzsl=$('#zzsl').val();
      var ck=$('#ck').val();
      for(var i = 0; i < textinputs.length; i++) {
        input[i]=textinputs[i].value;
      }        
      var data={
        name:name,
        token:token,
        inputs: input,
        djlx:djlx,
        bflx:bflx,
        bflb:bflb,
        rq:rq,
        djbh:djbh,
        bmbz:bmbz,
        zzdh:zzdh,
        cpdm:cpdm,
        cpmc:cpmc,
        zzsl:zzsl,
        ck:ck,
      }
      $.ajax({
        url:ip+'rejectkc/rejection',
        type:"POST",
        data:data,
        success:function(rs){
          alert(rs);
          if("保存成功"==rs){
            $('#myModal').modal('hide');
            $('#djlx').val('库存报废');
            $('#bflx').val('A暂存报废');
            $('#bflb').val('成品报废');
            $('#djbh').val('');
            $('#bmbz').val('');
            $('#zzdh').val('');
            $('#cpdm').val('');
            $('#cpmc').val('');
            $('#zzsl').val('');
            $('#ck').val('');
            for(var i = 0; i < 4; i++) {
              textinputs[i].value = '';
            }
            var ij = textinputs.length/4;
            if(ij > 1){
              for(var j = ij; j >1; j--) {
                table1.getElementsByTagName("tr")[j].parentNode.removeChild(table1.getElementsByTagName("tr")[j]);
              }
            }
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
          'url': ip+"rejectkc/delete",   
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
      'url': ip+'rejectkc/t_Rejection?sql='+a,   
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
        $('#exampleKc').DataTable({
          "bDestroy":true,
          "paging": false,
          "lengthChange": false,
          "searching": false,
          "ordering": false,
          "info": false,
          "autoWidth": false,
          'ajax': {  
            'url': ip+'rejectkc/t_RejectionEntry?sql='+a,  
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
            { "data": "FEntryNumber" },
            { "data": "FEntryName" },
            { "data": "FRejQty" },
            { "data": "FRejReason" },
          ]
        });

        $("#djlbKc").val(rs.data1[0].单据类别)//
        $("#sqrKc").val(rs.data1[0].制单人)//
        $("#djbhKc").val(rs.data1[0].单据编号)//
        $("#rqKc").val(rs.data1[0].日期)//
        $("#cpmcKc").val(rs.data1[0].产品名称)//
        $("#cpdmKc").val(rs.data1[0].产品代码)//
        $("#zzdhKc").val(rs.data1[0].批号)//
        $("#zzslKc").val(rs.data1[0].数量)//
        $("#bflxKc").val(rs.data1[0].报废类型)//
        $("#bflbKc").val(rs.data1[0].报废类别)//
        $("#bmbzKc").val(rs.data1[0].部门)//
        $("#ckKc").val(rs.data1[0].仓库)//
        if(rs.data2.length>0){
          $("#sqsjKc").val(rs.data2[0].RejDate)//
          $("#cwrKc").val(rs.data2[0].FinManager)//
          $("#cwKc").val(rs.data2[0].FinManagerNote)//
          $("#cwsjKc").val(rs.data2[0].FinDate)
          $("#merKc").val(rs.data2[0].MEManager)//
          $("#meKc").val(rs.data2[0].MEManagerNote)//
          $("#mesjKc").val(rs.data2[0].MEDate)//
          $("#sgrKc").val(rs.data2[0].ProManager)//
          $("#sgKc").val(rs.data2[0].ProManagerNote)//
          $("#sgsjKc").val(rs.data2[0].ProDate)//
          $("#pzrKc").val(rs.data2[0].QltManager)//
          $("#pzKc").val(rs.data2[0].QltManagerNote)//
          $("#pzsjKc").val(rs.data2[0].QltDate)//
          $("#fgfzrKc").val(rs.data2[0].ViseManager)//
          $("#fgfzKc").val(rs.data2[0].ViseManagerNote)//
          $("#fgfzsjKc").val(rs.data2[0].ViseDate)//
          $("#fzrKc").val(rs.data2[0].RejDeptManager)//
          $("#fzrsjKc").val(rs.data2[0].RejDeptDate)//
          $("#bfjeKc").val(rs.data2[0].RejAmount_1)//
          $("#statusKc").val(rs.data2[0].Status)//
            
          if(""!=rs.data2[0].RejAmount_1){
            bfjeKc = rs.data2[0].RejAmount_1;
            if(bfjeKc>3000){
              $("#bfjeKc").css("color","red");
            }else{
              $("#bfjeKc").css("color","green");
            }
          }
          if ("test"==name || "李永青"==name || "郑宇"==name) {
            $("#bfjeKc").attr("disabled",false);
          }else{
            $("#bfjeKc").attr("disabled",true);
          }
          $("#ckqrKc").val(rs.data2[0].WarehouseAdmin)//
          $("#ckqrsjKc").val(rs.data2[0].WarehouseDate)//
        }else{
          $("#sqsjKc").val("")//
          $("#cwrKc").val("")//
          $("#cwKc").val("")//
          $("#cwsjKc").val("")
          $("#mer").val("")//
          $("#me").val("")//
          $("#mesj").val("")//
          $("#sgr").val("")//
          $("#sg").val("")//
          $("#sgsj").val("")//
          $("#pzrKc").val("")//
          $("#pzKc").val("")//
          $("#pzsjKc").val("")//
          $("#fgfzrKc").val("")//
          $("#fgfzKc").val("")//
          $("#fgfzsjKc").val("")//
          $("#fzrKc").val("")//
          $("#fzrsjKc").val("")//
          $("#bfjeKc").val("")//
          $("#ckqrKc").val("")
          $("#ckqrsjKc").val("")//
        }
        $('#myModalKc').modal('show')
      }
    });
  });

  $(document).on("click","#shKc",function(){//审核按钮--库存
    if(confirm("确定通过吗？")){
      var bfje = $('#bfjeKc').val()
      var status=$('#statusKc').val();
      if (status==0){
        var data={
          name:name,
          token:token,
          type:"bm",
          djbh:$('#djbhKc').val(),
          dept:$('#bmbzKc').val(),
        }
        reject(data);
      }else if(status==1){
        var data={
          name:name,
          token:token,
          type:"me",
          note:$('#meKc').val(),
          djbh:$('#djbhKc').val(),
          dept:$('#bmbzKc').val(),
        }
        reject(data);
      }else if(status==2){
        var data={
          name:name,
          token:token,
          type:"pz",
          note:$('#pzKc').val(),
          djbh:$('#djbhKc').val(),
          dept:$('#bmbzKc').val(),
        }
        reject(data);
      }else if(status==3){
        var data={
          name:name,
          token:token,
          type:"sg",
          note:$('#sgKc').val(),
          djbh:$('#djbhKc').val(),
          dept:$('#bmbzKc').val(),
        }
        reject(data);
      }else if(status==4){
        if("" == bfje){
          alert("请先填写报废金额！");
        }else{
          var re = /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/;  
          if(re.test(bfje)){
            var data={
              name:name,
              token:token,
              type:"cw",
              note:$('#cwKc').val(),
              fin:bfje,
              djbh:$('#djbhKc').val(),
              dept:$('#bmbzKc').val(),
            }
            reject(data);
          }else{
            alert("报废金额应填写正实数！");
          }    
        }
      }else if(status==5){
        if("黄晶" == name || "test" == name){
          var data={
            name:name,
            token:token,
            type:"fgfz",
            note:$('#fgfzKc').val(),
            djbh:$('#djbhKc').val(),
            dept:$('#bmbzKc').val(),
          }
          reject(data);
        }else{
          if("" == bfje){
            alert("请先填写报废金额！");
          }else{
            var re = /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/;  
            if(re.test(bfje)){
              var data={
                name:name,
                token:token,
                type:"cw",
                note:$('#cwKc').val(),
                fin:$('#bfjeKc').val(),
                djbh:$('#djbhKc').val(),
                dept:$('#bmbzKc').val(),
              }
              reject(data);
            }else{
              alert("报废金额应填写正实数！");
            }
          }
        }
      }else if(status==6){
        var data={
          name:name,
          token:token,
          type:"ck",
          djbh:$('#djbhKc').val(),
          dept:$('#bmbzKc').val(),
        }
        reject(data);
      }else if(status==7){
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
      url:ip+'rejectkc/sgPlshQx',
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
              url:ip+'rejectkc/plshSjJy',
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
                  alert("包含<单据状态>不为<待生管负责人审核>或<报废金额>为<空>或<大于3000>的单据，请重新筛选！");
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

  $(document).on("click","#cwPlsh",function(){//财务负责人批量审核按钮
    var data={
      name:name,
      token:token,
    }
    $.ajax({
      url:ip+'rejectkc/cwPlshQx',
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
              status:"待财务负责人审核",
              fbillno:fbillno,
            }
            $.ajax({
              url:ip+'rejectkc/plshSjJy',
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
                  alert("包含<单据状态>不为<待财务负责人审核>或<报废金额>为<空>或<大于3000>的单据，请重新筛选！");
                }else{
                  $('#myModal4').modal('show')
                } 
              }
            });
          }     
        }
      }
    });
  });

  $(document).on("click","#cwPlshqr",function(){//财务批量审核确认按钮
    var cwyj=$('#cwyj').val();
    var fbillno=getFBillNo();
    var data={
      name:name,
      token:token,
      cwyj:cwyj,
      fbillno:fbillno,
    }
    cwPlsh(data);
  });

  $(document).on("click","#plsh",function(){//分管副总批量审核按钮
    var data={
      name:name,
      token:token,
    }
    $.ajax({
      url:ip+'rejectkc/fgfzPlshQx',
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
              status:"待分管副总审核",
              fbillno:fbillno,
            }
            $.ajax({
              url:ip+'rejectkc/plshSjJy',
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
                  alert("包含<单据状态>不为<待分管副总审批>或<报废金额>为<空>或<大于3000>的单据，请重新筛选！");
                }else{
                  $('#myModal2').modal('show')
                } 
              }
            });   
          }  
        }
      }
    });
  });

  $(document).on("click","#plshqr",function(){//分管副总批量审核确认按钮
    var fgfzyj=$('#fgfzyj').val();
    var fbillno=getFBillNo();
    var data={
      name:name,
      token:token,
      fgfzyj:fgfzyj,
      fbillno:fbillno,
    }
    plsh(data);
  });
 
});

function reject(data){
  $.ajax({
    url:ip+'rejectkc/sh',
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

function gb(data){
  $.ajax({
    url:ip+'rejectkc/gb',
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
      url:ip+"rejectkc/sgPlsh",
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

function cwPlsh(data){
  if(confirm("确定审核吗？")){
    $.ajax({
      url:ip+"rejectkc/cwPlsh",
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
        $('#cwyj').val('');
        $('#myModal4').modal('hide')
        table.ajax.reload();
      }
    });
  }
}

function plsh(data){
  if(confirm("确定审核吗？")){
    $.ajax({
      url:ip+"rejectkc/plsh",
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
        $('#fgfzyj').val('');
        $('#myModal2').modal('hide')
        table.ajax.reload();
      }
    });
  }
}

function bfjeCell(nTd, sData, oData, index) { //计算颜色
  if ( sData > 3000 ) {
    $(nTd).css('color', 'red')
  }else if(sData <= 3000){
    $(nTd).css('color', 'green')
  }else{
  }
}

function initComplete(){ //初始化表格
  var dataPlugin1 = '<div id="dataPlugin1" class="btn-group pull-left" role="group" aria-label="..." style="width: 75%;">'+
                      '<table id="exampleQuery" class="table table-bordered " style="table-layout:fixed;">'+
                        '<thead>'+
                          '<tr>'+
                            '<th style="width: 27%;">单据状态：</th>'+
                            '<th style="width: 17%;">报废金额：</th>'+
                            '<th style="width: 28%;">开始时间：</th>'+
                            '<th style="width: 28%;">结束时间：</th>'+
                            '<th style="width: 20%;">报废类别：</th>'+
                            '<th style="width: 17%;">部门：</th>'+
                            // '<th style="width: 10%;"></th>'+
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
                                '<option value="待财务负责人审核">待财务负责人审核</option>'+
                                '<option value="待分管副总审核">待分管副总审核</option>'+
                                '<option value="待仓管员审核">待仓管员审核</option>'+
                                '<option value="已审核完成">已审核完成</option>'+
                                '<option value="已终止">已终止</option>'+
                              '</select>'+
                            '</th>'+
                            '<th>'+
                              '<select id="bfjecx" name="bfjecx" class="form-control" style="display:inline;width: 80px;height: 100%">'+
                                '<option value="all"></option>'+
                                '<option value="&le;3000">&le;3000</option>'+
                                '<option value="&gt;3000">&gt;3000</option>'+
                              '</select>'+
                            '</th>'+
                            '<th><input type="date" id="starttime"></th>'+
                            '<th><input type="date" id="endtime"></th>'+
                            '<th>'+
                              '<select id="bflbcx" name="bflbcx" class="form-control" style="display:inline;width: 100px;height: 100%">'+
                                '<option value="all"></option>'+
                                '<option value="成品报废">成品报废</option>'+
                                '<option value="原材料报废">原材料报废</option>'+
                              '</select>'+
                            '</th>'+
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
                            // '<th><button type="button" class="btn btn-default" id="true">确定</button></th>'+
                          '</tr>'+
                          '<tr>'+
                            '<th colspan="6">'+
                              '<button type="button" class="btn btn-default" id="add">增加</button>'+
                              '<button type="button" class="btn btn-default" id="delete">删除</button>'+
                              '<button type="button" class="btn btn-default" id="sgPlsh">生管批量审核</button>'+
                              '<button type="button" class="btn btn-default" id="cwPlsh">财务批量审核</button>'+
                              '<button type="button" class="btn btn-default" id="plsh">分管副总批量审核</button>'+
                            '</th>'+
                          '</tr>'+
                        '</thead>'+
                      '</table>'+
                    '</div>'
  $('.clear').append(dataPlugin1); 

  $(document).on("change","#djzt",function(){//单据状态下拉选项
    table.ajax.reload();
  });

  $(document).on("change","#bfjecx",function(){//报废金额下拉选项
    table.ajax.reload();
  });

  $(document).on("change","#starttime",function(){//开始时间下拉选项
    table.ajax.reload();
  });

  $(document).on("change","#endtime",function(){//结束时间下拉选项
    table.ajax.reload();
  });

  $(document).on("change","#bflbcx",function(){//报废类别下拉选项
    table.ajax.reload();
  });

  $(document).on("change","#bfbmcx",function(){//报废部门下拉选项
    table.ajax.reload();
  });
}