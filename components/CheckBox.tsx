import React from "react";
import { Switch, View, Text, TouchableOpacity, StyleSheet } from "react-native";
//styles
import Colors from "@/constants/Colors";

const CheckBox = (props: any) => {
  return (
    <View style={props?.center ? styles.container1 : styles.container}>
      <Switch
        trackColor={{
          false: Colors.light.noCheckColor,
          true: Colors.light.checkColor,
        }}
        thumbColor={"#fff"}
        ios_backgroundColor={Colors.light.noCheckColor}
        onValueChange={props?.onPress}
        value={props?.check}
      />
      {props?.onView ? (
        <TouchableOpacity onPress={props?.onView}>
          {props?.label ? (
            <Text style={styles.label}>{props?.label}</Text>
          ) : null}
        </TouchableOpacity>
      ) : props?.label ? (
        <Text style={styles.label}>{props?.label}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginLeft: 40,
    marginTop: 10,
    marginBottom: 19,
    width: 340,
  },
  container1: {
    flexDirection: "row",
    marginTop: 15,
    marginBottom: 14,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    marginLeft: 10,
    marginTop: 5,
  },
});

export default CheckBox;
