import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Priority = 3 | 2 | 1;

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  priority: Priority;
  dueDate: string;
  isEdit?: boolean;
  createdAt: number;
  showDatePicker?: boolean;
  showPriorityPicker?: boolean;
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
    addTodo: (state) => {
      state.items.push({
        priority: 2 as Priority,
        completed: false,
        dueDate: new Date().toISOString(),
        title: `Task ${(state?.items?.length || 0) + 1}`,
        id: Date.now().toString(),
        createdAt: Date.now(),
        showDatePicker: false,
        isEdit: false,
        showPriorityPicker: false,
      });
      state.items.sort((a, b) => b.priority - a.priority);
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
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((todo) => todo.id !== action.payload);
    },
    toggleEdit: (state, action: PayloadAction<string>) => {
      const todo = state.items.find((item) => item.id === action.payload);
      if (todo) {
        todo.isEdit = !todo.isEdit;
      }
      state.items.sort((a, b) => b.priority - a.priority);
    },
    toggleDatePicker: (state, action: PayloadAction<string>) => {
      const todo = state.items.find((item) => item.id === action.payload);
      if (todo) {
        todo.showDatePicker = !todo.showDatePicker;
      }
    },
    togglePriorityPicker: (state, action: PayloadAction<string>) => {
      const todo = state.items.find((item) => item.id === action.payload);
      if (todo) {
        todo.showPriorityPicker = !todo.showPriorityPicker;
      }
    },
  },
});

export const {
  addTodo,
  updateTodo,
  deleteTodo,
  toggleEdit,
  toggleDatePicker,
  togglePriorityPicker,
} = todoSlice.actions;
export default todoSlice.reducer;
