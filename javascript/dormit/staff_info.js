var editor;
$(document).ready(function() {
  var url = "http://192.168.7.82:4000/domit/index";
  // editor = new $.fn.dataTable.Editor({
  //   table: "#user_info",
  //   ajax: url,
  //   idSrc: 'row_id',
  //   fields: [ {
  //               label: "ID:",
  //               name: "id"
  //           }, {
  //               label: "宿舍编号:",
  //               name: "domit_no"
  //           }, {
  //               label: "宿舍名称:",
  //               name: "domit_name"
  //           }, {
  //               label: "宿舍地址:",
  //               name: "domit_adress"
  //           }, {
  //               label: "新增日期:",
  //               name: "created_at",
  
  //               type: "datetime"
  //           }, {
  //               label: "更新日期:",
  //               name: "updated_at",
  //               type: "datetime"
  //           }
  //       ]
  // });

  $('#user_info').DataTable({
    "dom": 'Bfrtip',
    "select": 'single',
    "sAjaxSource": url,
    "aoColumns": [
      { "data": "id" },
      { "data": "domit_no" },
      { "data": "domit_name" },
      { "data": "domit_adress" },
      { "data": "created_at" },
      { "data": "updated_at" }
    ],
    buttons: [

    ]
  });

});