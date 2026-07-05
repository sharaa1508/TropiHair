import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
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

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

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
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
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
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen name="Results" component={ResultsScreen} />
        <Stack.Screen
          name="Recommendations"
          component={RecommendationsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
