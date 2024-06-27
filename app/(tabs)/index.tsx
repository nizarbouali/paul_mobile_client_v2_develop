import { StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useAuthBsSlice } from "@/store/slices/authBsSlice";
import { useAuthSlice } from "@/store/slices/authSlice";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TabOneScreen() {
  const dispatch = useDispatch();
  const { actions, selectors } = useAuthBsSlice();
  const login = useSelector(selectors.login);
  const { actions: a, selectors: s } = useAuthSlice();
  const user = useSelector(s.user) as any;

  const fetchDatas = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      console.log("token", token);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      {user ? (
        <View style={{ flexDirection: "row", gap: 70 }}>
          <Text style={{ fontSize: 22 }}>Salut {user?.user?.name?.full}</Text>
          <TouchableOpacity
            onPress={() => dispatch(a.logout({}))}
            style={{ padding: 20, backgroundColor: "#1E65D4" }}
          >
            <Text>logout</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
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
            onPress={() =>
              dispatch(actions.setShowSignUpSuccessBottomSheet(true))
            }
            style={{ paddingVertical: 20, backgroundColor: "yellow" }}
          >
            <Text>open signup success</Text>
          </TouchableOpacity>
        </>
      )}
      <TouchableOpacity
        onPress={fetchDatas}
        style={{ padding: 20, backgroundColor: "#74854E" }}
      >
        <Text>log token</Text>
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
