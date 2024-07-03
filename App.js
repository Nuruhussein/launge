import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnBoardScreen from "./src/views/screens/OnBoardScreen";
// import HomeScreen from "./src/views/screens/HomeScreen";
import COLORS from "./src/consts/colors";
import { SafeAreaProvider } from "react-native-safe-area-context"; // Import SafeAreaProvider for better handling of safe areas
import DetailsScreen from "./src/views/screens/DetailsScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomNavigator from "./src/views/navigation/BottomNavigator";
import LoginPage from "./src/views/screens/LoginPage";
import CartScreen from "./src/views/screens/CartScreen";
import { CartProvider } from "./src/contexts/CartContext";
import { FavoriteProvider } from "./src/contexts/FavoriteContext";

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <GestureHandlerRootView>
          <CartProvider>
            <FavoriteProvider>
              <NavigationContainer>
                <StatusBar
                  backgroundColor={COLORS.white}
                  barStyle="dark-content"
                />
                <Stack.Navigator
                  initialRouteName="loginpage"
                  screenOptions={{ headerShown: false }}
                >
                  <Stack.Screen name="loginpage" component={LoginPage} />
                  <Stack.Screen name="BoardScreen" component={OnBoardScreen} />
                  <Stack.Screen name="Home" component={BottomNavigator} />
                  <Stack.Screen
                    name="DetailsScreen"
                    component={DetailsScreen}
                  />
                  <Stack.Screen name="cartscreen" component={CartScreen} />
                </Stack.Navigator>
              </NavigationContainer>
            </FavoriteProvider>
          </CartProvider>
        </GestureHandlerRootView>
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0, // Ensure status bar padding for Android
  },
});

export default App;
