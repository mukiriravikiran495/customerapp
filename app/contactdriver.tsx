import { useRouter } from 'expo-router';
import { useState } from "react";
import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

type Message = {
  id: string;
  text: string;
  sender: "driver" | "user";
};

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: "Hello, I’m on the way!", sender: "driver" },
    { id: "2", text: "Okay, I’ll be waiting.", sender: "user" },
  ]);
  const [input, setInput] = useState("");
  const router = useRouter();
  const sendMessage = () => {
    if (input.trim() === "") return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), text: input, sender: "user" },
    ]);
    setInput("");
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.message,
        item.sender === "user" ? styles.userMessage : styles.driverMessage,
      ]}
    >
      <Text style={{ color: "#fff" }}>{item.text}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="arrow-back" size={24} color="#000" onPress={() => {router.back();}} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Driver</Text>
        <TouchableOpacity>
          <Icon name="call" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={{ padding: 10 }}
        style={styles.chatList}
      />

      {/* Footer */}
      <View style={styles.footer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message"
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Icon name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#f9f9f9",
    marginTop: 30,
  },
  headerTitle: { fontSize: 16, fontWeight: "bold" },
  chatList: { flex: 1 },
  message: {
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
    maxWidth: "80%",
  },
  userMessage: { backgroundColor: "#BA1C1C", alignSelf: "flex-end" },
  driverMessage: { backgroundColor: "#444", alignSelf: "flex-start" },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderTopWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#f9f9f9",
    marginBottom: 30,
  },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 12,
    height: 40,
  },
  sendButton: {
    backgroundColor: "#BA1C1C",
    borderRadius: 20,
    padding: 10,
    marginLeft: 8,
  },
});
