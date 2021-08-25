"use strict";

// Fetch existing toDos from localStorage
const getSavedToDos = () => {
    const toDoListJSON = localStorage.getItem("toDoList");

    try {
        return toDoListJSON ? JSON.parse(toDoListJSON) : [];
    } catch (e) {
        return [];
    }
};

// Save toDos to localStorage
const saveToDos = (toDoList) => {
    localStorage.setItem("toDoList", JSON.stringify(toDoList));
};

// Render application toDos based on filters
const renderToDo = (toDoList, filters) => {
    const taskEl = document.querySelector("#filter");
    const filterToDo = toDoList.filter((toDo) => {
        const checkCompleted = !filters.hideCompleted || !toDo.completed;

        const checkText = toDo.text
            .toLowerCase()
            .includes(filters.searchText.toLowerCase());

        return checkText && checkCompleted;
    });

    const incompleteTasks = filterToDo.filter((toDo) => !toDo.completed);

    taskEl.innerHTML = "";
    taskEl.appendChild(generateSummaryDOM(incompleteTasks));

    if (filterToDo.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.classList.add("empty-message");
        emptyMessage.textContent = "No Tasks to show";
        taskEl.appendChild(emptyMessage);
    } else {
        filterToDo.forEach((toDo) => {
            taskEl.appendChild(generateToDoDOM(toDo));
        });
    }
};

// Remove Task by their id
const removeTask = (id) => {
    const toDoIndex = toDoList.findIndex((toDo) => toDo.id === id);
    if (toDoIndex > -1) {
        toDoList.splice(toDoIndex, 1);
    }
};

// Change the value of completed
const checkCompleted = (id) => {
    const task = toDoList.find((toDo) => toDo.id === id);

    if (task) {
        task.completed = !task.completed;
    }
};

// Get the DOM elements for an individual note
const generateToDoDOM = (toDo) => {
    const toDoEl = document.createElement("label");
    const containerEl = document.createElement("div");
    const checkBox = document.createElement("input");
    const textEl = document.createElement("span");
    const button = document.createElement("button");

    checkBox.setAttribute("type", "checkbox");
    button.textContent = "Delete";
    button.classList.add("button", "button--text");

    checkBox.checked = toDo.completed;
    containerEl.appendChild(checkBox);
    checkBox.addEventListener("click", (e) => {
        checkCompleted(toDo.id);
        saveToDos(toDoList);
        renderToDo(toDoList, filters);
    });

    // Setup container
    toDoEl.classList.add("list-item");
    containerEl.classList.add("list-item__container");
    toDoEl.appendChild(containerEl);

    textEl.textContent = toDo.text + " ";
    containerEl.appendChild(textEl);
    toDoEl.appendChild(button);
    button.addEventListener("click", () => {
        removeTask(toDo.id);
        saveToDos(toDoList);
        renderToDo(toDoList, filters);
    });

    return toDoEl;
};

// Get the DOM elements for list summary
const generateSummaryDOM = (incompleteTasks) => {
    const summary = document.createElement("h2");
    const countCompleted = incompleteTasks.length;
    summary.classList.add("list-title");
    summary.textContent =
        countCompleted === 1
            ? `You have ${countCompleted} task left to complete`
            : `You have ${countCompleted} tasks left to complete`;

    return summary;
};
