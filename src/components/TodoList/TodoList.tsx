/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Todo } from '../../types/todo/Todo';
import { TodoItem } from '../TodoItem';

type Props = {
  todos: Todo[];
  tempTodo: Todo | null;
  todoToDeleteId: number | null;
  onTodoDelete: (todoId: number) => void;
  todosToDeleteId: number[];
};

export const TodoList: React.FC<Props> = ({
  todos,
  tempTodo,
  todoToDeleteId,
  onTodoDelete,
  todosToDeleteId,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          todoToDeleteId={todoToDeleteId}
          onTodoDelete={onTodoDelete}
          todosToDeleteId={todosToDeleteId}
        />
      ))}
      {tempTodo && <TodoItem todo={tempTodo} isTempTodo={true} />}
    </section>
  );
};
