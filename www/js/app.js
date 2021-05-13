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
  var datetime = $("#todo-datetime").val();
  var img_tag = "";
  if (camera_url) {
      img_tag = "<img src='data:image/jpeg;base64," + camera_url + "'>";
  }
  $.mobile.changePage($("#list-page"));
  var taskId = _getNewTaskId();
  var array = [];
  var obj = {
  'title':title,
  'body':body,
  'datetime':datetime
  };
  array.push(obj);
  var todoValue = JSON.stringify(obj);
  localStorage.setItem('task' + taskId, todoValue);// {task00X : タスク内容}が保存される
  $.mobile.changePage($("#list-page"));
  var list = makeListHtml('task' + taskId);
  $("#todo-list").append(list);
  $("#todo-list").listview('refresh');
};

window.addEventListener("load", function(){
  showTask();
},false);

function editLoadPage(todoKey){
  
  // ローカルストレージの値を取得
  var toDo = JSON.parse(localStorage.getItem(todoKey));

  // 値設定
  $("#todo-title").val(toDo.title);
  $("#todo-body").val(toDo.body);
  $("#todo-datetime").val(toDo.datetime);
}

function showTask(){
  var count = _getTaskCount();
  for(var i=1; i <= count; i++) {
    var list = makeListHtml('task' + _zeroPadding(i, 3));
    $("#todo-list").append(list);
  }
  $("#todo-list").listview('refresh');
}

/*
 * ローカルストレージに登録されたTODOタスクの数を取得する。
*/
function _getTaskCount(){
  return parseInt(localStorage.getItem("taskId"));
}

function editTodo(taskNo){
  var title = $("#todo-title").val();
  var body = $("#todo-body").val();
  var datetime = $("#todo-datetime").val();

  var taskId = taskNo;
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

/**
 * 未使用のtaskIdを返却する。
 */
function _getNewTaskId() {
  var newTaskIdStr
  var taskIdStr = localStorage.getItem("taskId");
  if (taskIdStr == null || taskIdStr == "") {
    newTaskIdStr = "001";
  } else {
    var newTaskIdInt = parseInt(localStorage.getItem('taskId')) + 1;
    newTaskIdStr = _zeroPadding(newTaskIdInt, 3);
  }
  localStorage.setItem('taskId', newTaskIdStr);
  return newTaskIdStr;
}

/**
 * 引数numをlengthで指定された桁数で0埋めする。
 */
function _zeroPadding(num,length){
  return ("0000000000" + num).slice(-length);
}

/* Liタグ作成処理 */
function makeListHtml(taskNo){
 var obj = JSON.parse(localStorage.getItem(taskNo));
 var record = "<li class=\"oneTitle\">" + "<a href=\"#edit-page\" class=\"aTitle\" onclick=\"editTodo(\'" + taskNo + "\')\" data-role=\"button\" class=\"titleList\" ><h3>" + obj.title + "</h3></a><a href=\"./\" class=\"aDelete\" data-icon=\"minus\" data-theme=\"c\" onclick=\"deleteTodo(\'" + taskNo + "\')\"></a></li>";
 return record;
}