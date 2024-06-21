import { StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setShowLoginBottomSheet } from "../rootReducer";

export default function TabOneScreen() {
  const login = useSelector((state: any) => state.auth?.login);
  const dispatch = useDispatch();
  // console.log("login", login);

  const handleFetchUser = () => {
    dispatch(setShowLoginBottomSheet(true));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <TouchableOpacity
        onPress={handleFetchUser}
        style={{ paddingVertical: 20, backgroundColor: "red" }}
      >
        <Text>Fetch User</Text>
      </TouchableOpacity>
      <View style={styles.separator} />
      {/* {user && <Text>{JSON.stringify(user)}</Text>} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
