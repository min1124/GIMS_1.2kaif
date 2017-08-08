jQuery.support.cors = true;
var table;
$(function () {
    var token = getCookie('token');
    var name = getCookie('name');
    $.ajax({  //获得部门
        'url': ip+'reject/de',   
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
    // var selected = [];
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
          url:ip+"reject/index",
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
        } ,
        'searching':true,
        initComplete:initComplete,
        // "dom": "<'row'<'col-sm-4'l<'#mytoolbox1'>><'col-sm-8'f<'#mytoolbox2'>r>"+
        //        "t"+
        //        "<'foot'<'col-sm-6'i><'col-sm-6'p>>",  
        "dom": 'T<"clear">lfrtip',
        "oLanguage":language, 
        "aoColumnDefs":[
            {
              "aTargets" :　[17],//修改颜色的目标列
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
          { "data": "制造单号" },
          { "data": "产品代码" },
          { "data": "产品名称" },
          { "data": "制造单数量" },
          { "data": "入库数量" },
          { "data": "成品率" },
          // { "data": "需报废数量" },
          { "data": "日期" },
          { "data": "部门" },
          { "data": "报废类型" },
          { "data": "报废类别" },
          { "data": "报废物料代码" },
          { "data": "报废物料名称" },
          { "data": "报废数量" },
          { "data": "报废原因" },
          { "data": "不良现象代码" },
          { "data": "关闭标志" },
          { "data": "报废部门负责人" },        
          { "data": "ME负责人" },
          { "data": "品质负责人" },
          { "data": "生产管理负责人" },
          { "data": "财务负责人" },
          { "data": "报废金额" },
          { "data": "分管副总" },
          { "data": "仓管员" },
      ]

    });
    $('#example tbody').on('click', 'tr', function (){//选中某行
        $('.selected').toggleClass('selected');
        $(this).toggleClass('selected');
    });
    $('.addBtn').click(function (){ //添加行按钮
        var row='<tr>'+
                  '<th><input type="text" style="width: 100%"></th>'+
                  '<th><input type="text" style="width: 100%"></th>'+
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
    $(document).on("change","#bmbz",function(){//部门下拉选项
      var Dept=''
      switch($('#bmbz option:selected').text()){
        case "模块生产一部":
            Dept = "MK";
            break;
        case "模块生产二部":
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
        case "管芯技术部":
            Dept = "GX";
            break;
        case "管芯生产部":
            Dept = "GX";
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
            'url': ip+'reject/dept',
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

    $(document).on("click","#sh",function(){//审核按钮
      if(confirm("确定通过吗？")){
        var RejDeptManager=$('#fzr').val();
        var MEManager=$('#mer').val();
        var QltManager=$('#pzr').val();
        var ProManager=$('#sgr').val();
        var FinManager=$('#cwr').val();
        var ViseManager=$('#fgfzr').val();
        var WarehouseAdmin=$('#ckqr').val();
        var fcloseflag=$('#fcloseflag').val();
        var bfje = $('#bfje').val()
        if(fcloseflag == 0){
          if (RejDeptManager==""){
            var data={
              name:name,
              token:token,
              type:"bm",
              djbh:$('#djbh1').val(),
              dept:$('#bmbz1').val(),
            }
            reject(data);
          }else if(MEManager==""){
            var data={
              name:name,
              token:token,
              type:"me",
              note:$('#me').val(),
              djbh:$('#djbh1').val(),
              dept:$('#bmbz1').val(),
            }
            reject(data);
          }else if(QltManager==""){
            var data={
              name:name,
              token:token,
              type:"pz",
              note:$('#pz').val(),
              djbh:$('#djbh1').val(),
              dept:$('#bmbz1').val(),
            }
            reject(data);
          }else if(ProManager==""){
            var data={
              name:name,
              token:token,
              type:"sg",
              note:$('#sg').val(),
              djbh:$('#djbh1').val(),
              dept:$('#bmbz1').val(),
            }
            reject(data);
          }else if(FinManager==""){
            if("" == bfje){
              alert("请先填写报废金额！");
            }else{
              var re = /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/;  
              if(re.test(bfje)){
                var data={
                  name:name,
                  token:token,
                  type:"cw",
                  note:$('#cw').val(),
                  fin:bfje,
                  djbh:$('#djbh1').val(),
                  dept:$('#bmbz1').val(),
                }
                reject(data);
              }else{
                alert("报废金额应填写正实数！");
              }    
            }
          }else if(ViseManager==""){
            if("叶志农" == name){
              var data={
                name:name,
                token:token,
                type:"fgfz",
                note:$('#fgfz').val(),
                djbh:$('#djbh1').val(),
                dept:$('#bmbz1').val(),
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
                    note:$('#cw').val(),
                    fin:$('#bfje').val(),
                    djbh:$('#djbh1').val(),
                    dept:$('#bmbz1').val(),
                  }
                  reject(data);
                }else{
                  alert("报废金额应填写正实数！");
                }
              }
            }
          }else if(WarehouseAdmin==""){
            var data={
              name:name,
              token:token,
              type:"ck",
              djbh:$('#djbh1').val(),
              dept:$('#bmbz1').val(),
            }
            reject(data);
          }else{
            alert("已审核完成，不能再次审核！");
          }
        }else{
          alert("已终止，不能审核！");
        }
      }
    });

    $(document).on("click","#gb",function(){//终止按钮
      if(confirm("确定终止吗？")){
        var RejDeptManager=$('#fzr').val();
        var MEManager=$('#mer').val();
        var QltManager=$('#pzr').val();
        var ProManager=$('#sgr').val();
        var FinManager=$('#cwr').val();
        var ViseManager=$('#fgfzr').val();
        var WarehouseAdmin=$('#ckqr').val();
        var fcloseflag=$('#fcloseflag').val();
        if(fcloseflag == 0){
          if (RejDeptManager==""){
            alert("您没有终止权限！");
          }else if(MEManager==""){
            var data={
              name:name,
              token:token,
              type:"me",
              note:$('#me').val(),
              djbh:$('#djbh1').val(),
              dept:$('#bmbz1').val(),
            }
            gb(data)
          }else if(QltManager==""){
            var data={
              name:name,
              token:token,
              type:"pz",
              note:$('#pz').val(),
              djbh:$('#djbh1').val(),
              dept:$('#bmbz1').val(),
            }
            gb(data)
          }else if(ProManager==""){
            var data={
              name:name,
              token:token,
              type:"sg",
              note:$('#sg').val(),
              djbh:$('#djbh1').val(),
              dept:$('#bmbz1').val(),
            }
            gb(data)
          }else if(FinManager==""){
            var data={
              name:name,
              token:token,
              type:"cw",
              note:$('#cw').val(),
              fin:$('#bfje').val(),
              djbh:$('#djbh1').val(),
              dept:$('#bmbz1').val(),
            }
            gb(data)
          }else if(ViseManager==""){
            var data={
              name:name,
              token:token,
              type:"fgfz",
              note:$('#fgfz').val(),
              djbh:$('#djbh1').val(),
              dept:$('#bmbz1').val(),
            }
            gb(data)
          }else if(WarehouseAdmin==""){
            var data={
              name:name,
              token:token,
              type:"ck",
              djbh:$('#djbh1').val(),
              dept:$('#bmbz1').val(),
            }
            gb(data)
          }else{
            alert("已审核完成，不能终止！");
          }
        }else{
          alert("已终止，不能再次终止！");
        }
      }
    });

    $(document).on("click","#delete",function(){//删除按钮
      var djbh=$(".selected").children('td').eq(0).text();
      if (djbh==""){
        alert("请先选择一行!")
      }else{
        if(confirm("确定删除吗？")){
          $.ajax({  
            'url': ip+"reject/delete",   
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

    $(document).on("click","#plsh",function(){//批量审核按钮
      if("叶志农"!=name){
        alert("您没有批量审核权限！");
      }else{
        var fbillno=getFBillNo();
        if (fbillno==""){
          alert("请先筛选")
        }
        if(fbillno=="error1"){
          alert("包含<单据状态>不为<待分管副总审批>或<报废金额>为<空>或<大于3000>的单据，请重新筛选！");
        }
      // else if(fgfzyj==""){
      //   alert("请填写完整信息")
      // }
        else{
          $('#myModal2').modal('show')
        }
      }
    });

    $(document).on("click","#plshqr",function(){//批量审核确认按钮
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
        var rksl=$('#rksl').val();
        var cpl=$('#cpl').val();
        for(var i = 0; i < textinputs.length; i++) {
          input[i]=textinputs[i].value;
        }
        // var a=textinputs.length/6;
        // for(var i = 0; i <a ; i++){
        //   input[i]=new Array();
        //   for (var j = 0; j < 6; j++){
        //     input[i][j]=textinputs[j+6*i].value;
        //   }
        // }
        
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
          rksl:rksl,
          cpl:cpl,
        }
        $.ajax({
          url:ip+'reject/rejection',
          type:"POST",
          data:data,
          success:function(rs){
            alert(rs);
            if("保存成功"==rs){
              $('#myModal').modal('hide');
              $('#djlx').val('制造单报废');
              $('#bflx').val('A暂存报废');
              $('#bflb').val('成品报废');
              //$('#rq').val();
              $('#djbh').val('');
              $('#bmbz').val('');
              $('#zzdh').val('');
              $('#cpdm').val('');
              $('#cpmc').val('');
              $('#zzsl').val('');
              $('#rksl').val('');
              $('#cpl').val('');
              for(var i = 0; i < 6; i++) {
                textinputs[i].value = '';
              }
              var ij = textinputs.length/6;
              if(ij > 1){
                for(var j = ij; j >1; j--) {
                  table1.getElementsByTagName("tr")[j].parentNode.removeChild(table1.getElementsByTagName("tr")[j]);
                }
              }
              
              // for(var i = 6; i < textinputs.length; i++) {
              //   if(0==i%6){
              //     //table1.getElementsByTagName("thead")[0].removeChild(table1.getElementsByTagName("tr")[2]); 
              //     table1.getElementsByTagName("tr")[i/6+1].parentNode.removeChild(table1.getElementsByTagName("tr")[2]);
              //   }
              // }
              table.ajax.reload();
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
        url:ip+'reject/zzd',
        type:"POST",
        data:data,
        success:function(rs){
          if (rs.data[0]!=null)
          {
              $("#cpdm").val(rs.data[0].产品代码)
              $("#cpmc").val(rs.data[0].产品名称)
              $("#zzsl").val(rs.data[0].制造数量)
              $("#rksl").val(rs.data[0].入库数量)
              $("#cpl").val(rs.data[0].成品率)
          }
          else{
              $("#cpdm").val("")
              $("#cpmc").val("")
              $("#zzsl").val("")
              $("#rksl").val("")
              $("#cpl").val("")
          }
        }
      });
    });
    $(document).on("click","#add",function(){  //增加按钮显示新增模态框
      $('#myModal').modal('show')  
    });
    $(document).on("dblclick","#example tbody tr",function() {//双击事件
      var a=$(this).children('td').eq(0).text();
      // var url=url+'reject/t_Rejection?sql='+a;
      // var url1=url+'reject/t_RejectionEntry?sql='+a;
      var data = {
        token: token,
        name: name,
      }
      $.ajax({  
          'url': ip+'reject/t_Rejection?sql='+a,   
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
            $("#djlb1").val(rs.data1[0].单据类别)//
            $("#sqr").val(rs.data1[0].制单人)//
            $("#djbh1").val(rs.data1[0].单据编号)//
            $("#rq1").val(rs.data1[0].日期)//
            $("#cpmc1").val(rs.data1[0].产品名称)//
            $("#cpdm1").val(rs.data1[0].产品代码)//
            $("#cpl1").val(rs.data1[0].成品率)//
            $("#zzdh1").val(rs.data1[0].制造单号)//
            $("#zzsl1").val(rs.data1[0].制造单数量)//
            $("#bflx1").val(rs.data1[0].报废类型)//
            $("#bflb1").val(rs.data1[0].报废类别)//
            $("#rksl1").val(rs.data1[0].入库数量)//
            $("#bmbz1").val(rs.data1[0].部门)//
            $("#fcloseflag").val(rs.data1[0].关闭标志)//
            if (rs.data2.length>0){
              $("#cwr").val(rs.data2[0].FinManager)//
              $("#cw").val(rs.data2[0].FinManagerNote)//
              $("#mer").val(rs.data2[0].MEManager)//
              $("#me").val(rs.data2[0].MEManagerNote)//
              $("#sgr").val(rs.data2[0].ProManager)//
              $("#sg").val(rs.data2[0].ProManagerNote)//
              $("#pzr").val(rs.data2[0].QltManager)//
              $("#pz").val(rs.data2[0].QltManagerNote)//
              $("#fgfzr").val(rs.data2[0].ViseManager)//
              $("#fgfz").val(rs.data2[0].ViseManagerNote)//
              $("#fzr").val(rs.data2[0].RejDeptManager)//
              $("#bfje").val(rs.data2[0].RejAmount_1)//
              if(""!=rs.data2[0].RejAmount_1){
                bfjeYs = rs.data2[0].RejAmount_1;
                if(bfjeYs>3000){
                  $("#bfje").css("color","red");
                }else{
                  $("#bfje").css("color","green");
                }
              }
              if (""!=name && "李永青"==name) {
                $("#bfje").attr("disabled",false);
              }else{
                $("#bfje").attr("disabled",true);
              }
              $("#ckqr").val(rs.data2[0].WarehouseAdmin)//
            }else{
              $("#cwr").val("")//
              $("#cw").val("")//
              $("#mer").val("")//
              $("#me").val("")//
              $("#sgr").val("")//
              $("#sg").val("")//
              $("#pzr").val("")//
              $("#pz").val("")//
              $("#fgfzr").val("")//
              $("#fgfz").val("")//
              $("#fzr").val("")//
              $("#bfje").val("")//
              $("#ckqr").val("")
            }
          },
        }); 
      $('#example2').DataTable({
        "bDestroy":true,
        "paging": false,
        "lengthChange": false,
        "searching": false,
        "ordering": false,
        "info": false,
        "autoWidth": false,
        'ajax': {  
          'url': ip+'reject/t_RejectionEntry?sql='+a,  
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
          { "data": "FNGCode" },
          { "data": "FRejKind" },
        ]
      });
      $('#myModal1').modal('show')
    });
});

function reject(data){
  $.ajax({
    url:ip+'reject/sh',
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
    url:ip+'reject/gb',
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

function getFBillNo(){//获取table中所有的单据编号
  var total = "";
  var table = document .getElementById ("example")
  var a = table.rows.length
  for (var i=1 ; i<a ; i++){
    if((""==table.rows[i].cells[19].innerHTML) && (""!=table.rows[i].cells[18].innerHTML) && (""!=table.rows[i].cells[17].innerHTML) && (table.rows[i].cells[17].innerHTML<=3000)){
      total+=",'"+table.rows[i].cells[0].innerHTML+"'";
    }else{
      total=",error1";
      break;
    }
  }
  return total.substring(1);
}

function plsh(data){
  if(confirm("确定审核吗？")){
    $.ajax({
      url:ip+"reject/plsh",
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
                                  '<option value="模块">模块</option>'+
                                  '<option value="器件">器件</option>'+
                                  '<option value="TO">TO</option>'+
                                  '<option value="管芯">管芯</option>'+
                                  '<option value="仓库">仓库</option>'+
                                '</optgroup>'+
                                '<option value="待ME负责人审核">待ME负责人审核</option>'+
                                '<option value="待品质负责人审核">待品质负责人审核</option>'+
                                '<option value="待生管负责人审核">待生管负责人审核</option>'+
                                '<option value="待财务负责人审核">待财务负责人审核</option>'+
                                '<option value="待分管副总审核">待分管副总审核</option>'+
                                '<option value="待仓管员确认">待仓管员确认</option>'+
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
                              '<select id="bfbmcx" name="bfbmcx" class="form-control" style="display:inline;width: 70px;height: 100%">'+
                                '<option value="all"></option>'+
                                '<option value="模块">模块</option>'+
                                '<option value="器件">器件</option>'+
                                '<option value="TO">TO</option>'+
                                '<option value="管芯">管芯</option>'+
                              '</select>'+
                            '</th>'+
                            // '<th><button type="button" class="btn btn-default" id="true">确定</button></th>'+
                          '</tr>'+
                          '<tr>'+
                            '<th colspan="6">'+
                              '<button type="button" class="btn btn-default" id="add">增加</button>'+
                              '<button type="button" class="btn btn-default" id="delete">删除</button>'+
                              '<button type="button" class="btn btn-default" id="plsh">批量审核</button>'+
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

  // $('#true').click(function(){
  //   table.ajax.reload();
  // });
}