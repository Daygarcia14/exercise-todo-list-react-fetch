import React, { useState, useEffect } from "react";
import ListaTareas from "./tasklist.jsx";
//create your first component

const initialState = { label: "", done: false };

const Home = () => {
	const [task, setTask] = useState(initialState);
	const [taskList, setTaskList] = useState([]);
	const [error, setError] = useState(false);

	const handleChangeTask = (event) => {
		setTask({ ...task, [event.target.name]: event.target.value });
	};

	//POST
	async function AddTask() {
		try {
			let response = await fetch(
				"https://assets.breatheco.de/apis/fake/todos/user/DayannaGarcia",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify([]),
				}
			);
			if (response.ok) {
				getTask();
			} else {
				alert(`Ha fallado: ${response.status}`);
			}
		} catch (error) {
			console.log(error);
		}
	}

	//GET
	async function getTask() {
		try {
			let response = await fetch(
				"https://assets.breatheco.de/apis/fake/todos/user/DayannaGarcia"
			);
			let results = await response.json();
			if (response.ok) {
				setTaskList(results);
			} else {
				AddTask();
			}
		} catch (error) {
			console.log(error);
		}
	}

	//PUT
	//agregar tarea
	async function updateTask() {
		try {
			if (task.label.trim() != "") {
				let response = await fetch(
					"https://assets.breatheco.de/apis/fake/todos/user/DayannaGarcia",
					{
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify([...taskList, task]),
					}
				);
				if (response.ok) {
					getTask();
					setError(false);
					setTask(initialState);
				} else {
					console.log(response.status);
				}
			} else {
				setError(true);
				return;
			}
		} catch {
			console.log(error);
		}
	}

	//PUT
	//eliminar tarea
	async function deleteTask(id) {
		let newListTask = taskList.filter((item, index) => index != id);
		setTaskList(newListTask);
		try {
			let response = await fetch(
				"https://assets.breatheco.de/apis/fake/todos/user/DayannaGarcia",
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(newListTask),
				}
			);
			if (response.ok) {
				getTask();
			}
		} catch {
			console.log(error);
		}
	}

	useEffect(() => {
		getTask();
	}, []);

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
										name="label"
										placeholder="What needs to be done?"
										value={task.label}
										onChange={handleChangeTask}
									/>
								</div>
								<div className="me-3">
									<button
										className="btn btn-outline-success"
										type="button"
										onClick={updateTask}>
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
							deleteTask={deleteTask}
						/>
						{`${taskList.length} item left`}
					</div>
				</div>
			</div>
		</>
	);
};
export default Home;
