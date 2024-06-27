import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import HomeIcon from "@/assets/images/icons/HomeIcon";
import CatalogueIcon from "@/assets/images/icons/CatalogueIcon";
import ProfileIcon from "@/assets/images/icons/ProfileIcon";
import HeartIcon from "@/assets/images/icons/HeartIcon";
import CheckoutRouterIcon from "@/assets/images/icons/CheckoutRouterIcon";
import BasketIcon from "@/assets/images/icons/BasketIcon";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.light.primary,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Accueil",
          tabBarIcon: ({ color }) => <HomeIcon color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="catalogue"
        options={{
          title: "Catalogue",
          tabBarIcon: ({ color }) => <CatalogueIcon color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="panier"
        options={{
          title: "Panier",
          tabBarIcon: ({ color }) => <BasketIcon color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="fidelite"
        options={{
          title: "Fidélité",
          tabBarIcon: ({ color }) => <HeartIcon color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="compte"
        options={{
          title: "Compte",
          tabBarIcon: ({ color }) => <ProfileIcon color={color} size={24} />,
        }}
      />
    </Tabs>
  );
}
