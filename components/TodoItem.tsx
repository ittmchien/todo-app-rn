import { StyleSheet, Pressable, View } from "react-native";
import { useDispatch } from "react-redux";
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
  useSharedValue,
} from "react-native-reanimated";
import { IconSymbol } from "./ui/IconSymbol";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { Todo, updateTodo, deleteTodo } from "@/store/todoSlice";

const priorityText = {
  high: "Ưu tiên cao",
  medium: "Ưu tiên trung bình",
  low: "Ưu tiên thấp",
};

const priorityColors = {
  high: "#4CAF50",
  medium: "#FF9800",
  low: "#2196F3",
};

export default function TodoItem({
  todo,
  onEdit,
}: {
  todo: Todo;
  onEdit?: () => void;
}) {
  const dispatch = useDispatch();
  const scale = useSharedValue(1);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    scale.value = withSpring(0.95, {}, () => {
      scale.value = withSpring(1);
    });
    dispatch(
      updateTodo({
        id: todo.id,
        changes: { completed: !todo.completed },
      })
    );
  };

  const getDaysLeft = () => {
    // Tính số ng��y còn lại
    const today = new Date();
    const dueDate = new Date(todo.dueDate);
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `Còn ${diffDays} ngày`;
  };

  return (
    <Animated.View style={[styles.container, animatedStyles]}>
      <Pressable onPress={handlePress} style={styles.content}>
        <View style={styles.checkbox} />
        <View style={styles.textContainer}>
          <ThemedText style={styles.title}>{todo.title}</ThemedText>
          <ThemedText
            style={[styles.priority, { color: priorityColors[todo.priority] }]}
          >
            {priorityText[todo.priority]}
          </ThemedText>
        </View>
        <View style={styles.rightContainer}>
          <ThemedText style={styles.daysLeft}>{getDaysLeft()}</ThemedText>
          <Pressable onPress={onEdit}>
            <IconSymbol name="pencil" size={20} color="#666" />
          </Pressable>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#DDD",
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  priority: {
    fontSize: 14,
  },
  rightContainer: {
    alignItems: "flex-end",
  },
  daysLeft: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
});
