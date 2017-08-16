jQuery.support.cors = true;
var table
var table1
var type ="hw"
var data1 = [
                { "data": "creation_date" },
                { "data": "id" },
                { "data": "date" },
                { "data": "business_mode" },
                { "data": "po_number" },
                { "data": "po_line_num" },
                { "data": "supplier_item" },
                { "data": "customer_item" },
                {},
                { "data": "qty_request" },
                { "data": "num1" },
                { "data": "num" },
                { "data": "qty" },
                { "data": "request_date" },
                { "data": "task_num" },
                { "data": "unit_price" },
                // { "data": "flag"}
            ]
$(function(){
    var token = getCookie('token');
    var name = getCookie('name');
    $(".select3").select2();
    // $("#K3").select2();
    $('#myTab a').click(function(){//根据用户加载table
        type = $(this).attr('id')
        if (type=="other"){
            table1 = $('#example1').DataTable({
                "bDestroy":true,
                "lengthChange": false,
                "paging": true,
                "searching": true,
                "order": [[ 1, "asc" ]],
                "oLanguage": language, 
                initComplete:initComplete1,
                "dom": 'T<"clear1">lfrtip',
                "createdRow": function (row, data, dataIndex) {  
                    if (data.flag == "1") {  
                        for (var i = 0; i < 19; i++) {  
                            $('td', row).eq(i).css('font-weight', "bold").css("color", "red");  
                        }  
                    }  
                },
                "tableTools": {
                  "sSwfPath": "../../plugins/datatables/extensions/TableTools/swf/copy_csv_xls_pdf.swf",
                  "aButtons": [
                    {
                    "sExtends": "xls",
                    "sButtonText": "导出Excel",
                    }
                  ],
                }, 
                "aoColumnDefs":[
                    {
                        "targets": 9,//编辑
                        "data": null,
                        // "defaultContent": "<span style='width:18px;overflow:hidden;'>"+
                        // "<select  class='form-control k3' style='display: inline;width: 100px;height: 26px' onchange='this.parentNode.nextSibling.value=this.value'></select>"+
                        // "</span><input name='box' class = 'fnumber'>"
                        "defaultContent":'<table  class="table table-bordered k3" ></table>'
                    },
                ],
                ajax:{
                    url: ip + 'order/index',
                    type: 'post',
                    data:{
                        name : name,
                        token: token,
                        type: type,
                    },
                    error: function(rs){

                    }
                },
                "aoColumns":[
                    { "data": "creation_date" },
                    { "data": "id" },
                    { "data": "customer_name" },
                    { "data": "ghdw_name" },
                    { "data": "business_mode" },
                    // { "data": "vendor_name"},
                    { "data": "po_number" },
                    { "data": "po_line_num" },
                    { "data": "supplier_item" },
                    { "data": "customer_item" },
                    {},
                    { "data": "qty_request" },
                    { "data": "num1" },
                    { "data": "num" },
                    { "data": "qty" },
                    { "data": "request_date" },
                    { "data": "task_num" },
                    { "data": "unit_price" },
                    { "data": "vendor_name"},
                    { "data": "date" },
                ],
            })
        }else{
            $("#order_type").val(type)
            table.ajax.reload();
        }
    })
    table=$('#example').DataTable({
        "bDestroy":true,
        "paging": true,
        "lengthChange": false,
        "searching": true,
        "order": [[ 1, "asc" ]],
        // "pagingType": "simple_numbers",
        // "bServerSide" : true,//服务端分页
        "info": true,
        "autoWidth": false,
        initComplete:initComplete,
        "oLanguage": language, 
        // "dom": "<'row'<'col-sm-3'l<'#mytoolbox1'>><'col-sm-9'f<'#mytoolbox2'>r>"+
        //        "t"+
        //        "<'foot'<'col-sm-6'i><'col-sm-6'p>>", 
        "dom": 'T<"clear">lfrtip',
        "createdRow": function (row, data, dataIndex) {  
            if (data.flag == "1") {  
                for (var i = 0; i < 16; i++) {  
                    $('td', row).eq(i).css('font-weight', "bold").css("color", "red");  
                }  
            }  
        },
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
          'url':ip+"order/index",
          'error':function(rs){
            error(rs)
          },
          'data': function ( d ) {
            d.starttime = $('#starttime').val();
            d.endtime = $('#endtime').val();
            d.ddztsel = $('#ddztsel').val();
            d.name = name;
            d.token = token;
            d.type = type;
          } ,
          'type': 'post' 
        } , 
        "aoColumnDefs":[
          { "aTargets" :　[3],
            "mRender" : function(data, type, full){
                switch (data){
                    case "Normal":
                        return "普通销售"
                        break;
                    case "DUN":
                        return "普通销售"
                        break;
                    case "VCI-VRN":
                        return "VMI补货"
                        break;
                    case "VCI-CA":
                        return "VMI结算"
                        break;
                    case "VCI-PO":
                        return "VMI补货"
                        break;
                    default:
                        return data
                }
            }
          },
          {
            "targets": 8,//编辑
            "data": null,
            // "defaultContent": "<select  class='form-control k3' style='display: inline;width: 100px;height: 26px'></select>"
            "defaultContent":'<table  class="table table-bordered k3" ></table>',
          },
        ],
        "aoColumns": data1//加载table //获取table
    });
    $(document).on("dblclick","#example1 tbody tr",function(){//其它客户选中某行

        var po_number =$(".selected").children('td').eq(5).text();
        if($(this).children('td').eq(5).text()==po_number){
            if ($(this).hasClass('selected') ){
                $(this).removeClass('selected');
            } else{
                $(this).addClass('selected');
            }
        }else{
            table1.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
        
        var customer_number=$(this).children('td').eq(8).text();
        var type=$(this).children('td').eq(4).text();
        var select = $(this).children().find('.k3')
        var id  = $(this).children('td').eq(1).text();
        if (select[0].rows.length != 0 ) {

        }else{
            $.ajax({
                url: ip + 'order/fnumber',
                data: {
                    id : id,
                    type:type,
                    customer_number:customer_number,
                    name: name,
                    token: token, 
                },
                type: 'post',
                error: function(rs){
                    error(rs)
                },
                success: function(rs){
                    select.empty()
                    for(var i=0;i<rs.data.length;i++) {
                        // var option = $("<option>").text(rs.data[i].fnumber).val(rs.data[i].fnumber);
                        var option = '<tr>'+
                            '<th><input type="checkbox" ></th>'+
                            '<th><input type="text" disabled="disabled" value="'+rs.data[i].fnumber+ '"></th>'+
                            '<th><input type="text" style="width: 60px"></th>'+
                            '</tr>'
                        select.append(option);
                    }
                    if (rs.data.length==0){
                        var option = '<tr>'+
                            '<th><input type="checkbox" ></th>'+
                            '<th><input type="text" ></th>'+
                            '<th><input type="text" style="width: 60px"></th>'+
                            '<th><button class="addBtn-1"><i class="fa fa-fw fa-plus"></i></button></th>'+
                            '</tr>'
                        select.append(option);
                    }
                }
            })
        }
    });
    $('#example tbody').on('dblclick', 'tr', function () {//大客户table选中某行
        var po_number =$(".selected").children('td').eq(4).text();
        if($(this).children('td').eq(4).text()==po_number){
            if ($(this).hasClass('selected') ){
                $(this).removeClass('selected');
            } else{
                $(this).addClass('selected');
            }
        }else{
                var ke = $(".selected").children('td').find('.k3')
                ke.empty()
                table.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
        }
        // alert($(this).children('td').eq(3).text())
        var customer_number=$(this).children('td').eq(7).text();
        var order_type = $(this).children('td').eq(3).text();
        var id  = $(this).children('td').eq(1).text();
        var select = $(this).children().find('.k3')
        if (select[0].rows.length != 0 ) {
            
        }else{
            $.ajax({
                url: ip + 'order/fnumber',
                data: {
                    id: id,
                    order_type:order_type,
                    type: type,
                    customer_number:customer_number,
                    name: name,
                    token: token, 
                },
                type: 'post',
                error: function(rs){
                    error(rs)
                },
                success: function(rs){
                    if(typeof(rs)=='string'){
                        alert(rs)
                    }else{
                        select.empty()
                        for(var i=0;i<rs.data.length;i++) {
                            // var option = $("<option>").text(rs.data[i].fnumber).val(rs.data[i].fnumber);
                            var option = '<tr>'+
                                '<th><input type="checkbox" ></th>'+
                                '<th><input type="text" disabled="disabled" value="'+rs.data[i].fnumber+ '"></th>'+
                                '<th><input type="text" style="width: 60px"></th>'+
                                '</tr>'
                            select.append(option);
                        }
                        if (rs.data.length==0){
                            var option = '<tr>'+
                                '<th><input type="checkbox" ></th>'+
                                '<th><input type="text" ></th>'+
                                '<th><input type="text" style="width: 60px"></th>'+
                                '<th><button class="addBtn"><i class="fa fa-fw fa-plus"></i></button></th>'+
                                '</tr>'
                            select.append(option);
                        }
                    }
                }
            })
        }
    } );
    $('#create2').click(function(){//其它客户生成按钮 
        var flag = 0
        $('#example2 tbody').empty()  
        var date = new Date();
        var year=(date.getYear()-100).toString();
        var month = date.getMonth() + 1 ;
        month=(month<10?"0"+month:month).toString();
        
        var td = $(".selected").children('td'); 
        var id = new Array()
        var fnumber 
        var k3fn = new Array()
        var num = new Array()
        var qty = new Array()//剩余数量
        var k = 0
        var qty2 = 0
        var ghdw = td.eq(4).text();//订单类型
        var po_number = td.eq(5).text();
        for(var i = 0; i < td.length/19; i++){
            // id = td.eq(i*14+0).text() +" " +id
            var num2 = 0
            fnumber = td.eq(i*19+9).find('input')//td.eq(i*14+8).find('.fnumber').val() +" " +fnumber
            for(var j = 0; j < fnumber.length/3; j++){
                if(fnumber[0+j*3].checked==true){
                    id[k] = td.eq(i*19+1).text() 
                    k3fn[k] = fnumber[1+j*3].value
                    num[k] = (fnumber[2+j*3].value)
                    qty[k] = td.eq(i*19+13).text()
                    k++
                    qty2 = parseInt(td.eq(i*19+13).text())
                    var num1 = parseInt(fnumber[2+j*3].value)
                    num2 = num2 + num1
                }
            }
            console.log(num2)
            console.log(qty2)
            if(num2> qty2){
                alert('数量已超出')
                flag = 1
            }
        }
        // console.log(qty)
        $.ajax({
            url: ip + 'order/edit_1',
            data:{
                id: id,
                fnumber: k3fn,
                type: type,
                name: name,
                token: token,
                ghdw: ghdw,
                po_number: po_number,
            },
            type: 'post',
            error: function(rs){
                error(rs)
            },
            success: function(rs){
                if (ghdw == '现款销售'){
                    for (i=0;i<=rs.data1.length-1;i++){
                        if (rs.data1[i][0].fenlei==null){
                            rs.data1[i][0].fenlei=''
                        }else{
                        }
                        if (rs.data2[i].task_num==null){
                            rs.data2[i].task_num=''
                        }else{
                        }
                        if (rs.data2[i].customer_item == null){
                            rs.data2[i].customer_item= ''
                        }else{
                        }
                        var row1 ='<tr>'+
                            '<th><input type="text" value='+rs.data2[i].po_line_num+' ></th>'+
                            '<th><input type="text" value='+rs.data2[i].customer_item+' ></th>'+
                            '<th><input type="text" disabled="disabled" value="'+num[i]+'" name="sl_1"></th>'+
                            '<th><input type="text" value='+qty[i]+' ></th>'+
                            '<th><input type="text" value='+rs.data2[i].task_num+' ></th>'+
                            '<th><input type="text" value='+rs.data1[i][0].fnumber+' ></th>'+
                            '<th><input type="text" value='+rs.data1[i][0].fname+' ></th>'+
                            // '<th><input type="text" value='+rs.data1[i][0].fmodel+' ></th>'+
                            '<th><input type="text" value='+rs.data1[i][0].funit+' ></th>'+
                            '<th><input type="text" value='+(Number(rs.data2[i].unit_price)/1.17).toFixed(5) +' name="dj_1"></th>'+
                            '<th><input type="text" value="17%" ></th>'+
                            '<th><input type="text" value='+rs.data2[i].unit_price+'></th>'+
                            '<th><input type="text" value='+rs.data2[i].request_date+'></th>'+
                            '<th><input type="text" value='+rs.data2[i].request_date+'></th>'+
                            '<th><input type="text" value='+rs.data1[i][0].fenlei+'></th>'+
                          '</tr>'
                        $('#example2 tbody').append(row1) 
                    }
                    
                }else{
                    for (i=0;i<=rs.data1.length-1;i++){
                        if (rs.data1[i][0].fenlei==null){
                            rs.data1[i][0].fenlei=''
                        }else{
                        }
                        if (rs.data2[i].task_num==null){
                            rs.data2[i].task_num=''
                        }else{
                        }
                        if(rs.data8[i].length==1){
                        }else{
                            flag=1
                            alert(rs.data1[i][0].fnumber+"价格政策错误")
                        }
                        var row1 ='<tr>'+
                            '<th><input type="text" value='+rs.data2[i].po_line_num+' ></th>'+
                            '<th><input type="text" value='+rs.data2[i].customer_item+' ></th>'+
                            '<th><input type="text" disabled="disabled" value="'+num[i]+'" name="sl_1"></th>'+
                            '<th><input type="text" value='+qty[i]+' ></th>'+
                            '<th><input type="text" value='+rs.data2[i].task_num+' ></th>'+
                            '<th><input type="text" value='+rs.data1[i][0].fnumber+' ></th>'+
                            '<th><input type="text" value='+rs.data1[i][0].fname+' ></th>'+
                            // '<th><input type="text" value='+rs.data1[i][0].fmodel+' ></th>'+
                            '<th><input type="text" value='+rs.data1[i][0].funit+' ></th>'+
                            '<th><input type="text" value='+(Number(rs.data8[i][0].fprice)/1.17).toFixed(5) +' name="dj_1"></th>'+
                            '<th><input type="text" value="17%" ></th>'+
                            '<th><input type="text" value='+rs.data8[i][0].fprice+'></th>'+
                            '<th><input type="text" value='+rs.data2[i].request_date+'></th>'+
                            '<th><input type="text" value='+rs.data2[i].request_date+'></th>'+
                            '<th><input type="text" value='+rs.data1[i][0].fenlei+'></th>'+
                        '</tr>'
                        $('#example2 tbody').append(row1)
                        if (parseFloat(rs.data8[i][0].fprice)-parseFloat(rs.data2[i].unit_price).toFixed(5)==0){

                        }else{
                            flag = 1
                            alert(rs.data1[i][0].fnumber+'价格与订单不匹配')
                        }
                    }
                     
                }
                $('#lxkh').val(rs.data2[0].customer_name);
                $('#ddlx').val(ghdw);//主表内容赋值
                $('#ddbh').val(rs.data2[0].po_number);
                $('#jdrq').val(rs.data2[0].creation_date);
                $('#bh').val(rs.data4)
                $('#rq').val(date.toLocaleDateString());
                $('#khdm').val('');
                $('#xspq').val('');
                $('#zd').val(name);
                var select = $("#ghdw");
                $("#ghdw").empty();
                $.ajax({
                    'url': ip+'order/ghdw',
                    'data':{
                      name: name,
                      token: token,
                      ghdw: rs.data2[0].ghdw_code,
                    } , 
                    'type': 'post',
                    'error': function(rs){
                        error(rs)
                    },
                    success:function(rs){
                        $('#khdm').val(rs[0].F_102)
                        $('#xspq').val(rs[0].FName)
                    }
                });
                select.append($("<option>").text("").val(""))
                for(var i=0;i<rs.data3.length;i++) {
                    if (rs.data3[i].fnumber == rs.data2[0].ghdw_code){
                        var option = $("<option>").text(rs.data3[i].fnumber+rs.data3[i].fname).val(rs.data3[i].fnumber);
                        option.attr('selected','selected')
                        select.append(option);
                    }else{
                        var option = $("<option>").text(rs.data3[i].fnumber+rs.data3[i].fname).val(rs.data3[i].fnumber);
                        select.append(option);
                    }
                    
                }
                select.select2();
                $("#bm").empty();
                $("#bb").empty();
                $("#xsfs").empty();
                var select1 = $("#bm");
                for(var i=0;i<rs.data5.length;i++) {
                    if (rs.data5[i].FName=="营销部-华南"){
                        var option = $("<option>").text(rs.data5[i].FItemID+rs.data5[i].FName).val(rs.data5[i].FItemID);
                        option.attr('selected','selected')
                        select1.append(option);
                    }else{
                        var option = $("<option>").text(rs.data5[i].FItemID+rs.data5[i].FName).val(rs.data5[i].FItemID);
                        select1.append(option);
                    }
                }
                var select2 = $("#bb")
                var bbtype
                if (type=='njy'){
                    bbtype='美元'
                }else{
                    bbtype='人民币'
                }
                for(var i=0;i<rs.data6.length;i++) {                        
                    if (rs.data6[i].FName==bbtype){
                        var option = $("<option>").text(rs.data6[i].FName).val(rs.data6[i].FCurrencyID);
                        option.attr('selected','selected')
                        select2.append(option);
                    }else{
                        if(rs.data6[i].FName=="*"){

                        }else{
                            var option = $("<option>").text(rs.data6[i].FName).val(rs.data6[i].FCurrencyID);
                            select2.append(option);
                        }
                    }
                }
                var select3 = $("#xsfs")
                for(var i=0;i<rs.data7.length;i++) {                        
                    if (rs.data7[i].FName=="赊销"){
                        var option = $("<option>").text(rs.data7[i].FName).val(rs.data7[i].FInterID);
                        option.attr('selected','selected')
                        select3.append(option);
                    }else{
                        var option = $("<option>").text(rs.data7[i].FName).val(rs.data7[i].FInterID);
                        select3.append(option);
                    }
                }
                $("#bm").select2();
                $("#bb").select2();
                $("#xsfs").select2();
                if(flag==0){
                    $('#myModal').modal('show')
                }
            }
        });
    });
    $('#create').click(function(){//大客户生成按钮  
        var flag=0
        $('#example2 tbody').empty()  
        var date = new Date();
        var year=(date.getYear()-100).toString();
        var month = date.getMonth() + 1 ;
        month=(month<10?"0"+month:month).toString();
        var td = $(".selected").children('td'); 
        var k = 0
        var id = new Array()  
        var fnumber
        var k3fn = new Array()
        var qty = new Array()//需求数量
        var qty2 = 0
        var num = new Array()
        for(var i = 0; i < td.length/16; i++) {
            // for (j = 0; j<)
            // fnumber = td.eq(i*15+7).find('.k3')[0].val() +" " +fnumber
            var num2 = 0
            fnumber = td.eq(i*16+8).find('input')
            for(var j = 0; j < fnumber.length/3; j++){
                if(fnumber[0+j*3].checked==true){
                    id[k] = td.eq(i*16+1).text() 
                    k3fn[k] = (fnumber[1+j*3].value)
                    num[k] = (fnumber[2+j*3].value)
                    qty[k] = td.eq(i*16+12).text()
                    k++
                    qty2 = parseInt(td.eq(i*16+12).text())
                    var num1 = parseInt(fnumber[2+j*3].value)
                    num2 = num2 + num1
                    
                }
            }
            if(num2> qty2){
                alert('数量已超出')
                flag = 1
            }
        }
        var ghdw = td.eq(3).text();//订单类型
        var po_number = td.eq(4).text();
        // console.log(id)
        // console.log(num)
        // console.log(k3fn)

        $.ajax({
            url: ip + 'order/edit_1',
            data:{
                id: id,
                fnumber: k3fn,
                type: type,
                name: name,
                token: token,
                ghdw: ghdw,
                po_number: po_number,
            },
            type: 'post',
            error: function(rs){
                // console.log(rs)
                // alert(rs)
                error(rs)
            },
            success: function(rs){
                // alert(rs.data1.length)
                
                for (i=0;i<=rs.data1.length-1;i++){
                    if(rs.data8[i].length==1){
                    }else{
                        // alert(rs.data8[i].length)
                        flag=1
                        alert(rs.data1[i][0].fnumber+"价格政策错误")
                    }
                    if (rs.data1[i][0].fenlei==null){
                        rs.data1[i][0].fenlei=''
                    }else{
                    }
                    if (rs.data2[i].task_num==null){
                        rs.data2[i].task_num=''
                    }else{
                    }
                    var row1 ='<tr>'+
                            '<th><input type="text" value='+rs.data2[i].po_line_num+' ></th>'+
                            '<th><input type="text" value='+rs.data2[i].customer_item+' ></th>'+
                            '<th><input type="text" disabled="disabled" value="'+num[i]+'" name="sl_1"></th>'+
                            '<th><input type="text" value='+qty[i]+' ></th>'+
                            '<th><input type="text" value='+rs.data2[i].task_num+' ></th>'+
                            '<th><input type="text" value='+rs.data1[i][0].fnumber+' ></th>'+
                            '<th><input type="text" value='+rs.data1[i][0].fname+' ></th>'+
                            // '<th><input type="text" value='+rs.data1[i][0].fmodel+' ></th>'+
                            '<th><input type="text" value='+rs.data1[i][0].funit+' ></th>'+
                            '<th><input type="text" value='+rs.data2[i].unit_price +' name="dj_1"></th>'+
                            '<th><input type="text" value="17%" ></th>'+
                            '<th><input type="text" value='+(Number(rs.data2[i].unit_price)*1.17).toFixed(5)+'></th>'+
                            '<th><input type="text" value='+rs.data2[i].request_date+'></th>'+
                            '<th><input type="text" value='+rs.data2[i].request_date+'></th>'+
                            '<th><input type="text" value='+rs.data1[i][0].fenlei+'></th>'+
                          '</tr>'
                    var row2 ='<tr>'+
                            '<th><input type="text" value='+rs.data2[i].po_line_num+' ></th>'+
                            '<th><input type="text" value='+rs.data2[i].customer_item+' ></th>'+
                            '<th><input type="text" disabled="disabled" value="'+num[i]+'" name="sl_1"></th>'+
                            '<th><input type="text" value='+qty[i]+' ></th>'+
                            '<th><input type="text" value='+rs.data2[i].task_num+' ></th>'+
                            '<th><input type="text" value='+rs.data1[i][0].fnumber+' ></th>'+
                            '<th><input type="text" value='+rs.data1[i][0].fname+' ></th>'+
                            // '<th><input type="text" value='+rs.data1[i][0].fmodel+' ></th>'+
                            '<th><input type="text" value='+rs.data1[i][0].funit+' ></th>'+
                            '<th><input type="text" value='+(Number(rs.data2[i].unit_price)/1.17).toFixed(5)+' name="dj_1"></th>'+
                            '<th><input type="text" value="17%" ></th>'+
                            '<th><input type="text" value='+rs.data2[i].unit_price+'></th>'+
                            '<th><input type="text" value='+rs.data2[i].request_date+'></th>'+
                            '<th><input type="text" value='+rs.data2[i].request_date+'></th>'+
                            '<th><input type="text" value='+rs.data1[i][0].fenlei+'></th>'+
                          '</tr>'
                    var row3 ='<tr>'+
                            '<th><input type="text" value='+rs.data2[i].po_line_num+' ></th>'+
                            '<th><input type="text" value='+rs.data2[i].customer_item+' ></th>'+
                            '<th><input type="text" disabled="disabled" value="'+num[i]+'" name="sl_1"></th>'+
                            '<th><input type="text" value='+qty[i]+' ></th>'+
                            '<th><input type="text" value='+rs.data2[i].task_num+' ></th>'+
                            '<th><input type="text" value='+rs.data1[i][0].fnumber+' ></th>'+
                            '<th><input type="text" value='+rs.data1[i][0].fname+' ></th>'+
                            // '<th><input type="text" value='+rs.data1[i][0].fmodel+' ></th>'+
                            '<th><input type="text" value='+rs.data1[i][0].funit+' ></th>'+
                            '<th><input type="text" value='+(Number(rs.data8[i][0].fprice)/1.17).toFixed(5)+' name="dj_1"></th>'+
                            '<th><input type="text" value="17%" ></th>'+
                            '<th><input type="text" value='+rs.data8[i][0].fprice+'></th>'+
                            '<th><input type="text" value='+rs.data2[i].request_date+'></th>'+
                            '<th><input type="text" value='+rs.data2[i].request_date+'></th>'+
                            '<th><input type="text" value='+rs.data1[i][0].fenlei+'></th>'+
                          '</tr>'
                    var row4 ='<tr>'+
                            '<th><input type="text" value='+rs.data2[i].po_line_num+' ></th>'+
                            '<th><input type="text" value='+rs.data2[i].customer_item+' ></th>'+
                            '<th><input type="text" disabled="disabled" value="'+num[i]+'" name="sl_1"></th>'+
                            '<th><input type="text" value='+qty[i]+' ></th>'+
                            '<th><input type="text" value='+rs.data2[i].task_num+' ></th>'+
                            '<th><input type="text" value='+rs.data1[i][0].fnumber+' ></th>'+
                            '<th><input type="text" value='+rs.data1[i][0].fname+' ></th>'+
                            // '<th><input type="text" value='+rs.data1[i][0].fmodel+' ></th>'+
                            '<th><input type="text" value='+rs.data1[i][0].funit+' ></th>'+
                            '<th><input type="text" value='+(Number(rs.data8[i][0].fprice)/1.17).toFixed(5) +' name="dj_1"></th>'+
                            '<th><input type="text" value="17%" ></th>'+
                            '<th><input type="text" value='+rs.data2[i].unit_price +'></th>'+
                            '<th><input type="text" value='+date.toLocaleDateString()+'></th>'+
                            '<th><input type="text" value='+date.toLocaleDateString()+'></th>'+
                            '<th><input type="text" value='+rs.data1[i][0].fenlei+'></th>'+
                          '</tr>'
                    if(type=='zx'){
                        if(rs.data2[i].business_mode=='VMI补货'||rs.data2[i].business_mode=='HUB补货'){

                        }else{
                            if (parseFloat(rs.data8[i][0].fprice)-parseFloat(rs.data2[i].unit_price).toFixed(5)==0){

                            }else{
                                flag = 1
                                alert(rs.data1[i][0].fnumber+'价格与订单不匹配')
                            }
                        }
                        $('#example2 tbody').append(row2) 
                    }else if(type=='hs'){
                        $('#example2 tbody').append(row3) 
                    }else if(type=='njy'||type=='zxhub'){
                        if (parseFloat(rs.data8[i][0].fprice)-parseFloat(rs.data2[i].unit_price)==0){

                        }else{
                            flag = 1
                            alert(rs.data1[i][0].fnumber+'价格与订单不匹配')
                        }
                        if (type =='njy'){
                            $('#example2 tbody').append(row2) 
                        }else{
                            $('#example2 tbody').append(row4) 
                        }
                    }else if(type=='fh'){
                        if(rs.data2[i].business_mode=='VMI补货'){

                        }else{
                            if (parseFloat(rs.data8[i][0].fprice)-(parseFloat(rs.data2[i].unit_price)*1.17).toFixed(5)==0){

                            }else{
                                // alert(parseFloat(rs.data8[i][0].fprice)-(parseFloat(rs.data2[i].unit_price)*1.17).toFixed(5))
                                flag = 1
                                alert(rs.data1[i][0].fnumber+'价格与订单不匹配')
                            }
                        }
                        $('#example2 tbody').append(row1) 
                    }else {
                        if(rs.data2[i].business_mode=='VCI-VRN'||rs.data2[i].business_mode=='VCI-PO'){

                        }else{
                            if (parseFloat(rs.data8[i][0].fprice)-(parseFloat(rs.data2[i].unit_price)*1.17).toFixed(5)==0){

                            }else{
                                // alert(parseFloat(rs.data8[i][0].fprice)-(parseFloat(rs.data2[i].unit_price)*1.17).toFixed(5))
                                flag = 1
                                alert(rs.data1[i][0].fnumber+'价格与订单不匹配')
                            }
                        }
                        $('#example2 tbody').append(row1) 
                    }
                  
                }
                $('#ddlx').val(ghdw);//主表内容赋值
                $('#ddbh').val(rs.data2[0].po_number);
                if (type == 'zxhub'){
                    $('#jdrq').val(date.toLocaleDateString());
                }else{
                    $('#jdrq').val(rs.data2[0].creation_date);
                }
                $('#bh').val(rs.data4)
                $('#rq').val(date.toLocaleDateString());
                $('#khdm').val('');
                $('#xspq').val('');
                $('#zd').val(name);
                var select = $("#ghdw");
                $("#ghdw").empty();
                select.append($("<option>").text("").val(""))
                for(var i=0;i<rs.data3.length;i++) {
                    var option = $("<option>").text(rs.data3[i].fnumber+rs.data3[i].fname).val(rs.data3[i].fnumber);
                    select.append(option);
                }

                $("#bm").empty();
                $("#bb").empty();
                $("#xsfs").empty();
                var select1 = $("#bm");
                for(var i=0;i<rs.data5.length;i++) {
                    if (rs.data5[i].FName=="营销部-华南"){
                        var option = $("<option>").text(rs.data5[i].FItemID+rs.data5[i].FName).val(rs.data5[i].FItemID);
                        option.attr('selected','selected')
                        select1.append(option);
                    }else{
                        var option = $("<option>").text(rs.data5[i].FItemID+rs.data5[i].FName).val(rs.data5[i].FItemID);
                        select1.append(option);
                    }
                }
                var select2 = $("#bb")
                var bbtype
                if (type=='njy'){
                    bbtype='美元'
                }else{
                    bbtype='人民币'
                }
                for(var i=0;i<rs.data6.length;i++) {                        
                    if (rs.data6[i].FName==bbtype){
                        var option = $("<option>").text(rs.data6[i].FName).val(rs.data6[i].FCurrencyID);
                        option.attr('selected','selected')
                        select2.append(option);
                    }else{
                        if(rs.data6[i].FName=="*"){

                        }else{
                            var option = $("<option>").text(rs.data6[i].FName).val(rs.data6[i].FCurrencyID);
                            select2.append(option);
                        }
                    }
                }
                var select3 = $("#xsfs")
                for(var i=0;i<rs.data7.length;i++) {                        
                    if (rs.data7[i].FName=="赊销"){
                        var option = $("<option>").text(rs.data7[i].FName).val(rs.data7[i].FInterID);
                        option.attr('selected','selected')
                        select3.append(option);
                    }else{
                        var option = $("<option>").text(rs.data7[i].FName).val(rs.data7[i].FInterID);
                        select3.append(option);
                    }
                }
                $("#bm").select2();
                $("#bb").select2();
                $("#xsfs").select2();
                if(flag==0){
                    $('#myModal').modal('show')
                }
            }
        })
        
    });
    $('#other_save').click(function(){//其它订单保存
        var name = $('#customer_name').val()//零星客户名称
        var po_number = $('#po_number').val()//客户订单编号
        var business_mode = $('#business_mode').val()//订单类型
        var ghdw_name = $('#ghdw_all').find("option:selected").text()//购货单位名称
        var ghdw_code = $('#ghdw_all').val()//购货单位内码
        // var price = $('#unit_price').val()//单价
        var creation_date = $('#creation_date').val()//下单日期

        var inputs = document.getElementById('order-other').getElementsByTagName('input')
        var po_line_num = new Array//行号
        var customer_item = new Array//客户编码 
        var supplier_item = new Array//客户型号
        var vendor_name = new Array//正源型号
        var qty_request = new Array//需求数量
        var request_date = new Array//需求日期
        var price = new Array
        for (var i = 0;i<inputs.length/7;i++){
            po_line_num[i] = inputs[0+i*7].value
            customer_item[i] = inputs[1+i*7].value
            supplier_item[i] = inputs[2+i*7].value
            vendor_name[i] = inputs[3+i*7].value
            price[i] = inputs[4+i*7].value
            qty_request[i] = inputs[5+i*7].value
            request_date[i] = inputs[6+i*7].value
        }

        $.ajax({
            url : ip + 'order/new',
            type: 'post',
            data:{
                name : name,//$('#customer_name').val(),
                po_number: po_number,//$('#po_number').val(),
                business_mode: business_mode,//$('#business_mode').val(),
                ghdw_name : ghdw_name,//$('#ghdw_all').find("option:selected").text(),
                ghdw_code : ghdw_code,//$('#ghdw_all').val(),
                price: price,//$('#unit_price').val(),
                creation_date: creation_date,//$('#creation_date').val(),

                supplier_item: supplier_item,
                vendor_name: vendor_name,
                po_line_num: po_line_num,
                qty_request: qty_request,
                request_date: request_date,
                customer_item: customer_item,
            },
            success: function(rs){
                alert(rs)
                $('#Modal').modal('hide')
                table1.ajax.reload()
            },
            error: function(XMLHttpRequest, textStatus, errorThrown){
                alert(XMLHttpRequest +" , "+ textStatus + " , " + errorThrown);
            },
        })
    });
    $('#save').click(function(){//保存按钮
        if ($('#ghdw').val()==""||$('#ywy').val()==""){
            alert('请输入完整信息')
        }else{
            var tableinput = document.getElementById('example2');
            var textinputs = tableinput.getElementsByTagName('input');
            var ddhh_1 = new Array()
            var dydm_1 = new Array()
            var rwl_1 = new Array()
            var cpdm_1 = new Array()
            var cpmc_1 = new Array()
            // var ggxh_1 = new Array()
            var dw_1 = new Array()
            var sl_1 = new Array()
            var num = new Array()
            var dj_1 = new Array()
            var sl_2 = new Array()
            var hsdj_1 = new Array()
            var jhrq_1 = new Array()
            var cnjhrq_1 = new Array()
            var wlfl_1 =  new Array()

            for(var i = 0; i < textinputs.length/14; i++) {
                ddhh_1[i] = textinputs[i*14+0].value
                dydm_1[i] = textinputs[i*14+1].value
                sl_1[i] = textinputs[i*14+2].value
                num[i] = textinputs[i*14+3].value
                rwl_1[i] = textinputs[i*14+4].value
                cpdm_1[i] = textinputs[i*14+5].value
                cpmc_1[i] = textinputs[i*14+6].value
                // ggxh_1[i] = textinputs[i*15+7].value
                dw_1[i] = textinputs[i*14+7].value
                
                dj_1[i] = textinputs[i*14+8].value
                sl_2[i] = textinputs[i*14+9].value
                hsdj_1[i] = textinputs[i*14+10].value
                jhrq_1[i] = textinputs[i*14+11].value
                cnjhrq_1[i] = textinputs[i*14+12].value
                wlfl_1[i] = textinputs[i*14+13].value
            }
            // var formData = new FormData($( "#orderform" )[0]);
            if(compare(sl_1,num)){
                $.ajax({
                    url: ip+'order/create_1' ,  
                    type: 'POST',  
                    data:  {
                        ddhh_1:ddhh_1,
                        dydm_1:dydm_1,
                        rwl_1:rwl_1,
                        cpdm_1:cpdm_1,
                        cpmc_1:cpmc_1,
                        // ggxh_1:ggxh_1,
                        dw_1:dw_1,
                        sl_1:sl_1,
                        dj_1:dj_1,
                        sl_2:sl_2,
                        hsdj_1:hsdj_1,
                        jhrq_1:jhrq_1,
                        cnjhrq_1:cnjhrq_1,
                        wlfl_1:wlfl_1,

                        lxkh:$('#lxkh').val(),
                        bh:$('#bh').val(),
                        ghdw:$('#ghdw').val(),
                        ddlx:$('#ddlx').val(),
                        ddbh:$('#ddbh').val(),
                        jdrq:$('#jdrq').val(),
                        khdm:$('#khdm').val(),
                        xspq:$('#xspq').val(),
                        rq:$('#rq').val(),
                        zd:$('#zd').val(),

                        bm:$('#bm').val(),
                        ywy:$('#ywy').val(),
                        xsfs:$('#xsfs').val(),
                        bb:$('#bb').val(),
                    },
                    success:function(rs){
                        if (type == 'other'){
                            table1.ajax.reload();
                        }else{
                            table.ajax.reload();
                        }
                        alert("保存成功")
                        $('#myModal').modal('hide')
                    } ,
                    error:function(rs){
                        error(rs)
                        $('#myModal').modal('hide')
                    }
                });
            }else{
                alert('数量已超出')
            }
            
        }
    });
    $('#ghdw').change(function(){ //购货单位选取
        $.ajax({
            'url': ip+'order/ghdw',
            'data':{
              name: name,
              token: token,
              ghdw: $('#ghdw').val(),
            } , 
            'type': 'post',
            'error': function(rs){
                error(rs)
            },
            success:function(rs){
                $('#khdm').val(rs[0].F_102)
                $('#xspq').val(rs[0].FName)
            }
        });
    })
      
    $.ajax({
        url: ip+'order/ywy',  
        type: 'POST',
        'data':{
            name: name,
            token: token,
        } , 
        success:function(rs){
            var select = $("#ywy");
            select.append($("<option>").text("").val(""))
            for(var i=0;i<rs.length;i++) {
                var option = $("<option>").text(rs[i].FNumber+rs[i].FName).val(rs[i].FItemID);
                select.append(option);
            }
            $("#ywy").select2();
        } ,
        error:function(rs){
            error(rs)
        }
    });
    $(document).on("click",".addBtn",function(){ //添加行按钮
        var select = $(this).parent('th').parent('tr').parent('tbody')
        var option = '<tr>'+
            '<th><input type="text" style="width: 70px;"></th>'+
            '<th><input type="text" style="width: 130px;"></th>'+
            '<th><input type="text" style="width: 130px;"></th>'+
            '<th><input type="text" style="width: 130px;"></th>'+
            '<th><input type="text" style="width: 130px;"></th>'+
            '<th><input type="text" style="width: 130px;"></th>'+
            '<th><input type="date" style="width: 130px;"></th>'+
            '<th><button class="delBtn"><i class="fa fa-fw fa-minus"></i></button>'+
            '</tr>'
        select.append(option);
        // console.log(select)
    });
    $(document).on("click",".addBtn-1",function(){
        // alert('a')
        var select = $(this).parent('th').parent('tr').parent('tbody').parent('.k3')
        var option = '<tr>'+
            '<th><input type="checkbox" ></th>'+
            '<th><input type="text" ></th>'+
            '<th><input type="text" style="width: 60px"></th>'+
            '<th><button class="addBtn-1"><i class="fa fa-fw fa-plus"></i></button></th>'+
            '</tr>'
        select.append(option);
    });
    $(document).on("click",".delBtn",function(){//删除行按钮
      $(this).parent().parent().remove();
    });
    $(document).on("click","#order-update1",function(){//
        alert('a')
    })
    $(document).on("click","#order-update2",function(){//
        alert('b')
    })
});
function doUpload() {  
    var formData = new FormData($( "#uploadForm" )[0]);  
    $.ajax({  
        url: ip+'order/upload' ,  
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
    });   //  //上传文件函数
}  

