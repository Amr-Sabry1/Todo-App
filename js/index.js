let todoVal = document.getElementById('todo')
var todoList;


if (localStorage.getItem('list') !== null) {
    todoList = JSON.parse(localStorage.getItem("list"))
    display(todoList)
} else {
    todoList = []

}
notodo()

function notodo() {
    if (todoList.length == 0) {
        document.getElementById('notodo').classList.remove('d-none')

    } else {
        document.getElementById('notodo').classList.add('d-none')

    }
}
document.getElementById('addTodo').addEventListener("click", function() {
    if (todoVal.value == "") {
        document.getElementById("error").classList.remove('d-none')
    } else {
        document.getElementById("error").classList.add('d-none')
        var task = { text: todoVal.value }
        todoList.push(task)
        todoVal.value = ""
        setData()
        display(todoList)
        notodo()
    }

})

function deleteTodo(index) {
    todoList.splice(index, 1)
    display(todoList)
    setData()
    notodo()
}

function getData(index) {
    localStorage.setItem("index", index)
    todoVal.value = todoList[index].text


    document.getElementById("addTodo").classList.add("d-none")
    document.getElementById("updateBtn").classList.remove("d-none")
}

function updateTodo() {
    let x = localStorage.getItem("index")
    if (todoVal.value == "") {
        document.getElementById("error").classList.remove("d-none")
    } else {
        todoList[x].text = todoVal.value,
            display(todoList)
        todoVal.value = ""
        document.getElementById("error").classList.add("d-none")

        document.getElementById("addTodo").classList.remove("d-none")
        document.getElementById("updateBtn").classList.add("d-none")
        setData()
    }
}


function display(list) {
    var cartona = ""
    for (var i = 0; i < list.length; i++) {
        cartona += `  <div  class="tasks d-flex justify-content-between align-items-center mt-3">
                            <div class="todo me-2"  >
                                <p class="m-0 ms-1">${list[i].text}</p>
                            </div>
                            <div>

                                <i class="fa-regular fa-circle-xmark fs-4 text-danger" onclick=deleteTodo(${i})></i>
                                <i class="fa-solid fa-pen-to-square fw-bold fs-4 text-success" onclick="getData(${i})"></i>
                            </div>
                        </div>`
    }
    document.getElementById("tableData").innerHTML = cartona

}





function setData() {
    localStorage.setItem("list", JSON.stringify(todoList))

}