// get elements

const form = document.getElementById("todo-form")
const input = document.getElementById("title") as HTMLInputElement
const error = document.getElementById("title-error")
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



form?.addEventListener("submit", (e: Event) => {
    e.preventDefault()
    const todo: item = {
        title: input.value.trim(),
        id: Math.round(Math.random() * 100),
        status: false,
    }
    let newTodo = new todoItem(todo)
    if (newTodo.title.trim() === "") {
        error!.innerHTML = "required"
    }
    else {
        error!.innerHTML = ""
    }
})
