// Set up filters default object

const filters = {
    searchText: "",
    hideCompleted: false,
};

const getFilters = () => filters;

// getFilters
// Arguments: none
// Return value: filters object

const setFilter = (updates) => {
    const searchFilter = updates.searchText;
    const hideTask = updates.hideCompleted;
    if (searchFilter) {
        filters.searchText = searchFilter;
    }

    if (hideTask) {
        filters.hideCompleted = hideTask;
    }
    renderToDo();
};

// setFilters
// Arguments: updates object with optional searchText or hideCompleted
// Return value: none

// Make sure to set up the exports
export { getFilters, setFilter };
