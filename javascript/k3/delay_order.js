jQuery.support.cors = true;
var tableDO
var tablePC
var tablePY
var tablePCD
var tablePD
var tableDOD
var tableDOC
var type

//ProductionCycles
$(function(){
    var token = getCookie('token');
    var name = getCookie('name');

    //超15天未结工单
    tableDO=$('#exampleDO').DataTable({
        "bDestroy":true,
        "paging": true,
        "lengthChange": false,
        "searching": true,
        "order": [],
        "info": true,
        "autoWidth": false,
        initComplete:initCompleteDO,
        "oLanguage": language, 
        "dom": 'T<"clear">lfrtip',
        "tableTools": {
            "sSwfPath": "../../plugins/datatables/extensions/TableTools/swf/copy_csv_xls_pdf.swf",
            "aButtons": [{
                "sExtends": "xls",
                "sButtonText": "导出Excel",
            }],
        }, 
        'ajax': {
            'url':ip+"delayorder/exampleDO",
            'error':function(rs){
                error(rs)
            },
            'data': function ( d ) {
                d.starttime = $('#starttimeDO').val();
                d.endtime = $('#endtimeDO').val();
                d.cpType = $('#cpTypeDO').val();
                d.name = name;
                d.token = token;
            } ,
            'type': 'post' 
        }, 
        "aoColumns":[
            {"data":"查询日期"},
            {"data":"类别"},
            {"data":"任务单号"},
            {"data":"产品代码"},
            {"data":"产品名称"},
            {"data":"制单日期"},
            {"data":"结案日期"},
            {"data":"工单数量"},
            {"data":"入库数量"},
            {"data":"入库比"},
        ]
    });

    $('#myTab a').click(function(){//根据用户加载table
        type = $(this).attr('id')
        if (type=="pc"){
            //生产周期统计明细
            tablePC=$('#examplePC').DataTable({
                "bDestroy":true,
                "paging": true,
                "lengthChange": false,
                "searching": true,
                "order": [],
                "info": true,
                "autoWidth": false,
                initComplete:initCompletePC,
                "oLanguage": language, 
                "dom": 'T<"clear1">lfrtip',
                "tableTools": {
                    "sSwfPath": "../../plugins/datatables/extensions/TableTools/swf/copy_csv_xls_pdf.swf",
                    "aButtons": [{
                        "sExtends": "xls",
                        "sButtonText": "导出Excel",
                    }],
                }, 
                'ajax': {
                    'url':ip+"delayorder/examplePC",
                    'error':function(rs){
                        error(rs)
                    },
                    'data': function ( d ) {
                        d.starttime = $('#starttime').val();
                        d.endtime = $('#endtime').val();
                        d.cpType = $('#cpType').val();
                        d.name = name;
                        d.token = token;
                    } ,
                    'type': 'post' 
                }, 
                "aoColumns":[
                    {"data":"日期"},
                    {"data":"产品类型"},
                    {"data":"入库单号"},
                    {"data":"工单号"},
                    {"data":"产品代码"},
                    {"data":"产品名称"},
                    {"data":"领料时间"},
                    {"data":"入库时间"},
                    {"data":"入库数量"},
                    {"data":"单支周期H"},
                ]
            });
        }
        
        if (type=="py"){
            //良率统计
            tablePY=$('#examplePY').DataTable({
                "bDestroy":true,
                "paging": true,
                "lengthChange": false,
                "searching": true,
                "order": [],
                "info": true,
                "autoWidth": false,
                initComplete:initCompletePY,
                "oLanguage": language, 
                "dom": 'T<"clear2">lfrtip',
                "tableTools": {
                    "sSwfPath": "../../plugins/datatables/extensions/TableTools/swf/copy_csv_xls_pdf.swf",
                    "aButtons": [{
                        "sExtends": "xls",
                        "sButtonText": "导出Excel",
                    }],
                }, 
                'ajax': {
                    'url':ip+"delayorder/examplePY",
                    'error':function(rs){
                        error(rs)
                    },
                    'data': function ( d ) {
                        d.starttime = $('#starttimePY').val();
                        d.endtime = $('#endtimePY').val();
                        d.cpType = $('#cpTypePY').val();
                        d.name = name;
                        d.token = token;
                    } ,
                    'type': 'post' 
                }, 
                "aoColumns":[
                    {"data":"日期"},
                    {"data":"型号"},
                    {"data":"良率"},
                ]
            });
            $.ajax({  //良率统计-型号
                'url': ip+'delayorder/getCpTypePY',   
                'type': 'post',
                'data': {
                    token: token,
                    name: name,
                },
                'error':function(rs){
                    alert('网络故障，请刷新重试')
                },
                'success': function(rs){
                    var select = $("#cpTypePY");
                    for(var i=0;i<rs.data.length;i++) {
                    var option = $("<option>").text(rs.data[i].型号).val(rs.data[i].型号);
                    select.append(option);
                    }
                }
            });
        }
        
        if (type=="pcd"){
            //生产周期日报
            tablePCD=$('#examplePCD').DataTable({
                "bDestroy":true,
                "paging": true,
                "lengthChange": false,
                "searching": true,
                "order": [],
                "info": true,
                "autoWidth": false,
                initComplete:initCompletePCD,
                "oLanguage": language, 
                "dom": 'T<"clear3">lfrtip',
                "tableTools": {
                    "sSwfPath": "../../plugins/datatables/extensions/TableTools/swf/copy_csv_xls_pdf.swf",
                    "aButtons": [{
                        "sExtends": "xls",
                        "sButtonText": "导出Excel",
                    }],
                }, 
                'ajax': {
                    'url':ip+"delayorder/examplePCD",
                    'error':function(rs){
                        error(rs)
                    },
                    'data': function ( d ) {
                        d.starttime = $('#starttimePCD').val();
                        d.endtime = $('#endtimePCD').val();
                        d.name = name;
                        d.token = token;
                    } ,
                    'type': 'post' 
                }, 
                "aoColumns":[
                    {"data":"日期"},
                    {"data":"模块周期"},
                    {"data":"器件周期"},
                    {"data":"TO周期"},
                    {"data":"总周期"},
                ]
            });
        }
        
        if (type=="pd"){
            //模块产量日报
            tablePD=$('#examplePD').DataTable({
                "bDestroy":true,
                "paging": true,
                "lengthChange": false,
                "searching": true,
                "order": [],
                "info": true,
                "autoWidth": false,
                initComplete:initCompletePD,
                "oLanguage": language, 
                "dom": 'T<"clear4">lfrtip',
                "tableTools": {
                    "sSwfPath": "../../plugins/datatables/extensions/TableTools/swf/copy_csv_xls_pdf.swf",
                    "aButtons": [{
                        "sExtends": "xls",
                        "sButtonText": "导出Excel",
                    }],
                }, 
                'ajax': {
                    'url':ip+"delayorder/examplePD",
                    'error':function(rs){
                        error(rs)
                    },
                    'data': function ( d ) {
                        d.starttime = $('#starttimePD').val();
                        d.endtime = $('#endtimePD').val();
                        d.name = name;
                        d.token = token;
                    } ,
                    'type': 'post' 
                }, 
                "aoColumns":[
                    {"data":"日期"},
                    {"data":"产量"},
                ]
            });
        }
        
        if (type=="dod"){
            //超15天未结工单日报
            tableDOD=$('#exampleDOD').DataTable({
                "bDestroy":true,
                "paging": true,
                "lengthChange": false,
                "searching": true,
                "order": [],
                "info": true,
                "autoWidth": false,
                initComplete:initCompleteDOD,
                "oLanguage": language, 
                "dom": 'T<"clear5">lfrtip',
                "tableTools": {
                    "sSwfPath": "../../plugins/datatables/extensions/TableTools/swf/copy_csv_xls_pdf.swf",
                    "aButtons": [{
                        "sExtends": "xls",
                        "sButtonText": "导出Excel",
                    }],
                }, 
                'ajax': {
                    'url':ip+"delayorder/exampleDOD",
                    'error':function(rs){
                        error(rs)
                    },
                    'data': function ( d ) {
                        d.starttime = $('#starttimeDOD').val();
                        d.endtime = $('#endtimeDOD').val();
                        d.name = name;
                        d.token = token;
                    } ,
                    'type': 'post' 
                }, 
                "aoColumns":[
                    {"data":"查询日期"},
                    {"data":"模块工单数"},
                    {"data":"器件工单数"},
                    {"data":"TO工单数"},
                    {"data":"模块未入库数"},
                    {"data":"器件未入库数"},
                    {"data":"TO未入库数"},
                ]
            });
        }

        if (type=="doc"){
            //超期工单监控
            tableDOC=$('#exampleDOC').DataTable({
                "bDestroy":true,
                "paging": true,
                "lengthChange": false,
                "searching": true,
                "order": [],
                "info": true,
                "autoWidth": false,
                initComplete:initCompleteDOC,
                "oLanguage": language, 
                "dom": 'T<"clear6">lfrtip',
                "tableTools": {
                    "sSwfPath": "../../plugins/datatables/extensions/TableTools/swf/copy_csv_xls_pdf.swf",
                    "aButtons": [{
                        "sExtends": "xls",
                        "sButtonText": "导出Excel",
                    }],
                }, 
                'ajax': {
                    'url':ip+"delayorder/exampleDOC",
                    'error':function(rs){
                        error(rs)
                    },
                    'data': function ( d ) {
                        d.cpType = $('#cpTypeDOC').val();
                        d.name = name;
                        d.token = token;
                    } ,
                    'type': 'post' 
                }, 
                "aoColumns":[
                    {"data":"类别"},
                    {"data":"制造单号"},
                    {"data":"计划开工日期"},
                    {"data":"结案日期"},
                    {"data":"工单数量"},
                    {"data":"入库数量"},
                    {"data":"入库比"},
                ]
            });
        }
    });  

    $(document).on('click','#exceldo',function(){//do超15天未结工单明细
        var inputTbody = new Array();
        var datas = $('#exampleDO').DataTable().data();
        datas.each(function (data,index) { 
            var input = {};
            input["查询日期"] = data['查询日期'];
            input["产品类型"] = data['产品类型'];
            input["任务单号"] = data['任务单号'];
            input["产品代码"] = data['产品代码'];
            input["产品名称"] = data['产品名称'];
            input["计划开工日期"] = data['计划开工日期'];
            input["结案日期"] = data['结案日期'];
            input["工单数量"] = data['工单数量'];
            input["入库数量"] = data['入库数量'];
            input["入库比"] = data['入库比'];
            inputTbody[index] = input;
        });
        $.ajax({
            'url': ip+'delayorder/doExcel',   
            'type': 'post',
            'data': {
                token: token,
                name: name,
                inputsTbody: inputTbody,
            },
            'error':function(rs){
                alert('网络故障，请刷新重试')
            },
            'success': function(rs){
                window.open(ip+rs, "_self"); 
                alert("下载成功！");
            }
        });
    });

    $(document).on('click','#excelpc',function(){//pc生产周期统计明细
        var inputTbody = new Array();
        var datas = $('#examplePC').DataTable().data();
        datas.each(function (data,index) { 
            var input = {};
            input["日期"] = data['日期'];
            input["产品类型"] = data['产品类型'];
            input["入库单号"] = data['入库单号'];
            input["工单号"] = data['工单号'];
            input["产品代码"] = data['产品代码'];
            input["产品名称"] = data['产品名称'];
            input["领料时间"] = data['领料时间'];
            input["入库时间"] = data['入库时间'];
            input["入库数量"] = data['入库数量'];
            input["单支周期H"] = data['单支周期H'];
            inputTbody[index] = input;
        });
        $.ajax({
            'url': ip+'delayorder/pcExcel',   
            'type': 'post',
            'data': {
                token: token,
                name: name,
                inputsTbody: inputTbody,
            },
            'error':function(rs){
                alert('网络故障，请刷新重试')
            },
            'success': function(rs){
                window.open(ip+rs, "_self"); 
                alert("下载成功！");
            }
        });
    });

    $(document).on('click','#excelpy',function(){//py良率日报
        var inputTbody = new Array();
        var datas = $('#examplePY').DataTable().data();
        datas.each(function (data,index) { 
            var input = {};
            input["日期"] = data['日期'];
            input["型号"] = data['型号'];
            input["良率"] = data['良率'];
            inputTbody[index] = input;
        });
        $.ajax({
            'url': ip+'delayorder/pyExcel',   
            'type': 'post',
            'data': {
                token: token,
                name: name,
                inputsTbody: inputTbody,
            },
            'error':function(rs){
                alert('网络故障，请刷新重试')
            },
            'success': function(rs){
                window.open(ip+rs, "_self"); 
                alert("下载成功！");
            }
        });
    });

    $(document).on('click','#excelpcd',function(){//pcd生产周期日报
        var inputTbody = new Array();
        var datas = $('#examplePCD').DataTable().data();
        datas.each(function (data,index) { 
            var input = {};
            input["日期"] = data['日期'];
            input["模块周期"] = data['模块周期'];
            input["器件周期"] = data['器件周期'];
            input["TO周期"] = data['TO周期'];
            input["总周期"] = data['总周期'];
            inputTbody[index] = input;
        });
        $.ajax({
            'url': ip+'delayorder/pcdExcel',   
            'type': 'post',
            'data': {
                token: token,
                name: name,
                inputsTbody: inputTbody,
            },
            'error':function(rs){
                alert('网络故障，请刷新重试')
            },
            'success': function(rs){
                window.open(ip+rs, "_self"); 
                alert("下载成功！");
            }
        });
    });

    $(document).on('click','#excelpd',function(){//pd模块产量日报
        var inputTbody = new Array();
        var datas = $('#examplePD').DataTable().data();
        datas.each(function (data,index) { 
            var input = {};
            input["日期"] = data['日期'];
            input["产量"] = data['产量'];
            inputTbody[index] = input;
        });
        $.ajax({
            'url': ip+'delayorder/pdExcel',   
            'type': 'post',
            'data': {
                token: token,
                name: name,
                inputsTbody: inputTbody,
            },
            'error':function(rs){
                alert('网络故障，请刷新重试')
            },
            'success': function(rs){
                window.open(ip+rs, "_self"); 
                alert("下载成功！");
            }
        });
    });

    $(document).on('click','#exceldod',function(){//dod超15天未结工单日报
        var inputTbody = new Array();
        var datas = $('#exampleDOD').DataTable().data();
        datas.each(function (data,index) { 
            var input = {};
            input["查询日期"] = data['查询日期'];
            input["模块工单数"] = data['模块工单数'];
            input["器件工单数"] = data['器件工单数'];
            input["TO工单数"] = data['TO工单数'];
            input["模块未入库数"] = data['模块未入库数'];
            input["器件未入库数"] = data['器件未入库数'];
            input["TO未入库数"] = data['TO未入库数'];
            inputTbody[index] = input;
        });
        $.ajax({
            'url': ip+'delayorder/dodExcel',   
            'type': 'post',
            'data': {
                token: token,
                name: name,
                inputsTbody: inputTbody,
            },
            'error':function(rs){
                alert('网络故障，请刷新重试')
            },
            'success': function(rs){
                window.open(ip+rs, "_self"); 
                alert("下载成功！");
            }
        });
    });

    $(document).on('click','#exceldoc',function(){//doc超期工单监控
        var inputTbody = new Array();
        var datas = $('#exampleDOC').DataTable().data();
        datas.each(function (data,index) { 
            var input = {};
            input["类别"] = data['类别'];
            input["制造单号"] = data['制造单号'];
            input["计划开工日期"] = data['计划开工日期'];
            input["结案日期"] = data['结案日期'];
            input["工单数量"] = data['工单数量'];
            input["入库数量"] = data['入库数量'];
            input["入库比"] = data['入库比'];
            inputTbody[index] = input;
        });
        $.ajax({
            'url': ip+'delayorder/docExcel',   
            'type': 'post',
            'data': {
                token: token,
                name: name,
                inputsTbody: inputTbody,
            },
            'error':function(rs){
                alert('网络故障，请刷新重试')
            },
            'success': function(rs){
                window.open(ip+rs, "_self"); 
                alert("下载成功！");
            }
        });
    });

    //超15天未结工单
    $(document).on("change","#starttimeDO",function(){
      tableDO.ajax.reload();
    });

    $(document).on("change","#endtimeDO",function(){
      tableDO.ajax.reload();
    });

    $(document).on("change","#cpTypeDO",function(){
      tableDO.ajax.reload();
    });

    //生产周期统计明细
    $(document).on("change","#starttime",function(){
      tablePC.ajax.reload();
    });

    $(document).on("change","#endtime",function(){
      tablePC.ajax.reload();
    });

    $(document).on("change","#cpType",function(){
      tablePC.ajax.reload();
    });

    //良率统计
    $(document).on("change","#starttimePY",function(){
      tablePY.ajax.reload();
    });

    $(document).on("change","#endtimePY",function(){
      tablePY.ajax.reload();
    });

    $(document).on("change","#cpTypePY",function(){
      tablePY.ajax.reload();
    });

    //生产周期日报
    $(document).on("change","#starttimePCD",function(){
      tablePCD.ajax.reload();
    });

    $(document).on("change","#endtimePCD",function(){
      tablePCD.ajax.reload();
    });

    //模块产量日报
    $(document).on("change","#starttimePD",function(){
      tablePD.ajax.reload();
    });

    $(document).on("change","#endtimePD",function(){
      tablePD.ajax.reload();
    });

    //超15天未结工单日报
    $(document).on("change","#starttimeDOD",function(){
      tableDOD.ajax.reload();
    });

    $(document).on("change","#endtimeDOD",function(){
      tableDOD.ajax.reload();
    });

    //超期工单监控
    $(document).on("change","#cpTypeDOC",function(){
      tableDOC.ajax.reload();
    });

});

