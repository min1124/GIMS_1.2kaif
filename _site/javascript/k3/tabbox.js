var hash
var table
var sumnum = 0
jQuery.support.cors = true;
$(function(){
	$('#bh').keydown(function(e){
		if(e.keyCode==13){
			var fbillno = $('#bh').val()
			var select = $('#wldm')
			select.empty()
			$.ajax({
				url: ip +'tabbox/fbillno',
				type: 'post',
				data: {
					fbillno : fbillno,
				},
				success: function(rs){
					for(var i = 0 ;i<rs.length;i++){
						var option = $("<option>").text(rs[i].fnumber).val(i);
						select.append(option)
					}
					hash = rs
					$('#sl').val(rs[0].fQty)
				},
				error: function(rs){

				}
			})
			$('#wldm').change(function(){
				var index = $(this).val()
				$('#ph').val(hash[index].FBatchNo)
				$('#sl').val(hash[index].fQty)
			})
		}
	})
	table = $('#example').DataTable({
        "bDestroy":true,
        "lengthChange": false,
        "paging": true,
        "searching": false,
        "oLanguage": language, 
	})
	$('#hh').keydown(function(e){
		if(e.keyCode==13){
			var  hh = $('#hh').val()
			$('#hh').val('') 
			$.ajax({
				url: ip + 'tabbox/hh',
				type: 'post',
				data: {
					hh: hh,
				},
				success: function(rs){
					if (document.getElementById("save").style.display != 'none'){
						alert('请先保存')
					}else{
						if($('#wldm option:selected').text()==rs[0].fnumber){
							table.row.add([
								rs[0].BoxNo,
								rs[0].BarCode,
								rs[0].fnumber,
								rs[0].BatchNum,
								rs[0].FKFDate.split('T')[0],
							]).draw(false);
							sumnum = sumnum + parseInt(rs[0].BatchNum)
						}else{
							alert('物料代码不一致')
						}
					}
					
					if (sumnum == parseInt($('#sl').val())){
						$('#save').show(300)
					}
				},
				error: function(rs){

				}
			})
		}
	})
	$('#save').click(function(){
		var bh = $("#bh").val()
		var boxno = new Array()
		var barcode = new Array()
		var fnumber = new Array()
		var batchnum = new Array()
		var fkdate = new Array()
		for (i=0 ; i<table.rows().data().length; i++){
			boxno[i] = table.rows().data()[i][0]
			barcode[i] = table.rows().data()[i][1]
			fnumber[i] = table.rows().data()[i][2]
			batchnum[i] = table.rows().data()[i][3]
			fkdate[i] = table.rows().data()[i][4]
		}
		// alert('a')
		$.ajax({
			url: ip +'tabbox/save',
			type: "post",
			data: {
				bh: bh,
				boxno: boxno,
				barcode: barcode,
				fnumber: fnumber,
				batchnum: batchnum,
				fkdate: fkdate,
			},
			success: function(rs){
				alert(rs)
				table.rows().remove().draw();
				$('#save').hide()
				sumnum = 0
				table.rows().remove().draw();
			},
			error: function(rs){
				error(rs)
			}
		})
	})
	table = $('#example1').DataTable({
        "bDestroy":true,
        "lengthChange": false,
        "paging": true,
        "searching": true,
        "searching": false,
        "oLanguage": language,
        "autoWidth": false,
        "ajax":{
        	url: ip + 'tabbox/index',
        	type: 'get',
        	// data:{
        	// 	fnumber: fnumber,
        	// 	fname: fname,
        	// 	fmodel: fmodel,
        	// 	token: token,
        	// 	name: name,
        	// },
        	error:function(rs){
        		error(rs)
        	}
        }, 
        "aoColumns":[
         	{ "data": "billno" },
            { "data": "boxno" },
            { "data": "barcode" },
            { "data": "fnumber" },
            { "data": "num" },
            { "data": "fkdate" },
            { "data": "savedate" },
        ], 
	})
})