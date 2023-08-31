// screens/HomeScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const HomeScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");

  const handleSearch = () => {
    if (username.trim()) {
      navigation.navigate("Details", { username });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GitHub Search</Text>
      <Text style={styles.subtitle}>
        Enter a GitHub username to get started
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Enter username"
        onChangeText={setUsername}
        value={username}
      />
      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F6F8FA",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#24292E", // GitHub black color
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: "#586069", // GitHub gray color
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 20,
    backgroundColor: "#ffffff",
    borderRadius: 6,
    borderColor: "#E1E4E8",
    borderWidth: 1,
  },
  button: {
    backgroundColor: "#0366D6", // GitHub blue color
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default HomeScreen;
