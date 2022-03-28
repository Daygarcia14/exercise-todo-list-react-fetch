import React, { useState } from "react";
import ListaTareas from "./tasklist.jsx";
//create your first component

const Home = () => {
	const [task, setTask] = useState("");
	const [taskList, setTaskList] = useState([]);
	const [error, setError] = useState(false);
	const [contador, setcontador] = useState("");

	const handleChangeTask = (event) => {
		setTask(event.target.value);
	};

	const handleAddTask = () => {
		if (task.trim() != "") {
			setTaskList([...taskList, task]);
			setTask("");
			setError(false);
			setcontador(taskList.length + 1);
		} else {
			setError(true);
		}
	};

	const handleDelete = (id) => {
		let newListTask = taskList.filter((item, index) => index != id);

		setcontador(newListTask.length);
		setTaskList(newListTask);
	};
	return (
		<>
			<div className="container mt-4 letter ">
				<div className="row justify-content-center fw-light">
					<h1 className=" title text-center ">todos</h1>
					<div className="col-12 col-md-6 shadow p-3 mb-5 bg-body rounded">
						<form>
							<div className="form-group d-flex">
								<div className="w-100 me-2">
									<input
										type="text"
										className="form-control border-0"
										name="nametask"
										placeholder="What needs to be done?"
										value={task}
										onChange={handleChangeTask}
									/>
								</div>
								<div className="me-3">
									<button
										className="btn btn-outline-success"
										type="button"
										onClick={handleAddTask}>
										<i className="fas fa-check"></i>
									</button>
								</div>
							</div>
						</form>
						{error && (
							<div className="alert alert-secondary my-2 p-1 w-50">
								"No hay tarea, agregue una tarea"
							</div>
						)}
						<ListaTareas
							taskList={taskList}
							handleDelete={handleDelete}
							contador={contador}
						/>
						{contador != 0 && (
							<div className="mt-2 contador">
								{contador} items left
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;
