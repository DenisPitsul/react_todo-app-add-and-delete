import { useMemo, useState } from 'react';
import { Todo } from '../types/todo/Todo';
import { StatusFilter } from '../enums/statusFilter';
import { getFilteredTodos } from '../utils/getFilteredTodos';

export const useTodosFilter = (todos: Todo[]) => {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>(
    StatusFilter.All,
  );

  const filteredTodos = useMemo(() => {
    return getFilteredTodos(todos, statusFilter);
  }, [todos, statusFilter]);

  const activeItemsCount = useMemo(() => {
    return todos.filter(todo => !todo.completed).length;
  }, [todos]);

  const isThereAtLeastOneCompletedTodo = useMemo(() => {
    return todos.some(todo => todo.completed);
  }, [todos]);

  return {
    statusFilter,
    setStatusFilter,
    filteredTodos,
    activeItemsCount,
    isThereAtLeastOneCompletedTodo,
  };
};
