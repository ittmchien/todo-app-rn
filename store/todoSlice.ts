import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Priority = "high" | "medium" | "low";

export interface Todo {
  id: string;
  title: string;
  priority: Priority;
  completed: boolean;
  createdAt: number;
  dueDate: string;
}

interface TodoState {
  items: Todo[];
}

const initialState: TodoState = {
  items: [],
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Omit<Todo, "id" | "createdAt">>) => {
      state.items.push({
        ...action.payload,
        id: Date.now().toString(),
        createdAt: Date.now(),
      });
      state.items.sort(
        (a, b) => getPriorityWeight(b.priority) - getPriorityWeight(a.priority)
      );
    },
    updateTodo: (
      state,
      action: PayloadAction<{ id: string; changes: Partial<Todo> }>
    ) => {
      const { id, changes } = action.payload;
      const todo = state.items.find((item) => item.id === id);
      if (todo) {
        Object.assign(todo, changes);
      }
      state.items.sort(
        (a, b) => getPriorityWeight(b.priority) - getPriorityWeight(a.priority)
      );
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((todo) => todo.id !== action.payload);
    },
  },
});

const getPriorityWeight = (priority: Priority): number => {
  switch (priority) {
    case "high":
      return 3;
    case "medium":
      return 2;
    case "low":
      return 1;
  }
};

export const { addTodo, updateTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
