import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { HttpRequest } from "../constants/Network";
import { Body, Container, Title } from "../constants/Styles";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("screen");
const TOP_HEADER_HEIGHT = height * 0.3;

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
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          height: 44,
          width: 44,
          position: "absolute",
          top: 55,
          left: 25,
          zIndex: 2,
        }}
      >
        <Ionicons name="arrow-back-outline" size={30} />
      </TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <Image
          source={{ uri: mealData.picture }}
          style={{ width, height: TOP_HEADER_HEIGHT + 32 }}
        />
        <View
          style={{
            position: "absolute",
            width,
            height,
            backgroundColor: "white",
            transform: [
              {
                translateY: TOP_HEADER_HEIGHT,
              },
            ],
            borderRadius: 32,
            padding: 12,
          }}
        >
          <Title>{mealData.title}</Title>
          <Body>{mealData.description}</Body>

          <Title fontSize={18}>Ingredients</Title>

          <Body>{mealData.ingredients}</Body>
        </View>
      </ScrollView>
    </Container>
  );
};

export default MealScreen;
