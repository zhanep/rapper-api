// grabbing every element with the class del
const deleteBtn = document.querySelectorAll('.del')
const todoItem = document.querySelectorAll('.todoItem span')
const todoItemComplete = document.querySelectorAll('.todoItem span.completed')

// putting everything that has the delete class, put it in an array
Array.from(deleteBtn).forEach((el) =>{
    // adding an event listener to each one
    el.addEventListener('click', deleteTodo)
})

Array.from(todoItem).forEach((el) =>{
    el.addEventListener('click', markComplete)
})

Array.from(todoComplete).forEach((el) =>{
    el.addEventListener('click', undo)
})

// fetch to the database
async function deleteTodo() {
    const todoText = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch ('deleteTodo', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'rainbowUnicorn': todoText
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markComplete() {
    const todoText = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch ('markComplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'rainbowUnicorn': todoText
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function undo() {
    const todoText = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch ('undo', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'rainbowUnicorn': todoText
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}