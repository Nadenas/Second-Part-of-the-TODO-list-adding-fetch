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
				//console.log(response);
				return response.json();
			})
			.then(responseJson => {
				setLists(responseJson);
				//console.log(responseJson);
			});

		//console.log(fetchReturn);
	}, []);

	function changeValue(event) {
		setNewTask(event.target.value);
	}

	function pressEnter(event) {
		if (event.keyCode === 13) {
			let repeated = lists.findIndex(list => list.title === newTask);
			if (repeated === -1) {
				setLists([...lists, { title: newTask }]);
				setNewTask("");
			}
		}
	}

	function deleteTask(indexToRemove) {
		setLists(lists.filter((list, index) => index !== indexToRemove));
	}

	async function deleteTodos() {
		let response = await fetch(
			"https://jsonplaceholder.typicode.com/todos",
			{
				headers: {
					"Content-Type": "application/json"
				},
				method: "DELETE"
			}
		);
		let responseJson = response.json();
		//console.log(responseJson + "¿¿¿¿");
		setLists([]);
	}

	return (
		<div className="container-fluid bg-light m-5">
			<h1 className="text-center">TODOS</h1>
			<InputTask
				className="m-5"
				onKeyDown={pressEnter}
				error={taskExists}
				onChange={changeValue}
			/>
			<i className="fas fa-trash-alt delete ml-5" onClick={deleteTodos}>
				Delete all
			</i>
			<ul className="lists m-5">
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