function initComplete(){ //大客户订单初始化

    var dataPlugin1 = '<div id="dataPlugin1" class="btn-group pull-left" role="group" aria-label="..." style="width: 75%;">'+
                      '<table id="exampleQuery" class="table table-bordered " style="table-layout:fixed;">'+
                        '<thead>'+
                          '<tr>'+
                            '<th style="width: 33%;">开始时间：</th>'+
                            '<th style="width: 33%;">结束时间：</th>'+
                            '<th style="width: 33%;">订单状态：</th>'+
                          '</tr>'+
                          '<tr>'+
                            '<th><input type="date" id="starttime"></th>'+
                            '<th><input type="date" id="endtime"></th>'+
                            '<th>'+
                              '<select id="ddztsel" name="ddztsel" class="form-control" style="display:inline;width: 140px;height: 100%">'+
                                '<option selected="selected" value="all">全部</option>'+
                                '<option value="未执行完订单">未执行完订单</option>'+
                                '<option value="己执行完订单">己执行完订单</option>'+
                              '</select>'+
                            '</th>'+
                          '</tr>'+
                          '<tr>'+
                            '<th colspan="3">'+
                              '<button type="button" class="btn btn-default" id="true">确定</button>'+
                              '<button type="button" class="btn btn-default" id="order-update1">变更</button>'+
                              '<button type="button" class="btn btn-default" onclick="order_close()">关闭</button>'+
                              '<button type="button" class="btn btn-default" onclick="order_open()">反关闭</button>'+
                            '</th>'+
                          '</tr>'+
                        '</thead>'+
                      '</table>'+
                    '</div>'
    $('.clear').append(dataPlugin1);
    $('#true').click(function(){
        table.ajax.reload();
    }); //初始化函数
}
function initComplete1(){//其它订单初始化
    var dataPlugin1='<div class="btn-group pull-left" role="group" aria-label="...">'+
        '<button type="button" class="btn btn-default" id="other-create">新增</button>'+
        '<button type="button" class="btn btn-default" id="order-update2">变更</button>'+
        '<button type="button" class="btn btn-default" onclick="order_close()">关闭</button>'+
        '<button type="button" class="btn btn-default" onclick="order_open()">反关闭</button>'+
        '</div>'
    // $('#example1_wrapper').children('.row').children('.col-sm-6').eq(0).append(dataPlugin1);
    $('#example1_wrapper').children('.clear1').append(dataPlugin1);
    $('#ToolTables_example1_0').children('div').css('height','29')
    $('#ToolTables_example1_0').children('div').css('width','69')
    $('#ToolTables_example1_0').children('div').children('embed').css('height','29')
    $('#ToolTables_example1_0').children('div').children('embed').css('width','69')
    $(document).on("click","#other-create",function(){
        $.ajax({
            url: ip + 'order/ghdw_all',
            type: 'get',
            error: function(){

            },
            success: function(rs){
                $('#customer_name').val('')
                $('#po_number').val('')
                $('#po_line_num').val('')
                $('#customer_item').val('')
                $('#supplier_item').val('')
                $('#vendor_name').val('')
                $('#qty_request').val('')
                $('#unit_price').val('')
                var select = $("#ghdw_all")
                select.empty()
                for(var i=0;i<rs.length;i++) {
                    var option = $("<option>").text(rs[i].fnumber+' '+rs[i].fname).val(rs[i].fnumber);
                    select.append(option);
                }
                select.select2();
                $('#Modal').modal('show')
            },
        })
        // $('#Modal').modal('show')
    });
}
function compare(arr2,arr1){
    var flag = 1
    
    return flag
}
function order_close(){//关闭按钮
    var id =$(".selected").children('td').eq(1).text();
    if (id==""){
        alert('请选择一行')
    }else{
        if (confirm("确定关闭"+id+"吗？")){
            $.ajax({
                url: ip + 'order/close',
                type: 'post',
                data:{
                    id: id,
                },
                success:function(rs){
                    alert(rs)
                    table.ajax.reload()
                },
                error:function(rs){
                    error(rs)
                }
            })
        }
    }
}
function order_open(){//反关闭按钮
    var id =$(".selected").children('td').eq(1).text();
    if (id==""){
        alert('请选择一行')
    }else{
        if (confirm("确定反关闭"+id+"吗？")){
            $.ajax({
                url: ip + 'order/open',
                type: 'post',
                data:{
                    id: id,
                },
                success:function(rs){
                    alert(rs)
                    table.ajax.reload()
                },
                error:function(rs){
                    error(rs)
                }
            })
        }
    }
}




