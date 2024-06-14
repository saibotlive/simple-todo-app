import React from 'react';
import AddTodo from '../components/AddTodo';
import TodoList from '../components/TodoList';

const Home: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Todo List</h1>
      <AddTodo />
      <TodoList />
    </div>
  );
};

export default Home;
