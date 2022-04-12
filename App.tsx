import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from "./constants/Navigation";

export default function App() {
  return (
    <SafeAreaProvider>
      <Navigation />
    </SafeAreaProvider>
  );
}
