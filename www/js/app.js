function addTodoPicture() {
    navigator.camera.getPicture(addTodo, function() {
        alert("Failed to get camera.");
    }, {
        quality : 50,
        destinationType : Camera.DestinationType.DATA_URL,
        targetWidth : 100,
        targetHeight : 100
    });
}
function addTodo(camera_url) {
    var title = $("#todo-title").val();
    var body = $("#todo-body").val();
    var img_tag = "";
    if (camera_url) {
        img_tag = "<img src='data:image/jpeg;base64," + camera_url + "'>";
    }
    $.mobile.changePage($("#list-page"));
    $("#todo-list").append("<li>" + img_tag + "<h3>" + title + "</h3><p>" + body + "</p></li>")
    $("#todo-list").listview('refresh');
};

function editLoadPage(todoKey){
  
  // ローカルストレージの値を取得
  var toDo = JSON.parse(localStorage.getItem(todoKey));

  // 値設定
  $("#todo-title").val(toDo.title);
  $("#todo-body").val(toDo.body);
  $("#todo-datetime").val(toDo.datetime);
}

function editTodo(){
  var title = $("#todo-title").val();
  var body = $("#todo-body").val();
  var datetime = $("#todo-datetime").val();

  var taskId = _getNewTaskId();
  var array = [];
  var obj = {
    'title':title,
    'body':body,
    'datetime':datetime
  };
  array.push(obj);

  var todoValue = JSON.stringify(obj);
  localStorage.setItem(taskId, todoValue);
}

function deleteTodo(todoKey){
  if(window.confirm("削除しますか？")){
    sessionStorage.removeItem(todoKey);

    // 再読み込みどっちを使うか確認したら削除する
    $("#todo-list").listview('refresh');
    // location.reload();
  }
}