import "react-native-gesture-handler";
import { useState } from "react";
import {
  NavigationContainer,
  createNavigationContainerRef,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";

import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import ScanScreen from "./screens/ScanScreen";
import ResultsScreen from "./screens/ResultsScreen";
import RoutineScreen from "./screens/RoutineScreen";
import RecommendationsScreen from "./screens/RecommendationsScreen";
import ProfileScreen from "./screens/ProfileScreen";
import OnboardingScreen from "./screens/OnboardingScreen";
import HairLossAssessmentScreen from "./screens/HairLossAssessmentScreen";
import IngredientScannerScreen from "./screens/IngredientScannerScreen";
import WeatherScreen from "./screens/WeatherScreen";
import DoctorConsultationScreen from "./screens/DoctorConsultationScreen";
import BeforeAfterScreen from "./screens/BeforeAfterScreen";
import NotificationsScreen from "./screens/NotificationsScreen";
import ProductsScreen from "./screens/ProductsScreen";
import FlareForecastScreen from "./screens/FlareForecastScreen";
import ProductCheckerScreen from "./screens/ProductCheckerScreen";
import ChatBot from "./ChatBot";
import { LanguageProvider } from "./LanguageContext";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Ref to read the current active route name from outside the navigator
const navigationRef = createNavigationContainerRef();

// Screens where the floating chatbot should NOT appear
const HIDDEN_SCREENS = ["Login", "Onboarding"];

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#1B2A3B",
          borderTopColor: "#0D1B2A",
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 6,
          height: 65,
        },
        tabBarActiveTintColor: "#52B788",
        tabBarInactiveTintColor: "#A8DADC",
        tabBarLabelStyle: { fontSize: 11, fontWeight: "bold" },
        tabBarIcon: ({ focused }) => {
          let icon;
          if (route.name === "Home") icon = focused ? "🏠" : "🏡";
          else if (route.name === "Scan") icon = "📸";
          else if (route.name === "Routine") icon = focused ? "📅" : "🗓️";
          else if (route.name === "Profile") icon = focused ? "👤" : "🧑";
          return <Text style={{ fontSize: 22 }}>{icon}</Text>;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Scan" component={ScanScreen} />
      <Tab.Screen name="Routine" component={RoutineScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  // Track the current screen name (initial route is "Login")
  const [routeName, setRouteName] = useState("Login");

  // Update route name whenever navigation changes
  const handleRouteChange = () => {
    if (navigationRef.isReady()) {
      const current = navigationRef.getCurrentRoute()?.name;
      if (current) setRouteName(current);
    }
  };

  return (
    <LanguageProvider>
      <NavigationContainer
        ref={navigationRef}
        onReady={handleRouteChange}
        onStateChange={handleRouteChange}
      >
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen
            name="DoctorConsultation"
            component={DoctorConsultationScreen}
          />
          <Stack.Screen name="BeforeAfter" component={BeforeAfterScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen
            name="HairLossAssessment"
            component={HairLossAssessmentScreen}
          />
          <Stack.Screen
            name="IngredientScanner"
            component={IngredientScannerScreen}
          />
          <Stack.Screen name="Weather" component={WeatherScreen} />
          <Stack.Screen name="Notifications" component={NotificationsScreen} />
          <Stack.Screen name="Products" component={ProductsScreen} />
          <Stack.Screen name="FlareForecast" component={FlareForecastScreen} />
          <Stack.Screen
            name="ProductChecker"
            component={ProductCheckerScreen}
          />
          <Stack.Screen name="Main" component={MainTabs} />
          <Stack.Screen name="Results" component={ResultsScreen} />
          <Stack.Screen
            name="Recommendations"
            component={RecommendationsScreen}
          />
        </Stack.Navigator>

        {/* Floating chatbot - hidden on Login / Onboarding screens */}
        {!HIDDEN_SCREENS.includes(routeName) && <ChatBot />}
      </NavigationContainer>
    </LanguageProvider>
  );
}
