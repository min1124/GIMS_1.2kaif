jQuery.support.cors = true;
var table
var type ="hw"
var data1 = [
                { "data": "id" },
                { "data": "date" },
                { "data": "business_mode" },
                { "data": "po_number" },
                { "data": "po_line_num" },
                { "data": "supplier_item" },
                { "data": "customer_item" },
                {},
                { "data": "qty_request" },
                { "data": "num" },
                { "data": "qty" },
                { "data": "request_date" },
                { "data": "task_num" },
                { "data": "unit_price" },
                { "data": "creation_date" },
            ]
$(function(){
    var token = getCookie('token');
    var name = getCookie('name');
    $(".select3").select2();
    // $("#K3").select2();
    $('#myTab a').click(function(){//根据用户加载table
        type = $(this).attr('id')
        $("#order_type").val(type)
        table.ajax.reload();
    })
    table=$('#example').DataTable({
        "bDestroy":true,
        "paging": true,
        "lengthChange": false,
        "searching": true,
        "ordering": true,
        // "pagingType": "simple_numbers",
        // "bServerSide" : true,//服务端分页
        "info": true,
        "autoWidth": false,
        initComplete:initComplete,
        "oLanguage": language, 
        "dom": "<'row'<'col-sm-3'l<'#mytoolbox1'>><'col-sm-9'f<'#mytoolbox2'>r>"+
               "t"+
               "<'foot'<'col-sm-6'i><'col-sm-6'p>>", 
        'ajax': {
          'url':ip+"order/index",
          'error':function(rs){
            error(rs)
          },
          'data': function ( d ) {
            d.starttime = $('#starttime').val();
            d.endtime = $('#endtime').val();
            d.name = name;
            d.token = token;
            d.type = type;
          } ,
          'type': 'post' 
        } , 
        "aoColumnDefs":[
          { "aTargets" :　[2],
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
                        return ""
                }
            }
          },
          {
            "targets": 7,//编辑
            "data": null,
            "defaultContent": "<select  class='form-control k3' style='display: inline;width: 100px;height: 26px'></select>"
          },
        ],
        "aoColumns": data1//加载table //获取table
    });
    $('#example tbody').on('click', 'tr', function () {//选中某行
        var po_number =$(".selected").children('td').eq(3).text();
        // $("#select2-K3-container").attr("title","");
        // $("#select2-K3-container").empty();
        if($(this).children('td').eq(3).text()==po_number){
            $(this).addClass('selected');
        }else{
            if ($(this).hasClass('selected') ) {
                $(this).removeClass('selected');
            } else {
                table.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            }
        }
        var customer_number=$(this).children('td').eq(6).text();
        var type=$(this).children('td').eq(2).text();
        var select = $(this).children().find('.k3')
        if (select.val() != null ) {

        }else{
            $.ajax({
                url: ip + 'order/fnumber',
                data: {
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
                    
                    // var str=$("<span class='select2-selection__placeholder'>请选择名称</span>");
                    // $('#K3').val("");
                    // $("#K3").attr("title","");
                    // $("#K3").prepend(str);
                    
                    for(var i=0;i<rs.data.length;i++) {
                        var option = $("<option>").text(rs.data[i].fnumber).val(rs.data[i].fnumber);
                        select.append(option);
                    }
                }
            })
        }
    } );
    
    $('#create').click(function(){//生成按钮  
        $('#example2 tbody').empty()  
        var date = new Date();
        var year=(date.getYear()-100).toString();
        var month = date.getMonth() + 1 ;
        month=(month<10?"0"+month:month).toString();
        var td = $(".selected").children('td'); 
        var id =''   
        var fnumber = ''
        for(var i = 0; i < td.length/15; i++) {
            id = td.eq(i*15+0).text() +" " +id
            fnumber = td.eq(i*15+7).find('.k3').val() +" " +fnumber
        }
        var ghdw = td.eq(2).text();
        var po_number = td.eq(3).text();
        console.log(id)
        console.log(fnumber)
        $.ajax({
            url: ip + 'order/edit_1',
            data:{
                id: id,
                fnumber: fnumber,
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
                var flag=0
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
                            '<th><input type="text" value="" name="sl_1"></th>'+
                            '<th><input type="text" value='+rs.data2[i].task_num+' ></th>'+
                            '<th><input type="text" value='+rs.data1[i][0].fnumber+' ></th>'+
                            '<th><input type="text" value='+rs.data1[i][0].fname+' ></th>'+
                            '<th><input type="text" value='+rs.data1[i][0].fmodel+' ></th>'+
                            '<th><input type="text" value='+rs.data1[i][0].funit+' ></th>'+
                            '<th><input type="text" value='+rs.data2[i].unit_price +' name="dj_1"></th>'+
                            '<th><input type="text" value="17%" ></th>'+
                            '<th><input type="text" value='+Number(rs.data2[i].unit_price)*1.17.toFixed(5)+'></th>'+
                            '<th><input type="text" value='+rs.data2[i].request_date+'></th>'+
                            '<th><input type="text" value='+rs.data2[i].request_date+'></th>'+
                            '<th><input type="text" value='+rs.data1[i][0].fenlei+'></th>'+
                          '</tr>'
                    var row2 ='<tr>'+
                            '<th><input type="text" value='+rs.data2[i].po_line_num+' ></th>'+
                            '<th><input type="text" value='+rs.data2[i].customer_item+' ></th>'+
                            '<th><input type="text" value="" name="sl_1"></th>'+
                            '<th><input type="text" value='+rs.data2[i].task_num+' ></th>'+
                            '<th><input type="text" value='+rs.data1[i][0].fnumber+' ></th>'+
                            '<th><input type="text" value='+rs.data1[i][0].fname+' ></th>'+
                            '<th><input type="text" value='+rs.data1[i][0].fmodel+' ></th>'+
                            '<th><input type="text" value='+rs.data1[i][0].funit+' ></th>'+
                            '<th><input type="text" value='+Number(rs.data2[i].unit_price)/1.17.toFixed(5)+' name="dj_1"></th>'+
                            '<th><input type="text" value="17%" ></th>'+
                            '<th><input type="text" value='+rs.data2[i].unit_price+'></th>'+
                            '<th><input type="text" value='+rs.data2[i].request_date+'></th>'+
                            '<th><input type="text" value='+rs.data2[i].request_date+'></th>'+
                            '<th><input type="text" value='+rs.data1[i][0].fenlei+'></th>'+
                          '</tr>'
                    var row3 ='<tr>'+
                            '<th><input type="text" value='+rs.data2[i].po_line_num+' ></th>'+
                            '<th><input type="text" value='+rs.data2[i].customer_item+' ></th>'+
                            '<th><input type="text" value="" name="sl_1"></th>'+
                            '<th><input type="text" value='+rs.data2[i].task_num+' ></th>'+
                            '<th><input type="text" value='+rs.data1[i][0].fnumber+' ></th>'+
                            '<th><input type="text" value='+rs.data1[i][0].fname+' ></th>'+
                            '<th><input type="text" value='+rs.data1[i][0].fmodel+' ></th>'+
                            '<th><input type="text" value='+rs.data1[i][0].funit+' ></th>'+
                            '<th><input type="text" value='+Number(rs.data8[i][0].fprice)/1.17.toFixed(5)+' name="dj_1"></th>'+
                            '<th><input type="text" value="17%" ></th>'+
                            '<th><input type="text" value='+rs.data8[i][0].fprice+'></th>'+
                            '<th><input type="text" value='+rs.data2[i].request_date+'></th>'+
                            '<th><input type="text" value='+rs.data2[i].request_date+'></th>'+
                            '<th><input type="text" value='+rs.data1[i][0].fenlei+'></th>'+
                          '</tr>'
                    if(type=='zx'){
                        if(rs.data2[i].business_mode=='VCI-VRN'||rs.data2[i].business_mode=='VCI-PO'){

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
                $('#jdrq').val(rs.data2[0].creation_date);
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
    $('#save').click(function(){//保存按钮
        if ($('#ghdw').val()==""||$('#ywy').val()==""){
            alert('请输入完整信息')
        }else{
            var table = document.getElementById('example2');
            var textinputs = table.getElementsByTagName('input');
            var ddhh_1 = new Array()
            var dydm_1 = new Array()
            var rwl_1 = new Array()
            var cpdm_1 = new Array()
            var cpmc_1 = new Array()
            var ggxh_1 = new Array()
            var dw_1 = new Array()
            var sl_1 = new Array()
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
                rwl_1[i] = textinputs[i*14+3].value
                cpdm_1[i] = textinputs[i*14+4].value
                cpmc_1[i] = textinputs[i*14+5].value
                ggxh_1[i] = textinputs[i*14+6].value
                dw_1[i] = textinputs[i*14+7].value
                // sl_1[i] = textinputs[i*14+7].value
                dj_1[i] = textinputs[i*14+8].value
                sl_2[i] = textinputs[i*14+9].value
                hsdj_1[i] = textinputs[i*14+10].value
                jhrq_1[i] = textinputs[i*14+11].value
                cnjhrq_1[i] = textinputs[i*14+12].value
                wlfl_1[i] = textinputs[i*14+13].value
            }
            // var formData = new FormData($( "#orderform" )[0]);
            // console.log(formData)
            $.ajax({
                url: ip+'order/create_1' ,  
                type: 'POST',  
                data:  {
                    ddhh_1:ddhh_1,
                    dydm_1:dydm_1,
                    rwl_1:rwl_1,
                    cpdm_1:cpdm_1,
                    cpmc_1:cpmc_1,
                    ggxh_1:ggxh_1,
                    dw_1:dw_1,
                    sl_1:sl_1,
                    dj_1:dj_1,
                    sl_2:sl_2,
                    hsdj_1:hsdj_1,
                    jhrq_1:jhrq_1,
                    cnjhrq_1:cnjhrq_1,
                    wlfl_1:wlfl_1,

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
                    alert("保存成功")
                    $('#myModal').modal('hide')
                } ,
                error:function(rs){
                    error(rs)
                    $('#myModal').modal('hide')
                }
            });
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
        url: ip+'order/ywy' ,  
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

function initComplete(){
    var dataPlugin1='<div class="btn-group pull-left" role="group" aria-label="...">'+
        '<button type="button" class="btn btn-default" id="true">确定</button>'+
        '</div>'
    var dataPlugin2 ='<div id="time" class=" pull-left dateRange"> '+
            '<span>开始时间：</span><input type="date" id="starttime"> ——<span>结束时间：</span><input type="date" id="endtime">'+
            '</div>';
    $('#mytoolbox1').append(dataPlugin1);
    $('#example_filter').append(dataPlugin2); 
    $('#true').click(function(){
        table.ajax.reload();
    }); //初始化函数
}