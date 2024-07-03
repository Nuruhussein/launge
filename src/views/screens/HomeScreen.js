// HomeScreen.js
import React, { useState, useEffect, useContext } from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../consts/colors";
import categories from "../../consts/categories";
import foods from "../../consts/foods";
import { FavoriteContext } from "../../contexts/FavoriteContext"; // Import FavoriteContext

const { width } = Dimensions.get("screen");
const cardWidth = width / 2 - 20;

const HomeScreen = ({ route, navigation }) => {
  const { userName } = route.params;
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFoods, setFilteredFoods] = useState(foods);
  const { favoriteItems, addToFavorites, removeFromFavorites, isFavorite } =
    useContext(FavoriteContext); // Destructure functions from FavoriteContext

  useEffect(() => {
    const filtered = foods.filter((food) => {
      const matchesCategory =
        selectedCategoryIndex === 0 ||
        food.category.toLowerCase() ===
          categories[selectedCategoryIndex - 1].name.toLowerCase();
      const matchesSearch = food.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      if (selectedCategoryIndex === 0) {
        // Show all items if All category is selected
        return matchesSearch;
      } else {
        // Filter by category and search query
        return matchesCategory && matchesSearch;
      }
    });

    // Apply favorite filter if Favorite tab is active
    if (selectedCategoryIndex === 4) {
      const favoriteFiltered = filtered.filter((food) => isFavorite(food.id));
      setFilteredFoods(favoriteFiltered);
    } else {
      setFilteredFoods(filtered);
    }
  }, [selectedCategoryIndex, searchQuery, favoriteItems]);

  const ListCategories = () => {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesListContainer}
      >
        <TouchableOpacity
          key={0}
          activeOpacity={0.8}
          onPress={() => setSelectedCategoryIndex(0)}
        >
          <View
            style={{
              backgroundColor:
                selectedCategoryIndex === 0 ? COLORS.primary : COLORS.secondary,
              ...styles.categoryBtn,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                marginLeft: 10,
                color:
                  selectedCategoryIndex === 0 ? COLORS.white : COLORS.primary,
              }}
            >
              All
            </Text>
          </View>
        </TouchableOpacity>

        {categories.map((category, index) => (
          <TouchableOpacity
            key={index + 1}
            activeOpacity={0.8}
            onPress={() => setSelectedCategoryIndex(index + 1)}
          >
            <View
              style={{
                backgroundColor:
                  selectedCategoryIndex === index + 1
                    ? COLORS.primary
                    : COLORS.secondary,
                ...styles.categoryBtn,
              }}
            >
              <View style={styles.categoryBtnImgCon}>
                <Image
                  source={category.image}
                  style={{ height: 35, width: 35, resizeMode: "cover" }}
                />
              </View>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  marginLeft: 10,
                  color:
                    selectedCategoryIndex === index + 1
                      ? COLORS.white
                      : COLORS.primary,
                }}
              >
                {category.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  const toggleFavorite = (food) => {
    if (isFavorite(food.id)) {
      removeFromFavorites(food.id);
    } else {
      addToFavorites(food);
    }
  };

  const Card = ({ food }) => {
    const isFavoriteFood = isFavorite(food.id);

    return (
      <TouchableHighlight
        underlayColor={COLORS.white}
        activeOpacity={0.9}
        onPress={() => navigation.navigate("DetailsScreen", food)}
      >
        <View style={styles.card}>
          <View style={{ alignItems: "center", top: -40 }}>
            <Image source={food.image} style={{ height: 120, width: 120 }} />
          </View>
          <View style={{ marginHorizontal: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {food.name}
            </Text>
            <Text style={{ fontSize: 14, color: COLORS.grey, marginTop: 2 }}>
              {food.ingredients}
            </Text>
          </View>
          <View
            style={{
              marginTop: 10,
              marginHorizontal: 20,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {food.price} ETB
            </Text>
            <TouchableOpacity
              style={[
                styles.addToCartBtn,
                {
                  backgroundColor: isFavoriteFood
                    ? COLORS.primary
                    : COLORS.grey,
                },
              ]}
              onPress={() => toggleFavorite(food)}
            >
              <Icon
                name={isFavoriteFood ? "favorite" : "favorite-border"}
                size={20}
                color={COLORS.white}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
        <View style={styles.header}>
          <View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 28 }}>Hello,</Text>
              <Text
                style={{ fontSize: 28, fontWeight: "bold", marginLeft: 10 }}
              >
                {userName}!
              </Text>
            </View>
            <Text style={{ marginTop: 5, fontSize: 22, color: COLORS.grey }}>
              What do you want today
            </Text>
          </View>
          <Image
            source={require("../../assets/person.png")}
            style={{ height: 50, width: 50, borderRadius: 25 }}
          />
        </View>
        <View
          style={{
            marginTop: 40,
            flexDirection: "row",
            paddingHorizontal: 20,
          }}
        >
          <View style={styles.inputContainer}>
            <Icon name="search" size={28} />
            <TextInput
              style={{ flex: 1, fontSize: 18 }}
              placeholder="Search for food"
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
            />
          </View>
          <View style={styles.sortBtn}>
            <Icon name="tune" size={28} color={COLORS.white} />
          </View>
        </View>
        <View>
          <ListCategories />
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={filteredFoods}
          renderItem={({ item }) => <Card food={item} />}
          keyExtractor={(item) => item.id.toString()}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  inputContainer: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: COLORS.light,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  sortBtn: {
    width: 50,
    height: 50,
    marginLeft: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  categoriesListContainer: {
    paddingVertical: 30,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  categoryBtn: {
    height: 45,
    width: 120,
    marginRight: 7,
    borderRadius: 30,
    alignItems: "center",
    paddingHorizontal: 5,
    flexDirection: "row",
  },
  categoryBtnImgCon: {
    height: 35,
    width: 35,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    height: 220,
    width: cardWidth,
    marginHorizontal: 10,
    marginBottom: 20,
    marginTop: 50,
    borderRadius: 15,
    elevation: 13,
    backgroundColor: COLORS.white,
  },
  addToCartBtn: {
    height: 30,
    width: 30,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
