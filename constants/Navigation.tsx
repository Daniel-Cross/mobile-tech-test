import {
  createNavigationContainerRef,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MealScreen from "../screens/MealScreen";
import MealSelectionScreen from "../screens/MealSelectionScreen";

const Stack = createNativeStackNavigator();
const navigationRef = createNavigationContainerRef();

const Navigation = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
        }}
      >
        <Stack.Screen
          name="MealSelectionScreen"
          component={MealSelectionScreen}
        />
        <Stack.Screen name="MealScreen" component={MealScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
