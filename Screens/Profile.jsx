import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../firebase";
import { Pressable } from "react-native";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { launchImageLibraryAsync } from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const img = require("../assets/person.png");

const Profile = () => {
  const [userName, setUserName] = useState("Lorem Ipsum");
  const [userImage, setUserImage] = useState(null);

  const navigation = useNavigation();

  const getProfile = async () => {
    try {
      const res = await AsyncStorage.getItem(auth.currentUser.email);
      console.log("image: ", JSON.parse(res));

      if (res) {
        const { image, id } = JSON.parse(res);
        if (id == auth.currentUser.email) {
          setUserImage(image);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getProfile();

    const email = auth.currentUser.email;
    setUserName(email.split("@")[0]);
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("logged out");
        navigation.navigate("Login");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleEditImage = async () => {
    try {
      const result = await launchImageLibraryAsync({
        mediaTypes: "Images",
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });

      // console.log("Image Picker Result: ", result);

      if (!result.canceled) {
        const imageUri = result.assets[0].uri;
        // console.log("Image URI: ", imageUri);

        const profileData = {
          id: auth.currentUser.email,
          image: imageUri,
        };
        AsyncStorage.setItem(
          auth.currentUser.email,
          JSON.stringify(profileData)
        );
        setUserImage(imageUri);

        console.log("Image uploaded and profile updated");
      } else {
        console.log("Image selection canceled");
      }
    } catch (err) {
      console.error("Error during image selection: ", err);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>Profile</Text>

      <View style={styles.center}>
        <View style={styles.imageContainer}>
          <Image
            source={userImage ? { uri: userImage } : img}
            style={styles.image}
          />
        </View>
        <Text style={styles.username}>{userName}</Text>

        <View style={styles.buttons}>
          <Pressable style={styles.button} onPress={handleEditImage}>
            <Text style={styles.buttonText}>Edit Image</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>Logout</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

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
  center: {
    flex: 1,
  },
  imageContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 64,
  },
  image: {
    width: 200,
    height: 200,
    aspectRatio: 1,
    resizeMode: "contain",
    borderRadius: 100,
    borderColor: "black",
    borderWidth: 6,
  },
  username: {
    textAlign: "center",
    marginTop: 16,
    fontSize: 26,
    color: "#724502",
    fontWeight: "600",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 26,
    gap: 30,
  },
  button: {
    backgroundColor: "#e4e4e4",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    elevation: 2,
  },
  buttonText: {
    fontWeight: "500",
  },
});
