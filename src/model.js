import { format } from "date-fns";
export class Model {
  //contains internal representations of information
  constructor() {
    this.projects = [];
  }

  addProject(projectName) {
    const newProject = { name: projectName, todos: [] };
    this.projects.push(newProject);
  }

  deleteProject(projectObj) {
    for (const project of this.projects) {
      if (project.name === projectObj.name) {
        this.projects.splice(this.projects.indexOf(project), 1);
      }
    }
  }

  getProject(projectName) {
    for (const project of this.projects) {
      if (project.name === projectName) {
        return project;
      }
    }
  }

  addTodo(todoArr) {
    const todo = {
      project: todoArr[0],
      name: todoArr[1],
      description: todoArr[2],
      dueDate: `Due Date: ${format(new Date(todoArr[3]), "MM/dd/yyyy")}`,
      priority: todoArr[4],
      archived: false,
    };

    for (const project of this.projects) {
      if (project.name === todo.project) {
        project.todos.push(todo);
      }
    }
  }

  deleteTodo(projectObj, todoObj) {
    for (const todo of projectObj.todos) {
      if (todo.name === todoObj.name) {
        projectObj.todos.splice(projectObj.todos.indexOf(todo), 1);
      }
    }
  }

  getTodos(projectObj) {
    if (projectObj.todos === false) {
      return alert("you have no todos :,(");
    }
    return projectObj.todos;
  }

  getTodo(projectObj, todoName) {
    const todos = this.getTodos(projectObj);
    for (const todo in todos) {
      if (todos[`${todo}`].name === todoName) {
        return todos[`${todo}`];
      }
    }
  }

  archiveTodo(todoObj) {
    console.log(todoObj.archived);
    if (todoObj.archived === true) {
      todoObj.archived = false;
    } else if (todoObj.archived === false) {
      todoObj.archived = true;
    }
  }
}
