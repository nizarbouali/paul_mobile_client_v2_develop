import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/components/useColorScheme";
import { Provider } from "react-redux";
import store from "@/store";
import { LoginProvider } from "@/providers/AuthProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { MenuProvider } from "react-native-popup-menu";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "Metropolis-Medium": require("../assets/fonts/Metropolis-Medium.otf"),
    "Metropolis-SemiBold": require("../assets/fonts/Metropolis-SemiBold.otf"),
    "Metropolis-Regular": require("../assets/fonts/Metropolis-Regular.otf"),
    "Metropolis-Bold": require("../assets/fonts/Metropolis-Bold.otf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "EBGaramond-Medium": require("../assets/fonts/EBGaramond-Medium.ttf"),
    "EBGaramond-SemiBold": require("../assets/fonts/EBGaramond-SemiBold.ttf"),
    "EBGaramond-Regular": require("../assets/fonts/EBGaramond-Regular.ttf"),
    "EBGaramond-Bold": require("../assets/fonts/EBGaramond-Bold.ttf"),
    "EBGaramond-ExtraBold": require("../assets/fonts/EBGaramond-ExtraBold.ttf"),
  });

  if (__DEV__) {
    import("@/store/ReactotronConfig").then(() =>
      console.log("Reactotron Configured")
    );
  }

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <MenuProvider skipInstanceCheck>
        <Provider store={store}>
          <LoginProvider>
            <ThemeProvider
              value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
            >
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              </Stack>
            </ThemeProvider>
          </LoginProvider>
        </Provider>
      </MenuProvider>
    </GestureHandlerRootView>
  );
}
