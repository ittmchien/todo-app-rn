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
import { addTodo, Priority, Todo } from "@/store/todoSlice";
import { PRIORITY } from "@/constants/Constants";

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
      {PRIORITY[priority].name}
    </ThemedText>
  </Pressable>
);

interface AddTodoButtonProps {
  onAdd: () => void;
}

export default function AddTodoButton(props: AddTodoButtonProps) {
  const scale = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(1) }],
  }));

  return (
    <>
      <Animated.View style={[styles.buttonContainer, scale]}>
        <Pressable style={styles.button} onPress={props.onAdd}>
          <ThemedText style={styles.buttonText}>Tạo task mới +</ThemedText>
        </Pressable>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  button: {
    backgroundColor: "#F65D79",
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
