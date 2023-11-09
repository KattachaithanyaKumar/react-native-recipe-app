import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";

const Home = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.titleBox}>
          <Text style={styles.title}>
            Find <Text style={styles.titleYellow}>best recipes </Text>
          </Text>
          <Text style={styles.title}>for cooking </Text>
          <View style={styles.searchBox}>
            <Ionicons name="search" size={24} color={"#EEAF0E"} />
            <TextInput placeholder="Search" style={styles.input} />
          </View>
        </View>

        <View></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  titleBox: {
    // backgroundColor: "red",
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  titleYellow: {
    color: "#EEAF0E",
  },
  searchBox: {
    // backgroundColor: "red",
    flexDirection: "row",
    borderColor: "#EEAF0E",
    borderWidth: 1,
    padding: 12,
    marginTop: 24,
    borderRadius: 12,
  },
  input: {
    // backgroundColor: "red",
    // width: "100%",
    // height: "100%",
  },
});
