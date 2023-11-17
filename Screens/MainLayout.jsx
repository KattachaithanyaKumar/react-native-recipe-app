import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import Home from "./Home";
import Search from "./Search";
import Bookmark from "./Bookmark";
import Profile from "./Profile";

const MainLayout = () => {
  const Tab = createBottomTabNavigator();

  const getTabBarIcon = (routeName, isFocused) => {
    let iconName;
    switch (routeName) {
      case "Home":
        iconName = isFocused ? "home" : "home-outline";
        break;
      case "Search":
        iconName = isFocused ? "search" : "search-outline";
        break;
      case "Bookmark":
        iconName = isFocused ? "bookmarks" : "bookmarks-outline";
        break;
      case "Profile":
        iconName = isFocused ? "person" : "person-outline";
        break;
      default:
        iconName = "ios-information-circle";
    }
    return <Ionicons name={iconName} size={25} />;
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          const routeName = route.name;
          return getTabBarIcon(routeName, focused);
        },
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 64,
          position: "absolute",
          bottom: 32,
          left: 24,
          right: 24,
          borderRadius: 16,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Bookmark"
        component={Bookmark}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default MainLayout;
