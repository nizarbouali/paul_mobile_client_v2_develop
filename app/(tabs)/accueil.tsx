import { StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useAuthSlice } from "@/store/slices/authSlice";

export default function TabOneScreen() {
  const dispatch = useDispatch();
  const { actions, selectors } = useAuthSlice();
  const login = useSelector(selectors.login);

  const handleFetchUser = () => {
    dispatch(actions.setShowLoginBottomSheet(true));
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
