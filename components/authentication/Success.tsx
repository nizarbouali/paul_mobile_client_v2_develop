import { Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import { useEffect, useRef } from "react";
import { useAuthSlice } from "@/store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Success() {
  const router = useRouter();
  const animation = useRef<any>(null);
  const dispatch = useDispatch();
  const { actions, selectors } = useAuthSlice();
  const open = useSelector(selectors.success);

  useEffect(() => {
    if (open) animation.current?.play();
  }, [open]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <LottieView
        source={require("@/assets/lotties/success.json")}
        ref={animation}
        loop={false}
        autoPlay={false}
        style={{
          width: 120,
          height: 120,
          marginBottom: 20,
        }}
      />
      <Text style={{ fontWeight: "700", paddingBottom: 8 }}>Merci</Text>
      <Text style={{ paddingBottom: 48 }}>
        Votre compte est crée avec succès
      </Text>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: 250,
          paddingHorizontal: 20,
          height: 50,
          borderWidth: 1,
          borderColor: "#000000",
          borderRadius: 25,
        }}
        onPress={() => {
          dispatch(actions.setShowSignUpSuccessBottomSheet(true));
          router.push("/(tabs)/accueil");
        }}
      >
        <Text
          style={{
            fontSize: 18,
            color: "#000000",
            alignSelf: "center",
          }}
        >
          Accueil
        </Text>
      </TouchableOpacity>
    </View>
  );
}
