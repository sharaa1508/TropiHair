import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import ScanScreen from "./screens/ScanScreen";
import ResultsScreen from "./screens/ResultsScreen";
import RoutineScreen from "./screens/RoutineScreen";
import RecommendationsScreen from "./screens/RecommendationsScreen";
import ProfileScreen from "./screens/ProfileScreen";
import OnboardingScreen from "./screens/OnboardingScreen";
import HairLossAssessmentScreen from "./screens/HairLossAssessmentScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Onboarding"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Scan" component={ScanScreen} />
        <Stack.Screen name="Results" component={ResultsScreen} />
        <Stack.Screen name="Routine" component={RoutineScreen} />
        <Stack.Screen
          name="Recommendations"
          component={RecommendationsScreen}
        />
        <Stack.Screen
          name="HairLossAssessment"
          component={HairLossAssessmentScreen}
        />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
