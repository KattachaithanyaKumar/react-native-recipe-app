import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { auth, db } from "../firebase";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const load = require("../assets/taxi-gears.gif");
const empty = require("../assets/taxi-29.gif");

const Bookmark = () => {
  const [loading, setLoading] = useState(false);
  const [bookmarkedRecipes, setBookmarkedRecipes] = useState([]);

  const navigation = useNavigation();

  const fetchBookmarkedRecipes = async () => {
    try {
      setLoading(true);
      const user = auth.currentUser;
      const userId = user.uid;

      const recipesQuery = query(
        collection(db, "bookmarks", userId, "recipes")
      );
      const recipesSnapshot = await getDocs(recipesQuery);

      const bookmarkedRecipes = recipesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLoading(false);
      return bookmarkedRecipes;
    } catch (error) {
      console.error("Error fetching bookmarked recipes:", error);
      return [];
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchBookmarkedRecipes().then((recipes) => {
        setBookmarkedRecipes(recipes);
        console.log("Bookmarked recipes", recipes);
      });
    }, [])
  );
  // useEffect(() => {
  // }, []);

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>Bookmarks</Text>
      {loading ? (
        <View style={styles.loadingScreen}>
          <Image source={load} style={styles.loadingImage} />
        </View>
      ) : (
        <>
          {bookmarkedRecipes.length == 0 ? (
            <View style={styles.loadingScreen}>
              <Text>No bookmarks yet</Text>
              <Image source={empty} style={styles.loadingImage} />
            </View>
          ) : (
            <ScrollView style={styles.resultBox}>
              {bookmarkedRecipes.map((recipe) => (
                <Pressable
                  key={recipe.id}
                  style={styles.card}
                  onPress={() => {
                    navigation.navigate("MealDetails", {
                      mealID: recipe.id,
                      image: recipe.image,
                      bookmark: true,
                    });
                  }}
                >
                  <Image source={{ uri: recipe.image }} style={styles.image} />
                  <Text style={styles.cardText}>{recipe.name}</Text>
                </Pressable>
              ))}
              <View style={styles.blank}></View>
            </ScrollView>
          )}
        </>
      )}
    </SafeAreaView>
  );
};

export default Bookmark;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  image: {
    width: "100%",
    height: 200,
  },
  card: {
    marginHorizontal: 24,
    marginVertical: 12,
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
  },
  cardText: {
    padding: 12,
    fontSize: 18,
    fontWeight: "bold",
    color: "#724502",
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
  resultBox: {
    flex: 1,
  },
  blank: {
    height: 120,
  },
});
