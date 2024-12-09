import { StyleSheet, Pressable, View, Image, TextInput } from "react-native";
import { useDispatch } from "react-redux";
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
  FadeInRight,
  FadeOutLeft,
  LinearTransition,
} from "react-native-reanimated";
import { ThemedText } from "./ThemedText";
import {
  Todo,
  updateTodo,
  toggleEdit,
  deleteTodo,
  toggleDatePicker,
  Priority,
} from "@/store/todoSlice";
import { PRIORITY } from "@/constants/Constants";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";

const EditMode = ({
  todo,
  onUpdate,
  onDelete,
}: {
  todo: Todo;
  onUpdate: (changes: Partial<Todo>) => void;
  onDelete: () => void;
}) => {
  const dispatch = useDispatch();

  return (
    <View style={styles.editContent}>
      <View style={styles.actionButton}>
        <Pressable onPress={onDelete} style={styles.deleteButton}>
          <Image
            source={require("../assets/icons/delete.png")}
            style={styles.deleteIcon}
          />
          <ThemedText style={styles.deleteText}>Xoá</ThemedText>
        </Pressable>
      </View>

      <View style={styles.editItem}>
        <TextInput
          value={todo.title}
          onChangeText={(text) => onUpdate({ title: text })}
          style={styles.editLabel}
        />
      </View>

      <Pressable
        style={styles.editItem}
        onPress={() => dispatch(toggleDatePicker(todo.id))}
      >
        <ThemedText style={styles.editLabel}>Thời hạn</ThemedText>
        <ThemedText style={styles.editValue}>
          {moment(todo.dueDate).format("DD/MM/YYYY")}
        </ThemedText>
      </Pressable>

      {todo.showDatePicker && (
        <DateTimePicker
          value={new Date(todo.dueDate)}
          mode="date"
          onChange={(event, date) => {
            if (date) {
              onUpdate({ dueDate: date.toISOString() });
            }
            dispatch(toggleDatePicker(todo.id));
          }}
        />
      )}

      <Pressable
        style={styles.editItem}
        onPress={() => {
          const nextPriority = ((todo.priority % 3) + 1) as Priority;
          onUpdate({ priority: nextPriority });
        }}
      >
        <ThemedText style={styles.editLabel}>Mức độ ưu tiên</ThemedText>
        <ThemedText
          style={[styles.editValue, { color: PRIORITY[todo.priority].color }]}
        >
          {PRIORITY[todo.priority].name}
        </ThemedText>
      </Pressable>

      <View style={styles.doneButtonContainer}>
        <Pressable
          style={styles.doneButton}
          onPress={() => dispatch(toggleEdit(todo.id))}
        >
          <ThemedText style={styles.doneText}>Xong</ThemedText>
        </Pressable>
      </View>
    </View>
  );
};

export default function TodoItem({ todo }: { todo: Todo }) {
  const dispatch = useDispatch();
  const scale = useSharedValue(1);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handleComplete = () => {
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

  const handleUpdate = (changes: Partial<Todo>) => {
    dispatch(updateTodo({ id: todo.id, changes }));
  };

  return (
    <Animated.View style={animatedStyles}>
      <Animated.View
        entering={FadeInRight}
        exiting={FadeOutLeft}
        layout={LinearTransition}
        style={styles.container}
      >
        {todo.isEdit ? (
          <EditMode
            todo={todo}
            onUpdate={handleUpdate}
            onDelete={() => dispatch(deleteTodo(todo.id))}
          />
        ) : (
          <View style={styles.content}>
            <Pressable onPress={handleComplete} style={styles.leftContent}>
              <View
                style={[
                  styles.checkbox,
                  todo.completed && styles.checkboxChecked,
                ]}
              >
                {todo.completed && <View style={styles.checkmark} />}
              </View>
              <View style={styles.textContent}>
                <ThemedText style={styles.titleText}>{todo.title}</ThemedText>
                <ThemedText
                  style={[
                    styles.priority,
                    { color: PRIORITY[todo.priority].color },
                  ]}
                >
                  {PRIORITY[todo.priority].name}
                </ThemedText>
              </View>
            </Pressable>
            <Pressable
              onPress={() => dispatch(toggleEdit(todo.id))}
              style={styles.rightContent}
            >
              <Image
                source={require("../assets/icons/pen.png")}
                style={styles.editIcon}
              />
              <ThemedText style={styles.daysLeft}>
                {moment(todo.dueDate).diff(moment(), "days")} ngày
              </ThemedText>
            </Pressable>
          </View>
        )}
      </Animated.View>
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
    paddingLeft: 18,
    paddingRight: 27,
    paddingTop: 32,
    paddingBottom: 24,
    justifyContent: "space-between",
  },
  leftContent: {
    flexDirection: "row",
    flex: 1,
  },
  rightContent: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginTop: 4,
  },
  textContent: {
    marginLeft: 12,
    flex: 1,
  },
  titleText: {
    fontFamily: "SVN-Poppins-Medium",
    fontSize: 16,
    marginBottom: 10,
    color: "#000",
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#C4C4C4",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#C4C4C4",
  },
  checkboxChecked: {
    backgroundColor: "#2196F3",
    borderColor: "#2196F3",
  },
  checkmark: {
    width: 12,
    height: 6,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: "#FFFFFF",
    transform: [{ rotate: "-45deg" }],
    marginTop: -2,
  },
  priority: {
    fontSize: 12,
  },
  daysLeft: {
    fontSize: 12,
    color: "#666666",
    marginTop: 4,
  },
  penIcon: {
    width: 16,
    height: 16,
    marginBottom: 10,
  },
  editContent: {
    padding: 24,
  },
  editItem: {
    flexDirection: "row",
    marginBottom: 24,
    paddingBottom: 8,

    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    justifyContent: "space-between",
  },
  editLabel: {
    fontFamily: "SVN-Poppins-SemiBold",
    fontSize: 16,
    lineHeight: 20,
    color: "#000",
  },
  editValue: {
    fontFamily: "SVN-Poppins",
    fontSize: 14,
    lineHeight: 22,
    color: "#000",
  },

  doneButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 32,
  },
  doneButton: {
    backgroundColor: "#21AB3B",
    borderRadius: 22,
    paddingHorizontal: 24,
    paddingVertical: 6,
  },
  doneText: {
    fontFamily: "SVN-Poppins-Medium",
    color: "#FFFFFF",
    fontSize: 12,
    lineHeight: 20,
  },
  actions: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 4,
  },
  actionButton: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingBottom: 16,
  },
  deleteButton: {
    padding: 4,
    flexDirection: "row",
  },
  editIcon: {
    width: 16,
    height: 16,
  },
  deleteIcon: {
    width: 14,
    height: 16,
  },
  deleteText: {
    fontFamily: "SVN-Poppins",
    fontSize: 12,
    color: "#666666",
    marginLeft: 4,
    lineHeight: 20,
  },
});
