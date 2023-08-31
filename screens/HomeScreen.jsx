import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

const HomeScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");

  const handleSearch = () => {
    navigation.navigate("Details", { username });
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter GitHub Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <Button title="Search" onPress={handleSearch} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  input: {
    width: "100%",
    marginBottom: 20,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
});

export default HomeScreen;
