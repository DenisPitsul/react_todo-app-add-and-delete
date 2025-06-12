import { Todo } from '../types/todo/Todo';
import { StatusFilter } from '../enums/statusFilter';

export function getFilteredTodos(todos: Todo[], statusFilter: StatusFilter) {
  switch (statusFilter) {
    case StatusFilter.Active:
      return [...todos].filter(todo => !todo.completed);
    case StatusFilter.Completed:
      return [...todos].filter(todo => todo.completed);
    case StatusFilter.All:
    default:
      return [...todos];
  }
}
