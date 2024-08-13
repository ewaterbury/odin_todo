export class View {
  //presents and accepts info from user
  constructor() {
    this.body = document.querySelector("body");
    this.projectTabContainer = document.querySelector("#project_tab_container");
    this.appContainer = document.querySelector("#app_container");
  }

  displayProjectForm() {
    const buildFormContainer = (() => {
      const form = document.createElement("form");
      form.classList.add("new_project_form");
      form.id = "new_project_form";

      const header = (() => {
        const btn = document.createElement("button");
        btn.id = "clear_project_form_button";
        btn.textContent = "x";
        form.append(btn);
      })();

      const buildFieldset = (() => {
        const fieldset = document.createElement("fieldset");

        /*const buildLegend = (() => {
                    const legend = document.createElement('legend');
                    legend.textContent = 'What is the name of your next project.';
                    fieldset.append(legend);
                })();*/

        const buildInput = (() => {
          const p = document.createElement("p");
          const input = document.createElement("input");
          input.type = "text";
          input.id = "project_name";
          input.name = "project_name";
          const label = document.createElement("label");
          label.for = "project_name";
          label.textContent = "Project Name:";
          p.append(label, input);
          fieldset.append(p);
        })();

        const buildSubmitBtn = (() => {
          const btn = document.createElement("button");
          btn.textContent = "Submit";
          btn.id = "project_submit_button";
          fieldset.append(btn);
        })();

        form.append(fieldset);
      })();
      this.body.append(form);
    })();
  }

  clearProjectForm() {
    const projectForm = document.querySelector("#new_project_form");
    while (projectForm.firstChild) {
      projectForm.removeChild(projectForm.lastChild);
    }
    projectForm.remove();
  }

  displayProjectSelector(projectObj) {
    const btn = document.createElement("button");
    btn.id = `${projectObj.name.replaceAll(" ", "")}_project_button`;
    btn.textContent = projectObj.name;
    btn.className = "project_tab";
    this.projectTabContainer.append(btn);
  }

  displayProject(projectObj) {
    const buildNewTodoForm = (() => {
      const form = document.createElement("form");
      const fieldset = document.createElement("fieldset");

      const buildHeading = ((projectObj) => {
        const h3 = document.createElement("h3");
        h3.textContent = projectObj.name;
        form.append(h3);
      })(projectObj);

      const formInputsArr = [
        ["text", "todo_name", "What needs done?"],
        ["text", "todo_description", "Description:"],
        ["date", "todo_date", "Due Date:"],
        ["checkbox", "todo_priority", "High Priority:", "high_priority"],
      ];

      const buildInputSection = ((formInputsArr) => {
        for (const arr of formInputsArr) {
          const p = document.createElement("p");
          const input = document.createElement("input");
          input.type = `${arr[0]}`;
          input.id = `${arr[1]}`;
          input.name = `${arr[1]}`;
          if (arr[0] === "checkbox") {
            input.value = `${arr[3]}`;
          }
          const label = document.createElement("label");
          label.for = `${arr[1]}`;
          label.textContent = `${arr[2]}`;
          p.append(label, input);
          fieldset.append(p);
        }
      })(formInputsArr);

      const buildAddTodoBtn = (() => {
        const p = document.createElement("p");
        const btn = document.createElement("button");
        btn.textContent = "Add Todo";
        btn.id = "add_todo_button";
        p.append(btn);
        fieldset.append(p);
      })();

      form.append(fieldset);
      this.appContainer.append(form);
    })();

    const buildTodoContainer = (() => {
      const ul = document.createElement("ul");
      ul.id = "todo_list";
      this.appContainer.append(ul);
    })();

    const deleteProjectBtn = (() => {
      const btn = document.createElement("button");
      btn.id = "delete_project_button";
      btn.textContent = "Delete Project";
      this.appContainer.append(btn);
    })();
  }

  clearProject(projectObj) {
    while (this.appContainer.firstChild) {
      this.appContainer.removeChild(this.appContainer.lastChild);
    }
    if (projectObj !== undefined) {
      document
        .querySelector(`#${projectObj.name.replaceAll(" ", "")}_project_button`)
        .remove();
      this.appContainer.textContent =
        "Add a new project or select a existing project to get started.";
    } else {
      this.appContainer.textContent = "";
    }
  }

  displayTodo(todoObj) {
    const todoList = document.querySelector("#todo_list");
    const buildTodo = ((todoObj) => {
      const li = document.createElement("li");
      for (const prop in todoObj) {
        if (prop !== "project") {
          if (todoObj[`${prop}`] === true || todoObj[`${prop}`] === false) {
            if (todoObj[`${prop}`] === true) {
              li.classList.add(`${prop}`);
            }
          } else {
            const span = document.createElement("span");
            span.textContent = todoObj[`${prop}`];
            li.append(span);
          }
        }
      }

      const buildDeleteBtn = (() => {
        const btn = document.createElement("button");
        btn.id = "delete_todo_button";
        btn.className = "delete_todo_button";
        btn.textContent = "x";
        li.append(btn);
      })();

      const buildArchiveBtn = (() => {
        const btn = document.createElement("button");
        btn.id = "archive_todo_button";
        btn.className = "archive_todo_button";
        btn.textContent = "Archive";
        li.append(btn);
      })();

      todoList.append(li);
    })(todoObj);
  }

  displayTodos(projectObj) {
    const todos = ((projectObj) => {
      for (const todo in projectObj.todos) {
        this.displayTodo(projectObj.todos[`${todo}`]);
      }
    })(projectObj);
  }

  archiveTodo(eventTarget) {
    if (eventTarget.parentNode.className.includes("archived")) {
      eventTarget.parentNode.classList.remove("archived");
    } else {
      eventTarget.parentNode.classList.add("archived");
    }
  }

  clearTodo(eventTarget) {
    eventTarget.parentNode.remove();
  }

  clearTodoInputs() {
    document.querySelector("#todo_name").value = "";
    document.querySelector("#todo_description").value = "";
    document.querySelector("#todo_date").value = "";
    document.querySelector("#todo_priority").checked = false;
  }
}
