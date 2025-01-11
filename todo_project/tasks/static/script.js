
    document.addEventListener("DOMContentLoaded", function () {
        const apiUrl = "/api/tasks/";
        const todoList = document.getElementById("todo-list");
        const todoTitle = document.getElementById("todo-title");
        const todoDescription = document.getElementById("todo-description");
        const addTaskButton = document.getElementById("addTaskButton");

        // Fetch and display tasks
        function fetchTasks() {
            fetch(apiUrl)
                .then(response => response.json())
                .then(tasks => {
                    todoList.innerHTML = "";
                    tasks.forEach(task => addTaskToDOM(task));
                })
                .catch(error => console.error("Error fetching tasks:", error));
        }

        // Add a task to the DOM
        function addTaskToDOM(task) {
            const listItem = document.createElement("li");
            listItem.className = "todo-item";
            listItem.dataset.id = task.id;

            const taskContent = document.createElement("div");
            taskContent.className = "d-flex justify-content-between align-items-center";

            const taskDetails = document.createElement("div");
            taskDetails.innerHTML = `
                <input type="checkbox" class="form-check-input" ${task.is_completed ? "checked" : ""}>
                <span>${task.title}: ${task.description || ""}</span>
            `;

            const actions = document.createElement("div");
            actions.className = "todo-actions";

            // Edit Button
            const editButton = document.createElement("button");
            editButton.className = "btn edit-btn";
            editButton.textContent = "Edit";
            editButton.addEventListener("click", () => editTask(task, listItem));

            // Delete Button
            const deleteButton = document.createElement("button");
            deleteButton.className = "btn delete-btn";
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", () => deleteTask(task.id));

            // Append buttons to actions
            actions.appendChild(editButton);
            actions.appendChild(deleteButton);

            // Event Listener for toggle completion
            taskDetails.querySelector("input[type='checkbox']").addEventListener("change", () => toggleTaskComplete(task));

            taskContent.appendChild(taskDetails);
            taskContent.appendChild(actions);
            listItem.appendChild(taskContent);
            todoList.appendChild(listItem);
        }

        // Add a new task
        addTaskButton.addEventListener("click", function () {
            const newTask = {
                title: todoTitle.value,
                description: todoDescription.value,
            };

            fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": getCookie("csrftoken"),
                },
                body: JSON.stringify(newTask),
            })
                .then(response => response.json())
                .then(task => {
                    addTaskToDOM(task);
                    todoTitle.value = "";
                    todoDescription.value = "";
                })
                .catch(error => console.error("Error adding task:", error));
        });

        // Toggle task completion
        function toggleTaskComplete(task) {
            const updatedTask = { ...task, is_completed: !task.is_completed };

            fetch(`${apiUrl}${task.id}/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": getCookie("csrftoken"),
                },
                body: JSON.stringify(updatedTask),
            })
                .then(fetchTasks)
                .catch(error => console.error("Error updating task:", error));
        }

        // Edit a task
        function editTask(task, listItem) {
            const editForm = document.createElement("form");
            editForm.className = "row g-2";

            const titleInput = document.createElement("input");
            titleInput.type = "text";
            titleInput.value = task.title;
            titleInput.className = "form-control mb-2";
            titleInput.required = true;

            const descriptionInput = document.createElement("input");
            descriptionInput.type = "text";
            descriptionInput.value = task.description;
            descriptionInput.className = "form-control mb-2";

            const saveButton = document.createElement("button");
            saveButton.type = "submit";
            saveButton.className = "btn btn-success btn-sm";
            saveButton.textContent = "Save";

            editForm.appendChild(titleInput);
            editForm.appendChild(descriptionInput);
            editForm.appendChild(saveButton);

            // Replace task content with edit form
            listItem.innerHTML = "";
            listItem.appendChild(editForm);

            // Handle edit form submission
            editForm.addEventListener("submit", function (e) {
                e.preventDefault();

                const updatedTask = {
                    title: titleInput.value,
                    description: descriptionInput.value,
                };

                fetch(`${apiUrl}${task.id}/`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRFToken": getCookie("csrftoken"),
                    },
                    body: JSON.stringify(updatedTask),
                })
                    .then(fetchTasks)
                    .catch(error => console.error("Error updating task:", error));
            });
        }

        // Delete a task
        function deleteTask(taskId) {
            if (confirm("Are you sure you want to delete this task?")) {
                fetch(`${apiUrl}${taskId}/`, {
                    method: "DELETE",
                    headers: {
                        "X-CSRFToken": getCookie("csrftoken"),
                    },
                })
                    .then(fetchTasks)
                    .catch(error => console.error("Error deleting task:", error));
            }
        }

        // CSRF token utility function
        function getCookie(name) {
            const cookieValue = document.cookie
                .split("; ")
                .find(row => row.startsWith(name + "="))
                ?.split("=")[1];
            return cookieValue || "";
        }

        // Initial Fetch
        fetchTasks();
    });
