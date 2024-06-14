// src/tests/components/TodoItem.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import TodoItem from '../../components/TodoItem';
import { addTodo, reset } from '../../features/todos/todosSlice';

// Reset the store before each test
beforeEach(() => {
  store.dispatch(reset());
});

test('toggles a todo', () => {
  // Dispatch an initial addTodo action to have a todo to test with
  store.dispatch(addTodo('Test Todo'));

  const todo = store.getState().todos.todos[0];

  const { getByRole } = render(
    <Provider store={store}>
      <TodoItem todo={todo} />
    </Provider>
  );

  const checkbox = getByRole('checkbox');
  fireEvent.click(checkbox);

  expect(store.getState().todos.todos[0].completed).toBe(true);
});

test('edits a todo', () => {
  store.dispatch(addTodo('Test Todo'));

  const todo = store.getState().todos.todos[0];

  const { getByText, getByDisplayValue } = render(
    <Provider store={store}>
      <TodoItem todo={todo} />
    </Provider>
  );

  const editButton = getByText(/edit/i);
  fireEvent.click(editButton);

  const input = getByDisplayValue('Test Todo');
  fireEvent.change(input, { target: { value: 'Updated Todo' } });

  const saveButton = getByText(/save/i);
  fireEvent.click(saveButton);

  expect(store.getState().todos.todos[0].text).toBe('Updated Todo');
});

test('deletes a todo', () => {
  store.dispatch(addTodo('Test Todo'));

  const todo = store.getState().todos.todos[0];

  const { getByText } = render(
    <Provider store={store}>
      <TodoItem todo={todo} />
    </Provider>
  );

  const deleteButton = getByText(/delete/i);
  fireEvent.click(deleteButton);

  expect(store.getState().todos.todos.length).toBe(0);
});
