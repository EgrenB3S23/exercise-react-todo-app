import React, { useState } from "react";

interface Task {
	id: number;
	title: string;
	description: string;
}

interface FormProps {
	addTask: (task: Task) => void;
}

const Form: React.FC<FormProps> = ({ addTask }) => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (title.trim() === "") {
			alert("Please enter a title for the task.");
			return;
		}

		const newTask: Task = {
			id: Date.now(), // Generate a unique ID based on the current time
			title,
			description,
		};

		addTask(newTask);
		setTitle(""); // Reset form fields
		setDescription("");
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label htmlFor="title">Title:</label>
				<input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
			</div>
			<div>
				<label htmlFor="description">Description:</label>
				<textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
			</div>
			<button type="submit">Add Task</button>
		</form>
	);
};

export default Form;
