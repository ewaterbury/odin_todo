import "./style.css";
import { View } from "./view.js";
import { Model } from "./model.js";
import { Storage } from "./storage.js";
import { InitialDisplay } from "./initialDisplay.js";

/*Todos: 
- complete css - css
- add an archive feature in css - css
- add expand feature - css
*/

class Controller {
  //links model and view
  constructor(view, model, storage) {
    this.view = view;
    this.model = model;
    this.storage = storage;
  }

  displayProject(projectObj) {
    this.view.clearProject();
    this.view.displayProject(projectObj);

    const addTodoBtnListener = ((projectObj) => {
      document
        .querySelector("#add_todo_button")
        .addEventListener("click", (e) => {
          e.preventDefault();
          const getValue = (id) => {
            return document.querySelector(id).value;
          };
          const todoArr = [
            projectObj.name,
            getValue("#todo_name"),
            getValue("#todo_description"),
            getValue("#todo_date"),
            document.querySelector("#todo_priority").checked,
          ];

          switch (true) {
            case /[^A-Za-z0-9 ,-.?!()]/.test(todoArr[1]):
              alert(
                "Please only use numbers, letters, and approved characters when naming your todo."
              );
              this.view.clearTodoInputs();
              break;

            case todoArr[1].length > 45:
              alert(
                "Please keep todo titles under 30 characters including spaces."
              );
              this.view.clearTodoInputs();
              break;

            case todoArr[1] === "":
              alert("Please give your todo a title and try again.");
              this.view.clearTodoInputs();
              break;

            case /[^A-Za-z0-9 ,-.?!()]/.test(todoArr[2]):
              alert(
                "Please only use numbers, letters, and approved characters when describing your todo"
              );
              this.view.clearTodoInputs();
              break;

            case todoArr[2].length > 150:
              alert(
                "Please keep todo descriptions under 150 characters including spaces."
              );
              this.view.clearTodoInputs();
              break;

            case todoArr[2] === "":
              alert("Please give your todo a descrtiption and try again.");
              this.view.clearTodoInputs();
              break;

            case todoArr[3] === "":
              alert("Please select a due date for your todo.");
              this.view.clearTodoInputs();
              break;
          }

          const addTodo = (() => {
            for (const existingTodo of this.model.getTodos(
              this.model.getProject(todoArr[0])
            )) {
              if (existingTodo.name === todoArr[1]) {
                let confirm = window.confirm(
                  "You already have a similar todo. Are you sure you want to add your current todo?"
                );
                if (confirm) {
                  break;
                } else {
                  return;
                }
              }
            }

            this.model.addTodo(todoArr);
            this.storage.setTodos(this.model.projects);
            this.view.displayTodo(
              this.model.getTodo(this.model.getProject(todoArr[0]), todoArr[1])
            );
            this.view.clearTodoInputs();

            const addDeleteTodoListener = ((todoArr) => {
              const todoDeleteBtns = document.querySelectorAll(
                "#delete_todo_button"
              );
              for (const btn of todoDeleteBtns) {
                if (btn.getAttribute("listener") !== "true") {
                  const projectObj = this.model.getProject(todoArr[0]);
                  btn.addEventListener("click", (e) => {
                    e.preventDefault();
                    this.deleteTodo(
                      projectObj,
                      getTodo(projectObj, todoArr[1]),
                      e.target
                    );
                  });
                }
              }
            })(todoArr);

            const addArchiveTodoListener = ((todoArr) => {
              const todoArchiveBtns = document.querySelectorAll(
                "#archive_todo_button"
              );
              for (const btn of todoArchiveBtns) {
                if (btn.getAttribute("listener") !== "true") {
                  btn.addEventListener("click", (e) => {
                    e.preventDefault();
                    this.model.archiveTodo(
                      this.model.getTodo(
                        this.model.getProject(todoArr[0]),
                        todoArr[1]
                      )
                    );
                    this.storage.setTodos(this.model.projects);
                    this.view.archiveTodo(e.target);
                  });
                }
              }
            })(todoArr);
          })(todoArr);
        });
    })(projectObj);

    const addDeleteProjectBtnListener = ((projectObj) => {
      document
        .querySelector("#delete_project_button")
        .addEventListener("click", (e) => {
          e.preventDefault();
          const deleteProject = ((projectObj) => {
            let confirm = window.confirm(
              "This will delete all todos associated with this project. Are you sure you want to proceed?"
            );
            if (confirm) {
              this.view.clearProject(projectObj);
              this.model.deleteProject(projectObj);
              this.storage.setTodos(this.model.projects);
            } else {
              return;
            }
          })(projectObj);
        });
    })(projectObj);

    this.view.displayTodos(projectObj);

    const addDeleteTodoListeners = ((projectObj) => {
      const todoDeleteBtns = document.querySelectorAll("#delete_todo_button");
      let i = 0;
      for (const btn of todoDeleteBtns) {
        const todoObj = projectObj.todos[i];
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          this.deleteTodo(projectObj, todoObj, e.target);
        });
        i++;
      }
    })(projectObj);

    const addArchiveTodoListener = ((projectObj) => {
      const todoArchiveBtns = document.querySelectorAll("#archive_todo_button");
      let i = 0;
      for (const btn of todoArchiveBtns) {
        if (btn.getAttribute("listener") !== "true") {
          const todoObj = projectObj.todos[i];
          btn.addEventListener("click", (e) => {
            e.preventDefault();
            this.model.archiveTodo(todoObj);
            this.storage.setTodos(this.model.projects);
            this.view.archiveTodo(e.target);
          });
        }
        i++;
      }
    })(projectObj);
  }

  deleteTodo(projectObj, todoObj, eventTarget) {
    this.model.deleteTodo(projectObj, todoObj);
    this.storage.setTodos(this.model.projects);
    this.view.clearTodo(eventTarget);
  }

  initiateApp() {
    const addNewProjectBtnlistener = (() => {
      document
        .querySelector("#new_project_button")
        .addEventListener("click", (e) => {
          e.preventDefault();
          const displayProjectForm = (() => {
            if (document.querySelector("#new_project_form")) {
              return;
            }

            this.view.displayProjectForm();
            const addNewProjectBtnlistener = (() => {
              document
                .querySelector("#project_submit_button")
                .addEventListener("click", (e) => {
                  e.preventDefault();
                  const projectName =
                    document.querySelector("#project_name").value;
                  switch (true) {
                    case projectName === "":
                      alert("Please give your project a title and try again.");
                      document.querySelector("#project_name").value = "";
                      break;

                    case /[^A-Za-z ]/.test(projectName):
                      alert(
                        "Please only use letters and spaces when naming your project."
                      );
                      document.querySelector("#project_name").value = "";
                      break;

                    case projectName.length > 50:
                      alert(
                        "Please keep project titles under 30 characters including spaces."
                      );
                      document.querySelector("#project_name").value = "";
                      break;

                    default:
                      const addProject = ((projectName) => {
                        if (this.model.getProject(projectName)) {
                          alert("You already have a project with this title.");
                          return;
                        } else {
                          this.model.addProject(projectName);
                          this.storage.setTodos(this.model.projects);
                          this.view.displayProjectSelector(
                            this.model.getProject(projectName)
                          );

                          const addDisplayProjectBtnListener = ((
                            projectName
                          ) => {
                            document
                              .querySelector(
                                `#${projectName.replaceAll(
                                  " ",
                                  ""
                                )}_project_button`
                              )
                              .addEventListener("click", (e) => {
                                e.preventDefault();
                                this.displayProject(
                                  this.model.getProject(projectName)
                                );
                              });
                          })(projectName);
                        }
                      })(projectName);
                      this.view.clearProjectForm();
                      this.displayProject(this.model.getProject(projectName));
                  }
                });
            })();

            const addClearProjectFormBtnListener = (() => {
              document
                .querySelector("#clear_project_form_button")
                .addEventListener("click", (e) => {
                  e.preventDefault();
                  this.view.clearProjectForm();
                });
            })();
          })();
        });
    })();

    const initiateStorage = (() => {
      this.model.projects = this.storage.initiateStorage(this.model.projects);
      if (this.model.projects.length > 0) {
        for (const project of this.model.projects) {
          this.view.displayProjectSelector(project);

          const addDisplayProjectBtnListener = ((projectName) => {
            document
              .querySelector(
                `#${projectName.replaceAll(" ", "")}_project_button`
              )
              .addEventListener("click", (e) => {
                e.preventDefault();
                this.displayProject(this.model.getProject(projectName));
              });
          })(project.name);
        }
      }
    })();
  }
}

new InitialDisplay(document.querySelector("body"));
const todo = new Controller(new View(), new Model(), new Storage());
todo.initiateApp();
