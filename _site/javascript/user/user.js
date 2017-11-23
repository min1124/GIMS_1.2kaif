// // var ip = 'http://localhost:3000/'
// var ip ='http://192.168.7.82:3001/'
var type = 'update_user'
$(function(){
	$('#myTab a').click(function(){//
		type = $(this).attr('id')
	})
	var table=$('#example').DataTable({
	    "bDestroy":true,
	    "paging": true,
	    "lengthChange": false,
	    "searching": true,
	    "ordering": true,
	    "info": true,
	    "autoWidth": false,
	    "oLanguage":language,
	    // initComplete:initComplete,
	    'ajax': {
	      'url': ip+'user/index',
	      'error':function(rs){
	      	error(rs)
	      },
	      'data': function ( d ) {

	      } ,
	      'type': 'post' 
	    } , 
	    "aoColumnDefs":[
          { "aTargets" :　[3],
            "mRender" : function(data, type, full){
                switch (data){
                    case null:
                        return "在职";
                        break;
                    case "":
                        return "在职";
                        break;
                    case "1":
                        return "离职";
                        break;
                    default:
                        return ""
                }
            }
          }
        ],
	    "aoColumns": [
			{ 'data': 'name' },
			{ 'data': 'dept' },
			{ 'data': 'work_no' },
			{ 'data': 'flag' },
		]//初始化table
	});


	$(document).on("dblclick","#example tbody tr",function() {//双击行
		var name_1=$(this).children('td').eq(0).text();
		$.ajax({  
		    'url': ip+'user/edit',   
		    'type': 'post',
		    'data': {
		    	name_1: name_1
		    },
		    'success': function(rs){
		    	$("#dept").val(rs.user.dept)//人员信息赋值
		    	$("#flag").val(rs.user.flag)
		    	$('#name').val(rs.user.name)
		    	$('#user_name').val(rs.user.name)
		    	$('#work_no').val(rs.user.work_no)

		    	$('input:checkbox').removeAttr('checked')
		    	if(rs.k3==null){
		    		
		    	}else{
		    		power('1-1',rs.k3.t_bom_auth)
		    		power('1-2',rs.k3.t_hj_auth)
		    		power('1-3',rs.k3.t_icmo_auth)
		    		power('1-4',rs.k3.t_reject_auth)
		    		power('1-5',rs.k3.t_recieve_auth)
		    		power('1-6',rs.k3.t_order_auth)
		    		power('1-7',rs.k3.t_return_auth)
		    		power('1-8',rs.k3.t_delivery_auth)
		    		power('1-9',rs.k3.t_change_auth)
		    		power('1-10',rs.k3.t_stockbill_auth)
		    		power('1-11',rs.k3.t_cancel_auth)
		    		power('1-12',rs.k3.t_icsearch_auth)
		    		power('1-13',rs.k3.t_fnumber_auth)
		    		power('1-14',rs.k3.t_seoutstock_auth)
		    		power('1-15',rs.k3.t_perfchar_auth)
		    		power('1-16',rs.k3.t_delayorder_auth)
		    		power('1-17',rs.k3.t_bfprice_auth)
		    		power('1-18',rs.k3.t_bomkey_auth)
		    		power('1-19',rs.k3.t_custperfchar_auth)
		    		power('1-20',rs.k3.t_fnumberhw_auth)
		    		power('1-21',rs.k3.t_fnumberdesc_auth)
		    		power('1-22',rs.k3.t_keyfnumbers_auth)
		    		power('1-23',rs.k3.t_replace_auth)
		    		power('1-24',rs.k3.t_zxhub_auth)
		    		power('1-25',rs.k3.t_rejectyf_auth)
		    		power('1-26',rs.k3.t_rejectkc_auth)
		    	}
		    	if (rs.icmo==null){

		    	}else{
		    		power('1-3-1',rs.icmo.ic_auth)
		    		power('1-3-2',rs.icmo.to_auth)
		    		power('1-3-3',rs.icmo.device_auth)
		    		power('1-3-4',rs.icmo.module_auth)
		    		power('1-3-5',rs.icmo.quality_auth)
		    		power('1-3-6',rs.icmo.export_auth)
		    	}
		    	if (rs.reject==null){
		    	}else{
		    		power('1-4-1',rs.reject.create_auth)
		    		power('1-4-2',rs.reject.delete_auth)
		    		power('1-4-3',rs.reject.dept_auth)
		    		power('1-4-4',rs.reject.me_gx_auth)
		    		power('1-4-5',rs.reject.me_qj_auth)
		    		power('1-4-6',rs.reject.me_mk_auth)
		    		power('1-4-7',rs.reject.me_to_auth)
		    		power('1-4-8',rs.reject.pz_gx_auth)
		    		power('1-4-9',rs.reject.pz_qj_auth)
		    		power('1-4-10',rs.reject.pz_mk_auth)
		    		power('1-4-11',rs.reject.pz_to_auth)
		    		power('1-4-12',rs.reject.sg_auth)
		    		power('1-4-13',rs.reject.cw_auth)
		    		power('1-4-14',rs.reject.fz_auth)
		    		power('1-4-15',rs.reject.cgy_auth)
		    		power('1-4-16',rs.reject.export_auth)
		    	}
		    	if (rs.rejectyf==null){
		    	}else{
		    		power('1-25-1',rs.rejectyf.create_auth)
		    		power('1-25-2',rs.rejectyf.delete_auth)
		    		power('1-25-3',rs.rejectyf.dept_auth)
		    		power('1-25-4',rs.rejectyf.pz_gj_auth)
		    		power('1-25-5',rs.rejectyf.pz_kf_auth)
		    		power('1-25-6',rs.rejectyf.pz_gy_auth)
		    		power('1-25-7',rs.rejectyf.pz_gs_auth)
		    		power('1-25-8',rs.rejectyf.pz_st_auth)
		    		power('1-25-9',rs.rejectyf.pz_sf_auth)
		    		power('1-25-10',rs.rejectyf.pz_po_auth)
		    		power('1-25-11',rs.rejectyf.pz_cy_auth)
		    		power('1-25-12',rs.rejectyf.cw_auth)
		    		power('1-25-13',rs.rejectyf.fz_auth)
		    		power('1-25-14',rs.rejectyf.cgy_auth)
		    		power('1-25-15',rs.rejectyf.export_auth)
		    	}
		    	if (rs.rejectkc==null){
		    	}else{
		    		power('1-26-1',rs.rejectkc.create_auth)
		    		power('1-26-2',rs.rejectkc.delete_auth)
		    		power('1-26-3',rs.rejectkc.dept_auth)
		    		power('1-26-4',rs.rejectkc.me_gx_auth)
		    		power('1-26-5',rs.rejectkc.me_qj_auth)
		    		power('1-26-6',rs.rejectkc.me_mk_auth)
		    		power('1-26-7',rs.rejectkc.me_to_auth)
		    		power('1-26-8',rs.rejectkc.me_sg_auth)
		    		power('1-26-9',rs.rejectkc.me_gj_auth)
		    		power('1-26-10',rs.rejectkc.me_kf_auth)
		    		power('1-26-11',rs.rejectkc.me_gy_auth)
		    		power('1-26-12',rs.rejectkc.me_gs_auth)
		    		power('1-26-13',rs.rejectkc.me_st_auth)
		    		power('1-26-14',rs.rejectkc.me_sf_auth)
		    		power('1-26-15',rs.rejectkc.me_po_auth)
		    		power('1-26-16',rs.rejectkc.me_cy_auth)
		    		power('1-26-17',rs.rejectkc.pz_gx_auth)
		    		power('1-26-18',rs.rejectkc.pz_qj_auth)
		    		power('1-26-19',rs.rejectkc.pz_mk_auth)
		    		power('1-26-20',rs.rejectkc.pz_to_auth)
		    		power('1-26-21',rs.rejectkc.pz_sg_auth)
		    		power('1-26-22',rs.rejectkc.pz_gj_auth)
		    		power('1-26-23',rs.rejectkc.pz_kf_auth)
		    		power('1-26-24',rs.rejectkc.pz_gy_auth)
		    		power('1-26-25',rs.rejectkc.pz_gs_auth)
		    		power('1-26-26',rs.rejectkc.pz_st_auth)
		    		power('1-26-27',rs.rejectkc.pz_sf_auth)
		    		power('1-26-28',rs.rejectkc.pz_po_auth)
		    		power('1-26-29',rs.rejectkc.pz_cy_auth)
		    		power('1-26-30',rs.rejectkc.sg_auth)
		    		power('1-26-31',rs.rejectkc.cw_auth)
		    		power('1-26-32',rs.rejectkc.fz_auth)
		    		power('1-26-33',rs.rejectkc.cgy_auth)
		    		power('1-26-34',rs.rejectkc.export_auth)
		    	}
		    	if (rs.receive==null){

		    	}else{
		    		power('1-5-1',rs.receive.export)
		    		power('1-5-2',rs.receive.update_wharehouse)
		    		power('1-5-3',rs.receive.update_sale)
		    	}
		    	if (rs.bom==null){

		    	}else{
		    		power('1-1-1',rs.bom.export_auth)
		    	}
		    	if (rs.hj==null){

		    	}else{
		    		power('1-2-1',rs.hj.export_auth)
		    	}
		    	if (rs.change==null){

		    	}else{
		    		power('1-9-1',rs.change.ic_auth)
		    		power('1-9-2',rs.change.to_auth)
		    		power('1-9-3',rs.change.device_auth)
		    		power('1-9-4',rs.change.module_auth)
		    		power('1-9-5',rs.change.quality_auth)
		    	}
		    	if(rs.fnumber==null){
		    		
		    	}else{
		    		power('1-13-1',rs.fnumber.t_fnquery_auth)
		    		power('1-13-2',rs.fnumber.t_fnupdate_auth)
		    	}
		    	if(rs.fnquery==null){
		    		
		    	}else{
		    		power('1-13-1-1',rs.fnquery.t_all_auth)
		    		power('1-13-1-2',rs.fnquery.t_gs_auth)
		    		power('1-13-1-3',rs.fnquery.t_sfp_auth)
		    		power('1-13-1-4',rs.fnquery.t_pon_auth)
		    		power('1-13-1-5',rs.fnquery.t_st_auth)
		    	}
		    	if(rs.fnupdate==null){
		    		
		    	}else{
		    		power('1-13-2-1',rs.fnupdate.t_all_auth)
		    		power('1-13-2-2',rs.fnupdate.t_gs_auth)
		    		power('1-13-2-3',rs.fnupdate.t_sfp_auth)
		    		power('1-13-2-4',rs.fnupdate.t_pon_auth)
		    		power('1-13-2-5',rs.fnupdate.t_st_auth)
		    	}
		      	$('#myModal').modal('show')
		    },
		    "error" : function(rs) {
		      error(rs)
		    }
		});
	});
	$('#save').click(function(){//保存按钮
		if (type =="update_user"){//更新用户信息
			var name_2 = $('#name').val()
			var work_no_2 = $('#work_no').val()
			var dept = $('#dept').val()
			var flag = $('#flag').val()
			var password = $('#password').val()
			$.ajax({
				'url':ip + 'user/user', 
	    		'type': 'post',
	    		'data':{
	    			name:name_2,
	    			work_no:work_no_2,
	    			dept:dept,
	    			flag:flag,
	    			newpsw: password,
	    		},
	    		error: function(rs){
		        	error(rs)
		        },
		        'success':function(rs){
		        	alert('保存成功')
		        	$('#myModal').modal('hide')
		        }
			})
		}else{ //更新用户权限
			var k3 = check('k3')
			var recieve = check('t_recieve_auth')
			var reject = check('t_reject_auth')
			var rejectyf = check('t_rejectyf_auth')
			var rejectkc = check('t_rejectkc_auth')
			var icmo = check('t_icmo_auth')
			var bom = check('t_bom_auth')
			var hj = check('t_hj_auth')
			var change = check('t_change_auth')
			var fnumber = check('t_fnumber_auth')
			var fnquery = check('t_fnquery_auth')
			var fnupdate = check('t_fnupdate_auth')
			$.ajax({
				'url':ip+'user/power', 
	    		'type': 'post',
	    		'data':{
	    			name:$('#user_name').val(),
	    			k3:k3,
	    			recieve:recieve,
	    			reject:reject,
	    			rejectyf:rejectyf,
	    			rejectkc:rejectkc,
	    			icmo:icmo,
	    			bom:bom,
	    			hj:hj,
	    			change: change,
	    			fnumber: fnumber,
	    			fnquery: fnquery,
	    			fnupdate: fnupdate,
	    		},
	    		error: function(rs){
		        	error(rs)
		        },
		        'success':function(rs){
		        	alert('保存成功')
		        	$('#myModal').modal('hide')
		        }
			})
		}
	})
    $.ajax({  //获得部门
        'url':ip+'reject/de', 
        'type': 'post',
        error: function(rs){
        	alert("网络错误，请刷新页面")
        },
        'success': function(rs){
          var select = $("#dept");
          for(var i=0;i<rs.data.length;i++) {
            var option = $("<option>").text(rs.data[i].FName).val(rs.data[i].FItemID);
            select.append(option);
          }
        }
    });
})
function power(type,value){
	if (value==1){
		$('.'+type).prop('checked',true)
	}
}
function check(table){
	var sql = ""
	var check=$('input[name='+table+']:checked'); 
	check.each(function(){
	    sql=sql+" "+$(this).val();
	});
	return sql
}