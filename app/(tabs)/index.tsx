import { StyleSheet } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useSelector } from "react-redux";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";

import { ThemedView } from "@/components/ThemedView";
import { RootState } from "@/store/store";
import TodoItem from "@/components/TodoItem";
import AddTodoButton from "@/components/AddTodoButton";
import { Todo } from "@/store/todoSlice";

export default function HomeScreen() {
  const todos = useSelector((state: RootState) => state.todos.items);

  const renderItem = ({ item }: { item: Todo }) => (
    <Animated.View entering={FadeInRight} exiting={FadeOutLeft}>
      <TodoItem todo={item} />
    </Animated.View>
  );

  return (
    <ThemedView style={styles.container}>
      <FlashList
        data={todos}
        renderItem={renderItem}
        estimatedItemSize={70}
        contentContainerStyle={styles.list}
      />
      <AddTodoButton />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFD700",
  },
  list: {
    paddingTop: 100,
  },
});
