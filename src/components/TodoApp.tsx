import { useState } from 'react';
import TodoList from './TodoList';

export interface TodoI {
    title: string;
    id: number;
}

interface TodoAppProps {
    isDarkMode: boolean;
}

export default function TodoApp({ isDarkMode }: TodoAppProps) {
    const [todo, setTodo] = useState<TodoI>({ title: '', id: 0 });
    const [todos, setTodos] = useState<TodoI[]>([]);
    const [editingTodo, setEditingTodo] = useState<TodoI | null>(null);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTodo({ title: e.target.value, id: todo.id });
    };

    const onEnter = () => {
        if (todo.title.trim() === '') return;
        const id = Math.floor(Math.random() * 1000);  // Increase the range to reduce the chance of duplicate IDs
        setTodos([...todos, { title: todo.title, id }]);
        setTodo({ title: '', id: 0 });
    };

    const deleteTodo = (id: number) => {
        const nonDeletedTodos = todos.filter(todo => todo.id !== id);
        setTodos(nonDeletedTodos);
    };

    const startEditing = (todo: TodoI) => {
        setEditingTodo(todo);
    };

    const saveTodo = (updatedTodo: TodoI) => {
        setTodos(todos.map(todo => (todo.id === updatedTodo.id ? updatedTodo : todo)));
        setEditingTodo(null);
    };

    return (
        <div className={`d-flex align-items-center mt-5 flex-column ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
            <div className="flex-column shadow-sm d-flex justify-content-between" style={{ width: '500px' }}>
                <div className="d-flex justify-content-center mb-3">
                    <label className={`me-2 ${isDarkMode ? 'text-white' : 'text-muted'}`}>Please Enter Your To-do</label>
                    <input 
                        value={todo.title} 
                        onChange={onChange} 
                        placeholder='To-do' 
                        className={`rounded p-2 me-2 ${isDarkMode ? 'text-black' : 'text-black'}`}
                    />
                    {todo.title && (
                        <button onClick={onEnter} className="btn btn-primary">Enter</button>
                    )}
                </div>
                <TodoList todos={todos} deleteTodo={deleteTodo} startEditing={startEditing} saveTodo={saveTodo} editingTodo={editingTodo} isDarkMode={isDarkMode} />
            </div>
        </div>
    );
}
