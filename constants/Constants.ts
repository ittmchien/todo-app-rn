import { Priority } from "@/store/todoSlice";

export const PRIORITY: Record<
  Priority,
  { name: string; color: string; short: string }
> = {
  3: {
    name: "Ưu tiên cao",
    color: "#21AB3B",
    short: "Cao",
  },
  2: {
    name: "Ưu tiên trung bình",
    color: "#F2994A",
    short: "Trung bình",
  },
  1: {
    name: "Ưu tiên thấp",
    color: "#2196F3",
    short: "Thấp",
  },
};

export const TODO_STATUS = {
  completed: "Hoàn thành",
  pending: "Chưa hoàn thành",
};
