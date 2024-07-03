// LoginPage.js

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

const { width } = Dimensions.get("window");

const LoginPage = ({ navigation }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  //   const handleLogin = () => {
  //     // For now, assuming name is set correctly
  //     navigation.navigate("Home", "jo");
  //   };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Image
        style={styles.image}
        source={require("../../assets/onboardImage.png")}
      />
      <Text style={styles.title}>Welcome to launj</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="#aaaaaa"
        onChangeText={setName}
        value={name}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaaaaa"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Home", { userName: name })}
      >
        <Text style={styles.buttonTitle}>Log in</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    padding: 20,
  },
  image: {
    width: width * 0.8,
    height: width * 0.5,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 20,
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "#f0f0f0",
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 16,
    width: width * 0.8, // Reduced width
  },
  button: {
    backgroundColor: "#ff6347",
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    width: width * 0.8, // Reduced width
  },
  buttonTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LoginPage;
