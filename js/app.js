// Definir un modelo para Task
function Task(item) {
  this.title = item.title;
  this.priority = item.priority;
}

// Definir una clase
function AppViewModel() {
  var self = this;

  // Atributos
  self.firstName = ko.observable("Daniel");
  self.lastName  = ko.observable("Peñaloza");

  // Lista de tareas
  self.tasks = ko.observableArray([]);
  self.taskPriorities = [ 1, 2, 3, 4, 5 ];

  // Definir campos observables para crear una nueva tarea
  self.newTaskTitle = ko.observable("");
  self.newTaskPriority = ko.observable(1);

  // Leer tareas desde el servidor en formato JSON
  $.getJSON('json/tasks.json', function(result) {

    var taskList = $.map(result, function(item) {
      return new Task(item);
    });

    self.tasks(taskList);
  });

  // Crear una nueva tarea y guardarla
  self.addTask = function() {
    var task = new Task({ title: self.newTaskTitle(), priority: self.newTaskPriority() });
    self.tasks.push(task);

    // Limpiar los campos
    self.newTaskTitle("");
    self.newTaskPriority(1);
  }

  // Eliminar una tarea
  self.deleteTask = function(sender) {
    self.tasks.remove(sender);
  }
}

ko.applyBindings(new AppViewModel());