//超15天未结工单
function initCompleteDO(){
    var dataPlugin1 = '<div id="dataPluginDO" class="btn-group pull-left" role="group" aria-label="..." style="width: 75%;">'+
                      '<table id="exampleQueryDO" class="table table-bordered " style="table-layout:fixed;">'+
                        '<thead>'+
                          '<tr>'+
                            '<th style="width: 33%;">开始时间：</th>'+
                            '<th style="width: 33%;">结束时间：</th>'+
                            '<th style="width: 33%;">产品类型：</th>'+
                            '<th style="width: 33%;"></th>'+
                          '</tr>'+
                          '<tr>'+
                            '<th><input type="date" id="starttimeDO"></th>'+
                            '<th><input type="date" id="endtimeDO"></th>'+
                            '<th>'+
                              '<select id="cpTypeDO" name="cpTypeDO" class="form-control" style="display:inline;width: 140px;height: 100%">'+
                                '<option selected="selected" value="all">全部</option>'+
                                '<option value="模块">模块</option>'+
                                '<option value="器件">器件</option>'+
                                '<option value="TO">TO</option>'+
                              '</select>'+
                            '</th>'+
                            '<th><button id="exceldo" type="button" class="btn btn-primary pull-left">Excel导出</button></th>'+
                          '</tr>'+
                        '</thead>'+
                      '</table>'+
                    '</div>'
    $('#exampleDO_wrapper').children('.clear').append(dataPlugin1);
}

