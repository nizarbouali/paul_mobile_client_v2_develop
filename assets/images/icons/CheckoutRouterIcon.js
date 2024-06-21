import React from "react";
import { Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles";
import BasketIcon from "../icons/BasketIcon";
import { formattedPrice } from "@/lib/helpers";

const CheckoutRouterIcon = ({ focused }) => {
  const basket = useSelector((s) => s?.global?.basket);
  const choicesPrice = () => {
    let priceChoise = 0;

    if (basket?.products?.length > 0) {
      basket?.products?.map((b) => {
        if (b?.options && b?.options?.length > 0) {
          b?.options?.map((o) => {
            if (o?.choices && o?.choices?.length > 0) {
              o?.choices?.map((c) => {
                priceChoise +=
                  c?.selectedQuantity * c?.supplementPrice * b?.quantity;
              });
            }
          });
        }
      });
    }

    return priceChoise;
  };
  return (
    <View
      style={[
        styles.tabBarIconContainer,
        //
        // {backgroundColor: 'red'}
        {
          borderTopColor: focused ? "#916F2B" : "transparent",
          borderTopWidth: 2,
        },
      ]}
    >
      <BasketIcon color={focused ? "#916F2B" : "#999999"} size={24} />
      {(basket?.products ?? []).length === 0 ? (
        <Text
          style={[
            styles.tabBarIconText,
            { color: focused ? "#916F2B" : "#999999" },
          ]}
        >
          Panier{" "}
        </Text>
      ) : (
        <View
          style={{
            backgroundColor: focused ? "#916F2B" : "black",
            color: "white",
            borderRadius: 50,
            paddingHorizontal: 4,
            paddingVertical: 2,
            marginTop: 4,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 10,
              fontWeight: "bold",
            }}
          >
            {/* {basket?.products?.map((b) => b.quantity).reduce((a, b) => a + b, 0)} */}
            {formattedPrice(
              basket?.products
                ?.map((b) => (b?.promoPrice || b.price) * b.quantity)
                .reduce((a, b) => a + b, 0) + choicesPrice()
            ) + " DH"}
          </Text>
        </View>
      )}
      {(basket?.products ?? []).length > 0 && (
        <View
          style={{
            position: "absolute",
            backgroundColor: focused ? "#916F2B" : "black",
            color: "white",
            borderRadius: 50,
            paddingHorizontal: 4,
            paddingVertical: 2,
            right: 15,
            top: 5,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 10,
              fontWeight: "bold",
            }}
          >
            {basket?.products
              ?.map((b) => b.quantity)
              .reduce((a, b) => a + b, 0)}
          </Text>
        </View>
      )}
    </View>
  );
};

export default CheckoutRouterIcon;
