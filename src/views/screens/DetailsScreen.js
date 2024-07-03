// DetailsScreen.js
import React, { useContext } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../consts/colors";
import { SecondaryButton } from "../components/Button";
import { CartContext } from "../../contexts/CartContext";
import { FavoriteContext } from "../../contexts/FavoriteContext"; // Import FavoriteContext

const DetailsScreen = ({ navigation, route }) => {
  const food = route.params;
  const { addToCart } = useContext(CartContext);
  const { addToFavorites, removeFromFavorites, isFavorite } =
    useContext(FavoriteContext); // Destructure functions from FavoriteContext

  const toggleFavorite = () => {
    if (isFavorite(food.id)) {
      removeFromFavorites(food.id);
    } else {
      addToFavorites(food);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white }}>
      <View style={styles.header}>
        <Icon
          name="arrow-back-ios"
          size={28}
          onPress={navigation.goBack}
          color="white"
        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "white",
          }}
        >
          Details
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: 280,
          }}
        >
          <Image source={food.image} style={{ height: 220, width: 220 }} />
        </View>
        <View style={styles.details}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 25, fontWeight: "bold", color: "white" }}>
              {food.name}
            </Text>
            <View style={styles.iconContainer}>
              <Icon
                name={isFavorite(food.id) ? "favorite" : "favorite-border"}
                color={COLORS.primary}
                size={25}
                onPress={toggleFavorite}
              />
            </View>
          </View>
          <Text style={styles.detailsText}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries.
          </Text>
          <View style={{ marginTop: 40, marginBottom: 40 }}>
            <SecondaryButton
              title="Add To Cart"
              onPress={() => addToCart(food)}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
  },
  iconContainer: {
    backgroundColor: COLORS.white,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  details: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 60,
    backgroundColor: COLORS.primary,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  detailsText: {
    marginTop: 10,
    lineHeight: 22,
    fontSize: 16,
    color: "white",
  },
});

export default DetailsScreen;
