var table;
var table1;
jQuery.support.cors = true;
$(function () {
  var token = getCookie('token');
  var name = getCookie('name');
  table=$('#example').DataTable({
    "bDestroy":true,
    "paging": true,
    "lengthChange": false,
    "searching": true,
    "ordering": true,
    "info": true,
    "autoWidth": false,
    "scrollX": true,  
    initComplete:initComplete,
    "dom": 'T<"clear">lfrtip',
    "createdRow": function (row, data, dataIndex) {  
      var date1 = new Date();
      var date2 = new Date(date1);
      date2.setDate(date1.getDate()+7);

      var seperator1 = "-";
      var month = date2.getMonth() + 1;
      var strDate = date2.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = date2.getFullYear() + seperator1 + month + seperator1 + strDate;
      if(data.kcxhjz_date != null && data.kcxhjz_date != ""){
        if ((data.kcxhjz_date <= currentdate) && ('Y' == data.shipping_or_not)) {  
          for (var i = 0; i < 20; i++) {  
            $('td', row).eq(i).css('font-weight', "bold").css("color", "red");  
          }  
        } 
      }
    },
    "tableTools": {
      "sSwfPath": "../../plugins/datatables/extensions/TableTools/swf/copy_csv_xls_pdf.swf",
      "aButtons": [{
        "sExtends": "xls",
        "sButtonText": "导出Excel",
      }],
    }, 
    'ajax': {
      'url':ip+"fnumber/index",
      'data': function ( d ) {
        d.token = token;
        d.name = name;
      },
      error:function(rs){
        error(rs)
      },
      'type': 'POST' 
    }, 
    "oLanguage":language,
    "aoColumns": [
      { "data": "ID" },
      { "data": "source" },
      { "data": "source_code" },
      { "data": "customer_code" },
      { "data": "customer_name" },
      { "data": "fnumber" },
      { "data": "fnumber_hw" },
      { "data": "product_model_zy" },
      { "data": "customer_number" },
      { "data": "pcn_flag" },
      { "data": "pcn_date" },
      { "data": "product_model" },
      { "data": "fnumber_desc" },
      { "data": "key_fnumbers" },
      { "data": "product_line" },
      { "data": "product_status" },
      { "data": "shipping_or_not" },
      { "data": "cost_priority" },
      { "data": "update_date1" },
      { "data": "F11" },
      { "data": "kcxhjz_date" },
      { "data": "note" },
    ]
  });
  // new $.fn.dataTable.FixedColumns( table, {
  //   leftColumns: 4,
  // } );
    
	$(document).on("click","#add",function(){  //增加按钮显示新增模态框
    $('#myModal').modal('show')  
  });
  $.ajax({  //获取产品代码
    'url': ip+'fnumber/getfnumber',   
    'type': 'post',
    'data': {
      token: token,
      name: name,
    },
    'error':function(rs){
      alert('网络故障，请刷新重试')
    },
    'success': function(rs){
      var select = $("#fnumber");
      var option = $("<option>").text('').val('');
      select.append(option);          
      for(var i=0;i<rs.data.length;i++) {
        var option = $("<option>").text(rs.data[i].物料代码).val(rs.data[i].物料代码);
        select.append(option);
      }
    }
  });
  //select模糊查询
  $(function(){
　　　//启动Bootsrap-Select
　　　$("#fnumber").selectpicker({
　　　　dropuAuto : false
　　　});
　})
  $(document).on("change","#fnumber",function(){ //产品代码联动
    var wldmSql = $(this).val();
    var data0={
      name:name,
      token:token,
      sql:wldmSql,
    }
    $.ajax({
      url:ip+'fnumber/checkFnumber',
      type:"POST",
      data:data0,
      success:function(rs0){
        if("1"==rs0){
          alert("产品代码已存在，请核实！");
        }
        if("0"==rs0){
          $.ajax({
            url:ip+'fnumber/fnumber',
            type:"POST",
            data:data0,
            success:function(rs){
              if(rs.dataA[0]!=null){
                $("#customerCode").val(rs.dataA[0].客户代码)
                $("#productModelZy").val(rs.dataA[0].物料名称);
                var data1={
                  name:name,
                  token:token,
                  sql:rs.dataA[0].客户代码,
                }
                $.ajax({
                  url:ip+'fnumber/customerCode',
                  type:"POST",
                  data:data1,
                  success:function(rs1){
                    if(rs1.data1!=null && rs1.data1.length==1 && rs1.data1[0]!=null){
                      $("#customerName").val(rs1.data1[0].客户名称)
                    }else if(rs1.data1!=null && rs1.data1.length>1){
                      $("#customerName").val('');
                      alert("客户代码"+rs.data[0].客户代码C+"存在多个客户名称，请核实！");
                    }else{
                      $("#customerName").val('');
                      alert("物料代码"+wldmSql+"无对应客户名称，请核实！");
                    }
                  }
                });
              }else{
                $("#customerCode").val('');
                alert("物料代码"+wldmSql+"无对应客户代码，请核实！");
                $("#productModelZy").val('');
              }
              if(rs.dataB[0]!=null){
                $("#customerNumber").val(rs.dataB[0].客户代码);
                $("#productModel").val(rs.dataB[0].客户型号);
              }else{
                $("#customerNumber").val('');
                $("#productModel").val('');
              }
            }
          });
        }
      }
    });
  });
  $.ajax({  //获取产品线
    'url': ip+'fnumber/productLine',   
    'type': 'post',
    'data': {
      token: token,
      name: name,
    },
    'error':function(rs){
      alert('网络故障，请刷新重试')
    },
    'success': function(rs){
      var select = $("#productLine");
      var option = $("<option>").text('').val('');
      select.append(option);          
      for(var i=0;i<rs.data.length;i++) {
        var option = $("<option>").text(rs.data[i].Fname).val(rs.data[i].Fname);
        select.append(option);
      }
    }
  });
  $(document).on("click","#save",function(){//保存按钮
    if(confirm("确定保存吗？")){
      var source=$('#source').val();
      var sourceCode=$('#sourceCode').val();
      var customerCode=$('#customerCode').val();
      var customerName=$('#customerName').val();
      var fnumber=$('#fnumber').val();
      var productModelZy=$('#productModelZy').val();
      var customerNumber=$('#customerNumber').val();
      var productModel=$('#productModel').val();
      var productLine=$('#productLine').val();
      var productStatus=$('#productStatus').val();
      var pcnFlag=$('#pcnFlag').val();
      var pcnDate=$('#pcnDate').val();
      var shippingOrNot=$('#shippingOrNot').val();
      var costPriority=$('#costPriority').val();
      var f11=$('#f11').val();
      var kcxhjzDate=$('#kcxhjzDate').val();
      var note=$('#note').val();

      if(""==fnumber){
        alert("请填写产品代码！");
      }else{
        var flag = true;
        if(""==customerCode){
          if(!confirm('客户代码为空，确定保存吗?')){ 
            flag = false; 
          } 
        } else if(""==customerName){
          if(!confirm('客户名称为空，确定保存吗?')){ 
            flag = false; 
          } 
        }
        if(flag){
          var data={
            name:name,
            token:token,
            source:source,
            sourceCode:sourceCode,
            customerCode:customerCode,
            customerName:customerName,
            fnumber:fnumber,
            productModelZy:productModelZy,
            customerNumber:customerNumber,
            productModel:productModel,
            productLine:productLine,
            productStatus:productStatus,
            pcnFlag:pcnFlag,
            pcnDate:pcnDate,
            shippingOrNot:shippingOrNot,
            costPriority:costPriority,
            f11:f11,
            kcxhjzDate:kcxhjzDate,
            note:note,
          }
          $.ajax({
            url:ip+'fnumber/save',
            type:"POST",
            data:data,
            success:function(rs){
              alert(rs);
              if("保存成功"==rs){
                $('#myModal').modal('hide');
                table.ajax.reload();
                $('#source').val('');
                $('#sourceCode').val('');
                $('#customerCode').val('');
                $('#customerName').val('');
                $('#fnumber').val('');
                $('#productModelZy').val('');
                $('#customerNumber').val('');
                $('#productModel').val('');
                $('#productLine').val('');
                $('#productStatus').val('');
                $('#pcnFlag').val('');
                $('#pcnDate').val('');
                $('#shippingOrNot').val('');
                $('#costPriority').val('');
                $('#f11').val('');
                $('#kcxhjzDate').val('');
                $('#note').val('');
              }   
            }
          });
        }
      }
    }
  });

  $('#example tbody').on('click', 'tr', function (){//选中某行
    $('.selected').toggleClass('selected');
    $(this).toggleClass('selected');
  });

  $(document).on("dblclick","#example tbody tr",function() {//双击事件
    var IdHw = $(this).children('td').eq(0).text();
    var customerCodeHw = $(this).children('td').eq(3).text();
    var fnumberHw = $(this).children('td').eq(5).text();
    var fnumberSelHw = $(this).children('td').eq(6).text();
    var customerNumberHw = $(this).children('td').eq(8).text();
    var pcnFlagHw = $(this).children('td').eq(9).text();
    var productModelHw = $(this).children('td').eq(11).text();
    var fnumberdesc = $(this).children('td').eq(12).text();
    var keyfnumbers = $(this).children('td').eq(13).text();
    var shippingOrNotHw = $(this).children('td').eq(16).text();
    
    hw(IdHw,fnumberHw,fnumberSelHw,customerNumberHw,pcnFlagHw,productModelHw,fnumberdesc,keyfnumbers,shippingOrNotHw);
  }); 

  $(document).on("change","#pcnFlag1",function(){//PCN通过下拉选项
    update1();
  });

  $(document).on("change","#shippingOrNot1",function(){//是否可发货下拉选项
    update1();
  });

  $(document).on("change","#fnumberSelHw",function(){//产品代码(提供华为)下拉选项
    var fnumberSelHw = $('#fnumberSelHw').val();
    keyFnumberHw(fnumberSelHw,"");
    fnumberDescHw(fnumberSelHw)
  });

  $(document).on("click","#updSaveHw",function(){//修改提供华为产品代码 保存按钮
    var keyBomFnumber = "";
    var tableQuery = $("#exampleBom");
    var tbody = tableQuery.children('tbody');
    var trs = tbody.children('tr');
    var keyBomFnumber = "";

    $('input[name="keyfnumbers"]:checked').each(function(){ 
      keyBomFnumber = keyBomFnumber + $(this).val() + ",";
    }); 
    if(""!=keyBomFnumber){
      keyBomFnumber = keyBomFnumber.substr(0,keyBomFnumber.length-1);
    }

    var customerNumberHw=$('#customerNumberHw').val();
    var fnumberSelHw=$('#fnumberSelHw').val();  
    var productModelHw=$('#productModelHw').val();   
    var fnumberDescHw=$('#fnumberDescHw').val();  
    var data={
      name:name,
      token:token,
      customer_number:customerNumberHw,
      fnumberSelect:fnumberSelHw,
      keyBomFnumber:keyBomFnumber,
      productModelHw:productModelHw,
      fnumberDescHw:fnumberDescHw,
    }
    $.ajax({
      url:ip+'fnumber/fnumberselchange',
      type:"POST",
      data:data,
      success:function(rs){
        if(0==rs){
          alert("更新成功！");
          $('#myModalHw').modal('hide');
          table.ajax.reload();
        }   
      }
    });
  });

  $(document).on("click","#upd",function() {//修改
    var td = $(".selected").children('td');
    if (td.length==0){
      alert('请选择一行');
    }else{
      id = td.eq(0).text();
      var data = {
        token: token,
        name: name,
      }
      var select = $('#shippingOrNot1');
      $.ajax({  
        'url': ip+'fnumber/upd?sql='+id,   
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
          $("#ID1").val(rs.data1[0].ID)//
          $('#source1').val(rs.data1[0].source);
          $('#sourceCode1').val(rs.data1[0].source_code);
          $('#customerCode1').val(rs.data1[0].customer_code);
          $('#customerName1').val(rs.data1[0].customer_name);
          $('#fnumber1').val(rs.data1[0].fnumber);
          $('#fnumberSel1').val(rs.data1[0].fnumber_hw);
          $('#productModelZy1').val(rs.data1[0].product_model_zy);
          $('#customerNumber1').val(rs.data1[0].customer_number);
          $('#productModel1').val(rs.data1[0].product_model);
          $('#productLine1').val(rs.data1[0].product_line);
          $('#productStatus1').val(rs.data1[0].product_status);
          $('#pcnFlag1').val(rs.data1[0].pcn_flag);
          $('#pcnDate1').val(rs.data1[0].pcn_date);
          $('#shippingOrNot1').val(rs.data1[0].shipping_or_not);
          $('#costPriority1').val(rs.data1[0].cost_priority);
          $('#f111').val(rs.data1[0].F11);
          $('#kcxhjzDate1').val(rs.data1[0].kcxhjz_date);
          $('#note1').val(rs.data1[0].note);
          $('#fnumberdesc1').val(rs.data1[0].fnumber_desc);
          $('#keyfnumbers1').val(rs.data1[0].key_fnumbers);
        },
      }); 
      $('#myModal1').modal('show');
    }
  });
  $(document).on("click","#updSave",function(){//修改保存按钮
    //if(confirm("确定保存吗？")){
      var id=$('#ID1').val();
      var productStatus=$('#productStatus1').val();
      var pcnFlag=$('#pcnFlag1').val();
      var pcnDate=$('#pcnDate1').val();
      var shippingOrNot=$('#shippingOrNot1').val();
      var costPriority=$('#costPriority1').val();
      var f11=$('#f111').val();
      var kcxhjzDate=$('#kcxhjzDate1').val();
      var note=$('#note1').val();
        
      var data={
        name:name,
        token:token,
        id:id,
        productStatus:productStatus,
        pcnFlag:pcnFlag,
        pcnDate:pcnDate,
        shippingOrNot:shippingOrNot,
        costPriority:costPriority,
        f11:f11,
        kcxhjzDate:kcxhjzDate,
        note:note,
      }
      $.ajax({
        url:ip+'fnumber/updSave',
        type:"POST",
        data:data,
        success:function(rs){
          if(0==rs){
            alert("修改成功！");
            $('#myModal1').modal('hide');
            table.ajax.reload();
          }   
        }
      });
    //}
  });
  $(document).on("click","#del",function(){//删除按钮
    var id=$(".selected").children('td').eq(0).text();
    if (id==""){
      alert("请先选择一行!")
    }else{
      if(confirm("确定删除吗？")){
        $.ajax({  
          'url': ip+"fnumber/del",   
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
            id:id,
          },
        });
      }
    } 
  });

  $(document).on("click","#updQuery",function() {//修订历史
    var td = $(".selected").children('td');
    if (td.length==0){
      alert('请选择一行');
    }else{
      id = td.eq(0).text();
      fnumber = td.eq(5).text();

      $.ajax({
        url: ip+'fnumber/updQuery',
        type: 'post',
        data:{
          token: token,
          name: name,
          sqlId: id,
          sqlFnumber: fnumber,
        },
        success: function(rs){
          $('#exampleUpd').empty();
          var row = '<thead>'+
                    '<tr>'+
                      '<th>产品状态</th>'+
                      '<th>是否为PCN通过的方案</th>'+
                      '<th>PCN通过时间</th>'+
                      '<th>是否可发货</th>'+
                      '<th>成本优先级</th>'+
                      '<th>新增日期</th>'+
                      '<th>修订内容</th>'+
                      '<th>库存消耗截止日期</th>'+
                      '<th>备注</th>'+
                    '</tr>'+
                  '</thead>';
          var data = [
            { "data": "product_status" },
            { "data": "pcn_flag" },
            { "data": "pcn_date" },
            { "data": "shipping_or_not" },
            { "data": "cost_priority" },
            { "data": "update_date1" },
            { "data": "F11" },
            { "data": "kcxhjz_date" },
            { "data": "note" },
          ]
          $('#exampleUpd').append(row)
          $('#exampleUpd').DataTable({
            "data": rs.data,
            "bDestroy":true,
            "paging": false,
            "lengthChange": false,
            "searching": false,
            "ordering": false, 
            "info": false,
            "oLanguage":language,
            "autoWidth": false,
            "aoColumns":data,
          })
        }
      })

      var data = {
        token: token,
        name: name,
      }
      $.ajax({  
        'url': ip+'fnumber/upd?sql='+id, 
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
          $("#ID2").val(rs.data1[0].ID);
          $('#source2').val(rs.data1[0].source);
          $('#sourceCode2').val(rs.data1[0].source_code);
          $('#customerCode2').val(rs.data1[0].customer_code);
          $('#customerName2').val(rs.data1[0].customer_name);
          $('#fnumber2').val(rs.data1[0].fnumber);
          $('#productModelZy2').val(rs.data1[0].product_model_zy);
          $('#customerNumber2').val(rs.data1[0].customer_number);
          $('#productModel2').val(rs.data1[0].product_model);
          $('#productLine2').val(rs.data1[0].product_line);
          $('#productStatus2').val(rs.data1[0].product_status);
          $('#pcnFlag2').val(rs.data1[0].pcn_flag);
          $('#pcnDate2').val(rs.data1[0].pcn_date);
          $('#shippingOrNot2').val(rs.data1[0].shipping_or_not);
          $('#costPriority2').val(rs.data1[0].cost_priority);
          $('#f112').val(rs.data1[0].F11);
          $('#kcxhjzDate2').val(rs.data1[0].kcxhjz_date);
          $('#note2').val(rs.data1[0].note);
          $('#myModal2').modal('show');
        },
      }); 
    }
  });
});
function initComplete(){ //初始化表格
	var dataPlugin1=  '<div class="btn-group pull-left" role="group" aria-label="..."> '+
	                 	  '<button type="button" class="btn btn-default" id="add">新增</button>'+
                      '<button type="button" class="btn btn-default" id="upd">修改</button>'+
                      '<button type="button" class="btn btn-default" id="del">删除</button>'+
                      '<button type="button" class="btn btn-default" id="updQuery">修订历史</button>'+
	                  '</div>';
	$('.clear').append(dataPlugin1);                
}

