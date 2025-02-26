console.log("ok");

const input_task = document.querySelector('.add-cont input');
const add_btn = document.querySelector('.add-btn');
const input_task1 = document.querySelector('.add-cont1 input');
const add_btn1 = document.querySelector('.add-btn2');
const main_content = document.querySelector('.main-cont');

// Function to get tasks from localStorage
function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

// Function to save tasks to localStorage
function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to add a new task
function task_adder() {
    add_btn.addEventListener("click", () => {

        let taskValue = input_task.value.trim();
        if (taskValue === "") {
            alert_cust("Task cannot be empty!");
            return;
        }
        else {
            console.log("I am add task btn");

            let tasks = getTasks(); // Get existing tasks
            tasks.push({ task: taskValue, important: false, completed: false }); // Store task as object
            saveTasks(tasks); // Save updated tasks

            renderTasks(); // Re-render task list
            input_task.value = ""; // Clear input field
            alert_cust("New task is added")
        }
    });
}
function task_adder1() {
    add_btn1.addEventListener("click", () => {

        let taskValue = input_task1.value.trim();
        if (taskValue === "") {
            alert_cust("Task cannot be empty!");
            return;
        }
        else {
            console.log("I am add task btn");

            let tasks = getTasks(); // Get existing tasks
            tasks.push({ task: taskValue, important: false, completed: false }); // Store task as object
            saveTasks(tasks); // Save updated tasks

            renderTasks(); // Re-render task list
            input_task1.value = ""; // Clear input field
            alert_cust("New task is added")
        }
    });
}

// function for alert 

function alert_cust(alertText) {
    let noti_cont = document.querySelector('.noti-cont');
    let noti = document.createElement("div");
    noti.classList.add("noti")
    noti_cont.appendChild(noti);


    setTimeout(() => {
        noti.innerHTML = alertText
        noti.style.bottom = "72px"
    }, 10);
    setTimeout(() => {
        noti.style.bottom = "2px"
        noti.style.display = "none"
    }, 3000)


}
alert_cust("Lets complete task together :)")
// Function to display tasks from LocalStorage
function renderTasks() {
    const task_list = document.querySelector('.task_lists');
    if (!task_list) return;

    task_list.innerHTML = ""; // Clear current tasks

    let tasks = getTasks();
    // console.log("Tasks in LocalStorage:", tasks); // Debugging

    tasks.forEach((task, index) => {
        const New_task = document.createElement("li");
        New_task.setAttribute("data-index", index); // Store index for later use

        New_task.innerHTML = `
            <div class="important">
                <img src="${task.important ? 'assi/yellow-star-icon.svg' : 'assi/star-icon.svg'}" alt="Star">
            </div>
            <div class="task-content">${task.task}</div>
            <div class="custom-checkbox">
                 <img src="assi/checkbox-un.svg" alt="" class="checkbox">
            </div>
            <img src="assi/delete-icon.svg" alt="" class="delete-btn" data-index="${index}">
         
        `;
        New_task.classList.add("task_list");

        if (task.important) {
            New_task.classList.add("important1");
        }
        task_list.prepend(New_task);
        if (task.completed) {
            New_task.classList.add("completed-task");
            // alert_cust("Task is added")
            New_task.querySelector(".checkbox").src = "assi/checkbox-checked.svg";
        }
    });

    attachEventListeners();  // Attach events after rendering tasks
}

// Function to attach all event listeners (for stars & delete buttons)
function attachEventListeners() {
    document.querySelector(".task_lists").addEventListener("click", (event) => {
        if (event.target.closest(".important")) {
            toggleImportant(event.target.closest(".task_list"));
            // alert_cust("task is Save as Important");
        } else if (event.target.classList.contains("delete-btn")) {
            deleteTask(event.target.getAttribute("data-index"));
            alert_cust("Task is deleted");
        }
        else if (event.target.classList.contains("checkbox")) {
            let index = event.target.closest(".task_list").getAttribute("data-index");
            complete_task(index);
            // alert_cust("Task is Completed");
        }
    });
}