//生产周期统计明细
function initCompletePC(){
    var dataPlugin1 = '<div id="dataPluginPC" class="btn-group pull-left" role="group" aria-label="..." style="width: 75%;">'+
                      '<table id="exampleQueryPC" class="table table-bordered " style="table-layout:fixed;">'+
                        '<thead>'+
                          '<tr>'+
                            '<th style="width: 33%;">开始时间：</th>'+
                            '<th style="width: 33%;">结束时间：</th>'+
                            '<th style="width: 33%;">产品类型：</th>'+
                            '<th style="width: 33%;"></th>'+
                          '</tr>'+
                          '<tr>'+
                            '<th><input type="date" id="starttime"></th>'+
                            '<th><input type="date" id="endtime"></th>'+
                            '<th>'+
                              '<select id="cpType" name="cpType" class="form-control" style="display:inline;width: 140px;height: 100%">'+
                                '<option selected="selected" value="all">全部</option>'+
                                '<option value="模块">模块</option>'+
                                '<option value="器件">器件</option>'+
                                '<option value="TO">TO</option>'+
                              '</select>'+
                            '</th>'+
                            '<th><button id="excelpc" type="button" class="btn btn-primary pull-left">Excel导出</button></th>'+
                          '</tr>'+
                        '</thead>'+
                      '</table>'+
                    '</div>'
    $('#examplePC_wrapper').children('.clear1').append(dataPlugin1);
    $('#ToolTables_examplePC_0').children('div').css('height','29')
    $('#ToolTables_examplePC_0').children('div').css('width','69')
    $('#ToolTables_examplePC_0').children('div').children('embed').css('height','29')
    $('#ToolTables_examplePC_0').children('div').children('embed').css('width','69')
}

