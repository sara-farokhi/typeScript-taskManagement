// get elements

const form = document.getElementById("todo-form")
const input = document.getElementById("title") as HTMLInputElement
const error = document.getElementById("title-error")
const tableBody = document.getElementById("todo-list")!
const deleteBtn = document.getElementById("delBtn")


interface item {
    title: string;
    id: number;
    status: boolean
}


class todoItem implements item {
    title: string
    id: number
    status: false

    constructor(todo: item) {
        this.title = todo.title
        this.id = todo.id
        this.status = false
    }
}

class toDoUi {
    addTodo(todo: item) {
        let row = document.createElement("tr");
        row.innerHTML = ` <tr>
                                <th scope="row">${todo.id}</th>
                                <td>${todo.title}</td>
                                <td><input type="checkbox" ${todo.status ? "checked" : null}  class="form-check-input" onchange="Store.changeStatus(${todo.id})">
                                </td>
                                <td>
                                    <button class="btn btn-sm btn-outline-danger"  onclick="ui.deletItem(event,${todo.id})" id= "delBtn">delete</button>
                                </td>
                            </tr>`
        tableBody.appendChild(row)
        input.value = ""

    }
    deletItem(e: Event, id: number) {
        (e.target as HTMLHtmlElement).parentElement?.parentElement?.remove()
        Store.deletItem(id)
    }
}


class Store {
    static showItems() {
        if (localStorage.getItem("items")) {
            let items = JSON.parse(localStorage.getItem("items")!)
            items.forEach((item: item) => {
                tableBody.innerHTML += ` <tr>
                <th scope="row">${item.id}</th>
                <td>${item.title}</td>
                <td><input type="checkbox" ${item.status ? "checked" : null}  class="form-check-input" onclick="Store.changeStatus(${item.id})">
                </td>
                <td>
                    <button class="btn btn-sm btn-outline-danger"  onclick="ui.deletItem(event, ${item.id})" id= "delBtn">delete</button>
                </td>
            </tr>`

            });
        }
        else {
            let items: item[] = []
            localStorage.setItem("items", JSON.stringify(items))
        }
    }
    static addItems(todo: item) {
        if (localStorage.getItem("items")) {
            let items = JSON.parse(localStorage.getItem("items")!)
            items.push(todo)
            localStorage.setItem("items", JSON.stringify(items))
        }
        else {
            let items: item[] = []
            localStorage.setItem("items", JSON.stringify(items))
        }
    }
    static deletItem(id: number) {
        let items = JSON.parse(localStorage.getItem("items")!)
        let updatedItems = items.filter((item: item) => item.id !== id)
        localStorage.setItem("items", JSON.stringify(updatedItems))
        // Swal.fire({
        //     title: 'Error!',
        //     text: 'task is deleted',
        //     icon: 'error',
        //     toast: true,
        // })
    }
    static changeStatus(id: number) {
        let items = JSON.parse(localStorage.getItem("items")!)
        let updatedItems = items.map((item: item) => item.id === id ? { ...item, status: !item.status } : item)
        console.log(updatedItems)
        localStorage.setItem("items", JSON.stringify(updatedItems))
    }
}

const ui = new toDoUi
form?.addEventListener("submit", (e: Event) => {
    e.preventDefault()
    const todo = {
        title: input.value.trim(),
        id: Math.round(Math.random() * 100),
        status: false,

    }
    let newTodo = new todoItem(todo)
    if (newTodo.title.trim() === "") {
        error!.innerHTML = "required"
    }
    else {
        ui.addTodo(newTodo)
        Store.addItems(newTodo)
        error!.innerHTML = ""

    }

})


window.addEventListener('DOMContentLoaded', () => {
    Store.showItems()
});
