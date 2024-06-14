import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleTodo, deleteTodo, editTodo, Todo } from '../features/todos/todosSlice';
import { TextField, Checkbox, Button } from '@mui/material';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(todo.text);

  const handleEdit = () => {
    if (isEditing && text.trim()) {
      dispatch(
        editTodo({
          id: todo.id,
          text: text.trim(),
        })
      );
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="flex items-center space-x-4 mb-4 p-2 border rounded">
      <Checkbox checked={todo.completed} onChange={() => dispatch(toggleTodo(todo.id))} />
      {isEditing ? (
        <TextField value={text} onChange={(e) => setText(e.target.value)} variant="outlined" size="small" />
      ) : (
        <span className={`flex-1 ${todo.completed ? 'line-through' : ''}`}>{todo.text}</span>
      )}
      <Button variant="contained" color="secondary" onClick={() => dispatch(deleteTodo(todo.id))}>
        Delete
      </Button>
      <Button variant="contained" color="primary" onClick={handleEdit}>
        {isEditing ? 'Save' : 'Edit'}
      </Button>
    </div>
  );
};

export default TodoItem;
