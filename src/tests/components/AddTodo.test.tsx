// src/tests/components/AddTodo.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import AddTodo from '../../components/AddTodo';
import { reset } from '../../features/todos/todosSlice';

// Reset the store before each test
beforeEach(() => {
  store.dispatch(reset());
});

test('dispatches addTodo action and updates state on form submission', () => {
  const { getByLabelText, getByRole } = render(
    <Provider store={store}>
      <AddTodo />
    </Provider>
  );

  const input = getByLabelText(/add new todo/i);
  const button = getByRole('button', { name: /add todo/i });

  fireEvent.change(input, { target: { value: 'New Todo' } });
  fireEvent.click(button);

  // Check that the Redux state is updated with the new todo
  const state = store.getState();
  expect(state.todos.todos.some((todo) => todo.text === 'New Todo')).toBe(true);

  // Check that the input is cleared after adding the todo
  expect(input).toHaveValue('');
});