//良率统计
function initCompletePY(){
    var dataPlugin1 = '<div id="dataPluginPY" class="btn-group pull-left" role="group" aria-label="..." style="width: 75%;">'+
                      '<table id="exampleQueryPY" class="table table-bordered " style="table-layout:fixed;">'+
                        '<thead>'+
                          '<tr>'+
                            '<th style="width: 33%;">开始时间：</th>'+
                            '<th style="width: 33%;">结束时间：</th>'+
                            '<th style="width: 33%;">型号：</th>'+
                            '<th style="width: 33%;"></th>'+
                          '</tr>'+
                          '<tr>'+
                            '<th><input type="date" id="starttimePY"></th>'+
                            '<th><input type="date" id="endtimePY"></th>'+
                            '<th>'+
                              '<select id="cpTypePY" name="cpTypePY" class="form-control" style="display:inline;width: 140px;height: 100%">'+
                                '<option selected="selected" value="all">全部</option>'+
                              '</select>'+
                            '</th>'+
                            '<th><button id="excelpy" type="button" class="btn btn-primary pull-left">Excel导出</button></th>'+
                          '</tr>'+
                        '</thead>'+
                      '</table>'+
                    '</div>'
    $('#examplePY_wrapper').children('.clear2').append(dataPlugin1);
    $('#ToolTables_examplePY_0').children('div').css('height','29')
    $('#ToolTables_examplePY_0').children('div').css('width','69')
    $('#ToolTables_examplePY_0').children('div').children('embed').css('height','29')
    $('#ToolTables_examplePY_0').children('div').children('embed').css('width','69')
}