// Function to toggle important (starred) state and save to localStorage
function toggleImportant(taskItem) {
    let tasks = getTasks();  // Get updated task list
    let taskIndex = taskItem.getAttribute("data-index");

    tasks[taskIndex].important = !tasks[taskIndex].important; // Toggle important state
    saveTasks(tasks); // Save updated state

    // Update UI immediately
    const star = taskItem.querySelector(".important img");

    if (tasks[taskIndex].important) {
        star.src = "assi/yellow-star-icon.svg";
        taskItem.classList.add("importantl");
        alert_cust("task is Save as Important");

    } else {
        star.src = "assi/star-icon.svg";
        taskItem.classList.remove("importantl");
        alert_cust("task is Save as Unimportant");
    }

}

// Function to delete a task
function deleteTask(index) {
    let tasks = getTasks();
    tasks.splice(index, 1); // Remove task
    saveTasks(tasks); // Save updated list
    renderTasks(); // Re-render task list
}

function mode(button, mode_img) {

    // let mode_cont = document.querySelector('.mode');


    button.addEventListener("click", () => {
        // Get the root element (<html>)
        let root = document.documentElement;

        if (mode_img.classList.contains("day_md")) {
            alert_cust("Switching to light mode");
            // Remove the day mode class, add the night mode class
            mode_img.classList.remove("day_md");
            mode_img.classList.add("night_md");
            mode_img.src = "assi/night-icon.svg";
            document.querySelector(".pmenu-cont img").style.filter ="invert(1)"
            document.querySelector(".nav-icon img").style.filter ="invert(1)"
            document.querySelector(".modeimg").style.filter ="invert(1)"
            // Add the dark-mode class to the root element
            root.classList.add("dark-mode");
        } else {
            alert_cust("Switching to day mode");
            mode_img.classList.remove("night_md");
            mode_img.classList.add("day_md");
            mode_img.src = "assi/sun-icon.svg";

            // Remove the dark-mode class from the root element
            root.classList.remove("dark-mode");
        }
    });
}
let mode_img = document.querySelector('.mod img');
let mode_img1 = document.querySelector('.modeimg');
let mod = document.querySelector('.mod');
mode(mod, mode_img)
let mode_cont = document.querySelector('.mode');

mode(mode_cont, mode_img1);

///menu for phones

function menu() {
    let menu_icon = document.querySelector('.pmenu-cont');
    let sub_menu = document.querySelector('.sub-menu');

    menu_icon.addEventListener("click", () => {
        if (sub_menu.classList.contains("closed")) {
            sub_menu.classList.remove("closed");
            sub_menu.classList.add("opened")
            sub_menu.style.left = "0"
        }
        else {
            sub_menu.classList.remove("opened");
            sub_menu.classList.add("closed")
            sub_menu.style.left = "-3400px"
        }
    })

}

menu()

//mode for desptop 



// Function to load tasks when clicking on "All Tasks"
function contnet_loader() {

    main_content.innerHTML = `
    <div class="lists-tasks">
        <ul class="task_lists"></ul>
    </div>`;
    renderTasks(); // Show tasks when page loads


}



// functionn to mark task as completed adn aslo to save to local storage

function complete_task(index) {
    // Attach a single listener to the task list container
    let tasks = getTasks();
    // document.querySelectorAll(".task_lists");[index]

    tasks[index].completed = !tasks[index].completed;

    saveTasks(tasks)
    // Check if the clicked element a checkbox image

    // Update UI immediately
    let taskElement = document.querySelector(`.task_list[data-index="${index}"]`);

    let checkboxImg = taskElement.querySelector(".checkbox");

    if (tasks[index].completed) {
        taskElement.classList.add("completed-task");  // Add completed class
        checkboxImg.src = "assi/checkbox-checked.svg";  // Update checkbox image
        // taskElement.style.display = "none"
    } else {
        taskElement.classList.remove("completed-task");
        checkboxImg.src = "assi/checkbox-un.svg";
    }







}
// complete_task()



// complete_task()
document.addEventListener("DOMContentLoaded", () => {
    // complete_task()
    task_adder1();
    task_adder(); // Initialize task adding
    contnet_loader(); // Load tasks when clicked
    complete_task()
});
