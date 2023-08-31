import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput, Button } from "react-native-paper";

const HomeScreen = ({ navigation }) => {
  const [text, setText] = useState("");

  const handleInputChange = (inputText) => {
    setText(inputText);
  };

  const handleButtonPress = () => {
    alert(`Text entered: ${text}`);
  };

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button
        title="Check username"
        onPress={() => navigation.navigate("Details")}
      />
      <TextInput
        label="Enter username"
        value={text}
        onChangeText={handleInputChange}
        style={styles.input}
      />
      <Button mode="contained" onPress={() => navigation.navigate("Details")}>
        Check username
      </Button>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  input: {
    width: "70%",
    marginBottom: 20,
  },
});
