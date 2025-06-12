/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { TodoList } from './components/TodoList';
import { ErrorComponent } from './components/ErrorComponent';
import { Footer } from './components/Footer';
import { useTodosFilter } from './hooks/useTodosFilter';
import { Header } from './components/Header';
import { useTodoList } from './hooks/useTodoList';

export const App: React.FC = () => {
  const {
    todos,
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
  } = useTodoList();
  const {
    statusFilter,
    setStatusFilter,
    filteredTodos,
    activeItemsCount,
    isThereAtLeastOneCompletedTodo,
  } = useTodosFilter(todos);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          setErrorMessage={setErrorMessage}
          onAddTodo={onAddTodo}
          isAddTodoFormFocused={isAddTodoFormFocused}
          setIsAddTodoFormFocused={setIsAddTodoFormFocused}
        />

        <TodoList
          todos={filteredTodos}
          tempTodo={tempTodo}
          todoToDeleteId={todoToDeleteId}
          onTodoDelete={onTodoDelete}
          todosToDeleteId={todosToDeleteId}
        />

        {todos.length > 0 && (
          <Footer
            activeTodosCount={activeItemsCount}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            isThereAtLeastOneCompletedTodo={isThereAtLeastOneCompletedTodo}
            onClearCompletedTodos={onClearCompletedTodos}
          />
        )}
      </div>

      <ErrorComponent
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};
