import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

import CategoryCard from "../Components/CategoryCard";
import Loader from "../Components/Loader";

const Home = () => {
  const [categoriesData, setCategoriesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [randomLoading, setRandomLoading] = useState(true);
  const [randomMeal, setRandomMeal] = useState([]);

  const navigation = useNavigation();

  const fetchCategories = async () => {
    try {
      setCategoriesLoading(true);
      console.clear();
      const res = await fetch(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      const data = await res.json();
      setCategoriesData(data.categories);
      setCategoriesLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchRandomMeal = async () => {
    try {
      setRandomLoading(true);
      const res = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );
      const data = await res.json();
      setRandomMeal(data.meals);
      setRandomLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchRandomMeal();
  }, []);

  const handlePressEnter = () => {
    console.log("Press Enter");
  };

  if (categoriesLoading && randomLoading) {
    return <Loader />;
  }

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView style={styles.screen}>
        <View style={styles.titleBox}>
          <Text style={styles.title}>
            Find <Text style={styles.titleYellow}>best recipes </Text>
          </Text>
          <Text style={styles.title}>for cooking </Text>
          <View style={styles.searchBox}>
            <Ionicons name="search" size={24} color={"#EEAF0E"} />
            <TextInput
              placeholder="Search"
              style={styles.input}
              onSubmitEditing={handlePressEnter}
            />
          </View>
        </View>

        <Text style={styles.subheading}>Popular Categories</Text>
        <ScrollView horizontal style={styles.categoriesList}>
          {categoriesData?.map((category, index) => (
            <Pressable
              key={index}
              onPress={() => {
                navigation.navigate("CategoryScreen", { category });
              }}
            >
              <CategoryCard data={category} />
            </Pressable>
          ))}
        </ScrollView>

        <Text style={styles.subheading}>Random Meal</Text>
        <View>
          {randomMeal?.map((meal, index) => (
            <Pressable
              key={index}
              style={styles.randomMeal}
              onPress={() => {
                navigation.navigate("MealDetails", {
                  mealID: meal.idMeal,
                  image: meal.strMealThumb,
                });
              }}
            >
              <Image
                source={{ uri: meal.strMealThumb }}
                style={styles.randomImage}
              />
              <Text style={styles.randomText}>{meal.strMeal}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  lottie: {
    width: 100,
    height: 100,
  },
  titleBox: {
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subheading: {
    fontSize: 20,
    fontWeight: "600",
    paddingLeft: 24,
  },
  titleYellow: {
    color: "#EEAF0E",
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
  categoriesList: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    // padding: 32,
    // backgroundColor: "red",
  },
  loading: {
    textAlign: "center",
    marginTop: 64,
    fontSize: 18,
    fontWeight: "400",
  },
  randomMeal: {
    margin: 24,
    marginTop: 12,
    borderRadius: 24,
    backgroundColor: "white",
    overflow: "hidden",
    marginBottom: 160,
    elevation: 3,
  },
  randomImage: {
    width: "100%",
    height: 400,
    resizeMode: "cover",
  },
  randomText: {
    padding: 24,
    fontWeight: "600",
    fontSize: 18,
    backgroundColor: "white",
  },
});
