// src/components/AddTodo.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../features/todos/todosSlice';
import { TextField, Button } from '@mui/material';

const AddTodo: React.FC = () => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (text.trim()) {
      dispatch(addTodo(text));
      setText('');
    }
  };

  return (
    <div className="flex space-x-4 mb-4">
      <TextField
        label="Add new todo"
        variant="outlined"
        value={text}
        onChange={(e) => setText(e.target.value)}
        fullWidth
        inputProps={{ 'aria-label': 'add new todo' }}
      />
      <Button variant="contained" color="primary" onClick={handleAddTodo}>
        Add Todo
      </Button>
    </div>
  );
};

export default AddTodo;
