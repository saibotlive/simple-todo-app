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
    <div className="flex space-x-3 mb-4">
      <TextField
        label="Add new to-do"
        variant="outlined"
        value={text}
        onChange={(e) => setText(e.target.value)}
        fullWidth
        inputProps={{ 'aria-label': 'add new todo' }}
      />
      <Button className="!min-w-40" variant="contained" color="primary" onClick={handleAddTodo}>
        Add To-do
      </Button>
    </div>
  );
};

export default AddTodo;
