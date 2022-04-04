import React from "react";
import PropTypes from "prop-types";

const ListaTareas = ({ taskList, deleteTask }) => {
	return (
		<>
			{taskList.map((item, index) => (
				<div key={index} className="border-bottom w-100 mt-2">
					<ul className="list-group list-group-flush vertical-align">
						<li className="list-group-item d-flex justify-content-between">
							{item.label}
							<button
								type="button"
								className="eliminar btn btn-light mt-2 px-3 py-1"
								onClick={() => deleteTask(index)}>
								<i className="fas fa-times"></i>
							</button>
						</li>
					</ul>
				</div>
			))}
		</>
	);
};

ListaTareas.propTypes = {
	taskList: PropTypes.array,
	deleteTask: PropTypes.func,
};

export default ListaTareas;
