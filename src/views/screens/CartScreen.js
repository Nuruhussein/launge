// CartScreen.js
import React, { useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../consts/colors";
import { PrimaryButton } from "../components/Button";
import { CartContext } from "../../contexts/CartContext";

const CartScreen = ({ navigation }) => {
  const { cartItems, increaseQuantity, decreaseQuantity, removeItem } =
    useContext(CartContext);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Calculate total price whenever cart items change
    let totalPrice = 0;
    cartItems.forEach((item) => {
      totalPrice += item.price * item.quantity;
    });
    setTotalPrice(totalPrice);
  }, [cartItems]);

  const handleCheckout = () => {
    // Replace with your Chapa checkout URL
    const chapaCheckoutURL =
      "https://chapa.co/blog/product-updates/keep-your-business-closer-to-you-with-chapa-merchant-app"; // Example URL, replace with actual Chapa checkout URL

    // Open Chapa checkout URL in web browser
    Linking.openURL(chapaCheckoutURL)
      .then((supported) => {
        if (!supported) {
          console.error("Failed to open the URL:", chapaCheckoutURL);
        }
      })
      .catch((err) => console.error("Error opening the URL:", err));
  };

  const CartCard = ({ item, index }) => {
    return (
      <View style={styles.cartCard}>
        <Image source={item.image} style={styles.image} />
        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>{item.price * item.quantity} ETB</Text>
          <View style={styles.quantityContainer}>
            <Text style={styles.quantity}>{item.quantity}</Text>
            <View style={styles.quantityButtons}>
              <Icon
                name="remove"
                size={20}
                color={COLORS.primary}
                onPress={() => decreaseQuantity(index)}
              />
              <Icon
                name="add"
                size={20}
                color={COLORS.primary}
                onPress={() => increaseQuantity(index)}
              />
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <View style={styles.header}>
        <Icon
          name="arrow-back-ios"
          size={28}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.screenTitle}>Cart</Text>
      </View>
      <FlatList
        data={cartItems.filter((item) => item.quantity > 0)}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => <CartCard item={item} index={index} />}
        ListFooterComponent={() => (
          <View style={styles.footer}>
            <View style={styles.totalContainer}>
              <Text style={styles.totalText}>Total Price:</Text>
              <Text style={styles.totalValue}>{totalPrice} ETB</Text>
            </View>
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={handleCheckout}
            >
              <Text style={styles.checkoutText}>CHECKOUT</Text>
            </TouchableOpacity>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    paddingVertical: 20,
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 20,
  },
  cartCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.light,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  itemDetails: {
    marginLeft: 10,
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  itemPrice: {
    fontSize: 16,
    color: COLORS.grey,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  quantity: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
  },
  quantityButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: COLORS.light,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  checkoutButton: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  checkoutText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CartScreen;