//生产周期日报
function initCompletePCD(){
    var dataPlugin1 = '<div id="dataPluginPCD" class="btn-group pull-left" role="group" aria-label="..." style="width: 75%;">'+
                      '<table id="exampleQueryPCD" class="table table-bordered " style="table-layout:fixed;">'+
                        '<thead>'+
                          '<tr>'+
                            '<th style="width: 33%;">开始时间：</th>'+
                            '<th style="width: 33%;">结束时间：</th>'+
                            '<th style="width: 33%;"></th>'+
                          '</tr>'+
                          '<tr>'+
                            '<th><input type="date" id="starttimePCD"></th>'+
                            '<th><input type="date" id="endtimePCD"></th>'+
                            '<th><button id="excelpcd" type="button" class="btn btn-primary pull-left">Excel导出</button></th>'+
                          '</tr>'+
                        '</thead>'+
                      '</table>'+
                    '</div>'
    $('#examplePCD_wrapper').children('.clear3').append(dataPlugin1);
    $('#ToolTables_examplePCD_0').children('div').css('height','29')
    $('#ToolTables_examplePCD_0').children('div').css('width','69')
    $('#ToolTables_examplePCD_0').children('div').children('embed').css('height','29')
    $('#ToolTables_examplePCD_0').children('div').children('embed').css('width','69')
}

