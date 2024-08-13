export class Storage {
  //handels local storage for project
  constructor() {}

  setTodos(todos) {
    if (this.storageAvailable("localStorage")) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }

  getTodos() {
    if (this.storageAvailable("localStorage")) {
      return JSON.parse(localStorage.getItem("todos"));
    }
  }

  storageAvailable(type = "localStorage") {
    let storage;
    try {
      storage = window[type];
      const x = "__storage_test__";
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return (
        e instanceof DOMException &&
        // everything except Firefox
        (e.code === 22 ||
          // Firefox
          e.code === 1014 ||
          // test name field too, because code might not be present
          // everything except Firefox
          e.name === "QuotaExceededError" ||
          // Firefox
          e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage &&
        storage.length !== 0
      );
    }
  }

  initiateStorage(todos) {
    if (this.storageAvailable("localStorage")) {
      if (!localStorage.getItem("todos")) {
        this.setTodos(todos);
        return this.getTodos(todos);
      } else {
        return this.getTodos(todos);
      }
    } else {
      return todos;
    }
  }
}
