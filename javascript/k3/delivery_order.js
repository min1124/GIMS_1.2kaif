jQuery.support.cors = true;
var table;
$(function() {
	var name = getCookie("name");
	var token = getCookie("token");

    $('.addBtn').click(function (){ //添加行按钮
        var row='<tr>'+
                  '<th><button class="delBtn"><i class="fa fa-fw fa-minus"></i></button></th>'+
                  '<th><input type="text" id="ckdh" style="width: 100%"></th>'+
                  '<th><input type="text" id="hth" disabled="disabled" style="width: 100%"></th>'+
                  '<th><input type="text" id="hh" disabled="disabled" style="width: 100%;"></th>'+
                  '<th><input type="text" id="wldm" disabled="disabled" style="width: 100%;"></th>'+
                  '<th><input type="text" id="wlms" disabled="disabled" style="width: 100%;"></th>'+
                  '<th><input type="text" id="xh" style="width: 48%;">/<input type="text" id="xs" style="width: 48%;"></th>'+
                  '<th><input type="text" id="mxsl" style="width: 100%;"></th>'+
                  '<th><input type="text" id="zsl" style="width: 100%;"></th>'+
                  '<th><input type="text" id="bz" disabled="disabled" style="width: 100%;"></th>'+
                  '<th><input type="text" id="cpph" disabled="disabled" style="width: 100%;"></th>'+
                '</tr>';
        $('#example').append(row);
    });

    $(document).on("click",".delBtn",function(){//删除行按钮
        var ths = $(this).parent().parent().children('th');

        var hj = 0;
        if($('#hj').val()){
            hj = $('#hj').val()
        }

        var zsl = 0;
        if(ths.find("input[id='zsl']").val()){
            zsl = ths.find("input[id='zsl']").val();
        }

        hj = parseInt(hj) - parseInt(zsl);
        $('#hj').val(hj);//合计
        $(this).parent().parent().remove();
        makeZXS();
    });

    $(document).on("change","#ckdh",function(){//填写出库单号，带出合同号，行号，物料号，物料描述，总数量，备注
        var ths = $(this).parent().parent().children('th')
        var ckdh = ths.find("input[id='ckdh']").val();

        var hj = 0;
        if($('#hj').val()){
            hj = $('#hj').val()
        }

        var zsl = 0;
        if(ths.find("input[id='zsl']").val()){
            zsl = ths.find("input[id='zsl']").val();
        }

        if(""==ckdh){
            alert("请填写出库单号！");
            ths.find("input[id='hth']").val('');//合同号
            ths.find("input[id='hh']").val('');//行号
            ths.find("input[id='wldm']").val('');//物料号
            ths.find("input[id='wlms']").val('');//物料描述
            ths.find("input[id='zsl']").val('');//总数量
            ths.find("input[id='bz']").val('');//备注

            ths.find("input[id='xh']").val('');//箱号分子：xh/xs
            ths.find("input[id='xs']").val('');//箱号分母：xh/xs
            makeZXS();

            ths.find("input[id='mxsl']").val('');//每箱数量：mxsl
            
            hj = parseInt(hj) - parseInt(zsl);
            $('#hj').val(hj);//合计
        }else{
            $.ajax({
                'url': ip+'deliveryorder/ckdhChange',   
                'type': 'post',
                'data': {
                    token: token,
                    name: name,
                    ckdh: ckdh,
                },
                'error':function(rs){
                    alert('网络故障，请刷新重试')
                },
                'success': function(rs){
                    if (rs.data[0]!=null){
                        ths.find("input[id='hth']").val(rs.data[0].合同号)//合同号
                        ths.find("input[id='hh']").val(rs.data[0].行号)//行号
                        ths.find("input[id='wldm']").val(rs.data[0].物料号)//物料号
                        ths.find("input[id='wlms']").val(rs.data[0].物料描述)//物料描述
                        ths.find("input[id='zsl']").val(rs.data[0].总数量)//总数量
                        ths.find("input[id='bz']").val(rs.data[0].备注)//备注

                        hj = parseInt(hj) - parseInt(zsl) + parseInt(rs.data[0].总数量);
                        $('#hj').val(hj);//合计
                    }else{
                        ths.find("input[id='hth']").val('');//合同号
                        ths.find("input[id='hh']").val('');//行号
                        ths.find("input[id='wldm']").val('');//物料号
                        ths.find("input[id='wlms']").val('');//物料描述
                        ths.find("input[id='zsl']").val('');//总数量
                        ths.find("input[id='bz']").val('');//备注

                        ths.find("input[id='xh']").val('');//箱号分子：xh/xs
                        ths.find("input[id='xs']").val('');//箱号分母：xh/xs
                        makeZXS();

                        ths.find("input[id='mxsl']").val('');//每箱数量：mxsl
                            
                        hj = parseInt(hj) - parseInt(zsl);
                        $('#hj').val(hj);//合计
                    } 
                }
            });
        }
    });

    $(document).on("change","#xh",function(){//箱号分子：xh/xs
        var ths = $(this).parent().parent().children('th')
        var xh = ths.find("input[id='xh']").val();
        var re = /^\d+$/;  
        if(!re.test(xh)){
            alert("箱号分子必须为非负整数！");
            ths.find("input[id='xh']").val('');
        }   
        makeZXS(); 
    });

    $(document).on("change","#xs",function(){//箱号分母：xh/xs
        var ths = $(this).parent().parent().children('th')
        var xs = ths.find("input[id='xs']").val();
        var re = /^[0-9]*[1-9][0-9]*$/;  
        if(!re.test(xs)){
            alert("箱号分母必须为正整数！");
            ths.find("input[id='xs']").val('');
        }   
        makeZXS(); 
    });

    $(document).on("change","#mxsl",function(){//每箱数量：mxsl
        var ths = $(this).parent().parent().children('th')
        var mxsl = ths.find("input[id='mxsl']").val();
        var re = /^[0-9]*[1-9][0-9]*$/;  
        if(!re.test(mxsl)){
            alert("每箱数量必须为正整数！");
            ths.find("input[id='mxsl']").val('');
        }   
    });

    $(document).on('click','#excel',function(){//单击Excel导出按钮
        var inputTbody = new Array();
        var inputTfoot = {};

        // 获取table对象
        var table1 = $('#example');
        // 获取 table 内的全部 tbody
        var tbody = table1.children('tbody');
        // 获取 tbody 内的全部 tr
        var trs = tbody.find('tr');
        trs.each(function (index) {  
            var ths = $(this).find("th");  
            var input = {};
            input["hth"]  = ths.find("input[id='hth']").val();  //合同号
            input["hh"]   = ths.find("input[id='hh']").val();   //行号
            input["wldm"] = ths.find("input[id='wldm']").val(); //物料号
            input["wlms"] = ths.find("input[id='wlms']").val(); //物料描述
            input["xh"]   = ths.find("input[id='xh']").val();   //箱号分子
            input["xs"]   = ths.find("input[id='xs']").val();   //箱号分母
            input["mxsl"] = ths.find("input[id='mxsl']").val(); //每箱数量
            input["zsl"]  = ths.find("input[id='zsl']").val();  //总数量
            input["bz"]   = ths.find("input[id='bz']").val();   //备注
            input["cpph"] = ths.find("input[id='cpph']").val(); //产品批号
            inputTbody[index] = input;
        });  

        // 获取 table 内的全部 tfoot
        var tfoot = table1.children('tfoot');
        // 获取 tfoot 内的全部 input
        var zstr = tfoot.find("tr[id='zstr']");
        var ths = zstr.find("th");

        inputTfoot["zxs"] = ths.find("input[id='zxs']").val(); //总箱数
        inputTfoot["hj"]  = ths.find("input[id='hj']").val();  //合计

        $.ajax({
            'url': ip+'deliveryorder/index',   
            'type': 'post',
            'data': {
                token: token,
                name: name,
                inputsTbody: inputTbody,
                inputsTfoot: inputTfoot,
            },
            'error':function(rs){
                alert('网络故障，请刷新重试')
            },
            'success': function(rs){
                window.open(ip+rs, "_self"); 
                //window.location.href = ip+rs;
                alert("下载成功！");
            }
        });
    });
});

function makeZXS(){
    var zxs = 0;
    $("input[id='xh']").each(function(index,xh){
        var xhVal = $(xh).val();
        var xsVal = $(xh).parent().find("input[id='xs']").val();
        if(""!=xsVal && "0"!=xsVal){
            if(""!=xhVal && "0"!=xhVal){
                zxs += parseFloat(xhVal)/parseFloat(xsVal);
            }
        }
    });
    $('#zxs').val(zxs);//总箱数
}