//模块产量日报
function initCompletePD(){
    var dataPlugin1 = '<div id="dataPluginPD" class="btn-group pull-left" role="group" aria-label="..." style="width: 75%;">'+
                      '<table id="exampleQueryPD" class="table table-bordered " style="table-layout:fixed;">'+
                        '<thead>'+
                          '<tr>'+
                            '<th style="width: 33%;">开始时间：</th>'+
                            '<th style="width: 33%;">结束时间：</th>'+
                            '<th style="width: 33%;"></th>'+
                          '</tr>'+
                          '<tr>'+
                            '<th><input type="date" id="starttimePD"></th>'+
                            '<th><input type="date" id="endtimePD"></th>'+
                            '<th><button id="excelpd" type="button" class="btn btn-primary pull-left">Excel导出</button></th>'+
                          '</tr>'+
                        '</thead>'+
                      '</table>'+
                    '</div>'
    $('#examplePD_wrapper').children('.clear4').append(dataPlugin1);
    $('#ToolTables_examplePD_0').children('div').css('height','29')
    $('#ToolTables_examplePD_0').children('div').css('width','69')
    $('#ToolTables_examplePD_0').children('div').children('embed').css('height','29')
    $('#ToolTables_examplePD_0').children('div').children('embed').css('width','69')
}

