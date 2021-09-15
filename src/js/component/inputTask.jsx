import React, { useState } from "react";
import PropTypes from "prop-types";

const InputTask = ({ taskExists, onChange, onKeyDown }) => {
	const [newTask, setNewTask] = useState("");

	function changeValue(event) {
		setNewTask(event.target.value);
		onChange(event);
	}

	return (
		<input
			className={taskExists ? "error" : ""}
			type="text"
			placeholder="What needs to be done?"
			onChange={changeValue}
			onKeyDown={onKeyDown}
			value={newTask}
		/>
	);
};

InputTask.propTypes = {
	onKeyDown: PropTypes.func,
	onChange: PropTypes.func,
	error: PropTypes.bool,
	pressEnter: PropTypes.func,
	taskExists: PropTypes.bool
};

export default InputTask;
