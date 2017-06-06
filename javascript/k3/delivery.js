jQuery.support.cors = true;
var table
var token 
var name 
$(function(){
	token = getCookie('token');
	name = getCookie('name');
	table = $('#example').DataTable({
	    "paging": true,
	    "lengthChange": false,
	    "searching": false,
	    "info": true,
	    "autoWidth": false,
		"oLanguage": language, 
		"dom": 'T<"clear">lfrtip',
        "tableTools": {
          "sSwfPath": "../../plugins/datatables/extensions/TableTools/swf/copy_csv_xls_pdf.swf",
          "aButtons": [
            {
            "sExtends": "xls",
            "sButtonText": "导出Excel",
            }
          ],
        }, 
	})
	$('#number').keydown(function(e){
		if(e.keyCode==13){
			var number = $('#number').val()
			delivery(number)
		}
	})
	$('#confirm').click(function(){
		var number = $('#number').val()
		delivery(number)
	})
	$('#example1').DataTable({
		"paging": true,
	    "lengthChange": false,
	    "searching": true,
	    "ordering": true,
	    "info": true,
	    "autoWidth": false,
	    'dom': 'T<"clear">lfrtip',
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
			      'url': ip+'delivery/hs_2',
			      'error':function(rs){
			      	error(rs)
			      },
			      'type': 'post' ,
			      'data': {
						name: name,
						token: token,
					},
			    } , 
		"aoColumns": [
					{ 'data': 'FBillno' },
					{ 'data': 'FDate' },
					{ 'data': 'FEntrySelfB0171' },
					{ 'data': 'FHeadSelfB0166' },
					{ 'data': 'FEntrySelfB0171' },
					{ 'data': 'FEntrySelfB0171' },
					{ 'data': 'FMapName' },
					{ 'data': 'FMapName' },
					{ 'data': 'FMapNumber' },
					{ 'data': 'FMapNumber' },
					{ 'data': 'FMapName' },
					{ 'data': 'FName' },
					{ 'data': 'FName' },
		],
	})
});
function delivery(number){
	var date = new Date();
    var year=date.getFullYear(); 
    var month = date.getMonth() + 1 ;
    var da = date.getDate();
    var week = theWeek();
    month=(month<10?"0"+month:month).toString();
	$.ajax({
		url : ip +'delivery/index',
		type : 'post',
		data: {
			number: number,
			name: name,
			token: token,
		},
		error: function(rs){
			error(rs)
		},
		success: function(rs){
			$('#number').val('')
			table.row.add( [
	            rs[0].FHeadSelfB0166,
	            rs[0].FEntrySelfB0171,
	            rs[0].FMapNumber,
	            rs[0].FMapName,
	            rs[0].FName,
	            rs[0].FEntrySelfB0171,
	            rs[0].FEntrySelfB0171,
	            rs[0].Die_Qty,
	            'BIN1',
	            'HS'+year+month+da+'001',
	            rs[0].Carton,
	            'CN',
	            'HiSi-SZ',
	            (date.getYear()-100).toString()+week.toString(),
	            rs[0].FEntrySelfB0171,
	        ] ).draw( false );
	       
		},
	})
}
function theWeek() {
    var totalDays = 0;
    now = new Date();
    years = now.getYear()
    if (years < 1000)
        years += 1900
    var days = new Array(12);
    days[0] = 31;
    days[2] = 31;
    days[3] = 30;
    days[4] = 31;
    days[5] = 30;
    days[6] = 31;
    days[7] = 31;
    days[8] = 30;
    days[9] = 31;
    days[10] = 30;
    days[11] = 31;
     
    //判断是否为闰年，针对2月的天数进行计算
    if (Math.round(now.getYear() / 4) == now.getYear() / 4) {
        days[1] = 29
    } else {
        days[1] = 28
    }
 
    if (now.getMonth() == 0) {
        totalDays = totalDays + now.getDate();
    } else {
        var curMonth = now.getMonth();
        for (var count = 1; count <= curMonth; count++) {
            totalDays = totalDays + days[count - 1];
        }
        totalDays = totalDays + now.getDate();
    }
    //得到第几周
    var week = Math.round(totalDays / 7);
    return week;
}