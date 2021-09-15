import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const TaskLi = ({ list, index, deleteTask }) => {
	return (
		<li className="list">
			<span>{list}</span>
			<i
				onClick={() => {
					deleteTask(index);
				}}
				className="fas fa-trash-alt delete"></i>
		</li>
	);
};

TaskLi.propTypes = {
	list: PropTypes.string,
	index: PropTypes.number,
	deleteTask: PropTypes.func
};

export default TaskLi;
