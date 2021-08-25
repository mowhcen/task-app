// Set up index.html to load the bundle
// Make sure to load uuid via an npm module when necessary

// --

import { createToDoList } from "./todos";
import { renderToDo } from "./views";
// Add necessary imports
import { setFilter } from "./filters";
// Render initial todos
renderToDo();

// Set up search text handler
document.querySelector("#search-filter").addEventListener("input", (e) => {
    setFilter({
        searchText: e.target.value,
    });
});
// Set up checkbox handler
document.querySelector("#hide-task").addEventListener("change", (e) => {
    setFilter({
        hideCompleted: e.target.checked,
    });
});

// Set up form submission handler
document.querySelector("#add-tasks").addEventListener("submit", (e) => {
    e.preventDefault();
    createToDoList(e.target.elements.newTask.value);
    e.target.elements.newTask.value = "";
});

// Bonus: Add a watcher for local storage
