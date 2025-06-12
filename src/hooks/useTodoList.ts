import { useEffect, useState } from 'react';
import { Todo } from '../types/todo/Todo';
import * as todoService from '../api/todos';
import { ErrorMessage } from '../enums/errorMessage';

export const useTodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>(
    ErrorMessage.None,
  );
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  const [isAddTodoFormFocused, setIsAddTodoFormFocused] = useState(false);
  const [todoToDeleteId, setTodoToDeleteId] = useState<number | null>(null);
  const [todosToDeleteId, setTodosToDeleteId] = useState<number[]>([]);

  useEffect(() => {
    setIsLoading(true);
    todoService
      .getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage(ErrorMessage.OnLoad);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const onAddTodo = (todoTitle: string) => {
    const newTodo: Omit<Todo, 'id'> = {
      userId: todoService.USER_ID,
      title: todoTitle,
      completed: false,
    };

    const createTodoPromise: Promise<void> = todoService
      .createTodo(newTodo)
      .then(todoFromServer => {
        setTodos(currentTodos => [...currentTodos, todoFromServer]);
      })
      .catch(error => {
        setErrorMessage(ErrorMessage.OnAdd);
        throw error;
      })
      .finally(() => {
        setTempTodo(null);
        setIsAddTodoFormFocused(true);
      });

    setTempTodo({
      ...newTodo,
      id: 0,
    });

    return createTodoPromise;
  };

  const onTodoDelete = (todoId: number) => {
    setTodoToDeleteId(todoId);

    todoService
      .deleteTodo(todoId)
      .then(() => {
        setTodos(currentTodos =>
          currentTodos.filter(todo => todo.id !== todoId),
        );
      })
      .catch(() => {
        setErrorMessage(ErrorMessage.OnDelete);
      })
      .finally(() => {
        setTodoToDeleteId(null);
        setIsAddTodoFormFocused(true);
      });
  };

  const onClearCompletedTodos = () => {
    const allCompletedTodoIds = todos
      .filter(todo => todo.completed)
      .map(todo => todo.id);

    setTodosToDeleteId(() => [...allCompletedTodoIds]);

    Promise.allSettled(
      allCompletedTodoIds.map(id => todoService.deleteTodo(id).then(() => id)),
    )
      .then(results => {
        const successfulDeletedIds = results
          .filter(result => result.status === 'fulfilled')
          .map(result => result.value);

        const isSomeToDeleteIdRejected = results.some(
          result => result.status === 'rejected',
        );

        if (isSomeToDeleteIdRejected) {
          setErrorMessage(ErrorMessage.OnDelete);
        }

        setTodos(currentTodos =>
          currentTodos.filter(todo => !successfulDeletedIds.includes(todo.id)),
        );
      })
      .finally(() => {
        setTodosToDeleteId([]);
        setIsAddTodoFormFocused(true);
      });
  };

  return {
    todos,
    setTodos,
    isLoading,
    setIsLoading,
    errorMessage,
    setErrorMessage,
    tempTodo,
    onAddTodo,
    isAddTodoFormFocused,
    setIsAddTodoFormFocused,
    todoToDeleteId,
    onTodoDelete,
    onClearCompletedTodos,
    todosToDeleteId,
  };
};