function update1(){
  var IdHw = $("#ID1").val();
  var fnumberHw = $("#fnumber1").val();
  var fnumberSelHw = $("#fnumberSel1").val();
  var customerNumberHw = $("#customerNumber1").val();
  var pcnFlagHw = $("#pcnFlag1").val();
  var productModelHw = $("#productModelZy1").val();
  var fnumberdesc = $("#fnumberdesc1").val();
  var keyfnumbers = $("#keyfnumbers1").val();
  var shippingOrNotHw = $("#shippingOrNot1").val();
  if("Y"==pcnFlagHw && "N"==shippingOrNotHw){
    if(confirm("是否修改产品代码(提供华为)？")){
      //hw(IdHw,fnumberHw,fnumberSelHw,customerNumberHw,pcnFlagHw,shippingOrNotHw);
      hw(IdHw,fnumberHw,fnumberSelHw,customerNumberHw,pcnFlagHw,productModelHw,fnumberdesc,keyfnumbers,shippingOrNotHw)
    }
  }
}

function hw(IdHw,fnumberHw,fnumberSelHw,customerNumberHw,pcnFlagHw,productModelHw,fnumberdesc,keyfnumbers,shippingOrNotHw){
  var select = $("#fnumberSelHw");
  if (customerNumberHw && ""!=customerNumberHw) {
    $.ajax({
      url: ip + 'fnumber/fnumberselect',
      data: {
        customer_number: customerNumberHw,
        name: getCookie('name'),
        token: getCookie('token'),
      },
      type: 'post',
      success: function(rs){
        select.empty();
        var option = $("<option>").text('').val('');
        select.append(option);
        for(var i=0;i<rs.data.length;i++) {
          var option ='<option value="'+rs.data[i].fnumber+'">'+rs.data[i].fnumber+'</option>';
          select.append(option);
        }
        select.val(fnumberSelHw)//
      }
    });
  }
  keyFnumberHw(fnumberSelHw,keyfnumbers);
  //fnumberDescHw(fnumberSelHw);
  $("#IdHw").val(IdHw)//
  $("#fnumberHw").val(fnumberHw)//
  
  $("#customerNumberHw").val(customerNumberHw)//
  $("#pcnFlagHw").val(pcnFlagHw)//
  $("#shippingOrNotHw").val(shippingOrNotHw)//
  $("#productModelHw").val(productModelHw)//
  $("#fnumberDescHw").val(fnumberdesc)//
  $('#myModalHw').modal('show')
}

