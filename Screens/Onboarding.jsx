import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

const img = require("../assets/bg2.jpg");

const Onboarding = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.screen}>
      {/* <StatusBar style="light" /> */}
      <ImageBackground source={img} style={styles.bg}>
        <Text style={styles.heading}>Start Cooking</Text>
        <Text style={styles.para}>
          Let’s join our community to cook better food!
        </Text>

        <Pressable
          style={styles.button}
          activeOpacity={0.8}
          onPress={handlePress}
        >
          <Text style={styles.buttonText}>Start Cooking {"->"}</Text>
        </Pressable>
      </ImageBackground>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // backgroundColor: "red",
  },
  bg: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 24,
  },
  heading: {
    color: "white",
    fontSize: 42,
    fontWeight: "600",
  },
  para: {
    color: "white",
    fontSize: 16,
    fontWeight: "400",
  },
  button: {
    backgroundColor: "#EEAF0E",
    paddingHorizontal: 32,
    paddingVertical: 18,
    borderRadius: 12,
    marginBottom: 64,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
});
