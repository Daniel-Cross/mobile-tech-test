import { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { HttpRequest } from "../constants/Network";
import { Container } from "../constants/Styles";

const { width, height } = Dimensions.get("screen");

const MealSelectionScreen = ({ navigation }) => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const getMeals = async () => {
      const response = await HttpRequest(
        "https://playground.devskills.co/api/rest/meal-roulette-app/meals",
        "GET"
      );
      setMeals(response.meal_roulette_app_meals);
    };

    getMeals();
  }, []);

  const data = meals.map((e: any, i: number) => ({
    key: String(i),
    id: e.id,
    title: e.title,
    image: e.picture,
  }));

  return (
    <Container>
      <FlatList
        keyExtractor={(item) => item.key}
        data={data}
        numColumns={2}
        contentContainerStyle={{
          width,
          justifyContent: "center",
          alignItems: "center",
        }}
        renderItem={({ item }) => (
          <View style={{ padding: 12 }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("MealScreen", { id: item.id })}
            >
              <Image
                source={{ uri: item.image }}
                style={{
                  width: width * 0.4,
                  height: height * 0.15,
                  marginBottom: 12,
                }}
              />
            </TouchableOpacity>
            <Text
              style={{ width: width * 0.4, fontSize: 18, fontWeight: "700" }}
            >
              {item.title}
            </Text>
          </View>
        )}
      />
    </Container>
  );
};

export default MealSelectionScreen;
