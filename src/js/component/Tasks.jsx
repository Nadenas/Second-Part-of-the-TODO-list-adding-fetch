import React, { useEffect, useState } from "react";
import InputTask from "./inputTask.jsx";
import TaskLi from "./TaskLi.jsx";

const Tasks = () => {
	const [lists, setLists] = useState([]);
	const [newTask, setNewTask] = useState("");
	const [taskExists, setTaskExists] = useState(false);

	useEffect(() => {
		let fetchReturn = fetch("https://jsonplaceholder.typicode.com/todos");

		fetch("https://jsonplaceholder.typicode.com/todos")
			.then(response => {
				console.log(response);
				return response.json();
			})
			.then(responseJson => {
				setLists(responseJson);
				console.log(responseJson);
			});

		console.log(fetchReturn);
	}, []);

	function changeValue(event) {
		setNewTask(event.target.value);
	}

	function pressEnter(event) {
		if (event.keyCode === 13) {
			let repeated = lists.findIndex(list => list === newTask);
			if (repeated === -1) {
				setLists([...lists, newTask]);
				setNewTask("");
			}
		}
	}

	function deleteTask(indexToRemove) {
		setLists(lists.filter((list, index) => index !== indexToRemove));
	}

	return (
		<div className="container-fluid bg-light">
			<h1 className="text-center">TODOS</h1>
			<InputTask
				onKeyDown={pressEnter}
				error={taskExists}
				onChange={changeValue}
			/>
			<ul className="lists">
				{lists.map((list, index) => (
					<TaskLi
						key={index}
						list={list.title}
						index={index}
						deleteTask={deleteTask}
					/>
				))}
			</ul>
		</div>
	);
};

export default Tasks;
