var taskApp = {
  // createTask: function(event) {
  //   event.preventDefault();

  //   $.ajax('/tasks', {
  //     type: 'POST',
  //     dataType: 'JSON',
  //     data: {
  //       "task[title]": $('#task_title').val(),
  //       "task[description]": $('#task_description').val(),
  //       "task[completed]": $('#task_completed:checked').val()
  //     }
  //   }).done(function (tasks) {
  //     taskApp.tasks = tasks;
  //     taskApp.renderTasks();
  //     $('#task_title').val('').focus();
  //     $('#task_description').val('');
  //     $('#task_completed').removeProp('checked');
  //   })
  // },

  toggle_completed: function(event) {
    var $li = $(this).parent();
    var id = $li.data('task-id');
    $.ajax('/tasks/' + id + '/completed', {
      type: 'POST'
    }).error(function() {
      alert('Error');
    });
  },

  deleteTask: function(event) {
    var $li = $(this).parent();
    var id = $li.data('task-id');
    $.ajax('/tasks/' + id, {
      type: 'POST',
      data: {
        _method: 'DELETE'
      }
    }).done(function(){
      $li.remove();
    });
  },

  loadTasks: function() {
    $.getJSON('/tasks').done(function(result) {
        taskApp.tasks = result;
        taskApp.renderTasks();
  });
  },

  renderTasks: function () {
    $('#tasks').empty();
    for (var i = 0; i < this.tasks.length; i++) {
      var task = this.tasks[i];
      var li = this.taskHTML(task);
      $('#tasks').append(li);
    }
  }

  };

$(document).ready(function (){
  taskApp.taskHTML = Handlebars.compile( $('#taskTemplate').html() );
  taskApp.loadTasks();

  // $('#new_task').on('submit', taskApp.createTask);

  //Requires even delegation because tasks are added to the page dynamically.
  $('#tasks').on('click', '.delete', taskApp.deleteTask);

  $('#tasks').on('click', ':checkbox', taskApp.toggle_completed);

  $('#new_task').on('ajax:success', taskApp.loadTasks);

});
