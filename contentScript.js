const tasksContainer = document.querySelector("[data-tasks]");
var newTaskForm = document.getElementById("submit-new-task");
const newTaskInput = document.querySelector("[data-new-task-input]");
const taskTemplate = document.getElementById("task-template");
const removeTasks = document.getElementById("remove-tasks");

const LOCAL_STORAGE_TASK_KEY = "to.do.tasks";
let tasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TASK_KEY)) || [];

if (newTaskForm) {
    newTaskForm.addEventListener("submit", event => {
        event.preventDefault();
        const taskName = newTaskInput.value;
        if (taskName == null || taskName == "") return;
        const task = createTask(taskName);
        tasks.push(task);
        newTaskInput.value = null
        saveAndRender();
    })
}

tasksContainer.addEventListener("click", event => {
    if (event.target.tagName.toLowerCase() === "input") {
        const selectedTask = tasks.find(task => task.id === event.target.id);
        selectedTask.complete = event.target.checked;
        saveAndRender();
    }
})

removeTasks.addEventListener("click", event => {
    tasks = tasks.filter(task => !task.complete);
    saveAndRender();
});

function createTask(task) {
    return {id: Date.now().toString(), task: task, complete: false};
}

function save() {
    localStorage.setItem(LOCAL_STORAGE_TASK_KEY,JSON.stringify(tasks));
}

function saveAndRender() {
    save();
    render();
}

function render() {
    clearElement(tasksContainer);
    tasks.forEach(task => {
        const taskElement = document.importNode(taskTemplate.content, true);
        
        const checkbox = taskElement.querySelector("input");
        checkbox.id = task.id;
        checkbox.checked = task.complete;

        const label = taskElement.querySelector("label");
        label.htmlFor = task.id;
        label.append(task.task);
        tasksContainer.appendChild(taskElement);
    })
}

function clearElement(element){
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}

render();