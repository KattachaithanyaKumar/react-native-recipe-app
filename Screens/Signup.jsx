import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";

const Signup = () => {
  return (
    <View style={styles.screen}>
      {/* <StatusBar style="dark" /> */}
      <View style={styles.titleText}>
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.desc}>Please enter your account here</Text>
      </View>
      <View style={styles.inputs}>
        <TextInput placeholder="Email" style={styles.input} />
        <TextInput
          placeholder="password"
          secureTextEntry
          style={styles.input}
        />
        <TextInput
          placeholder="re-enter password"
          secureTextEntry
          style={styles.input}
        />
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>SignUp</Text>
        </TouchableOpacity>
        <View style={styles.goto}>
          <Text style={styles.gotoText}>Already have an account?</Text>
          <TouchableOpacity>
            <Text>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {},
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  desc: {
    fontSize: 18,
    fontWeight: "200",
    textAlign: "center",
  },
  inputs: {
    marginVertical: 32,
  },
  input: {
    color: "black",
    width: 300,
    marginVertical: 10,
    padding: 12,
    paddingLeft: 20,
    borderRadius: 32,
    borderColor: "#9FA5C0",
    borderWidth: 1,
  },
  button: {
    backgroundColor: "#EEAF0E",
    width: 300,
    padding: 12,
    borderRadius: 32,
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "bold",
  },
  goto: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 12,
  },
  gotoText: {
    fontWeight: "200",
    paddingRight: 12,
  },
});
