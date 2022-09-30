import { useEffect, useState } from 'react';

const TodoForm = (props) => {
    const [list, setList] = useState(props.todoData);

    useEffect(() => {
        setList(props.todoData);
    }, [props.todoData])

    return (
        <div className="card mt-3 mx-auto" style={{ width: 400 }}>
            <div className="card-body">
                <div className="h2">Todo list</div>
                <div className="list-group">
                    {list.map(it =>
                        <div key={it.id} className="list-group-item">
                            <div className="row">
                                <div className="col-3" style={{ color: it.active ? 'red' : 'gray' }}>{it.taskName}</div>
                                <div className="col-4" >{it.deadline}</div>
                                <div className="col-2">
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => props.callEditTodo(it)}
                                    >
                                        Edit
                                    </button>
                                </div>
                                <div className="col-2">
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => props.callDelTodo(it.id)}
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
    )
}

export default TodoForm