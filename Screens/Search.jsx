import { StyleSheet, View, TextInput, ScrollView, Text } from "react-native";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useFocusEffect } from "@react-navigation/native";
import { Image } from "react-native";

const load = require("../assets/taxi-gears.gif");

const Search = () => {
  const [name, setName] = useState("");
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  useFocusEffect(
    useCallback(() => {
      const focusTextInput = () => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      };

      focusTextInput();
    }, [])
  );

  const handleSubmit = async () => {
    setLoading(true);
    // console.log(name + ":");
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
      );
      const data = await res.json();
      setMeals(data.meals);
      console.log(data);
      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.searchBox}>
        <Ionicons name="search" size={24} color={"#EEAF0E"} />
        <TextInput
          ref={inputRef}
          placeholder="Search"
          style={styles.input}
          onSubmitEditing={handleSubmit}
          onChangeText={(text) => {
            setName(text);
          }}
        />
      </View>
      <>
        {loading ? (
          <View style={styles.loadingScreen}>
            <Image source={load} style={styles.loadingImage} />
          </View>
        ) : (
          <ScrollView style={styles.resultBox}>
            {meals == null ? (
              <Text>Invaid Input</Text>
            ) : (
              <>
                {meals.map((meal, i) => (
                  <View key={i}>
                    <Image
                      source={{ uri: meal.strMealThumb }}
                      style={styles.image}
                    />
                    <Text>{meal.strMeal}</Text>
                  </View>
                ))}
              </>
            )}
          </ScrollView>
        )}
      </>
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    paddingTop: 12,
  },
  searchBox: {
    flexDirection: "row",
    borderColor: "#EEAF0E",
    borderWidth: 1,
    padding: 12,
    marginTop: 24,
    borderRadius: 12,
    overflow: "hidden",
    alignItems: "center",
  },
  input: {
    width: "100%",
    padding: 2,
    marginLeft: 8,
  },
  resultBox: {
    // backgroundColor: "red",
    // flex: 1,
    marginTop: 24,
  },
  image: {
    width: "100%",
    aspectRatio: 0.75,
  },
  loadingImage: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  loadingScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
