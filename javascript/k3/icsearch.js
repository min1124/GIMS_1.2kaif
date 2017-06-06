jQuery.support.cors = true;

$(function(){
	var token = getCookie('token');
    var name = getCookie('name');

	$('#search').click(function(){
		var fnumber = $('#fnumber').val()
		var fname = $('#fname').val()
		var fmodel = $('#fmodel').val()
		// console.log(fnumber+','+fname+','+fmodel)
		$('#example').DataTable({
	        "bDestroy":true,
	        "lengthChange": false,
	        "paging": true,
	        "searching": true,
	        "oLanguage": language,
	        "ajax":{
	        	url: ip + 'icsearch',
	        	type: 'post',
	        	data:{
	        		fnumber: fnumber,
	        		fname: fname,
	        		fmodel: fmodel,
	        		token: token,
	        		name: name,
	        	},
	        	error:function(rs){
	        		error(rs)
	        	}
	        },
            "aoColumns":[
                { "data": "fnumber" },
                { "data": "fname" },
                { "data": "fmodel" },
            ], 
		})
	})
})