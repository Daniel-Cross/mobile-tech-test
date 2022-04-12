import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { HttpRequest } from "../constants/Network";
import { Container } from "../constants/Styles";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("screen");

const MealScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const [mealData, setMealData] = useState({});

  useEffect(() => {
    const getRecipe = async () => {
      const response = await HttpRequest(
        `https://playground.devskills.co/api/rest/meal-roulette-app/meals/${id}`,
        "GET"
      );
      setMealData(response.meal_roulette_app_meals_by_pk);
    };

    getRecipe();
  }, []);

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            height: 44,
            width: 44,
            position: "absolute",
            top: 15,
            left: 25,
            zIndex: 2,
          }}
        >
          <Ionicons name="arrow-back-outline" size={30} />
        </TouchableOpacity>
        <Image
          source={{ uri: mealData.picture }}
          style={{ height: height * 0.3, width }}
        />
        <Text style={{ fontSize: 20, fontWeight: "700", padding: 12 }}>
          {mealData.title}
        </Text>
        <Text style={{ padding: 12, fontSize: 16 }}>
          {mealData.description}
        </Text>
        <View style={{ padding: 12 }}>
          <Text style={{ fontSize: 16, fontWeight: "700", marginBottom: 12 }}>
            Ingredients
          </Text>
          <Text style={{ fontSize: 15 }}>{mealData.ingredients}</Text>
        </View>
      </ScrollView>
    </Container>
  );
};

export default MealScreen;
