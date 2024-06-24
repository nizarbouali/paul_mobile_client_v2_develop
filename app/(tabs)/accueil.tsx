import { StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useAuthSlice } from "@/store/slices/authSlice";

export default function TabOneScreen() {
  const dispatch = useDispatch();
  const { actions, selectors } = useAuthSlice();
  const login = useSelector(selectors.login);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => dispatch(actions.setShowLoginBottomSheet(true))}
        style={{ paddingVertical: 20, backgroundColor: "red" }}
      >
        <Text>open login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          dispatch(actions.setShowSmsVerificationBottomSheet(true))
        }
        style={{ paddingVertical: 20, backgroundColor: "green" }}
      >
        <Text>open smsVerification</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => dispatch(actions.setShowSignUpBottomSheet(true))}
        style={{ paddingVertical: 20, backgroundColor: "blue" }}
      >
        <Text>open signup</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => dispatch(actions.setShowSignUpSuccessBottomSheet(true))}
        style={{ paddingVertical: 20, backgroundColor: "yellow" }}
      >
        <Text>open signup success</Text>
      </TouchableOpacity>
      {/* {user && <Text>{JSON.stringify(user)}</Text>} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
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
