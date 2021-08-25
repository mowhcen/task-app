import { getToDoList, removeTask, saveTask, toggleTask } from "./todos";

import { getFilters } from "./filters";

// renderTodos
// Arguments: none
// Return value: none
const renderToDo = () => {
    const taskEl = document.querySelector("#filter");
    const filters = getFilters();
    const toDoList = getToDoList();
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

// generateTodoDOM
// Arguments: todo
// Return value: the todo element
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
        toggleTask(toDo.id);
        saveTask();
        renderToDo();
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
        saveToDos();
        renderToDo();
    });

    return toDoEl;
};

// generateSummaryDOM
// Arguments: incompletedTodos
// Return value: the summary element
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

// Make sure to set up the exports

export { renderToDo, generateToDoDOM, generateSummaryDOM };
