import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const CategoryCard = ({ data }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: data.strCategoryThumb }} style={styles.image} />
      <Text>{data.strCategory}</Text>
    </View>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  card: {
    marginRight: 24,
    backgroundColor: "#EEAF0E",
    alignItems: "center",
    padding: 12,
    borderRadius: 16,
    // paddingRight: 24,
    // aspectRatio: 1,
    // resizeMode: "contain",
  },
  image: {
    width: 64,
    height: 64,
    aspectRatio: 1,
    resizeMode: "contain",
  },
});
