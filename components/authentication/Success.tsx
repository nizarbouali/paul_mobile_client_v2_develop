import { Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";

export default function Success() {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
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
          height: 60,
          borderWidth: 1,
          borderColor: "#000000",
          borderRadius: 25,
        }}
        onPress={() => {
          router.push("MAIN_TAB_NAV");
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
