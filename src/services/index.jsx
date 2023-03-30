import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteTodoFn, getAllTodosFn, postTodoFn, updateTodoFn } from "../api";

export const useGetTodos = () => {
  const {
    data: todos,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: ({ signal }) => getAllTodosFn(signal),
    select: (res) => res.data,
  });

  return { todos, isLoading, isError, error };
};

export const usePostTodo = () => {
  const queryClient = useQueryClient();
  const {
    isLoading: isCreating,
    isSuccess: isSuccessCreating,
    isError: isErrorCreating,
    error: errorCreateing,
    mutate: CreateTodo,
  } = useMutation((data) => postTodoFn(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });

  return {
    isCreating,
    isSuccessCreating,
    isErrorCreating,
    errorCreateing,
    CreateTodo,
  };
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  const {
    isLoading: isUpdating,
    isSuccess: isSuccessUpdating,
    isError: isErrorUpdating,
    error: errorUpdating,
    mutate: UpdateTodo,
  } = useMutation(({ id, data }) => updateTodoFn({ id, data }), {
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });

  return {
    isUpdating,
    isSuccessUpdating,
    isErrorUpdating,
    errorUpdating,
    UpdateTodo,
  };
};

export const useDelteTodo = () => {
  const queryClient = useQueryClient();
  const {
    isLoading: isDeleting,
    isSuccess: isSuccessDeleting,
    isError: isErrorDeleting,
    error: errorDeleting,
    mutate: DeleteTodo,
  } = useMutation((id) => deleteTodoFn(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });

  return {
    isDeleting,
    isSuccessDeleting,
    isErrorDeleting,
    errorDeleting,
    DeleteTodo,
  };
};
