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
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const url = `https://playground.devskills.co/api/rest/meal-roulette-app/meals/limit/4/offset/${offset}`;

  useEffect(() => {
    const getMeals = async () => {
      setIsLoading(true);
      const response = await HttpRequest(url, "GET");
      setMeals(response.meal_roulette_app_meals_aggregate.nodes);
      setIsLoading(false);
    };

    getMeals();
  }, [offset]);

  const data = meals.map((e: any, i: number) => ({
    key: String(i),
    id: e.id,
    title: e.title,
    image: e.picture,
  }));

  const onPressOffset = () => {
    if (meals.length > 0) {
      setOffset(offset + 4);
    }

    if (meals.length < 4) {
      setOffset(0);
    }
  };

  return (
    <Container>
      <FlatList
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
        bounces={false}
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
      <TouchableOpacity
        disabled={isLoading}
        onPress={() => onPressOffset()}
        style={{
          borderRadius: 100,
          borderWidth: 5,
          height: 150,
          width: 150,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 30, fontWeight: "700" }}>MORE</Text>
      </TouchableOpacity>
    </Container>
  );
};

export default MealSelectionScreen;
