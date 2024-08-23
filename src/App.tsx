import { useState } from "react";
import "./App.css";

interface Task {
	key: number;
	title: string;
	description: string;
	isDone: boolean;
}

const App: React.FC = () => {
	// load lcalStorage
	/* 
	let tasksLocalStorage = localStorage.getItem("EgrenB3S23_ToDoList_Tasks");
	let taskListLoaded = [];
	if (tasksLocalStorage !== null) {
		taskListLoaded = JSON.parse(tasksLocalStorage);
	}
 	*/

	/* 
	const tasksFromStorage = () => {
		// returns tasks from LS, or an empty array
		const tasksLocalStorage = localStorage.getItem("EgrenB3S23_ToDoList_Tasks");
		return tasksLocalStorage ? JSON.parse(tasksLocalStorage) : [];
		
	};
 	*/

	const tasksFromStorage = {
		get: () => {
			// Retrieves tasks from localStorage, or returns an empty array if not found
			const tasksLS = localStorage.getItem("EgrenB3S23_ToDoList_Tasks");
			return tasksLS ? JSON.parse(tasksLS) : [];
		},
		set: (tasks: object) => {
			// Saves tasks to localStorage
			localStorage.setItem("EgrenB3S23_ToDoList_Tasks", JSON.stringify(tasks));
		},
	};

	// const [tasks, setTasks] = useState<Task[]>(taskListLoaded);
	const [tasks, setTasks] = useState<Task[]>(tasksFromStorage.get());
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [isDone, setIsDone] = useState(false);

	const addTask = (newTask: Task) => {
		//add current task to tasks state, then update localStorage
		const updatedTasks = [...tasks, newTask];
		setTasks(updatedTasks);
		tasksFromStorage.set(updatedTasks);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		// save task to task list

		e.preventDefault();

		if (title.trim() === "") {
			alert("Please enter a title for the task.");
			return;
		}

		const newTask: Task = {
			key: Date.now(), // Generate a unique ID based on the current time
			title,
			description,
			isDone,
		};

		addTask(newTask);
		console.log("Task saved:", newTask);
		// Reset state
		setTitle("");
		setDescription("");
		setIsDone(false);
	};

	const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
		//delets selected task

		// get key for the selected task
		const selectedTaskKey = parseInt((document.getElementById("selectTask") as HTMLSelectElement).value);
		// error handling
		if (isNaN(selectedTaskKey)) {
			alert("Failed to grab task ID. Is the list empty?");
			return;
		}

		// remove selected task
		const updatedTasks = tasks.filter((task) => task.key !== selectedTaskKey);
		setTasks(updatedTasks);
		tasksFromStorage.set(updatedTasks); // Update the localStorage
	};

	const handleLoad = (e: React.MouseEvent<HTMLButtonElement>) => {
		// loads selected task

		// get key for the selected task
		const selectedTaskKey = parseInt((document.getElementById("selectTask") as HTMLSelectElement).value);
		// error handling
		if (isNaN(selectedTaskKey)) {
			alert("Failed to grab task ID. Is the list empty?");
			return;
		}

		// set state
		const [taskToLoad] = tasks.filter((task) => task.key === selectedTaskKey);
		setTitle(taskToLoad.title); // todo
		setDescription(taskToLoad.description);
		setIsDone(taskToLoad.isDone);
	};

	const handleToggleDone = (e: React.MouseEvent<HTMLButtonElement>) => {
		// get key for the selected task
		const selectedTaskKey = parseInt((document.getElementById("selectTask") as HTMLSelectElement).value);
		// error handling
		if (isNaN(selectedTaskKey)) {
			alert("Failed to grab task ID. Is the list empty?");
			return;
		}

		// get the tasks array and switch isDone on the selected task.
		const updatedTasks = tasks.map((task) => (task.key === selectedTaskKey ? { ...task, isDone: !task.isDone } : task));
		setTasks(updatedTasks);
		tasksFromStorage.set(updatedTasks);

		/* 
		const taskKey = tasks.find((task) => task.key === selectedTaskKey);
		console.log(taskToToggle);
		if (taskToToggle) {
			taskToToggle.isDone = !taskToToggle.isDone;
		}
		console.log(taskToToggle);
		setTasks();
	 */
	};

	return (
		<>
			<div id="taskFormWrapper">
				<article>
					<h1>To do list</h1>
					<p>Like task manager, but for people.</p>
				</article>
				<form onSubmit={handleSubmit} className="task-form" id="taskForm">
					<div className="flex-vertical">
						<input type="text" name="taskTitle" id="taskTitle" placeholder="Task title" className="textbox" value={title} onChange={(e) => setTitle(e.target.value)} />
						<textarea name="taskText" id="taskText" rows={12} placeholder="Task text" className="textbox" value={description} onChange={(e) => setDescription(e.target.value)} />
					</div>

					<div className="flex-horizontal">
						<input type="submit" value="Submit" id="submitTaskBtn" className="btn" />
						<div className="input-with-label">
							<label htmlFor="taskIsDoneChkBox">Task done:</label>
							<input onChange={(e) => setIsDone(e.target.checked)} type="checkbox" name="taskIsDone" id="taskIsDoneChkBox" className="checkbox" checked={isDone} value="isDone" />
						</div>
					</div>
				</form>
			</div>

			<div id="taskListWrapper">
				<select name="selectTask" id="selectTask" size={20}>
					{tasks.map((task, index) => (
						<option key={index} value={task.key}>
							{/* {task.key} - {task.title} */}
							{task.isDone ? "✔️" : "➖"} {task.title}
						</option>
					))}
				</select>

				<div className="flex-horizontal">
					<button onClick={handleToggleDone} className="btn" id="toggleDoneBtn" value="toggleDone" title="Mark task as done / not done.">
						{"✔️|➖"}
					</button>

					<button onClick={handleLoad} className="btn" id="loadTaskBtn" value="Load">
						Load
					</button>

					<button onClick={handleDelete} className="btn" id="deleteTaskBtn" value="Delete">
						Delete
					</button>
				</div>
			</div>
		</>
	);
};

export default App;

/*
✅❎☑️
🆗
🟩🟨🟥
⚪🟢🟡🔴
🔘
✔️❌⭕
➖✖️➕
🔳🔲⬛⬜
〰️❔❓❕❗‼️
🛜
▫
▫️◽◻️⬜
▪️◾◼️⬛

📄🧾📃📝📑✍️✏️📒
*/

/*

	const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {};
	const handleLoad = (e: React.MouseEvent<HTMLButtonElement>) => {};
	const handleToggleDone = (e: React.MouseEvent<HTMLButtonElement>) => {};

*/
