"use strict";

const toDoList = getSavedToDos();

const filters = {
    searchText: "",
    hideCompleted: false,
};

renderToDo(toDoList, filters);

document.querySelector("#search-filter").addEventListener("input", (e) => {
    filters.searchText = e.target.value;
    renderToDo(toDoList, filters);
});

document.querySelector("#hide-task").addEventListener("change", (e) => {
    filters.hideCompleted = e.target.checked;
    renderToDo(toDoList, filters);
});

document.querySelector("#add-tasks").addEventListener("submit", (e) => {
    const trimValue = e.target.elements.newTask.value.trim();
    e.preventDefault();

    if (trimValue) {
        toDoList.push({
            id: uuidv4(),
            text: trimValue,
            completed: false,
        });
        saveToDos(toDoList);
        renderToDo(toDoList, filters);
        e.target.elements.newTask.value = "";
    }
});
