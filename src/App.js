import React, { useEffect, useState } from "react";
const TODO_DATA = [
    {
        id: 1,
        taskName: 'abc1',
        active: true,
        deadline: '2022-09-21'
    },
    {
        id: 2,
        taskName: 'abc2',
        active: false,
        deadline: '2021-09-21'
    },
    {
        id: 3,
        taskName: 'abc3',
        active: false,
        deadline: '2022-09-21'
    },
    {
        id: 4,
        taskName: 'abc4',
        active: true,
        deadline: '2022-08-22'
    }
]

const getCurrentDate = function () {
    const date = new Date();
    let mm = date.getMonth() + 1; // getMonth() is zero-based
    if (mm.toString().length < 2) {
        mm = '0' + mm;
    }
    let dd = date.getDate();
    if (dd.toString().length < 2) {
        dd = '0' + dd;
    }
    const yy = date.getFullYear();
    let currentDate = yy.toString() + '-' + mm.toString() + '-' + dd.toString();
    return currentDate;
}

const INITIAL_STATE = {
    taskName: '',
    active: false,
    deadline: getCurrentDate()
}

const App = () => {
    const [list, setList] = useState(TODO_DATA);
    const [form, setForm] = useState(INITIAL_STATE);
    const [feedbacks, setFeedbacks] = useState({});

    const handleDeleteTodo = (id) => {
        const item = list.find(it => it.id === id);
        if (window.confirm(`Delete task: ${item.taskName} ?`)) {
            const nextList = list.filter(it => it.id !== id);
            setList(nextList);
        }
    }

    const handleTaskNameChanged = (e) => {
        const { target } = e;
        const taskName = target.value;
        const errors = {};
        if (!taskName) {
            errors.taskName = "Please input Task Name.";
        } else if (taskName.length < 3 || taskName.length > 12) {
            errors.taskName = "Please input Task Name 3 ~ 12 characters.";
        } else if (
            // list.findIndex(it => it.id !== form.id && it.taskName === taskName) !== -1
            list.findIndex(it => it.taskName === taskName) !== -1
        ) {
            errors.taskName = "Task Name is duplicated";
        }
        setFeedbacks(errors);
        setForm({
            ...form,
            taskName
        });
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const { taskName, deadline, active } = form;
        const errors = {};
        if (!taskName) {
            errors.taskName = "Please input Task Name."
        } else if (taskName.length < 3 || taskName.length > 12) {
            errors.taskName = "Please input Task Name 3 ~ 12 characters."
        } else if (
            list.findIndex(it => it.id !== form.id && it.taskName === taskName) !== -1
        ) {
            errors.taskName = "Task Name is duplicated"
        }
        // console.log(deadline);
        if (!deadline) {
            errors.deadline = "Please input deadline.";
        }
        setFeedbacks(errors);
        // Nếu có ngoại lệ thì thoát luôn
        if (Object.keys(errors).length) {
            return;
        }
        const nextList = [...list];
        if (form.id) {
            // Update
            const index = list.findIndex(it => it.id === form.id);
            nextList[index] = form;
        } else {
            // Add
            nextList.push({
                id: Math.random(),
                taskName,
                deadline,
                active
            })
        }
        setList(nextList);
        handleResetForm();
    }

    const handleResetForm = () => {
        setForm(INITIAL_STATE);
        setFeedbacks({});
    }

    useEffect(() => {
        handleResetForm();
    }, [list])

    return (
        <div className="container py-3">
            <div className="card mx-auto" style={{ width: 400 }}>
                <div className="card-body">
                    <form onSubmit={handleFormSubmit} onReset={handleResetForm}>
                        <div className="h2">Todo Form</div>
                        <div className="form-group">
                            <label htmlFor="taskName">Task Name</label>
                            <input
                                id="taskName"
                                name="taskName"
                                className={`form-control ${feedbacks.taskName ? 'is-invalid' : ''}`}
                                type="text"
                                value={form.taskName}
                                onChange={handleTaskNameChanged}
                            />
                            {feedbacks.taskName && <div className="invalid-feedback">
                                {feedbacks.taskName}
                            </div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="deadline">Deadline</label>
                            <input
                                id="deadline"
                                name="deadline"
                                className={`form-control ${feedbacks.deadline ? 'is-invalid' : ''}`}
                                type="date"
                                value={form.deadline}
                                onChange={({ target }) => {
                                    setForm({ ...form, deadline: target.value })
                                }}
                            />
                            {feedbacks.deadline && <div className="invalid-feedback">
                                {feedbacks.deadline}
                            </div>}
                        </div>
                        <div className="custom-control custom-checkbox">
                            <input
                                name="active" type="checkbox"
                                className="custom-control-input" id="customCheck1"
                                checked={form.active}
                                onChange={({ target }) => setForm({
                                    ...form,
                                    active: target.checked
                                })}
                            />
                            <label className="custom-control-label" htmlFor="customCheck1">Check this custom checkbox</label>
                        </div>
                        <div className="d-flex" style={{ gap: 10 }}>
                            <button className="btn btn-primary" type="submit">
                                {form.id ? 'Update' : 'Add'}
                            </button>
                            {form.id && <button className="btn" type="reset">
                                Cancel
                            </button>}
                        </div>
                    </form>
                </div>
            </div >
            <div className="card mt-3 mx-auto" style={{ width: 400 }}>
                <div className="card-body">
                    <div className="h2">Todo list</div>
                    <div className="list-group">
                        {list.map(it =>
                            <div key={it.id} className="list-group-item"
                                onClick={() => setForm(it)}>
                                <div className="row">
                                    <div className="col" style={{ color: it.active ? 'red' : 'gray' }}>{it.taskName}</div>
                                    <div className="col" >{it.deadline}</div>
                                    <div className="col-3">
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleDeleteTodo(it.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App;