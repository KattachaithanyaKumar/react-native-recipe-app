import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import AnimatedLoader from "react-native-animated-loader";

import CategoryCard from "../Components/CategoryCard";

const Home = () => {
  const [categoriesData, setCategoriesData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      console.clear();
      // console.log(
      //   "============================Fetching categories============================"
      // );
      const res = await fetch(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      const data = await res.json();
      setCategoriesData(data.categories);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handlePressEnter = () => {
    console.log("Press Enter");
  };

  return (
    <SafeAreaView>
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
        {loading ? (
          <Text style={styles.loading}>Loading...</Text>
        ) : (
          <ScrollView horizontal style={styles.categoriesList}>
            {categoriesData?.map((category, index) => (
              <CategoryCard key={index} data={category} />
            ))}
          </ScrollView>
        )}
      </ScrollView>
      {/* <AnimatedLoader
        visible={loading}
        overlayColor="rgba(0,0,0,0.75)"
        animationStyle={styles.lottie}
        source={require("../assets/loader.json")}
        speed={1}
      /> */}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  lottie: {
    width: 100,
    height: 100,
  },
  titleBox: {
    // backgroundColor: "red",
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
    // backgroundColor: "red",
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  loading: {
    textAlign: "center",
    marginTop: 64,
    fontSize: 18,
    fontWeight: "400",
  },
});
