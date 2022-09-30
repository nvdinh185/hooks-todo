import { useEffect, useState } from 'react';

const InputForm = (props) => {
    const [form, setForm] = useState(props.formData);
    const [feedbacks, setFeedbacks] = useState({});

    const handleTaskNameChanged = (e) => {
        const { target } = e;
        const taskName = target.value;
        const errors = {};
        if (!taskName) {
            errors.taskName = "Please input Task Name.";
        } else if (taskName.length < 3 || taskName.length > 12) {
            errors.taskName = "Please input Task Name 3 ~ 12 characters.";
        }
        setFeedbacks(errors);
        setForm({
            ...form,
            taskName
        });
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const { taskName, deadline } = form;
        const errors = {};
        if (!taskName) {
            errors.taskName = "Please input Task Name."
        } else if (taskName.length < 3 || taskName.length > 12) {
            errors.taskName = "Please input Task Name 3 ~ 12 characters."
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
        if (form.id) {
            // Update
            props.onEditTodo(form);
        } else {
            // Add
            props.onAddTodo(form);
        }
    }

    const callResetForm = () => {
        props.onResetForm();
    }

    useEffect(() => {
        setForm(props.formData);
    }, [props.formData])

    return (
        <div className="card mx-auto" style={{ width: 400 }}>
            <div className="card-body">
                <form onSubmit={handleFormSubmit} onReset={callResetForm}>
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
                                setForm({ ...form, deadline: target.value });
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
        </div>
    )
}

export default InputForm