jQuery.support.cors = true;
var table
var id ="hw"
var data1 = [
                { "data": "id" },
                { "data": "date" },
                { "data": "business_mode" },
                { "data": "po_number" },
                { "data": "po_line_num" },
                { "data": "supplier_item" },
                { "data": "customer_item" },
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
        id = $(this).attr('id')
        $("#order_type").val(id)
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
            d.type = id;
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
          }
        ],
        "aoColumns": data1//加载table //获取table
    });
    $('#example tbody').on('click', 'tr', function () {//选中某行
        $("#select2-K3-container").attr("title","");
        $("#select2-K3-container").empty();
        $("#K3").empty();
        if ($(this).hasClass('selected') ) {
           $(this).removeClass('selected');
        } else {
           table.$('tr.selected').removeClass('selected');
           $(this).addClass('selected');
        }
        var customer_number=$(".selected").children('td').eq(6).text();
        var type=$(".selected").children('td').eq(2).text();
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
                $("#K3").empty();
            },
            success: function(rs){
                var select = $("#K3");
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
    } );
    // $('#K3').click(function(){
    //     var customer_number=$(".selected").children('td').eq(5).text();
    //     $.ajax({
    //     url: ip + 'order/fnumber',
    //     data: {
    //         customer_number:customer_number
    //     },
    //     type: 'post',
    //     error: function(rs){
    //         error(rs)
    //         },
    //         success: function(rs){
    //         var select = $("#K3");
    //         $("#K3").empty();
    //             for(var i=0;i<rs.data.length;i++) {
    //             var option = $("<option>").text(rs.data[i].fnumber).val(rs.data[i].fnumber);
    //             select.append(option);
    //             }
    //         }
    //     })
    // });
    $('#create').click(function(){//生成按钮    
        var date = new Date();
        var year=(date.getYear()-100).toString();
        var month = date.getMonth() + 1 ;
        month=(month<10?"0"+month:month).toString();
        var order_id = $(".selected").children('td').eq(0).text();
        var num=$(".selected").children('td').eq(9).text();
        var sul = $('#sl').val()
        if (num==""){
          alert("请先选择一行!")
        }else{
            if(sul==""){
                alert('请输入数量')
            }else{
                if(parseInt(num)-parseInt(sul)<0){
                    alert('数量已超出')
                }else{
                    $.ajax({
                        'url': ip+'order/edit',
                        'data':{
                          // token: token,
                          fnumber: $("#K3").val(),
                          id: order_id,
                          name: name,
                          token: token,
                          type: id,
                        } , 
                        'type': 'post',
                        'error': function(rs){
                            error(rs)
                        },
                        success:function(rs){                           
                            datetime = date.toLocaleDateString();
                            var a =""
                            switch(rs.data2.business_mode)
                            {
                                case "Normal":
                                    a="普通销售"
                                    break;
                                case "DUN":
                                    a="普通销售"
                                    break;
                                case "VCI-VRN":
                                    a="VMI补货"
                                    break;
                                case "VCI-PO":
                                    a="VMI补货"
                                    break;
                                case "VCI-CA":
                                    a="VMI结算"
                                    break;
                                default:
                            }
                            $('#ddlx').val(a);//主表内容赋值
                            $('#ddbh').val(rs.data2.po_number);
                            $('#jdrq').val(rs.data2.creation_date);
                            $('#bh').val(rs.data4)
                            $('#rq').val(datetime);
                            $('#khdm').val('');
                            $('#xspq').val('');
                            var select = $("#ghdw");
                            $("#ghdw").empty();
                            select.append($("<option>").text("").val(""))
                            for(var i=0;i<rs.data3.length;i++) {
                                var option = $("<option>").text(rs.data3[i].fnumber+rs.data3[i].fname).val(rs.data3[i].fnumber);
                                select.append(option);
                            }

                            $('#ddhh_1').val(rs.data2.po_line_num);//分表内容赋值 
                            $('#dydm_1').val(rs.data2.customer_item);
                            $('#rwl_1').val(rs.data2.task_num);
                            $('#cpdm_1').val(rs.data1[0].fnumber);
                            $('#cpmc_1').val(rs.data1[0].fname);
                            $('#ggxh_1').val(rs.data1[0].fmodel);
                            $('#dw_1').val(rs.data1[0].funit) //单位
                            $('#sl_1').val($('#sl').val());
                            $('#dj_1').val(Number(rs.data2.unit_price))// 单价
                            $('#sl_2').val('17%');
                            $('#hsdj_1').val(Number(rs.data2.unit_price)*1.17)//含税单价

                            $('#jhrq_1').val(rs.data2.request_date) //交货日期
                            $('#zd').val(name);
                            $('#cnjhrq_1').val(rs.data2.last_promise_date);
                            $('#wlfl_1').val(rs.data1[0].fenlei);
                            $('#myModal').modal('show')

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
                            for(var i=0;i<rs.data6.length;i++) {                        
                                if (rs.data6[i].FName=="人民币"){
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
                        }
                    })
                }
            }
            
        }
    });
    $('#save').click(function(){//保存按钮
        if ($('#ghdw').val()==""||$('#ywy').val()==""){
            alert('请输入完整信息')
        }else{
            var formData = new FormData($( "#orderform" )[0]);
            // alert(formData.bh)
            $.ajax({
                url: ip+'order/create' ,  
                type: 'POST',  
                data: formData,
                async: false,  
                cache: false,  
                contentType: false,  
                processData: false, 
                success:function(rs){
                    alert("保存成功")
                    $('#myModal').modal('hide')
                } ,
                error:function(rs){
                    // error(rs)
                    if (rs.status=402){
                        alert("保存失败")
                    }else{
                        error(rs)
                    }
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
            alert("上传成功");  
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