//超15天未结工单日报
function initCompleteDOD(){
    var dataPlugin1 = '<div id="dataPluginDOD" class="btn-group pull-left" role="group" aria-label="..." style="width: 75%;">'+
                      '<table id="exampleQueryDOD" class="table table-bordered " style="table-layout:fixed;">'+
                        '<thead>'+
                          '<tr>'+
                            '<th style="width: 33%;">开始时间：</th>'+
                            '<th style="width: 33%;">结束时间：</th>'+
                            '<th style="width: 33%;"></th>'+
                          '</tr>'+
                          '<tr>'+
                            '<th><input type="date" id="starttimeDOD"></th>'+
                            '<th><input type="date" id="endtimeDOD"></th>'+
                            '<th><button id="exceldod" type="button" class="btn btn-primary pull-left">Excel导出</button></th>'+
                          '</tr>'+
                        '</thead>'+
                      '</table>'+
                    '</div>'
    $('#exampleDOD_wrapper').children('.clear5').append(dataPlugin1);
    $('#ToolTables_exampleDOD_0').children('div').css('height','29')
    $('#ToolTables_exampleDOD_0').children('div').css('width','69')
    $('#ToolTables_exampleDOD_0').children('div').children('embed').css('height','29')
    $('#ToolTables_exampleDOD_0').children('div').children('embed').css('width','69')
}

//超期工单监控
function initCompleteDOC(){
    var dataPlugin1 = '<div id="dataPluginDOC" class="btn-group pull-left" role="group" aria-label="..." style="width: 75%;">'+
                      '<table id="exampleQueryDOC" class="table table-bordered " style="table-layout:fixed;">'+
                        '<thead>'+
                          '<tr>'+
                            '<th style="width: 33%;">产品类型：</th>'+
                            '<th style="width: 33%;"></th>'+
                          '</tr>'+
                          '<tr>'+
                            '<th>'+
                              '<select id="cpTypeDOC" name="cpTypeDOC" class="form-control" style="display:inline;width: 140px;height: 100%">'+
                                '<option selected="selected" value="all">全部</option>'+
                                '<option value="模块">模块</option>'+
                                '<option value="器件">器件</option>'+
                                '<option value="TO">TO</option>'+
                              '</select>'+
                            '</th>'+
                            '<th><button id="exceldoc" type="button" class="btn btn-primary pull-left">Excel导出</button></th>'+
                          '</tr>'+
                        '</thead>'+
                      '</table>'+
                    '</div>'
    $('#exampleDOC_wrapper').children('.clear6').append(dataPlugin1);
    $('#ToolTables_exampleDOC_0').children('div').css('height','29')
    $('#ToolTables_exampleDOC_0').children('div').css('width','69')
    $('#ToolTables_exampleDOC_0').children('div').children('embed').css('height','29')
    $('#ToolTables_exampleDOC_0').children('div').children('embed').css('width','69')
}