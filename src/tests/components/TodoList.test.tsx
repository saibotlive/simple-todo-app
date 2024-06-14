import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import TodoList from '../../components/TodoList';
import { addTodo, reset } from '../../features/todos/todosSlice';

// Reset the store before each test
beforeEach(() => {
  store.dispatch(reset());
});

test('renders todos from the store', () => {
  store.dispatch(addTodo('Test Todo 1'));
  store.dispatch(addTodo('Test Todo 2'));

  const { getByText } = render(
    <Provider store={store}>
      <TodoList />
    </Provider>
  );

  expect(getByText(/test todo 1/i)).toBeInTheDocument();
  expect(getByText(/test todo 2/i)).toBeInTheDocument();
});
