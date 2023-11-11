import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Stack = createNativeStackNavigator();

//screens
import Onboarding from "./Screens/Onboarding";
import Login from "./Screens/Login";
import Signup from "./Screens/Signup";
import Home from "./Screens/Home";
import MainLayout from "./Screens/MainLayout";
import CategoryScreen from "./Screens/CategoryScreen";

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator initialRouteName="Onboarding">
          <Stack.Screen
            name="Onboarding"
            component={Onboarding}
            options={{ headerShown: false, animation: "fade_from_bottom" }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false, animation: "fade_from_bottom" }}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{ headerShown: false, animation: "fade_from_bottom" }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false, animation: "fade_from_bottom" }}
          />
          <Stack.Screen
            name="MainLayout"
            component={MainLayout}
            options={{ headerShown: false, animation: "fade_from_bottom" }}
          />
          <Stack.Screen
            name="CategoryScreen"
            component={CategoryScreen}
            options={{ headerShown: false, animation: "fade_from_bottom" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
