import { renderToDo } from "./views";
import { uuidv4 } from "uuid/v4";
// Setup the empty todos array
const toDoList = [];

// loadTodos
// Arguments: none
// Return value: none
const loadTasks = () => {
    const toDoList = localStorage.getItem("toDoList");

    try {
        toDoList ? JSON.parse(toDoListJSON) : [];
    } catch (e) {
        [];
    }
};

loadTasks();
// saveTodos
// Arguments: none
// Return value: none
const saveTask = () => {
    localStorage.setItem("toDoList", JSON.stringify(toDoList));
};

// getTodos
// Arguments: none
// Return value: todos array
const getToDoList = () => toDoList;

// createTodo
// Arguments: todo text
// Return value: none
const createToDoList = (toDoText) => {
    const trimText = toDoText.trim();
    if (trimText) {
        toDoList.push({
            id: uuidv4(),
            text: trimText,
            completed: false,
        });
        saveTask();
        renderToDo();
    }
};

// removeTodo
// Arguments: id of todo to remove
// Return value: none
const removeTask = (id) => {
    const toDoIndex = toDoList.findIndex((toDo) => toDo.id === id);
    if (toDoIndex > -1) {
        toDoList.splice(toDoIndex, 1);
        saveTask();
    }
};

// toggleTodo
// Arguments: id of todo to toggle
// Return value: none
const toggleTask = (id) => {
    const task = toDoList.find((toDo) => toDo.id === id);

    if (task) {
        task.completed = !task.completed;
        saveTask();
    }
};

// Make sure to call loadTodos and setup the exports
export {
    toggleTask,
    removeTask,
    createToDoList,
    loadTasks,
    getToDoList,
    saveTask,
};
