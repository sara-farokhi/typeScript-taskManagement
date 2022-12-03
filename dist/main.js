"use strict";
// get elements
const form = document.getElementById("todo-form");
const input = document.getElementById("title");
const error = document.getElementById("title-error");
class todoItem {
    constructor(todo) {
        this.title = todo.title;
        this.id = todo.id;
        this.status = false;
    }
}
form === null || form === void 0 ? void 0 : form.addEventListener("submit", (e) => {
    e.preventDefault();
    const todo = {
        title: input.value.trim(),
        id: Math.round(Math.random() * 100),
        status: false,
    };
    let newTodo = new todoItem(todo);
    if (newTodo.title.trim() === "") {
        error.innerHTML = "required";
    }
    else {
        error.innerHTML = "";
    }
});
