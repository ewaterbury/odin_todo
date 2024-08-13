export class InitialDisplay {
  constructor(root) {
    const buildHeader = ((parent) => {
      const header = document.createElement("header");
      const buildHeading = ((parent) => {
        const h1 = document.createElement("h1");
        h1.textContent = "Eric's Todo App";
        parent.append(h1);
      })(header);
      parent.append(header);
    })(root);

    const buildDisplayContainer = ((parent) => {
      const div = document.createElement("div");
      div.className = "display_container";
      div.id = "display_container";
      const buildProjectTabContainer = ((parent) => {
        const div = document.createElement("div");
        div.className = "project_tab_container";
        div.id = "project_tab_container";
        const buildNewProjectBtn = ((parent) => {
          const btn = document.createElement("button");
          btn.className = "project_tab";
          btn.id = "new_project_button";
          btn.textContent = "New Project";
          parent.append(btn);
        })(div);

        parent.append(div);
      })(div);

      const buildAppContainer = ((parent) => {
        const div = document.createElement("div");
        div.className = "app_container";
        div.id = "app_container";
        div.textContent = "Add a new project to get started.";
        parent.append(div);
      })(div);

      parent.append(div);
    })(root);
  }
}
