import React, { useState } from "react";
import InputForm from "./components/InputForm";
import TodoForm from "./components/TodoForm";
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
        deadline: '2021-10-21'
    },
    {
        id: 3,
        taskName: 'abc3',
        active: false,
        deadline: '2022-10-21'
    },
    {
        id: 4,
        taskName: 'abc4',
        active: true,
        deadline: '2023-08-22'
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
    const currentDate = yy.toString() + '-' + mm.toString() + '-' + dd.toString();
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

    const handleDeleteTodo = (id) => {
        const item = list.find(it => it.id === id);
        if (window.confirm(`Delete task: ${item.taskName} ?`)) {
            const nextList = list.filter(it => it.id !== id);
            setList(nextList);
        }
    }

    const handleResetForm = () => {
        const resetForm = {
            taskName: '',
            active: false,
            deadline: getCurrentDate()
        }
        setForm(resetForm);
    }

    const callEditTodo = (formEdit) => {
        setForm(formEdit);
    }

    const handleAddTodo = (formAdd) => {
        const newTodo = {
            id: Math.random(),
            ...formAdd
        }
        const nextList = [...list];
        nextList.push(newTodo);
        setList(nextList);
        handleResetForm();
    }

    const handleEditTodo = (formEdit) => {
        const nextList = [...list];
        const index = list.findIndex(it => it.id === formEdit.id);
        nextList[index] = formEdit;
        setList(nextList);
        handleResetForm();
    }

    return (
        <div className="container py-3">
            <InputForm
                formData={form}
                onAddTodo={(formAdd) => handleAddTodo(formAdd)}
                onEditTodo={(formEdit) => handleEditTodo(formEdit)}
                onResetForm={() => handleResetForm()} />
            <TodoForm
                todoData={list}
                callEditTodo={(formEdit) => callEditTodo(formEdit)}
                callDelTodo={(idDel) => handleDeleteTodo(idDel)} />
        </div>
    )
}

export default App;