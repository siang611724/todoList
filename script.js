var app = new Vue({
  el: "#app",
  data: {
    newTodo: "",
    todos: [
      /* 這是資料推進來的模板
      {
          id: '',
          title: '',
          completed: false
       }, */
    ],
    cacheTodo: {},
    cacheTitle: "",
    visibility: "all",
    uncompletedTodos: [],
    uncompletedNum: ""
  },
  methods: {
    addTodo: function() {
      var value = this.newTodo.trim();
      if (!value) {
        return;
      }
      var timestamp = Math.floor(Date.now());
      this.todos.push({ id: timestamp, title: value, completed: false });
      this.newTodo = "";
    },
    removeTodo: function(todo) {
      var vm = this;
      var newIndex = vm.todos.findIndex(function(item, key) {
        return todo.id === item.id;
      });
      this.todos.splice(newIndex, 1);
    },
    editTodo: function(item) {
      // 將雙擊的項目傳入 data 暫存
      this.cacheTodo = item;
      this.cacheTitle = item.title;
    },
    cancelEdit: function() {
      // 切換到未雙擊時的狀態
      this.cacheTodo = {};
    },
    doneEdit: function(item) {
      // 按下 Enter 的瞬間把編輯中文字變為編輯完成的項目
      item.title = this.cacheTitle;
      // 回復到未點擊狀態
      this.cacheTitle = "";
      this.cacheTodo = {};
    },
    cleanAll: function() {
      this.todos = [];
    }
  },
  computed: {
    filteredTodos: function() {
      if (this.visibility == "all") {
        return this.todos;
      } else if (this.visibility == "doing") {
        var anotherTodos = [];
        this.todos.forEach(function(item) {
          if (!item.completed) {
            anotherTodos.push(item);
          }
        });
        return anotherTodos;
      } else if (this.visibility == "done") {
        var anotherTodos = [];
        this.todos.forEach(function(item) {
          if (item.completed) {
            anotherTodos.push(item);
          }
        });
        return anotherTodos;
      }
      //return [];
    },
    uncompletedCount: function() {
      var uncompletedTodos = this.todos.filter(function(item) {
        return item.completed == false;
      });
      return uncompletedTodos.length;
    }
  }
});