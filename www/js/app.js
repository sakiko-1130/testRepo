function addTodo() {
  var title = $("#add-todo-title").val();
  var body = $("#add-todo-body").val();
  var datetime = $("#add-todo-datetime").val();
  var taskId = _getNewTaskId();
  var obj = {
  'title':title,
  'body':body,
  'datetime':datetime
  };
  var todoValue = JSON.stringify(obj);
  localStorage.setItem('task' + taskId, todoValue);// {task00X : タスク内容}が保存される
  $.mobile.changePage($("#list-page"));
  $('#todo-list li').remove();
  showTask();
  $("#todo-list").listview('refresh');
};

window.addEventListener("load", function(event){
  showTask();
},false);

/*
 * 編集画面表示
*/
function editLoadPage(taskNo){
  // ローカルストレージの値を取得
  var toDo = JSON.parse(localStorage.getItem(taskNo));

  // 値設定
  document.getElementById('edit-todo-title').value = toDo.title;
  document.getElementById('edit-todo-body').value = toDo.body;
  document.getElementById('edit-todo-datetime').value = toDo.datetime;

  // タスクNoを設定
  document.getElementById("edit-button").setAttribute("onclick","editTodo('"+ taskNo +"')");
}

/*
 * ToDo編集
*/
function editTodo(taskNo){
  var title = $("#edit-todo-title").val();
  var body = $("#edit-todo-body").val();
  var datetime = $("#edit-todo-datetime").val();

  var obj = {
    'title':title,
    'body':body,
    'datetime':datetime
  };

  var todoValue = JSON.stringify(obj);
  localStorage.setItem(taskNo, todoValue);

  $.mobile.changePage($("#list-page"));
  $('#todo-list li').remove();
  showTask();
  $("#todo-list").listview('refresh');
}

/*
 * ToDo削除
*/
function deleteTodo(taskNo){
  if(window.confirm("削除しますか？")){
    localStorage.removeItem(taskNo);

    $('#todo-list li').remove();
    showTask();
    $("#todo-list").listview('refresh');
  }
}

function showTask(){
  var count = _getTaskCount();
  for(var i=1; i <= count; i++) {
    var taskNo = 'task' + _zeroPadding(i, 3);
    if(localStorage.getItem(taskNo)){
      var list = makeListHtml(taskNo);
      $("#todo-list").append(list);
    }
  }
  $("#todo-list").listview('refresh');
}

/*
 * ローカルストレージに登録されたTODOタスクの数を取得する。
*/
function _getTaskCount(){
  return parseInt(localStorage.getItem("taskId"));
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
 var record = "<li class=\"oneTitle\">" + "<a href=\"#edit-page\" class=\"aTitle\" onclick=\"editLoadPage(\'" + taskNo + "\')\" data-role=\"button\" class=\"titleList\" ><h3>" + obj.title + "</h3></a><a href=\"./\" class=\"aDelete\" data-icon=\"minus\" data-theme=\"c\" onclick=\"deleteTodo(\'" + taskNo + "\')\"></a></li>";
 return record;
}

/* TODO追加画面遷移時に入力エリアをクリア */
function clearText(){
 var title = document.getElementById("add-todo-title");
 var body = document.getElementById("add-todo-body");
 var datetime = document.getElementById("add-todo-datetime");
 title.value = '';
 body.value = '';
 datetime.value = '';
}