function keyFnumberHw(fnumberSelHw,keyfnumbers){
  var keyfnumbersArray = new Array(); //定义一数组 
  if("" != keyfnumbers){
    keyfnumbersArray = keyfnumbers.split(","); //字符分割 
  }

  var tableQuery = $("#exampleBom");
  var tbody = tableQuery.children('tbody');
  tbody.empty();
  if (fnumberSelHw && ""!=fnumberSelHw) {
    $.ajax({
      url: ip + 'fnumber/keyfnumber',
      data: {
        fnumber: fnumberSelHw,
        name: getCookie('name'),
        token: getCookie('token'),
      },
      type: 'post',
      success: function(rs){
        var tr;
        var row = rs.data.length/5;
        for(var i=0;i<rs.data.length;i++) {
          if(0==i%5){
            tr = document.createElement("tr");  
            tbody.append(tr);
          }
          var td = document.createElement("td");
          tr.append(td);
          var label = document.createElement("label");
          td.append(label);
          label.setAttribute("class", "checkbox-inline");
          var input = document.createElement("input");
          label.append(input);
          input.setAttribute("name","keyfnumbers");
          input.setAttribute("type","checkbox");
          input.setAttribute("value",rs.data[i].物料代码);
          for (var j=0;j<keyfnumbersArray.length;j++ ) { 
            //document.write(keyfnumbersArray[j]+"<br/>"); //分割后的字符输出 
            if(keyfnumbersArray[j] == rs.data[i].物料代码){
              input.setAttribute("checked","checked");
            }
          } 
          label.append(rs.data[i].物料代码);                
        }
      }
    });
  }
}

function fnumberDescHw(fnumberSelHw){
  $.ajax({
    url: ip + 'fnumber/fnumberdesc',
    data: {
      fnumberSelHw: fnumberSelHw,
      name: getCookie('name'),
      token: getCookie('token'),
    },
    type: 'post',
    success: function(rs){
      if(rs.data && rs.data.length>0) {            
        $("#fnumberDescHw").val(rs.data[0].fnumber_desc)//
      }
    }
  });
}    

function doUpload() {//上传文件函数
  var formData = new FormData($( "#uploadForm" )[0]);  
  var token = getCookie('token');
  var name = getCookie('name');
  if("test"==name){
    $.ajax({  
      url: ip+'fnumber/upload' ,  
      type: 'POST',  
      data: formData,
      async: false,  
      cache: false,  
      contentType: false,  
      processData: false,  
      success: function (rs) {  
        table.ajax.reload();
        alert(rs);  
      },  
      error: function (rs) {  
        if (rs.status == 403){
          alert("文件类型不匹配")
        }else{
          error(rs)
        }
      }  
    });   
  }else{
    alert("您没有上传权限！");
  }   
}  