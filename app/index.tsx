import { StyleSheet, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useSelector, useDispatch } from "react-redux";

import { ThemedView } from "@/components/ThemedView";
import { RootState } from "@/store/store";
import TodoItem from "@/components/TodoItem";
import AddTodoButton from "@/components/AddTodoButton";
import { addTodo, Todo } from "@/store/todoSlice";
import { ThemedText } from "@/components/ThemedText";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos.items);

  const handleAdd = () => {
    dispatch(addTodo());
  };

  const renderItem = ({ item }: { item: Todo }) => <TodoItem todo={item} />;

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="default" style={styles.header}>
        To-do list
      </ThemedText>

      <FlashList
        data={todos}
        renderItem={renderItem}
        estimatedItemSize={138}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      />
      <AddTodoButton onAdd={handleAdd} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7CC15",
  },
  header: {
    fontWeight: "medium",
    textAlign: "center",
    marginBottom: 24,
    marginTop: 45,
  },
});
