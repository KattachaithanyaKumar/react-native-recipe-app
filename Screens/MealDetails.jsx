import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";

const MealDetails = ({ route }) => {
  const [meal, setMeal] = useState([]);
  const [mealImage, setMealImage] = useState("");
  const [ingredients, setIngredients] = useState([]);

  const transformData = (data) => {
    const ingre = [];
    for (let i = 0; i < 20; i++) {
      const name = data[`strIngredient${i}`];
      const measure = data[`strMeasure${i}`];

      if (name && measure) {
        ingre.push({
          name: name,
          measure: measure,
        });
      }
    }

    // console.log(ingre);
    return ingre;
  };

  const fetchMeal = async () => {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${route.params.mealID}`
    );
    const data = await res.json();
    // console.log(data.meals[0]);
    setMeal(data.meals[0]);
    setMealImage(data.meals[0].strMealThumb);
    setIngredients(transformData(data.meals[0]));
    // console.log("ingre: ", ingredients);
  };

  useEffect(() => {
    fetchMeal();
  }, []);

  const handleYoutube = (url) => {
    console.log(url);
    Linking.openURL(url);
  };

  return (
    <View style={styles.screen}>
      {mealImage && <Image source={{ uri: mealImage }} style={styles.image} />}
      <ScrollView style={styles.details}>
        <Text style={styles.title}>{meal?.strMeal}</Text>
        <View style={styles.tags}>
          <Text style={styles.tagText}>{meal?.strCategory}</Text>
          <Text>•</Text>
          <Text style={styles.tagText}>{meal?.strArea}</Text>
          <Text>•</Text>
          <Text style={styles.tagText}>
            {meal.strTags ? meal.strTags : "No Tags"}
          </Text>
        </View>

        <View>
          <Text style={styles.subHeading}>Ingredients</Text>
          {ingredients ? (
            <View>
              {ingredients.map((item, index) => (
                <View key={index} style={styles.ingredientsList}>
                  <Text>• {item?.name}</Text>
                  <Text>{item?.measure}</Text>
                </View>
              ))}
            </View>
          ) : (
            <Text>loading</Text>
          )}
        </View>

        <View>
          <Text style={styles.subHeading}>Instructions</Text>
          <Text style={styles.instructions}>{meal?.strInstructions}</Text>
        </View>

        <Pressable
          style={styles.button}
          onPress={() => handleYoutube(meal.strYoutube)}
        >
          <Text style={styles.buttonText}>Watch video</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default MealDetails;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: 300,
  },
  details: {
    flex: 1,
    backgroundColor: "white",
    padding: 24,
    position: "relative",
    top: -20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  title: {
    color: "#724502",
    fontWeight: "bold",
    fontSize: 24,
  },
  tags: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  tagText: {
    fontWeight: "300",
  },
  subHeading: {
    fontWeight: "600",
    fontSize: 18,
    marginTop: 24,
    color: "#724502",
  },
  ingredientsList: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  instructions: {
    marginTop: 12,
    // backgroundColor: "red",
    // marginBottom: 24,
  },
  button: {
    backgroundColor: "#eeaf0e",
    padding: 12,
    marginBottom: 48,
    borderRadius: 12,
    marginTop: 24,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 18,
  },
});
