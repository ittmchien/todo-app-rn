import { useState } from "react";
import { StyleSheet, Pressable, Modal, TextInput, View } from "react-native";
import { useDispatch } from "react-redux";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import DateTimePicker from "@react-native-community/datetimepicker";
import { IconSymbol } from "./ui/IconSymbol";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { addTodo, Priority } from "@/store/todoSlice";

const PriorityButton = ({
  priority,
  selected,
  onSelect,
}: {
  priority: Priority;
  selected: boolean;
  onSelect: () => void;
}) => (
  <Pressable
    style={[styles.priorityButton, selected && styles.selectedPriority]}
    onPress={onSelect}
  >
    <ThemedText
      style={[styles.priorityText, selected && styles.selectedPriorityText]}
    >
      {priority === "high"
        ? "Cao"
        : priority === "medium"
        ? "Trung bình"
        : "Thấp"}
    </ThemedText>
  </Pressable>
);

export default function AddTodoButton() {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [dueDate, setDueDate] = useState(new Date());

  const scale = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(1) }],
  }));

  const handleAdd = () => {
    if (title.trim()) {
      dispatch(
        addTodo({
          title: title.trim(),
          priority,
          completed: false,
          dueDate: dueDate.toISOString(),
        })
      );
      setTitle("");
      setModalVisible(false);
    }
  };

  return (
    <>
      <Animated.View style={[styles.buttonContainer, scale]}>
        <Pressable style={styles.button} onPress={() => setModalVisible(true)}>
          <ThemedText style={styles.buttonText}>Tạo task mới +</ThemedText>
        </Pressable>
      </Animated.View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <ThemedView style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ThemedText style={styles.modalTitle}>Task 1</ThemedText>

            <View style={styles.inputContainer}>
              <ThemedText style={styles.label}>Thời hạn</ThemedText>
              <DateTimePicker
                value={dueDate}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setDueDate(selectedDate || dueDate);
                }}
              />
            </View>

            <View style={styles.inputContainer}>
              <ThemedText style={styles.label}>Mức độ ưu tiên</ThemedText>
              <View style={styles.priorityContainer}>
                <PriorityButton
                  priority="high"
                  selected={priority === "high"}
                  onSelect={() => setPriority("high")}
                />
                <PriorityButton
                  priority="medium"
                  selected={priority === "medium"}
                  onSelect={() => setPriority("medium")}
                />
                <PriorityButton
                  priority="low"
                  selected={priority === "low"}
                  onSelect={() => setPriority("low")}
                />
              </View>
            </View>

            <Pressable style={styles.addButton} onPress={handleAdd}>
              <ThemedText style={styles.addButtonText}>Xong</ThemedText>
            </Pressable>
          </View>
        </ThemedView>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 20,
  },
  button: {
    backgroundColor: "#FF4B8C",
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#FFD700",
  },
  modalContent: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    marginTop: 100,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  priorityContainer: {
    flexDirection: "row",
    gap: 12,
  },
  priorityButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DDD",
    alignItems: "center",
  },
  selectedPriority: {
    backgroundColor: "#FF4B8C",
    borderColor: "#FF4B8C",
  },
  priorityText: {
    color: "#666",
  },
  selectedPriorityText: {
    color: "#FFFFFF",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: "auto",
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
